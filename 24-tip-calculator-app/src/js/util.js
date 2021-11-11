function formatValue(value) {
	// return value.replace(/^(0+)/g, "").replace("%", "").trim("")
	return value.replace(",", ".").replace("%", "").trim()
}

function print(inputs) {
	const obj = {}
	Object.entries(inputs).forEach((input) => {
		const name = input[0]
		obj[name] = input[1].storedValue
	})
	console.log(JSON.stringify(obj))
}

export { formatValue, print }
