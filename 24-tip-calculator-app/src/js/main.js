import { formatValue } from "./util.js"
import calculate from "./calculate.js"
import regexs from "./regex.js"

const $form = document.getElementById("form")

// Output Display
const $tipAmount = document.getElementById("tipAmount")
const $total = document.getElementById("total")
const $btnReset = document.getElementById("btn-reset")

// Inputs Objects Create
/******/
const inputs = {
	amount: {
		node: document.getElementById("inputAmount"),
		defaultValue: "0",
		storedValue: "",
		regexValid: regexs.float,
	},
	percentage: {
		node: document.getElementById("inputPercentageCustom"),
		defaultValue: "0",
		storedValue: "",
		regexValid: regexs.number,
	},
	people: {
		node: document.getElementById("inputPeople"),
		defaultValue: "1",
		storedValue: "",
		regexValid: regexs.number,
	},
}

function initStoredValues() {
	let value
	Object.keys(inputs).forEach((key) => {
		if (key === "percentage")
			value =
				document.querySelector("[checked]")?.value.replace("%", "") ||
				inputs[key].defaultValue
		else value = inputs[key].node.value
		// else value = inputs[key].node.value || inputs[key].defaultValue
		setStoredValue(key, value)
	})
}
/******/

// Input Object Managment
function setStoredValue(name, newValue) {
	inputs[name].storedValue = newValue
}

function setNodeValue(name, newValue) {
	inputs[name].node.value = newValue
}

function validateInput(name, value) {
	const valid = inputs[name].regexValid.test(value)
	return valid
}

function setDefaultAsStoredValue(name) {
	inputs[name].storedValue = inputs[name].defaultValue
}

function resetInputsValues() {
	Object.keys(inputs).forEach((key) => setDefaultAsStoredValue(key))
}

const deselectedRadios = () => {
	const inputsRadio = [...document.getElementsByName("percentage")]
		.filter((input) => input.type === "radio")
		.forEach((input) => {
			input.checked = false
		})
}

function ecualStoredAndDefault(name) {
	return (
		inputs[name].storedValue.toString() === inputs[name].defaultValue.toString()
	)
}

// Output
const setOutputValues = () => {
	let { extraAmountPerPerson, totalPerPerson } = calculate(
		inputs["amount"].storedValue,
		inputs["percentage"].storedValue,
		inputs["people"].storedValue
	)

	if (inputs["people"].node.value === "0")
		inputs["people"].node.parentNode.classList.add("invalid-value")
	else inputs["people"].node.parentNode.classList.remove("invalid-value")

	if (extraAmountPerPerson / 1000 > 1)
		extraAmountPerPerson = `${(extraAmountPerPerson / 1000).toFixed(2)}k`

	if (totalPerPerson / 1000 > 1)
		totalPerPerson = `${(totalPerPerson / 1000).toFixed(2)}k`

	$tipAmount.textContent = `$${extraAmountPerPerson}`
	$total.textContent = `$${totalPerPerson}`
}

// Handles
const handleInputPercentageFocus = (e) => {
	deselectedRadios()
	setStoredValue("percentage", e.target.value)
	setOutputValues()
	setEmptyBtnOpacity()
}

const handleInputChange = (e) => {
	const input = e.target
	const name = input.name
	const type = input.type
	let value = formatValue(input.value)
	if (!value) setStoredValue(name, value)
	if (validateInput(name, value)) {
		setStoredValue(name, value)
		if (type !== "radio") setNodeValue(name, value)
	} else {
		value = ecualStoredAndDefault(name) ? "" : inputs[name].storedValue
		setNodeValue(name, value)
	}
	setOutputValues()
	setEmptyBtnOpacity()
}

// LISTENERS

$btnReset.addEventListener("click", () => {
	$form.reset()
	resetInputsValues()
	setOutputValues()
})

inputs["percentage"].node.addEventListener("focus", handleInputPercentageFocus)

$form.addEventListener("input", handleInputChange)

window.addEventListener("load", () => {
	initStoredValues()
	setOutputValues()
	setEmptyBtnOpacity()
})

function formIsEmpty() {
	const someFieldIsNotEmpty = Object.values(inputs).some((input) => {
		return input.storedValue !== ""
	})
	return !someFieldIsNotEmpty
}

function setEmptyBtnOpacity() {
	if (formIsEmpty()) $btnReset.classList.add("btn-reset--empty")
	else $btnReset.classList.remove("btn-reset--empty")
}
