"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

function MuutTimanttikorutContent() {
	const searchParams = useSearchParams()
	const [selectedJewelry, setSelectedJewelry] = useState(
		"Tappikorvakorut_syksy25"
	)

	useEffect(() => {
		const jewelryParam = searchParams.get("jewelry")
		if (jewelryParam) {
			setSelectedJewelry(jewelryParam)
		}
	}, [searchParams])

	return (
		<Image
			loading="lazy"
			src={`/images/Muut_timanttikorut/${selectedJewelry}.jpg`}
			alt={`Jewelry collection ${selectedJewelry}`}
			width={1000}
			height={600}
			style={{ maxWidth: "100%", height: "auto" }}
		/>
	)
}

export default function MuutTimanttikorut() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<MuutTimanttikorutContent />
		</Suspense>
	)
}
