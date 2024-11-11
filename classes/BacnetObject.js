const CONFIG = require("../config/config.json")
const usePlaceholders = require("../utils/usePlaceholders")
class BacnetObject {
	constructor(
		roomName,
		componentType,
		componentTypeSuffix,
		signalType,
		bacnetType,
		bacnetSize,
		bacnetInstanceIndex,
		mappings,
		config,
		bacnetPrefix = CONFIG.bacnetSettings.bacnetPrefix,
		bacnetSystem = CONFIG.bacnetSettings.bacnetSystem,
		bacnetNumber = CONFIG.bacnetSettings.bacnetNumber,
		bacnetTagStructure,
		stateTexts
	) {
		this.bacnetPrefix = bacnetPrefix
		this.bacnetSystem = bacnetSystem
		this.bacnetNumber = bacnetNumber
		this.roomName = roomName
		this.componentType = componentType
		this.componentTypeSuffix = componentTypeSuffix
		this.signalType = signalType
		this.bacnetType = bacnetType
		this.bacnetSize = bacnetSize
		this.bacnetInstanceIndex = bacnetInstanceIndex
		this.mappings = mappings
		this.config = config
		this.bacnetTagName = usePlaceholders(bacnetTagStructure, this)
		this.stateTexts = stateTexts
	}
}

module.exports = BacnetObject
