"use client"

import { cormorant } from "@/app/fonts"
import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const muted = "text-[#6b7c8f]"
const navy = "text-[#0f172a]"

function NavLink({
	href,
	active,
	menuOpen,
	children,
}: {
	href: string
	active?: boolean
	/** Desktop: parent row stays navy while dropdown is hovered open */
	menuOpen?: boolean
	children: ReactNode
}) {
	const emphasized = active || menuOpen
	const colorState = emphasized
		? `${navy} after:scale-x-100`
		: `${muted} after:scale-x-0 hover:text-[#0f172a] hover:after:scale-x-100 focus-visible:text-[#0f172a] focus-visible:after:scale-x-100`
	return (
		<Link
			href={href}
			className={`relative inline-block whitespace-nowrap pb-2 text-[16px] font-medium tracking-[0.03em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:bg-[#0f172a] after:transition-transform after:duration-300 after:ease-out focus-visible:outline-none ${colorState}`}
		>
			{children}
		</Link>
	)
}

function SubmenuLink({
	href,
	children,
	onNavigate,
}: {
	href: string
	children: ReactNode
	onNavigate?: () => void
}) {
	return (
		<Link
			href={href}
			onClick={onNavigate}
			className={`block px-5 py-2.5 text-sm font-normal tracking-wide ${muted} transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a] focus-visible:outline-none focus-visible:text-[#0f172a]`}
		>
			{children}
		</Link>
	)
}

function MobileTextLink({
	href,
	active,
	children,
	onClick,
}: {
	href: string
	active: boolean
	children: ReactNode
	onClick?: () => void
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={`block px-3 py-3 text-[16px] font-medium tracking-wide transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a] focus-visible:outline-none focus-visible:text-[#0f172a] ${active ? navy : `${muted}`}`}
		>
			{children}
		</Link>
	)
}

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showVihkiDropdown, setShowVihkiDropdown] = useState(false)
	const [showMuutDropdown, setShowMuutDropdown] = useState(false)
	const [showMobileRingsDropdown, setShowMobileRingsDropdown] =
		useState(false)
	const [showMobileMuutDropdown, setShowMobileMuutDropdown] = useState(false)
	const pathname = usePathname()

	const closeMobile = () => setIsMenuOpen(false)

	const isHome = pathname === "/"
	const isRings = pathname.startsWith("/sormukset")
	const isMuut = pathname.startsWith("/muut-timanttikorut")
	const isKulta = pathname.startsWith("/kulta-korvakorut")
	const isKaste = pathname.startsWith("/kastelahjat")
	const isJalle = pathname.startsWith("/jalleenmyyjat")

	return (
		<>
			{/* Desktop */}
			<nav
				className={`${cormorant.className} relative sticky top-0 z-[1000] m-0 hidden min-h-[56px] w-full border-b border-[#e5e7eb] bg-white py-5 md:min-h-[64px] md:py-6 md:block`}
			>
				<Link
					href="/"
					className="absolute left-0 top-1/2 z-10 max-w-[min(100%,14rem)] -translate-y-1/2 pl-4 text-[17px] font-semibold leading-tight tracking-[0.04em] text-[#0f172a] transition-colors hover:text-[#0f172a]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f172a]/20 md:pl-6 lg:max-w-none lg:pl-8"
				>
					Carl Granit Oy
				</Link>
				<ul className="absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 list-none flex-nowrap items-center justify-center gap-x-5 px-4 lg:gap-x-8 xl:gap-x-10">
					<li>
						<NavLink href="/" active={isHome}>
							Aloitus
						</NavLink>
					</li>
					<li
						className="relative"
						onMouseEnter={() => setShowVihkiDropdown(true)}
						onMouseLeave={() => setShowVihkiDropdown(false)}
					>
						<NavLink
							href="/sormukset"
							active={isRings}
							menuOpen={showVihkiDropdown}
						>
							Vihki- ja timanttisormukset
						</NavLink>
						<div
							className={`absolute left-1/2 top-full z-[1001] min-w-[240px] -translate-x-1/2 pt-1 ${showVihkiDropdown ? "pointer-events-auto block" : "pointer-events-none hidden"}`}
						>
							<div className="border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
								<SubmenuLink href="/sormukset?ring=9161-9179">
									9161–9179
								</SubmenuLink>
								<SubmenuLink href="/sormukset?ring=9127-9159">
									9127–9159
								</SubmenuLink>
								<SubmenuLink href="/sormukset?ring=9100-9126">
									9100–9126
								</SubmenuLink>
								<SubmenuLink href="/sormukset?ring=9069-9099">
									9069–9099
								</SubmenuLink>
								<SubmenuLink href="/sormukset?ring=9047-9068">
									9047–9068
								</SubmenuLink>
								<SubmenuLink href="/sormukset?ring=9013-9046">
									9013–9046
								</SubmenuLink>
							</div>
						</div>
					</li>
					<li
						className="relative"
						onMouseEnter={() => setShowMuutDropdown(true)}
						onMouseLeave={() => setShowMuutDropdown(false)}
					>
						<NavLink
							href="/muut-timanttikorut"
							active={isMuut}
							menuOpen={showMuutDropdown}
						>
							Muut timanttikorut
						</NavLink>
						<div
							className={`absolute left-1/2 top-full z-[1001] min-w-[240px] -translate-x-1/2 pt-1 ${showMuutDropdown ? "pointer-events-auto block" : "pointer-events-none hidden"}`}
						>
							<div className="border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
								<SubmenuLink href="/muut-timanttikorut?jewelry=Tappikorvakorut_kevat26">
									Tappikorvakorut
								</SubmenuLink>
								<SubmenuLink href="/muut-timanttikorut?jewelry=Muut_Korvakorut_kevat26">
									Muut korvakorut
								</SubmenuLink>
								<SubmenuLink href="/muut-timanttikorut?jewelry=Timantti_Riipukset_kevat26">
									Timanttiriipukset
								</SubmenuLink>
							</div>
						</div>
					</li>
					<li>
						<NavLink href="/kulta-korvakorut" active={isKulta}>
							Kultakorvakorut
						</NavLink>
					</li>
					<li>
						<NavLink href="/kastelahjat" active={isKaste}>
							Kastelahjat
						</NavLink>
					</li>
					<li>
						<NavLink href="/jalleenmyyjat" active={isJalle}>
							Jälleenmyyjät
						</NavLink>
					</li>
				</ul>
			</nav>

			{/* Mobile */}
			<div
				className={`${cormorant.className} sticky top-0 z-50 m-0 w-full border-b border-[#e5e7eb] bg-white md:hidden`}
			>
				<div className="flex min-h-[52px] items-center justify-between gap-3 px-4 py-4">
					<Link
						href="/"
						className={`max-w-[min(100%,14rem)] truncate text-left text-[15px] font-semibold leading-tight tracking-[0.03em] transition-colors hover:text-[#0f172a] focus-visible:outline-none focus-visible:text-[#0f172a] ${isHome ? navy : muted}`}
						onClick={closeMobile}
					>
						Carl Granit Oy
					</Link>
					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={`p-2 transition-colors hover:text-[#0f172a] focus-visible:outline-none focus-visible:text-[#0f172a] ${muted}`}
						aria-expanded={isMenuOpen}
						aria-label={
							isMenuOpen ? "Sulje valikko" : "Avaa valikko"
						}
					>
						<i
							className={
								isMenuOpen
									? "fa-solid fa-xmark text-xl"
									: "fa-solid fa-bars text-xl"
							}
						></i>
					</button>
				</div>

				<div
					className={`${isMenuOpen ? "block border-t border-[#e5e7eb]" : "hidden"} px-2 pb-4`}
				>
					<div className="space-y-0">
						<button
							type="button"
							onClick={() =>
								setShowMobileRingsDropdown(
									!showMobileRingsDropdown,
								)
							}
							className={`flex w-full items-center justify-between px-3 py-3 text-left text-[16px] font-medium tracking-wide transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a] focus-visible:outline-none focus-visible:text-[#0f172a] ${isRings || showMobileRingsDropdown ? navy : muted}`}
						>
							Vihki- ja timanttisormukset
							<i
								className={`fa-solid fa-chevron-down text-xs transition-transform ${showMobileRingsDropdown ? "rotate-180" : ""}`}
							></i>
						</button>
						<div
							className={`${showMobileRingsDropdown ? "block border-l-2 border-[#e5e7eb] ml-2" : "hidden"}`}
						>
							<SubmenuLink
								href="/sormukset?ring=9161-9179"
								onNavigate={closeMobile}
							>
								9161–9179
							</SubmenuLink>
							<SubmenuLink
								href="/sormukset?ring=9127-9159"
								onNavigate={closeMobile}
							>
								9127–9159
							</SubmenuLink>
							<SubmenuLink
								href="/sormukset?ring=9100-9126"
								onNavigate={closeMobile}
							>
								9100–9126
							</SubmenuLink>
							<SubmenuLink
								href="/sormukset?ring=9069-9099"
								onNavigate={closeMobile}
							>
								9069–9099
							</SubmenuLink>
							<SubmenuLink
								href="/sormukset?ring=9047-9068"
								onNavigate={closeMobile}
							>
								9047–9068
							</SubmenuLink>
							<SubmenuLink
								href="/sormukset?ring=9013-9046"
								onNavigate={closeMobile}
							>
								9013–9046
							</SubmenuLink>
						</div>

						<button
							type="button"
							onClick={() =>
								setShowMobileMuutDropdown(
									!showMobileMuutDropdown,
								)
							}
							className={`flex w-full items-center justify-between px-3 py-3 text-left text-[16px] font-medium tracking-wide transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a] focus-visible:outline-none focus-visible:text-[#0f172a] ${isMuut || showMobileMuutDropdown ? navy : muted}`}
						>
							Muut timanttikorut
							<i
								className={`fa-solid fa-chevron-down text-xs transition-transform ${showMobileMuutDropdown ? "rotate-180" : ""}`}
							></i>
						</button>
						<div
							className={`${showMobileMuutDropdown ? "block border-l-2 border-[#e5e7eb] ml-2" : "hidden"}`}
						>
							<SubmenuLink
								href="/muut-timanttikorut?jewelry=Tappikorvakorut_kevat26"
								onNavigate={closeMobile}
							>
								Tappikorvakorut
							</SubmenuLink>
							<SubmenuLink
								href="/muut-timanttikorut?jewelry=Muut_Korvakorut_kevat26"
								onNavigate={closeMobile}
							>
								Muut korvakorut
							</SubmenuLink>
							<SubmenuLink
								href="/muut-timanttikorut?jewelry=Timantti_Riipukset_kevat26"
								onNavigate={closeMobile}
							>
								Timanttiriipukset
							</SubmenuLink>
						</div>

						<MobileTextLink
							href="/kulta-korvakorut"
							active={isKulta}
							onClick={closeMobile}
						>
							Kultakorvakorut
						</MobileTextLink>
						<MobileTextLink
							href="/kastelahjat"
							active={isKaste}
							onClick={closeMobile}
						>
							Kastelahjat
						</MobileTextLink>
						<MobileTextLink
							href="/jalleenmyyjat"
							active={isJalle}
							onClick={closeMobile}
						>
							Jälleenmyyjät
						</MobileTextLink>
					</div>
				</div>
			</div>
		</>
	)
}
