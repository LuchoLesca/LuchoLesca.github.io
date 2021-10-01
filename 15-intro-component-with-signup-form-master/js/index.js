$form = document.getElementById("form")

const emailValidRegex =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const validatedField = (input) => {
	const fieldName = input.name
	const fieldValue = input.value.trim()

	if (fieldValue.length === 0) return false

	if (fieldName === "email") {
		if (input.value.match(emailValidRegex)) return true
		return false
	}

	return true
}

const validateForm = (form) => {
	const inputs = [...form.elements].filter(
		(element) => element.localName === "input"
	)
	inputs.forEach((input) => {
		if (!validatedField(input)) {
			input.parentNode.classList.add("input-error")
		} else {
			input.parentNode.classList.remove("input-error")
		}
	})
}

const handleSubmit = (e) => {
	e.preventDefault()
	validateForm($form)
}

$form.addEventListener("submit", handleSubmit)
