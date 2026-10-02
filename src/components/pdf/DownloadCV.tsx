"use client";

import { pdf } from "@react-pdf/renderer";
import { useState, type MouseEvent, type ReactNode } from "react";
import ResumePDF from "./ResumePDF";

interface DownloadCVProps {
	className?: string;
	children: ReactNode;
}

export default function DownloadCV({ className, children }: DownloadCVProps) {
	const [isGenerating, setIsGenerating] = useState(false);

	async function handleDownload(event: MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();
		if (isGenerating) return;

		setIsGenerating(true);
		try {
			const blob = await pdf(<ResumePDF />).toBlob();
			const url = URL.createObjectURL(blob);
			const downloadLink = document.createElement("a");
			downloadLink.href = url;
			downloadLink.download = "Maaz-Ur-Rehman-CV.pdf";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			downloadLink.remove();
			window.setTimeout(() => URL.revokeObjectURL(url), 1000);
		} finally {
			setIsGenerating(false);
		}
	}

	return <a className={className} href="#download-cv" download onClick={handleDownload} aria-busy={isGenerating}>{isGenerating ? "Preparing CV..." : children}</a>;
}
