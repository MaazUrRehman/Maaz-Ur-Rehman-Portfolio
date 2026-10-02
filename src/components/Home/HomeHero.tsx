// import Image from "next/image";
// import Link from "next/link";
// import DownloadCV from "@/components/pdf/DownloadCV";
// import SocialIcon from "@/components/SocialIcon";
// import { socialLinks } from "@/data/site";

// export default function HomeHero() {
// 	return <section className="hero-section"><div className="hero-grid container">
// 		<div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Full Stack Developer <b>|</b> IT Instructor</div><h1>Hi, I&apos;m <span>Maaz Ur Rehman</span></h1><p className="hero-lede">I build modern, scalable web applications and digital solutions using modern development technologies. Alongside development, I work as an IT Instructor, helping aspiring developers learn through practical, real-world projects and hands-on coding.</p><div className="hero-actions"><DownloadCV className="button">Download CV</DownloadCV><Link className="button button-ghost" href="/contact">Contact Me</Link></div><div className="hero-proof"><span className="proof-line" /><span>Turning thoughtful ideas into reliable digital products.</span></div>
// 		<div className="hero-socials" aria-label="Social profiles">{socialLinks.map((social) => <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer" aria-label={`Visit Maaz on ${social.label}`}><SocialIcon name={social.icon} /></a>)}</div></div><div className="hero-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="portrait-frame"><Image src="/images/profile/portfolio_home_image_dark.png" alt="Maaz Ur Rehman" width={620} height={720} priority /></div><div className="floating-chip chip-top"><span>✦</span> Available for work</div><div className="floating-chip chip-bottom"><strong>06</strong><span>core stacks<br />in my toolkit</span></div></div>
// 	</div></section>;
// }





"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DownloadCV from "@/components/pdf/DownloadCV";
import SocialIcon from "@/components/SocialIcon";
import { socialLinks } from "@/data/site";

function TypewriterHeading() {
  const line1 = "Hi, I'm";
  const line2 = "Maaz Ur Rehman";
  const fullText = line1 + "\n" + line2; // \n = line break
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const totalChars = fullText.length;
    const interval = duration / totalChars;

    let index = 0;
    const timer = setInterval(() => {
      index++;
      setDisplayed(fullText.slice(0, index));

      if (index >= totalChars) {
        clearInterval(timer);
        setDone(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Displayed text ko 2 lines mein todna
  const [displayedLine1, displayedLine2 = ""] = displayed.split("\n");

  return (
    <h1>
      <span className="sr-only">Hi, I&apos;m Maaz Ur Rehman</span>
      <span className="hero-line-white" aria-hidden="true">
        {displayedLine1}
        {!done && displayedLine2 === "" && (
          <span className="typewriter-cursor">|</span>
        )}
      </span>
      {displayedLine2 !== "" && (
        <>
          <br />
          <span className="hero-line-blue" aria-hidden="true">
            {displayedLine2}
            {!done && <span className="typewriter-cursor">|</span>}
          </span>
        </>
      )}
    </h1>
  );
}

export default function HomeHero() {
  return (
    <section className="hero-section">
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> Full Stack Developer <b>|</b> IT Instructor
          </div>

          <TypewriterHeading />

          <p className="hero-lede">
            I build modern, scalable web applications and digital solutions using
            modern development technologies. Alongside development, I work as an
            IT Instructor, helping aspiring developers learn through practical,
            real-world projects and hands-on coding.
          </p>

          <div className="hero-actions">
            <DownloadCV className="button">Download CV</DownloadCV>
            <Link className="button button-ghost" href="/contact">
              Contact Me
            </Link>
          </div>

          <div className="hero-proof">
            <span className="proof-line" />
            <span>Turning thoughtful ideas into reliable digital products.</span>
          </div>

          <div className="hero-socials" aria-label="Social profiles">
            {socialLinks.map((social) => (
              <a
                href={social.href}
                key={social.label}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Maaz on ${social.label}`}
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="portrait-frame">
            <Image
              src="/images/profile/portfolio_home_image_dark.png"
              alt="Maaz Ur Rehman"
              width={620}
              height={720}
              priority
            />
          </div>
          <div className="floating-chip chip-top">
            <span>✦</span> Available for work
          </div>
          <div className="floating-chip chip-bottom">
            <strong>06</strong>
            <span>
              core stacks
              <br />
              in my toolkit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
