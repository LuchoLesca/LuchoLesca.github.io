const $headers = document.querySelectorAll("#accordion-header")

$headers.forEach((header) => {
	header.addEventListener("click", (e) => {
		e.target.parentElement.classList.toggle("collapse--show")
	})
})
