import { cormorant } from "@/app/fonts"

export default function Footer() {
	return (
		<footer
			className={`${cormorant.className} flex w-full items-center justify-center border-t border-[#e5e7eb] bg-white py-7`}
		>
			<p className="text-[16px] font-medium tracking-[0.03em] text-[#6b7c8f]">
				&copy; {new Date().getFullYear()} Brilliancy Line
			</p>
		</footer>
	)
}
