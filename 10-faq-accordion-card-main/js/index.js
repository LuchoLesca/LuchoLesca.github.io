const $headers = document.querySelectorAll("#accordion-header") /*  */
const $cube = document.getElementById("cube")
let showed = 0

$headers.forEach((header) => {
	header.addEventListener("click", (e) => {
		// e.target.parentElement.classList.toggle("collapse--show")
		if (e.target.parentElement.classList.contains("collapse--show")) {
			e.target.parentElement.classList.remove("collapse--show")
			showed--
		} else {
			e.target.parentElement.classList.add("collapse--show")
			showed++
		}

		if (showed > 0) {
			if (!$cube.classList.contains("cobe--moved")) {
				$cube.classList.add("cube--moved")
			}
		} else {
			$cube.classList.remove("cube--moved")
		}
	})
})
