import { Cormorant_Garamond, DM_Sans } from "next/font/google"

export const cormorant = Cormorant_Garamond({
	subsets: ["latin", "latin-ext"],
	weight: ["400", "500", "600"],
})

/** Uppercase UI: labels, buttons */
export const uiSans = DM_Sans({
	subsets: ["latin", "latin-ext"],
	weight: ["400", "500", "600"],
})
