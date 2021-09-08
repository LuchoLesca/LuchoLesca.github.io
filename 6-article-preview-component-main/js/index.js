const $shareBtn = document.getElementById("share-btn")
const $tooltip = document.getElementById("tooltip")

$shareBtn.addEventListener("click", () => {
	$tooltip.classList.toggle("tooltip--show")
	$shareBtn.classList.toggle("share-btn--active")
})
