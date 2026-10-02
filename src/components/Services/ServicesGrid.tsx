import { services } from "@/data/services";

export default function ServicesGrid() {
	return (
		<section className="services-area">
			<div className="container">
				<div className="section-heading page-section-heading services-heading">
					<div>
						<span className="section-kicker">
							What I can help with
						</span>
						<h1 className="seo-services-title">
							Services that move ideas{" "}
							<span className="services-title-accent">
								forward.
							</span>
						</h1>
					</div>
				</div>

				<div className="services-timeline">
					<div className="timeline-spine" aria-hidden="true" />

					{services.map((service, index) => {
						const side = index % 2 === 0 ? "left" : "right";

						return (
							<div
								className={`timeline-row timeline-row-${side}`}
								key={service.title}
							>
								<div className="timeline-node">
									<span
										className="timeline-icon"
										aria-hidden="true"
									>
										{service.icon}
									</span>
								</div>

								<article className="timeline-card">
									<div
										className="timeline-card-glow"
										aria-hidden="true"
									/>

									<div className="timeline-card-top">
										<span className="timeline-number">
											{service.number ??
												String(index + 1).padStart(
													2,
													"0"
												)}
										</span>
										<span className="timeline-label">
											Service
										</span>
									</div>

									<h2 className="timeline-title">
										{service.title}
									</h2>

									<p className="timeline-description">
										{service.description}
									</p>

									{/* Extra detail block */}
									<div className="timeline-detail">
										<span className="timeline-detail-label">
											What I deliver
										</span>

										<ul className="timeline-tags">
											{service.tags.map((tag) => (
												<li key={tag}>{tag}</li>
											))}
										</ul>
									</div>
								</article>
							</div>
						);
					})}
				</div>

				
			</div>
		</section>
	);
}