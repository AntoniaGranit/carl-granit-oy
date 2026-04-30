import Image from "next/image"

export default function Uutuudet2026() {
	return (
		<div className="flex justify-center">
			<Image
				loading="lazy"
				src="/images/Uutuudet_Kevat_26.jpg"
				alt="Uutuudet kevät 2026"
				width={1000}
				height={600}
				className="mx-auto"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		</div>
	)
}
