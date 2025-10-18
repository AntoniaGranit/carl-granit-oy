"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showVihkiDropdown, setShowVihkiDropdown] = useState(false)
	const [showMuutDropdown, setShowMuutDropdown] = useState(false)
	const pathname = usePathname()

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="main-nav">
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
							<Link href="/muut-timanttikorut?jewelry=Muut_korvakorut_syksy25">
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
			<div
				className={`topnav ${isMenuOpen ? "responsive" : ""}`}
				id="myTopnav"
			>
				<Link href="/">ALOITUS</Link>
				<Link href="/vihki_ja_timantti_sormukset">
					VIHKI/TIMANTTI SORMUKSET
				</Link>
				<Link href="/muut_timanttikorut">MUUT TIMANTTIKORUT</Link>
				<Link href="/Kulta_korvakorut">KULTA KORVAKORUT</Link>
				<Link href="/Kastelahjat">KASTELAHJAT</Link>
				<Link href="/jalleenmyyjat">JÄLLEENMYYJÄT</Link>
				<button className="icon" onClick={toggleMenu}>
					<i
						className={
							isMenuOpen
								? "fa-solid fa-xmark"
								: "fa-solid fa-bars"
						}
					></i>
				</button>
			</div>
		</>
	)
}
