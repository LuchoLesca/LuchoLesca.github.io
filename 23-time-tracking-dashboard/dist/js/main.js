const $main = document.getElementById("main")
const $filter = document.getElementById("filter")
let $cards

const createCardHtml = (cardData) => {
	const card = document.createElement("article")
	card.classList.add(
		"card",
		"card--small",
		`card-${cardData.title.toLowerCase().replace(" ", "-")}`
	)
	const cardContent = document.createElement("div")
	cardContent.classList.add("card__content")
	const cardHeader = document.createElement("div")
	cardHeader.classList.add("card__header")
	const cardCategory = document.createElement("p")
	cardCategory.classList.add("card__category")
	cardCategory.textContent = cardData.title
	cardHeader.appendChild(cardCategory)
	const cardOptions = document.createElement("img")
	cardOptions.classList.add("card__options")
	cardOptions.src = `./assets/images/icon-ellipsis.svg`
	cardHeader.appendChild(cardOptions)
	const cardBody = document.createElement("div")
	cardBody.classList.add("card__body")
	const cardHours = document.createElement("p")
	cardHours.classList.add("card__hours")
	cardHours.textContent = `${cardData.timeframes.weekly.current}hs`
	cardBody.appendChild(cardHours)
	const cardAccumulation = document.createElement("p")
	cardAccumulation.classList.add("card__accumulation")
	cardAccumulation.textContent = `Last Week - ${cardData.timeframes.weekly.previous}hs`
	cardBody.appendChild(cardAccumulation)
	cardContent.appendChild(cardHeader)
	cardContent.appendChild(cardBody)
	card.appendChild(cardContent)
	return card
}

const drawCardsInHtml = (cards) => {
	const fragment = document.createDocumentFragment()
	for (cardData of cards) {
		const card = createCardHtml(cardData)
		fragment.appendChild(card)
	}
	$main.appendChild(fragment)
}

const fetchAllData = async () => {
	try {
		const response = await fetch("./data.json")
		const cardsData = await response.json()
		drawCardsInHtml(cardsData)
	} catch (error) {
		console.log(`Error: ${error}`)
	}
}

const setCardsElements = () => {
	$cards = [...$main.querySelectorAll(".card")]
}

updateCardsElementDataByFilter = async (filter) => {
	const timeLapsePhrase = {
		daily: "Yesterday",
		weekly: "Last Week",
		monthly: "Last Month",
	}

	try {
		// Get JSON data
		const response = await fetch("./data.json")
		const cardsData = await response.json()
		// Update DOM Cards
		for (card of $cards) {
			// Get nodeElement to update
			const cardCategory = card.querySelector(".card__category")
			const cardHours = card.querySelector(".card__hours")
			const cardAccumulation = card.querySelector(".card__accumulation")
			// I get details of the necessary card
			const cardData = cardsData.find(
				(item) =>
					item.title.toLowerCase() === cardCategory.textContent.toLowerCase()
			)
			// Update textContents
			const newTimeFrames = cardData.timeframes[filter]
			cardHours.textContent = `${newTimeFrames.current}hs`
			cardAccumulation.textContent = `${timeLapsePhrase[filter]} - ${newTimeFrames.previous}hs`
		}
	} catch (error) {
		console.log(`Error: ${error}`)
	}
}

let currentFilter = "weekly"
$filter.addEventListener("click", (e) => {
	if (e.target.classList.contains("filter__item")) {
		const selectedFilter = e.target.textContent.toLowerCase()
		if (selectedFilter !== currentFilter) {
			updateCardsElementDataByFilter(selectedFilter)
			currentFilter = selectedFilter

			const $filterItems = [...$filter.querySelectorAll(".filter__item")]
			for (item of $filterItems) {
				if (item.classList.contains("filter__item--selected"))
					item.classList.remove("filter__item--selected")
				if (item.textContent.toLowerCase() === selectedFilter)
					item.classList.add("filter__item--selected")
			}
		}
	}
})

// Upload data page
fetchAllData()
	.then(() => setCardsElements())
	.catch((error) => console.log("Error:", error))
