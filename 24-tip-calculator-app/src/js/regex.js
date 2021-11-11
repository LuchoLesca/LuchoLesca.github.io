const regexs = {
	// float: /^[0-9]*\.?[0-9]*$/,
	float: /^\d+(\.\d{0,2})?$/,
	floatTwoDecimal: /^\d+(\.\d{0,2})?$/,
	number: /^\+?(0|[1-9]\d*)$/,
}

export default regexs
