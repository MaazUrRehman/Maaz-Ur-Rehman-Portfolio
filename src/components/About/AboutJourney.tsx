import { aboutExperience } from "@/data/skills";

export default function AboutJourney() {
	return (
		<section className="subsection journey-section">
			<div className="container journey-grid">
				<div>
					<div className="section-heading page-section-heading">
						<div>
							<span className="section-kicker">
								The road so far
							</span>
							<h2>My Journey</h2>
						</div>
					</div>

					<div className="journey-timeline">
						{aboutExperience.map((item) => (
							<article
								className="journey-item"
								key={`${item.title}-${item.period}`}
							>
								<span className="journey-dot" />
								<div className="journey-card">
									<span className="journey-period">
										{item.period}
									</span>
									<h3>{item.title}</h3>
									<strong>{item.company}</strong>
									<p>{item.description}</p>
								</div>
							</article>
						))}
					</div>
				</div>

				<aside className="quote-card">
					<span className="quote-mark">&ldquo;</span>
					<blockquote>
						Technology is best when it brings people together.
					</blockquote>
					<span className="quote-line" />
				</aside>
			</div>
		</section>
	);
}