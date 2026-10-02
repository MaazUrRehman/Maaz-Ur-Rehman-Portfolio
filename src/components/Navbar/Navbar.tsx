"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/types";
import DownloadCV from "@/components/pdf/DownloadCV";

const navItems: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Services", href: "/services" },
	{ label: "Projects", href: "/projects" },
	{ label: "Contact", href: "/contact" },
];

function DownloadIcon() {
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function MenuIcon({ open }: { open: boolean }) {
	return open ? <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> : <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}

export default function Navbar() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="site-header">
			<div className="container nav-inner">
				<Link className="brand" href="/" onClick={() => setMenuOpen(false)} aria-label="Maaz Ur Rehman home">
					<Image src="/images/profile/logo.png" alt="MR logo" width={39} height={39} />
					<span className="brand-copy"><strong>Maaz Ur Rehman</strong><small>Full Stack Developer <i>|</i> IT Instructor</small></span>
				</Link>
				<nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
					{navItems.map((item) => {
						const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
						return <Link className={active ? "nav-link active" : "nav-link"} href={item.href} key={item.href} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</Link>;
					})}
					<DownloadCV className="button button-small nav-cv"><DownloadIcon /> Download CV</DownloadCV>
				</nav>
				<button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><MenuIcon open={menuOpen} /></button>
			</div>
		</header>
	);
}
