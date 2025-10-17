"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function MuutTimanttikorut() {
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
		<main>
			<div className="line"></div>
			<article>
				<Image
					loading="lazy"
					src={`/images/Muut_timanttikorut/${selectedJewelry}.jpg`}
					alt={`Jewelry collection ${selectedJewelry}`}
					width={1000}
					height={600}
					style={{ maxWidth: "100%", height: "auto" }}
				/>
			</article>
			<aside></aside>
		</main>
	)
}
