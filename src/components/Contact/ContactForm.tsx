"use client";

import { FormEvent, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type FormValues = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
	const [values, setValues] = useState<FormValues>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const { executeRecaptcha } = useGoogleReCaptcha();

	function validate() {
		const nextErrors: FormErrors = {};
		if (!values.name.trim()) nextErrors.name = "Please enter your name.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Please enter a valid email.";
		if (!values.subject.trim()) nextErrors.subject = "Please add a subject.";
		if (!values.message.trim()) nextErrors.message = "Please tell me a little about your message.";
		return nextErrors;
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validate();
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		if (!executeRecaptcha) {
			setServerError("Security check is not ready yet. Please try again in a moment.");
			return;
		}

		setSubmitting(true);
		setServerError(null);

		try {
			const recaptchaToken = await executeRecaptcha("contact_form");

			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...values, recaptchaToken }),
			});

			const data = (await response.json()) as { ok?: boolean; error?: string };

			if (!response.ok) {
				setServerError(data.error ?? "Something went wrong. Please try again.");
				return;
			}

			setSubmitted(true);
			setValues(initialValues);
		} catch {
			setServerError("Failed to send message. Please check your connection and try again.");
		} finally {
			setSubmitting(false);
		}
	}

	function updateField(field: keyof FormValues, value: string) {
		setValues((current) => ({ ...current, [field]: value }));
		setSubmitted(false);
		setServerError(null);
		setErrors((current) => ({ ...current, [field]: undefined }));
	}

	return <form className="contact-form" onSubmit={handleSubmit} noValidate><div className="form-heading"><span className="section-kicker">Send a message</span><h2>Start a conversation</h2></div><div className="form-row"><label>Name<input type="text" value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your name" />{errors.name ? <small id="name-error" className="field-error">{errors.name}</small> : null}</label><label>Email<input type="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@example.com" />{errors.email ? <small id="email-error" className="field-error">{errors.email}</small> : null}</label></div><label>Subject<input type="text" value={values.subject} onChange={(event) => updateField("subject", event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} placeholder="How can I help?" />{errors.subject ? <small id="subject-error" className="field-error">{errors.subject}</small> : null}</label><label>Message<textarea rows={5} value={values.message} onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Tell me about your project or question..." />{errors.message ? <small id="message-error" className="field-error">{errors.message}</small> : null}</label><div className="form-submit"><button className="button" type="submit" disabled={submitting}>{submitting ? "Sending…" : <>Send Message <span aria-hidden="true">↗</span></>}</button>{submitted ? <p className="form-success" role="status">Thanks! Your message has been sent. I&apos;ll get back to you soon.</p> : serverError ? <p className="field-error" role="alert">{serverError}</p> : <p className="form-footnote">I&apos;ll get back to you as soon as possible.</p>}</div></form>;
}
