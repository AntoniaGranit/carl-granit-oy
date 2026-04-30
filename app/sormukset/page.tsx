"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

function RingContent() {
	const searchParams = useSearchParams()
	const [selectedRing, setSelectedRing] = useState("9161-9179")

	useEffect(() => {
		const ringParam = searchParams.get("ring")
		if (ringParam) {
			setSelectedRing(ringParam)
		}
	}, [searchParams])

	return (
		<div className="flex justify-center">
			<Image
				loading="lazy"
				src={`/images/Vihki_timantti/${selectedRing}_kevat26.jpg`}
				alt={`Ring collection ${selectedRing}`}
				width={1000}
				height={600}
				className="mx-auto"
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		</div>
	)
}

export default function VihkiJaTimanttiSormukset() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RingContent />
		</Suspense>
	)
}
