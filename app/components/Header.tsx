"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import Navigation from "./Navigation"

export default function Header() {
	const pathname = usePathname()
	const showBanner = pathname !== "/"

	return (
		<>
			<Navigation />
			{showBanner ? (
				<header className="w-full m-0 p-0 leading-none">
					<Image
						className="etusivu block w-full max-w-none h-auto align-top"
						src="/images/AloitussivuBrilliancyline.jpg"
						alt="Brilliancy Line"
						width={1000}
						height={338}
						sizes="100vw"
						priority
					/>
				</header>
			) : null}
		</>
	)
}
