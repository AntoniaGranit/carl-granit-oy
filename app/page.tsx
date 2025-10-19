import Link from "next/link"

export default function Home() {
	return (
		<div className="flex-1 flex flex-col gap-4 justify-center items-center">
			<Link className="no-underline" href="/uutuudet-2025">
				<p className="text-2xl font-bold text-gray-800 ">
					Uutuudet syksy 2025
				</p>
			</Link>
			<Link className="no-underline" href="/lab-timantit">
				<p className="text-2xl font-bold text-gray-800">Lab timantit</p>
			</Link>
		</div>
	)
}
