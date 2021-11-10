function roundToTwo(num) {
	return +(Math.round(num + "e+2") + "e-2")
}

const calculate = (priceInput = 0, percentageInput = 0, peopleInput = 1) => {
	const price = Number.parseFloat(priceInput)
	const percentage = Number.parseFloat(percentageInput)
	const people = Number.parseFloat(peopleInput)

	console.log(JSON.stringify({ price, percentage, people }))

	const extraAmount = (price * percentage) / 100
	const extraAmountPerPerson = roundToTwo(extraAmount / people)

	const total = price + extraAmount
	const totalPerPerson = roundToTwo(total / people)

	return {
		extraAmountPerPerson,
		totalPerPerson,
	}
}

export default calculate
