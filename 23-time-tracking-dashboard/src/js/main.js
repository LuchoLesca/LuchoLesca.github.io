const $main = document.getElementById("main")

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

const writeCardsInHtml = (cards) => {
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
		writeCardsInHtml(cardsData)
	} catch (error) {
		console.log(`Error: ${error}`)
	}
}

fetchAllData()
