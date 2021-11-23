const $switch = document.getElementById("switch")
const cards = [...document.getElementsByClassName("card")]

$switch.addEventListener("change", () => {
	cards.forEach((card) => {
		card.classList.toggle("card--hidden")
	})
})
