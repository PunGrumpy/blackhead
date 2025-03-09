import React from "react";

export function useIsScroll() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", onScroll)
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return isScrolled
}