import Image from "next/image"
import Link from "next/link"
import { cormorant, uiSans } from "@/app/fonts"

export default function Home() {
	return (
		<div className="relative flex w-full flex-1 flex-col">
			<div className="relative isolate flex-1 w-full overflow-hidden">
				<Image
					src="/images/landing_image.png"
					alt="Brilliancy Line"
					fill
					priority
					className="object-cover object-[22%_center] md:object-[18%_center]"
					sizes="100vw"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-black/25"
					aria-hidden
				/>
				<div className="absolute inset-0 z-10 flex min-h-0 items-center justify-end px-6 py-0 md:px-12 md:py-0 lg:px-20">
					<div
						className={`w-full max-w-md md:max-w-lg ${uiSans.className}`}
					>
						<p className="text-left text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] md:text-xs">
							Carl Granit Oy · Kevät 2026
						</p>
						<h1
							className={`${cormorant.className} mt-4 text-left text-4xl font-medium leading-[1.1] tracking-[0.02em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)] md:text-5xl lg:text-6xl`}
						>
							Tyyli ja kirkkaus.
						</h1>
						<nav
							className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
							aria-label="Etusivun linkit"
						>
							<Link
								href="/uutuudet-2025"
								className="inline-flex min-h-12 items-center justify-center border border-transparent bg-white px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#0f172a] shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition hover:bg-white/95 hover:shadow-[0_6px_28px_rgba(0,0,0,0.18)]"
							>
								Uutuudet kevät 2026
							</Link>
							<Link
								href="/lab-timantit"
								className="inline-flex min-h-12 items-center justify-center border border-white/90 bg-white/10 px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20"
							>
								Lab timantit
							</Link>
						</nav>
					</div>
				</div>
			</div>
		</div>
	)
}
