const Damper = require("./Damper")
const Debug = require("./Debug")
const CONFIG = require("../config/config.json")

class DamperObjectCollection extends Debug {
	constructor() {
		super()
		this.damperCollection = []
	}

	createDamperCollection(damperMatrixJson) {
		damperMatrixJson.forEach((res, index) => {
			// Hopp over første linje
			if (index > 0) {
				const roomName = res[5]
				const lineIndex = res[2]
				const lineAddress = res[3]
				const tfmLocation = res[1] || ""
				const tfmSystem = res[0].split(".")[0].replace("=", "")
				const tfmNumber = res[0].split(".")[1].split("-")[0]
				const componentType = res[0]
					.split("-")[1]
					.slice(0, CONFIG.damperSettings.componentTagLength)

				const componentTypeSuffix = res[0]
					.split(componentType)[1]
					.slice(1, 7)
					.replace("-", "_")
				const airDirection =
					res[0].search(
						new RegExp(CONFIG.damperSettings.damperSupplySearchString, "i")
					) === -1
				const vMid = res[7]
				const cav = res[6] !== undefined

				const damper = new Damper(
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
				)

				this.damperCollection.push(damper)
			}
		})
	}
}

module.exports = DamperObjectCollection
