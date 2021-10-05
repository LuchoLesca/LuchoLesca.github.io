const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emptyStringRegex = /^\s*$/

const $form = document.getElementById("form")

const evaluateErrorMsgForInputEmail = (inputValue) => {
	if (emptyStringRegex.test(inputValue)) {
		return "Oops! Please add your email"
	}
	if (!emailRegex.test(inputValue)) {
		return "Oops! Please ckeck your email"
	}
	return ""
}

const handleSubmit = (e) => {
	e.preventDefault()

	const emailInputNode = [...$form.elements].find(
		(element) => element.tagName === "INPUT" && element.name === "email"
	)
	const emailInputValue = emailInputNode.value
	const errorMsg = evaluateErrorMsgForInputEmail(emailInputValue)
	$form.dataset.errorMsg = errorMsg
}

$form.addEventListener("submit", handleSubmit)
