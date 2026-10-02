import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple HTML-escape to prevent injected markup in the email body.
function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
	try {
		const body: unknown = await request.json();

		if (!body || typeof body !== "object") {
			return NextResponse.json(
				{ error: "Invalid request body." },
				{ status: 400 }
			);
		}

		const { name, email, subject, message, recaptchaToken } = body as Record<
			string,
			unknown
		>;

		// ── Server-side field validation ───────────────────────────────────────
		const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (
			!name ||
			typeof name !== "string" ||
			name.trim().length === 0 ||
			name.trim().length > 100
		) {
			return NextResponse.json(
				{ error: "Please enter a valid name (max 100 characters)." },
				{ status: 400 }
			);
		}

		if (
			!email ||
			typeof email !== "string" ||
			!validEmail.test(email.trim())
		) {
			return NextResponse.json(
				{ error: "Please enter a valid email address." },
				{ status: 400 }
			);
		}

		if (
			!subject ||
			typeof subject !== "string" ||
			subject.trim().length === 0 ||
			subject.trim().length > 200
		) {
			return NextResponse.json(
				{ error: "Please enter a subject (max 200 characters)." },
				{ status: 400 }
			);
		}

		if (
			!message ||
			typeof message !== "string" ||
			message.trim().length === 0 ||
			message.trim().length > 5000
		) {
			return NextResponse.json(
				{ error: "Please enter a message (max 5000 characters)." },
				{ status: 400 }
			);
		}

		if (!recaptchaToken || typeof recaptchaToken !== "string") {
			return NextResponse.json(
				{ error: "Security verification failed. Please try again." },
				{ status: 400 }
			);
		}

		// ── reCAPTCHA v3 server-side verification ──────────────────────────────
		const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
		if (!recaptchaSecretKey) {
			// Configuration problem — do not expose details to client.
			return NextResponse.json(
				{ error: "Service configuration error. Please try again later." },
				{ status: 500 }
			);
		}

		const verifyResponse = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams({
					secret: recaptchaSecretKey,
					response: recaptchaToken,
				}).toString(),
			}
		);

		const verifyData = (await verifyResponse.json()) as {
			success: boolean;
			score?: number;
			action?: string;
		};

		// Reject if verification failed or score is too low (bot threshold: 0.5).
		if (!verifyData.success || (verifyData.score ?? 0) < 0.5) {
			return NextResponse.json(
				{ error: "Security verification failed. Please try again." },
				{ status: 400 }
			);
		}

		// ── Resend — send email ────────────────────────────────────────────────
		const resendApiKey = process.env.RESEND_API_KEY;
		if (!resendApiKey) {
			return NextResponse.json(
				{ error: "Service configuration error. Please try again later." },
				{ status: 500 }
			);
		}

		const contactEmail = process.env.CONTACT_EMAIL;
		if (!contactEmail) {
			return NextResponse.json(
				{ error: "Service configuration error. Please try again later." },
				{ status: 500 }
			);
		}

		// Instantiate Resend here (lazily) so build-time evaluation with an
		// empty API key does not throw during Next.js page-data collection.
		const resend = new Resend(resendApiKey);

		// Sender address: use a verified domain address when available,
		// otherwise fall back to Resend's shared testing address.
		// Set RESEND_FROM_EMAIL in .env.local once you have a verified domain.
		const fromEmail =
			process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

		const safeName = escapeHtml(name.trim());
		const safeEmail = escapeHtml(email.trim());
		const safeSubject = escapeHtml(subject.trim());
		const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

		await resend.emails.send({
			from: `Portfolio Contact <${fromEmail}>`,
			to: [contactEmail],
			replyTo: email.trim(),
			subject: `New Portfolio Inquiry — ${name.trim()}`,
			html: `
<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /></head>
  <body style="font-family:sans-serif;color:#222;max-width:600px;margin:0 auto;padding:24px;">
    <h2 style="margin-top:0;color:#111;">New Portfolio Inquiry</h2>
    <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />

    <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#888;">Name</p>
    <p style="margin:0 0 20px;font-size:15px;">${safeName}</p>

    <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#888;">Email</p>
    <p style="margin:0 0 20px;font-size:15px;">${safeEmail}</p>

    <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#888;">Subject</p>
    <p style="margin:0 0 20px;font-size:15px;">${safeSubject}</p>

    <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#888;">Message</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">${safeMessage}</p>

    <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
    <p style="margin:0;font-size:12px;color:#aaa;">
      Sent via the contact form on my portfolio.<br />
      Reply directly to this email to respond to ${safeName}.
    </p>
  </body>
</html>`,
			text: `New Portfolio Inquiry\n\nName:\n${name.trim()}\n\nEmail:\n${email.trim()}\n\nSubject:\n${subject.trim()}\n\nMessage:\n${message.trim()}\n\n—\nSent via the contact form on my portfolio.\nReply directly to this email to respond to ${name.trim()}.`,
		});

		return NextResponse.json({ ok: true });
	} catch {
		// Never expose internal errors (Resend/Google details) to the client.
		return NextResponse.json(
			{ error: "Failed to send message. Please try again later." },
			{ status: 500 }
		);
	}
}
