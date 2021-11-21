$btnMenu = document.querySelector(".mobile-nav-toggle")
$primaryNav = document.querySelector(".nav")

$btnMenu.addEventListener("click", () => {
	const visibility = $primaryNav.getAttribute("data-visible")
	if (visibility === "false") {
		$primaryNav.setAttribute("data-visible", true)
		$btnMenu.setAttribute("aria-expanded", true)
	} else {
		$primaryNav.setAttribute("data-visible", false)
		$btnMenu.setAttribute("aria-expanded", false)
	}
})
