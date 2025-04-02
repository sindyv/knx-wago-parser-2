class Room {
	constructor(roomName, roomType, heatSys, coolSys, ventSys, lightType) {
		this.roomName = roomName
		this.roomType = roomType
		this.heatSys = heatSys
		this.coolSys = coolSys
		this.ventSys = ventSys
		this.lightType = lightType
		this.components = []
		this.knxObjects = []
		this.bacnetObjects = []
	}

	addKnxObject(knxObject) {
		this.knxObjects.push(knxObject)
	}
}

module.exports = Room
