const calculate = (priceInput, percentageInput, peopleInput) => {
	const price = Number.parseFloat(priceInput) || 0
	const percentage = Number.parseFloat(percentageInput) || 0
	const people = Number.parseFloat(peopleInput) || 1

	const extraAmount = price * (percentage / 100)
	const extraAmountPerPerson = (extraAmount / people).toFixed(2)

	const total = price + extraAmount
	const totalPerPerson = (total / people).toFixed(2)

	return {
		extraAmountPerPerson: extraAmountPerPerson,
		totalPerPerson: totalPerPerson,
	}
}

export default calculate
