import Image from "next/image"

export default function Jalleenmyyjat() {
	return (
		<main>
			<article>
				<Image
					loading="lazy"
					src="/images/Jalleenmyyjat_syksy25.jpg"
					alt="Jälleenmyyjät syksy 2025"
					width={1000}
					height={600}
					style={{ maxWidth: "100%", height: "auto" }}
				/>
			</article>
		</main>
	)
}
