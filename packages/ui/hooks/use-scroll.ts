import { useEffect, useState } from "react"

export function useIsScroll() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", onScroll)
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return isScrolled
}