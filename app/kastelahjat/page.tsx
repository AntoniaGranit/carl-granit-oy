import Image from "next/image"

export default function Kastelahjat() {
	return (
		<main>
			<div className="line"></div>
			<article>
				<Image
					loading="lazy"
					src="/images/Muut_timanttikorut/Kastelahjat_kevat25.jpg"
					alt="Kastelahjat kevät 2025"
					width={1000}
					height={600}
					style={{ maxWidth: "100%", height: "auto" }}
				/>
			</article>
			<aside></aside>
		</main>
	)
}
