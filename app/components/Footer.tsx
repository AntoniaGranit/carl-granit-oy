import { cormorant } from "@/app/fonts"

export default function Footer() {
	return (
		<footer
			className={`${cormorant.className} flex w-full items-center justify-center border-t border-[#eef2f7] bg-white/70 py-3`}
		>
			<p className="text-[13px] font-medium tracking-[0.02em] text-[#7a8796]">
				&copy; {new Date().getFullYear()} Carl Granit Oy
			</p>
		</footer>
	)
}
