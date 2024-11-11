class Room {
	constructor(roomName, roomType, heatSys, coolSys, ventSys) {
		this.roomName = roomName
		this.roomType = roomType
		this.heatSys = heatSys
		this.coolSys = coolSys
		this.ventSys = ventSys
		this.components = []
		this.knxObjects = []
		this.bacnetObjects = []
	}

	addKnxObject(knxObject) {
		this.knxObjects.push(knxObject)
	}
}

module.exports = Room
