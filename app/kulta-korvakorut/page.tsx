import Image from "next/image"

export default function KultaKorvakorut() {
	return (
		<div className="flex justify-center">
			<Image
				loading="lazy"
				src="/images/Zirk_26.jpg"
				alt="Kulta korvakorut"
				width={1000}
				height={600}
				className="mx-auto"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		</div>
	)
}
