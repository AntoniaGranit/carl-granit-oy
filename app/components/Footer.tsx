export default function Footer() {
	return (
		<footer className="bg-[#ada7f8] h-15 flex items-center justify-center">
			<p className="text-lg p-2.5 text-gray-800">
				&copy; {new Date().getFullYear()} Brilliancy Line
			</p>
		</footer>
	)
}
