/* ##################
	CONST/VAR CONTROL
################## */
let planSelectedDOM = undefined

// Header / Nav
const $menuBtn = document.getElementById("menu-btn")
const $principalNavWrapper = document.getElementById("principal-nav-wrapper")
// Modal
const $backProjectBtn = document.getElementById("back-project-btn")
const $modalWrapper = document.getElementById("modal-wrapper")
const $closeModalBtn = document.getElementById("close-modal-btn")

// Plans
const $plans = document.getElementById("plans")

/* ##################
 	FUNCTIONS
################## */

function showModal() {
	$modalWrapper.classList.add("modal-wrapper--show")
	window.scroll({
		top: 0,
		behavior: "smooth",
	})
}

function hideModal() {
	$modalWrapper.classList.remove("modal-wrapper--show")
}

/* ##################
LISTENERS
################## */

// Nav
$menuBtn.addEventListener("input", () => {
	$principalNavWrapper.classList.toggle("principal-nav-wrapper--show")
})

$backProjectBtn.addEventListener("click", () => {
	showModal()
})

// Modal
$closeModalBtn.addEventListener("click", () => {
	hideModal()
})

$modalWrapper.addEventListener("input", (e) => {
	const cardNode = e.target.closest(".plan")
	if (planSelectedDOM) {
		planSelectedDOM.classList.remove("plan--selected")
	}
	cardNode.classList.add("plan--selected")
	planSelectedDOM = cardNode
})

// Plans
$plans.addEventListener("click", (e) => {
	if (e.target.classList.contains("btn-reward")) {
		planSelectedDOM = e.target.closest("plan")
		console.log(planSelectedDOM)
		showModal()
	}
})

// showModal()
