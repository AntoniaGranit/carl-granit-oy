import Image from "next/image"

export default function Uutuudet2025() {
	return (
		<main>
			<article>
				<Image
					loading="lazy"
					src="/images/Uutuudet_syksy25.jpg"
					alt="Uutuudet syksy 2025"
					width={1000}
					height={600}
					style={{ maxWidth: "100%", height: "auto" }}
				/>
			</article>
		</main>
	)
}
