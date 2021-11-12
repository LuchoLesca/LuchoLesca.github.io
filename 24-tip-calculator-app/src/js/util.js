function formatValue(value) {
	return value.replace(",", ".").replace("%", "").trim()
}

export { formatValue }
