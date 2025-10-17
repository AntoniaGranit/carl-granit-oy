import Image from "next/image"
import Navigation from "./Navigation"

export default function Header() {
	return (
		<header>
			<Image
				className="etusivu"
				src="/images/AloitussivuBrilliancyline.jpg"
				alt="Brilliancy Line"
				width={1000}
				height={338}
				priority
			/>
			<Navigation />
		</header>
	)
}
