import Image from "next/image"

export default function LabTimantit() {
	return (
		<Image
			loading="lazy"
			src="/images/LAB.jpg"
			alt="Lab Timantit syksy 2025"
			width={1000}
			height={600}
			style={{ maxWidth: "100%", height: "auto" }}
		/>
	)
}
