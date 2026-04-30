"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

function MuutTimanttikorutContent() {
	const searchParams = useSearchParams()
	const [selectedJewelry, setSelectedJewelry] = useState(
		"Tappikorvakorut_kevat26",
	)

	useEffect(() => {
		const jewelryParam = searchParams.get("jewelry")
		if (jewelryParam) {
			setSelectedJewelry(jewelryParam)
		}
	}, [searchParams])

	return (
		<div className="flex justify-center">
			<Image
				loading="lazy"
				src={`/images/Muut_timanttikorut/${selectedJewelry}.jpg`}
				alt={`Jewelry collection ${selectedJewelry}`}
				width={1000}
				height={600}
				className="mx-auto"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		</div>
	)
}

export default function MuutTimanttikorut() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<MuutTimanttikorutContent />
		</Suspense>
	)
}
