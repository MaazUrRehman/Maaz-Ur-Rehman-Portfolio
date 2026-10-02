"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

/**
 * Wraps only the /contact route with the reCAPTCHA v3 provider so the
 * reCAPTCHA script is loaded exclusively on the Contact page — not site-wide.
 */
export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
		>
			{children}
		</GoogleReCaptchaProvider>
	);
}
