const $form = document.getElementById("form")
const $inputEmail = document.getElementById("input-email")

function validateEmail(email) {
	const validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	return email.match(validRegex)
}

$form.addEventListener("submit", (e) => {
	e.preventDefault()
	if (validateEmail($inputEmail.value)) {
		$form.classList.remove("error")
	} else {
		$form.classList.add("error")
	}
})
