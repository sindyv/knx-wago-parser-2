class KnxObject {
	constructor(
		knxLineIndex,
		knxIndex,
		roomName,
		componentType,
		componentTypeSuffix,
		signalName,
		bacnetAlarmTag,
		bacnetAlarmTagName,
		tag,
		varType,
		controlledComponent
	) {
		this.knxLineIndex = knxLineIndex
		this.knxIndex = knxIndex
		this.roomName = roomName
		this.componentType = componentType
		this.componentTypeSuffix = componentTypeSuffix
		this.signalName = signalName
		this.bacnetAlarmTag = bacnetAlarmTag
		this.bacnetAlarmTagName = bacnetAlarmTagName || undefined
		this.tag = tag
		this.varType = varType
		this.controlledComponent = controlledComponent || undefined
	}
}

module.exports = KnxObject
