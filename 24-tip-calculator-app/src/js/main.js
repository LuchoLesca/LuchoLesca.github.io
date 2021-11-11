import { formatValue, print } from "./util.js"
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
		storedValue: "0",
		regexValid: regexs.float,
	},
	percentage: {
		node: document.getElementById("inputPercentageCustom"),
		defaultValue: "0",
		storedValue: "0",
		regexValid: regexs.number,
	},
	people: {
		node: document.getElementById("inputPeople"),
		defaultValue: "1",
		storedValue: "1",
		regexValid: regexs.number,
	},
}

function formatInputValues() {
	Object.keys(inputs).forEach((key) => {
		const value = inputs[key].node.value
		setNodeValue(key, formatValue(value))
	})
}

function initStoredValues() {
	let value
	Object.keys(inputs).forEach((key) => {
		if (key === "percentage")
			value =
				document.querySelector("[checked]")?.value.replace("%", "") ||
				inputs[key].defaultValue
		else value = inputs[key].node.value || inputs[key].defaultValue
		setStoredValue(key, value)
	})
}

// formatInputValues()
// initStoredValues()
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
	const { extraAmountPerPerson, totalPerPerson } = calculate(
		inputs["amount"].storedValue,
		inputs["percentage"].storedValue,
		inputs["people"].storedValue
	)

	if (!isFinite(totalPerPerson))
		return inputs["people"].node.parentNode.classList.add("invalid-value")

	inputs["people"].node.parentNode.classList.remove("invalid-value")

	let valueExtraAmountPerPerson = "$"
	let valueTotalPerPerson = "$"

	valueExtraAmountPerPerson +=
		extraAmountPerPerson.toString().split(".")[0].length > 3
			? `${(extraAmountPerPerson / 1000).toFixed(2)}k`
			: extraAmountPerPerson

	valueTotalPerPerson +=
		totalPerPerson.toString().split(".")[0].length > 3
			? `${(totalPerPerson / 1000).toFixed(2)}k`
			: totalPerPerson

	$tipAmount.textContent = valueExtraAmountPerPerson
	$total.textContent = valueTotalPerPerson
}

// LISTENERS

$btnReset.addEventListener("click", () => {
	$form.reset()
	resetInputsValues()
	setOutputValues()
})

inputs["percentage"].node.addEventListener("focus", (e) => {
	deselectedRadios()
	setStoredValue(
		"percentage",
		e.target.value || inputs["percentage"].defaultValue
	)
	setOutputValues()
})

$form.addEventListener("input", (e) => {
	const input = e.target
	const name = input.name
	let value = formatValue(input.value)
	if (!value) return setDefaultAsStoredValue(name)
	if (validateInput(name, value)) {
		setStoredValue(name, value)
		// To clean inputValue at click radioButton
		// if (input.type === "radio") setNodeValue(name, "")
	} else {
		value = ecualStoredAndDefault(name) ? "" : inputs[name].storedValue
		setNodeValue(name, value)
	}
	setOutputValues()
})

window.addEventListener("load", () => {
	formatInputValues()
	initStoredValues()
	setOutputValues()
})
