import Image from "next/image"

export default function Kastelahjat() {
	return (
		<div className="flex justify-center">
			<Image
				loading="lazy"
				src="/images/Muut_timanttikorut/Kastelahjat_kevat26.jpg"
				alt="Kastelahjat kevät 2026"
				width={1000}
				height={600}
				className="mx-auto"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		</div>
	)
}
