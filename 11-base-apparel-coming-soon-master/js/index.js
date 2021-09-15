const $input = document.getElementById("input")
const $inputEmail = document.getElementById("input-email")
const $inputBtn = document.getElementById("input-btn")

$inputBtn.addEventListener("click", () => {
	const email = $inputEmail.value.trim("")
	const valid = $inputEmail.validity.valid
	if (valid && email.length > 0) {
		$input.classList.remove("input--invalid")
	} else {
		$input.classList.add("input--invalid")
	}
})
