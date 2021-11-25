let discountActive = false
const priceByViews = {
	/*
    - 10K pageviews / $8 per month
    - 50K pageviews / $12 per month
    - 100K pageviews / $16 per month
    - 500k pageviews / $24 per month
    - 1M pageviews / $36 per month
    */
	// If the visitor switches the toggle to yearly billing,
	// a 25% discount should be applied to all prices.
	1: {
		views: "10K",
		price: "8",
	},
	2: {
		views: "50K",
		price: "12",
	},
	3: {
		views: "100K",
		price: "16",
	},
	4: {
		views: "500K",
		price: "24",
	},
	5: {
		views: "1M",
		price: "36",
	},
}

function getViews(rangeNumber) {
	return priceByViews[rangeNumber].views
}

function getPrice(rangeNumber) {
	return priceByViews[rangeNumber].price
}

function calculateFinalPrice(basePrice) {
	if (discountActive) return basePrice * 0.75
	else return basePrice
}

// DOM Selectors  //
const $card = document.querySelector(".card") // General
// Inputs
const $sliderRange = document.getElementById("slider-range")
const $discountToggle = document.getElementById("discount-toggle")
// Outputs
const $views = document.getElementById("views")
const $price = document.getElementById("price")

// Change/Set Outputs
function setViews(valueSlider) {
	const views = getViews(valueSlider)
	$views.textContent = views
}

function setPrice(valueSlider) {
	let price = getPrice(valueSlider)
	price = calculateFinalPrice(price)
	$price.textContent = parseFloat(price).toFixed(2)
}

// Listeners

$card.addEventListener("input", (e) => {
	const valueSlider = $sliderRange.value

	if (e.target.type === "range") {
		setViews(valueSlider)
		setPrice(valueSlider)
	} else {
		discountActive = !discountActive
		setPrice(valueSlider)
	}
})

window.addEventListener("load", () => {
	const valueSlider = $sliderRange.value
	setViews(valueSlider)
	setPrice(valueSlider)
	discountActive = $discountToggle.checked
})
