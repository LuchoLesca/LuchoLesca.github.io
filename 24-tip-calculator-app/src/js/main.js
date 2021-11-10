import calculate from "./calculate.js"
import regexs from "./regex.js"

const $form = document.getElementById("form")
// Form Inputs
// const $inputAmount = document.getElementById("inputAmount")
// const $inputPercentage = document.getElementById("inputPercentageCustom")
// const $inputPeople = document.getElementById("inputPeople")
// Output Display
const $tipAmount = document.getElementById("tipAmount")
const $total = document.getElementById("total")
const $btnReset = document.getElementById("btn-reset")

// Input Nodes
const inputNodes = {
	amount: document.getElementById("inputAmount"),
	percentage: document.getElementById("inputPercentageCustom"),
	people: document.getElementById("inputPeople"),
}

const setValueToInput = (name, value) => {
	inputNodes[name].value = value
}

// Input Values Stored
let inputValuesStored
const defaultInputValuesStored = { amount: "0", percentage: "0", people: "1" }
const resetInputValues = () => {
	const selectedCheckedRadioValue = document
		.querySelector("[checked]")
		?.value?.replace("%", "")
	inputValuesStored = {
		amount: inputNodes.amount.value || defaultInputValuesStored.amount,
		percentage:
			selectedCheckedRadioValue || defaultInputValuesStored.percentage,
		people: inputNodes.people.value || defaultInputValuesStored.people,
	}
}
resetInputValues()

const updateInputValuesStored = (name, value) => {
	inputValuesStored[name] = value || defaultInputValuesStored[name]
}

// Output

const setOutputValues = () => {
	const { amount, percentage, people } = inputValuesStored
	const { extraAmountPerPerson, totalPerPerson } = calculate(
		amount,
		percentage,
		people
	)

	$tipAmount.textContent = `$${extraAmountPerPerson || "0.00"}`
	$total.textContent = `$${totalPerPerson || "0.00"}`
}

const validateInputValue = (input) => {
	const name = input.name
	const value = input.value
	if (name === "amount") return regexs.decimal.test(value)
	if (name === "percentage" || name === "people")
		return regexs.number.test(value)
}

$btnReset.addEventListener("click", () => {
	$form.reset()
	resetInputValues()
	setOutputValues()
})

inputNodes["percentage"].addEventListener("focus", (e) => {
	updateInputValuesStored(e.target.name, e.target.value)
	const inputsRadio = [...document.getElementsByName("percentage")]
		.filter((input) => input.type === "radio")
		.forEach((input) => {
			input.checked = false
		})
})

const treatAccordingInputType = (input) => {
	const inputType = input.type
	const inputName = input.name
	const inputValue = input.value.replace("%", "").trim("")
	switch (inputType) {
		case "radio":
			updateInputValuesStored(inputName, inputValue)
			setValueToInput(inputName, "")
			break

		default:
			if (validateInputValue(input))
				updateInputValuesStored(inputName, inputValue)
			else setValueToInput(inputName, inputValuesStored[inputName])
			break
	}
}

$form.addEventListener("input", (e) => {
	const input = e.target
	const inputName = input.name
	const inputValue = input.value.replace("%", "").trim("") // If is radioBottom, delete % character
	if (inputValue === "") {
		updateInputValuesStored(inputName, defaultInputValuesStored[inputName])
		setValueToInput(inputName, "")
	} else {
		treatAccordingInputType(input)
	}
	setOutputValues()
})

// Test - Delete Later
$form.addEventListener("click", () => {
	calculate(
		inputValuesStored.amount,
		inputValuesStored.percentage,
		inputValuesStored.people
	)
})
