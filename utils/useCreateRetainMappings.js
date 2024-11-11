const usePlaceholders = require("./usePlaceholders")

module.exports = (bacnetObject) => {
	return `
${bacnetObject.bacnetTagName}${
		bacnetObject.mappings.mapTarget
	} := ${usePlaceholders(
		bacnetObject.mappings.mapSource,
		bacnetObject
	)}.${usePlaceholders(
		bacnetObject.mappings.mapSourceSuffix,
		bacnetObject.bacnetObject
	)};`
}
