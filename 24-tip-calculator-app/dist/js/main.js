/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatValue": function() { return /* binding */ formatValue; }
/* harmony export */ });
function formatValue(value) {
	return value.replace(",", ".").replace("%", "").trim()
}




/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (calculate);


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const regexs = {
	float: /^[0-9]*\.?[0-9]*$/,
	number: /^\+?(0|[1-9]\d*)$/,
}

/* harmony default export */ __webpack_exports__["default"] = (regexs);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _calculate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




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
		regexValid: _regex_js__WEBPACK_IMPORTED_MODULE_2__.default.float,
	},
	percentage: {
		node: document.getElementById("inputPercentageCustom"),
		defaultValue: "0",
		storedValue: "",
		regexValid: _regex_js__WEBPACK_IMPORTED_MODULE_2__.default.number,
	},
	people: {
		node: document.getElementById("inputPeople"),
		defaultValue: "1",
		storedValue: "",
		regexValid: _regex_js__WEBPACK_IMPORTED_MODULE_2__.default.number,
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
	let { extraAmountPerPerson, totalPerPerson } = (0,_calculate_js__WEBPACK_IMPORTED_MODULE_1__.default)(
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
	let value = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.formatValue)(input.value)
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

}();
/******/ })()
;