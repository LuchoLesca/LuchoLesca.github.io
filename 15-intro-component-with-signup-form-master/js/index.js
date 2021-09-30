$form = document.getElementById("form")
$inputGroups = document.querySelectorAll(".input-group")

const emailValidRegex =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const correctField = (input) => {
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
	const inputs = form.querySelectorAll(".input")
	inputs.forEach((input) => {
		if (!correctField(input)) {
			input.parentNode.classList.add("input-error")
		} else {
			input.parentNode.classList.remove("input-error")
		}
	})
}

$form.addEventListener("submit", (e) => {
	e.preventDefault()
	validateForm($form)
})
