const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const $form = document.getElementById("form")

$form.addEventListener("submit", (e) => {
	e.preventDefault()
	const emailValue = e.target.elements["email"]?.value.trim().toLowerCase()
	if (regexEmail.test(emailValue)) $form.classList.remove("form--error")
	else $form.classList.add("form--error")
})
