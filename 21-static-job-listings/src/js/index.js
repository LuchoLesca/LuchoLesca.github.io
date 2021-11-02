const $main = document.getElementById("main")
const $filter = document.getElementById("filter")
const $filterTags = document.getElementById("filterTags")
const $btnClearFilter = document.getElementById("btnClearFilter")

let tagsinFilter = []

const updateFilterVisibility = () => {
	if (tagsinFilter.length === 0) {
		$filter.classList.add("filter--hide")
	} else {
		$filter.classList.remove("filter--hide")
	}
}

const getCardsData = () => {
	fetch("./data/data.json")
		.then((response) => response.json())
		.then((data) => {
			drawCardsInDOM(data)
		})
		.catch((e) => console.log("ERROR", e))
}

const drawCardsInDOM = (data) => {
	const fragment = document.createDocumentFragment()

	for (const cardData of data) {
		// cardData
		const card = document.createElement("article")
		card.classList.add("card")
		if (cardData.featured) card.classList.add("card--featured")
		// PRINCIPAL INFO
		const cardPrincipalInfo = document.createElement("div")
		cardPrincipalInfo.classList.add("card__principal-info")
		// Logo
		const imgLogo = document.createElement("img")
		imgLogo.classList.add("card__logo")
		imgLogo.src = cardData.logo
		// InfoText
		const infoText = document.createElement("div")
		infoText.classList.add("info-text")
		// Info Header
		const infoHeader = document.createElement("div")
		infoHeader.classList.add("info-header")
		// Company
		const company = document.createElement("h2")
		company.classList.add("company")
		company.textContent = cardData.company
		infoHeader.appendChild(company)
		// New
		if (cardData.new) {
			const labelNew = document.createElement("span")
			labelNew.classList.add("label", "new")
			labelNew.textContent = "NEW!"
			infoHeader.appendChild(labelNew)
		}
		// Featured
		if (cardData.featured) {
			const labelFeatured = document.createElement("span")
			labelFeatured.classList.add("label", "featured")
			labelFeatured.textContent = "FEATURED"
			infoHeader.appendChild(labelFeatured)
		}
		// Info Body
		const infoBody = document.createElement("div")
		infoBody.classList.add("info-body")
		// Position
		const position = document.createElement("h3")
		position.classList.add("position")
		position.textContent = cardData.position
		infoBody.appendChild(position)
		// Deatils
		const details = document.createElement("ul")
		details.classList.add("details")
		// Detials Item
		for (const item of [
			cardData.postedAt,
			cardData.contract,
			cardData.location,
		]) {
			const detailsItem = document.createElement("li")
			detailsItem.classList.add("details__item")
			detailsItem.textContent = item
			details.appendChild(detailsItem)
		}
		infoBody.appendChild(details)
		infoText.appendChild(infoHeader)
		infoText.appendChild(infoBody)
		cardPrincipalInfo.appendChild(imgLogo)
		cardPrincipalInfo.appendChild(infoText)
		// cardPrincipalInfo.appendChild(infoHeader)
		// cardPrincipalInfo.appendChild(infoBody)
		// Tags
		const tags = document.createElement("ul")
		tags.classList.add("tags")
		// Detials Item
		for (const item of [
			cardData.role,
			cardData.level,
			...cardData.languages,
			...cardData.tools,
		]) {
			const tagsItem = document.createElement("li")
			tagsItem.classList.add("tag")
			tagsItem.textContent = item
			tags.appendChild(tagsItem)
		}
		// card.appendChild(imgLogo)
		card.appendChild(cardPrincipalInfo)
		card.appendChild(tags)
		fragment.appendChild(card)
	}

	$main.appendChild(fragment)
}

const addFilterTag = (title) => {
	const fragment = document.createDocumentFragment()

	const tagWithClose = document.createElement("li")
	tagWithClose.classList.add("tag--with-close")

	const tag = document.createElement("div")
	tag.classList.add("tag")
	tag.textContent = title

	tagWithClose.appendChild(tag)

	fragment.appendChild(tagWithClose)

	$filterTags.appendChild(fragment)

	// Add to array
	tagsinFilter.push(title)

	updateFilterVisibility()
	updateCards()
}

const removeFilterTag = (tagNode) => {
	const tagWithClose = tagNode.parentNode
	tagWithClose.parentNode.removeChild(tagWithClose)

	// Remove From Array
	const index = tagsinFilter.indexOf(tagNode.textContent)
	tagsinFilter.splice(index, 1)

	updateFilterVisibility()
	updateCards()
}

const getTagsNameListFromCard = (card) => {
	const tags = card.getElementsByClassName("tag")
	const tagsNamesList = [...tags].map((tag) => tag.textContent)
	return tagsNamesList
}

const checkCard = (card) => {
	const tagsNamesInCard = getTagsNameListFromCard(card)
	const included = tagsinFilter.every((r) => tagsNamesInCard.includes(r))
	return included
}

const getFilteredCards = () => {
	const $cards = document.querySelectorAll(".card")
	const cards = [...$cards]
	const cardsFiltered = cards.filter((card) => checkCard(card))
	return cardsFiltered
}

const updateCards = () => {
	const cardsFiltered = getFilteredCards()
	const namesCardsFiltered = cardsFiltered.map(
		(card) => card.querySelector(".company").textContent
	)

	const $cards = document.querySelectorAll(".card")
	const cards = [...$cards]
	cards.forEach((card) => {
		const cardCompanyName = card.querySelector(".company").textContent
		if (!namesCardsFiltered.includes(cardCompanyName)) {
			card.classList.add("card--hide")
		} else {
			card.classList.remove("card--hide")
		}
	})
}

// LISTENERS
$main.addEventListener("click", (e) => {
	if (e.target.classList.contains("tag")) {
		if (e.target.parentNode.className === "tag--with-close") {
			removeFilterTag(e.target)
		} else {
			if (!tagsinFilter.includes(e.target.textContent)) {
				addFilterTag(e.target.textContent)
			}
		}
	}
})

$btnClearFilter.addEventListener("click", (e) => {
	while ($filterTags.firstChild) {
		$filterTags.removeChild($filterTags.firstChild)
	}
	tagsinFilter = []

	updateFilterVisibility()
	updateCards()
})

getCardsData()

updateFilterVisibility()
