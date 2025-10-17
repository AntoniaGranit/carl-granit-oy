import Link from "next/link"

export default function Home() {
	return (
		<main>
			<article>
				<div className="line">
					<Link className="syksy_18" href="/uutuudet-2025">
						<p className="syksy_2018">
							&nbsp; &nbsp;Uutuudet syksy 2025
						</p>
					</Link>
					<Link className="syksy_18" href="/lab-timantit">
						<p className="syksy_2018">&nbsp; &nbsp;Lab Timantit</p>
						<br />
						<br />
					</Link>
				</div>
			</article>
		</main>
	)
}
