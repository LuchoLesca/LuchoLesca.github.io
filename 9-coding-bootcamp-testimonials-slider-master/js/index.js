const $cardsContainer = document.getElementById("cards")
const $slider = document.getElementById("slider")

let idx = 0
const maxIdx = $cardsContainer.childElementCount - 1

const updateIdx = (direction) => {
	if (idx > 0 && direction === "left") {
		return idx - 1
	}
	if (idx < maxIdx && direction === "right") {
		return idx + 1
	}
	return idx
}

const modifyClass = (direction) => {
	const nextIdx = updateIdx(direction)
	if (idx !== nextIdx) {
		idx = nextIdx
		$cardsContainer.classList.toggle("cards--show-second")
	}
}

$slider.addEventListener("click", (e) => {
	const direction = e.target.dataset.direction
	modifyClass(direction)
})

window.addEventListener("keyup", (e) => {
	const direction = e.key.toLowerCase().replace("arrow", "")
	if (["right", "left"].includes(direction)) {
		modifyClass(direction)
	}
})
