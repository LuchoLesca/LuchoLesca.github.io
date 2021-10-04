const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const $form = document.getElementById("form")

const handleSubmit = (e) => {
	const emailInputNode = [...$form.elements].find(
		(element) => element.tagName === "INPUT" && element.name === "email"
	)
	const emailInputValue = emailInputNode.value.trim("")
	if (emailInputValue === "") {
		$form.dataset.errorMsg = "Oops! Please add your email"
	} else {
		if (!emailRegex.test(emailInputValue)) {
			$form.dataset.errorMsg = "Oops! Please ckeck your email"
		} else {
			$form.dataset.errorMsg = ""
		}
	}
}

$form.addEventListener("submit", (e) => {
	e.preventDefault()
	handleSubmit(e)
})
