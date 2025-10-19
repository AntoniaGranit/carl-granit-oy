import Image from "next/image"

export default function KultaKorvakorut() {
	return (
		<Image
			loading="lazy"
			src="/images/Zirk_25.jpg"
			alt="Kulta korvakorut"
			width={1000}
			height={600}
			style={{ maxWidth: "100%", height: "auto" }}
		/>
	)
}
