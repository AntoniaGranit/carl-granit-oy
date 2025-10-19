"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function VihkiJaTimanttiSormukset() {
	const searchParams = useSearchParams()
	const [selectedRing, setSelectedRing] = useState("9161-9172")

	useEffect(() => {
		const ringParam = searchParams.get("ring")
		if (ringParam) {
			setSelectedRing(ringParam)
		}
	}, [searchParams])

	return (
		<Image
			loading="lazy"
			src={`/images/Vihki_timantti/${selectedRing}_syksy25.jpg`}
			alt={`Ring collection ${selectedRing}`}
			width={1000}
			height={600}
			style={{ maxWidth: "100%", height: "auto" }}
		/>
	)
}
