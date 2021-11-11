const calculate = (priceInput = 0, percentageInput = 0, peopleInput = 1) => {
	const price = Number.parseFloat(priceInput)
	const percentage = Number.parseFloat(percentageInput)
	const people = Number.parseFloat(peopleInput)

	const extraAmount = price * (percentage / 100)
	const extraAmountPerPerson = (extraAmount / people).toFixed(2)

	const total = price + extraAmount
	const totalPerPerson = (total / people).toFixed(2)

	return {
		extraAmountPerPerson: extraAmountPerPerson || "0.00",
		totalPerPerson: totalPerPerson || "0.00",
	}
}

export default calculate
