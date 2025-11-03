"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showVihkiDropdown, setShowVihkiDropdown] = useState(false)
	const [showMuutDropdown, setShowMuutDropdown] = useState(false)
	const [showMobileRingsDropdown, setShowMobileRingsDropdown] =
		useState(false)
	const [showMobileMuutDropdown, setShowMobileMuutDropdown] = useState(false)
	const pathname = usePathname()

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="main-nav hidden md:block">
				<ul>
					<li className={pathname === "/" ? "active" : ""}>
						<Link href="/">ALOITUS</Link>
					</li>
					<li
						className={`dropdown ${
							pathname === "/vihki_ja_timantti_sormukset"
								? "active"
								: ""
						}`}
						onMouseEnter={() => setShowVihkiDropdown(true)}
						onMouseLeave={() => setShowVihkiDropdown(false)}
					>
						<Link href="/sormukset">VIHKI/TIMANTTISORMUKSET</Link>
						<div
							className="dropdown-content"
							style={{
								display: showVihkiDropdown ? "block" : "none",
							}}
						>
							<Link href="/sormukset?ring=9161-9172">
								9161-9172
							</Link>
							<Link href="/sormukset?ring=9127-9159">
								9127-9159
							</Link>
							<Link href="/sormukset?ring=9100-9126">
								9100-9126
							</Link>
							<Link href="/sormukset?ring=9069-9099">
								9069-9099
							</Link>
							<Link href="/sormukset?ring=9047-9068">
								9047-9068
							</Link>
							<Link href="/sormukset?ring=9013-9046">
								9013-9046
							</Link>
						</div>
					</li>
					<li
						className={`dropdown ${
							pathname === "/muut-timanttikorut" ? "active" : ""
						}`}
						onMouseEnter={() => setShowMuutDropdown(true)}
						onMouseLeave={() => setShowMuutDropdown(false)}
					>
						<Link href="/muut-timanttikorut">
							MUUT TIMANTTIKORUT
						</Link>
						<div
							className="dropdown-content"
							style={{
								display: showMuutDropdown ? "block" : "none",
							}}
						>
							<Link href="/muut-timanttikorut?jewelry=Tappikorvakorut_syksy25">
								Tappikorvakorut
							</Link>
							<Link href="/muut-timanttikorut?jewelry=Muut_Korvakorut_syksy25">
								Muut Korvakorut
							</Link>
							<Link href="/muut-timanttikorut?jewelry=Timantti_Riipukset_syksy25">
								Timanttiriipukset
							</Link>
						</div>
					</li>
					<li
						className={
							pathname === "/Kulta_korvakorut" ? "active" : ""
						}
					>
						<Link href="/kulta-korvakorut">KULTA KORVAKORUT</Link>
					</li>
					<li className={pathname === "/Kastelahjat" ? "active" : ""}>
						<Link href="/kastelahjat"> KASTELAHJAT </Link>
					</li>
					<li
						className={
							pathname === "/jalleenmyyjat" ? "active" : ""
						}
					>
						<Link href="/jalleenmyyjat"> JÄLLEENMYYJÄT </Link>
					</li>
				</ul>
			</nav>

			{/* Mobile Navigation */}
			<div className="md:hidden bg-[#ada7f8] p-2 sticky top-0 z-50">
				<div className="flex justify-between items-center">
					<Link
						href="/"
						className="block py-2 px-4 text-gray-800 hover:bg-purple-400 hover:text-white transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						ALOITUS
					</Link>
					<button
						onClick={toggleMenu}
						className="p-2 text-gray-800 hover:text-white transition-colors"
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

				{/* Mobile Menu Links */}
				<div
					className={`${
						isMenuOpen ? "block" : "hidden"
					} mt-4 space-y-2`}
				>
					{/* Rings Section */}
					<div>
						<button
							onClick={() =>
								setShowMobileRingsDropdown(
									!showMobileRingsDropdown
								)
							}
							className="w-full text-left py-2 px-4 text-gray-800 hover:bg-purple-400 hover:text-white transition-colors flex justify-between items-center"
						>
							VIHKI/TIMANTTISORMUKSET
							<i
								className={`fa-solid fa-chevron-down transition-transform ${
									showMobileRingsDropdown ? "rotate-180" : ""
								}`}
							></i>
						</button>
						<div
							className={`ml-4 space-y-1 ${
								showMobileRingsDropdown ? "block" : "hidden"
							}`}
						>
							<Link
								href="/sormukset?ring=9161-9172"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								9161-9172
							</Link>
							<Link
								href="/sormukset?ring=9127-9159"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								9127-9159
							</Link>
							<Link
								href="/sormukset?ring=9100-9126"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								9100-9126
							</Link>
							<Link
								href="/sormukset?ring=9069-9099"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								9069-9099
							</Link>
							<Link
								href="/sormukset?ring=9047-9068"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								9047-9068
							</Link>
							<Link
								href="/sormukset?ring=9013-9046"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								9013-9046
							</Link>
						</div>
					</div>

					{/* Muut Timanttikorut Section */}
					<div>
						<button
							onClick={() =>
								setShowMobileMuutDropdown(
									!showMobileMuutDropdown
								)
							}
							className="w-full text-left py-2 px-4 text-gray-800 hover:bg-purple-400 hover:text-white transition-colors flex justify-between items-center"
						>
							MUUT TIMANTTIKORUT
							<i
								className={`fa-solid fa-chevron-down transition-transform ${
									showMobileMuutDropdown ? "rotate-180" : ""
								}`}
							></i>
						</button>
						<div
							className={`ml-4 space-y-1 ${
								showMobileMuutDropdown ? "block" : "hidden"
							}`}
						>
							<Link
								href="/muut-timanttikorut?jewelry=Tappikorvakorut_syksy25"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Tappikorvakorut
							</Link>
							<Link
								href="/muut-timanttikorut?jewelry=Muut_korvakorut_syksy25"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Muut Korvakorut
							</Link>
							<Link
								href="/muut-timanttikorut?jewelry=Timantti_Riipukset_syksy25"
								className="block py-1 px-4 text-sm text-gray-700 hover:bg-purple-400 hover:text-white transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Timanttiriipukset
							</Link>
						</div>
					</div>
					<Link
						href="/kulta-korvakorut"
						className="block py-2 px-4 text-gray-800 hover:bg-purple-400 hover:text-white transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						KULTA KORVAKORUT
					</Link>
					<Link
						href="/kastelahjat"
						className="block py-2 px-4 text-gray-800 hover:bg-purple-400 hover:text-white transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						KASTELAHJAT
					</Link>
					<Link
						href="/jalleenmyyjat"
						className="block py-2 px-4 text-gray-800 hover:bg-purple-400 hover:text-white transition-colors"
						onClick={() => setIsMenuOpen(false)}
					>
						JÄLLEENMYYJÄT
					</Link>
				</div>
			</div>
		</>
	)
}
