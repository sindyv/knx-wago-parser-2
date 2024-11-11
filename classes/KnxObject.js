class KnxObject {
	constructor(
		knxLineIndex,
		knxIndex,
		roomName,
		componentType,
		componentTypeSuffix,
		signalName,
		makeComAlarm,
		tag,
		varType
	) {
		this.knxLineIndex = knxLineIndex
		this.knxIndex = knxIndex
		this.roomName = roomName
		this.componentType = componentType
		this.componentTypeSuffix = componentTypeSuffix
		this.signalName = signalName
		this.makeComAlarm = makeComAlarm
		this.tag = tag
		this.varType = varType
	}
}

module.exports = KnxObject
