const usePlaceholders = require("./usePlaceholders")

module.exports = (bacnetObject, bacnetTagName) => {
	mapping = ``
	if (bacnetObject.mappings.incomingValue) {
		mapping = `${usePlaceholders(
			bacnetObject.mappings.mapSource,
			bacnetObject
		)}.${usePlaceholders(
			bacnetObject.mappings.mapSourceSuffix,
			bacnetObject
		)} := ${bacnetTagName}${bacnetObject.mappings.mapTarget};\n`
	} else {
		mapping = `${bacnetTagName}${
			bacnetObject.mappings.mapTarget
		} := ${usePlaceholders(
			bacnetObject.mappings.mapSource,
			bacnetObject
		)}.${usePlaceholders(
			bacnetObject.mappings.mapSourceSuffix,
			bacnetObject
		)};\n`
	}
	return mapping
}
