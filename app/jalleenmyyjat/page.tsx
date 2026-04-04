import Image from "next/image"

export default function Jalleenmyyjat() {
	return (
		<div className="flex justify-center">
			<Image
				loading="lazy"
				src="/images/Jalleenmyyjat_syksy25.jpg"
				alt="Jälleenmyyjät syksy 2025"
				width={1000}
				height={600}
				className="mx-auto"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		</div>
	)
}
