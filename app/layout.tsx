import type { Metadata } from "next"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"

export const metadata: Metadata = {
	title: "Brilliancy Line",
	description: "Brilliancy Line - Timanttikorut ja sormukset",
	viewport: "width=device-width, initial-scale=1.0",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="fi">
			<head>
				<meta
					name="google-site-verification"
					content="PoROPeGTFX3WH8flF-f2I-Rs_MCpyO1OxQ6P7Fh0WJo"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
				/>
				<link rel="manifest" href="./manifest.json" />
				<link rel="apple-touch-icon" href="/images/icon_192x192.png" />
				<link rel="icon" href="/images/icon.png" />
			</head>
			<body className="min-h-screen flex flex-col">
				<div id="wrapper" className="flex-1 flex flex-col">
					<Header />
					<main className="flex-1 flex flex-col">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
