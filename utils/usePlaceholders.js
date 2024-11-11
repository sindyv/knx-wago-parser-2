// Importer config
const CONFIG = require("../config/config.json")

module.exports = (placeholder, data) => {
	return placeholder.replace(/{{(.*?)}}/g, (match, p1) => {
		// Trim the property name to avoid issues with extra spaces
		const propName = p1.trim()

		// Sjekk om placeholderen skal hentes fra config
		if (propName.split(".")[0] === "CONFIG") {
			function getNestedProperty(obj, path) {
				return path
					.split(".")
					.reduce(
						(acc, key) =>
							acc && acc[key] !== undefined ? acc[key] : undefined,
						obj
					)
			}

			return getNestedProperty({ ...CONFIG }, propName.replace("CONFIG.", ""))
		}
		// Return the value from the data object or the original match if not found

		return propName in data ? data[propName] : match
	})
}
