class Damper {
	constructor(
		roomName,
		lineIndex,
		lineAddress,
		tfmLocation,
		tfmSystem,
		tfmNumber,
		componentType,
		componentTypeSuffix,
		airDirection,
		vMid,
		cav
	) {
		this.roomName = roomName
		this.lineIndex = lineIndex
		this.lineAddress = lineAddress
		this.tfmLocation = tfmLocation
		this.tfmSystem = tfmSystem
		this.tfmNumber = tfmNumber
		this.componentType = componentType
		this.componentTypeSuffix = componentTypeSuffix
		this.airDirection = airDirection
		this.vMid = vMid
		this.cav = cav
	}
}

module.exports = Damper
