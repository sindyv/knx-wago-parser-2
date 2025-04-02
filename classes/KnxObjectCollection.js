// Importer config
const CONFIG = require("../config/config.json")

// Importer klasser
const KnxObject = require("./KnxObject")
const Debug = require("./Debug")

// Importer data
const knxObjectData = require("../data/knxObjectData")
const knxFunctionBlocks = require("../data/knxFunctionBlocks")
const xmlData = require("../data/xmlData")

// Class definition
class KnxObjectCollection extends Debug {
	constructor() {
		super()
		this.knxObjects = []
	}

	createKnxObjects(groupAddressJson) {
		const lines = []
		// Finn linjer
		groupAddressJson.forEach((res) => {
			if (res[0].includes(CONFIG.knxSettings.tagIdentifier)) {
				const lineExists = lines.filter((line) => line.number === res[1])

				if (lineExists.length === 0) {
					lines.push({ number: res[1] })
				}
			}
		})

		// Opprett signaler basert på linjer
		if (lines.length > 0) {
			lines.forEach((line, index) => {
				let knxIndex = 1

				// Gå igjennom gruppeadressene og legg til de som tilhører den aktuelle linjen
				groupAddressJson.forEach((res) => {
					if (res[0].includes(CONFIG.knxSettings.tagIdentifier)) {
						if (line.number === res[1]) {
							let dataError = true
							const signalName = res[0].split(" - ")[1]

							// Sjekk at tagget ligger i knxObjectData, altså at det skal lages funksjonsblokk for det i PLS
							knxObjectData.forEach((knxObject) => {
								if (knxObject.signalName === signalName) {
									dataError = false

									// Opprett objektegenskaper
									const lineIndex = index + 1
									const roomName = res[6]?.split(" ")[1]?.replace(".", "_")
									const componentType = res[0]
										.split("-")[1]
										.slice(0, CONFIG.knxSettings.componentTagLength)

									const componentTypeSuffix = res[0]
										.split("-")[1]
										.slice(
											CONFIG.knxSettings.componentTagLength,
											CONFIG.knxSettings.componentTagLength +
												CONFIG.knxSettings.componentTagSuffixLength
										)
										.trim()
									let knxIndexString = ""
									if (knxIndex < 10) {
										knxIndexString = "00" + knxIndex.toString()
									} else if (knxIndex < 100) {
										knxIndexString = "0" + knxIndex.toString()
									} else {
										knxIndexString = knxIndex.toString()
									}
									const tag = `M${lineIndex}_${knxIndexString}_${CONFIG.bacnetSettings.tagRoomPrefix}${roomName}_${componentType}${componentTypeSuffix}_${signalName}`
									const varType = knxObject.signalType
									let bacnetAlarmTag = false
									let bacnetAlarmTagName = undefined

									if ("bacnetAlarmTag" in knxObject) {
										bacnetAlarmTag = knxObject.bacnetAlarmTag
										bacnetAlarmTagName = knxObject.bacnetAlarmTagName
									}

									let controlledComponent = undefined

									// Sjekk om dette er en kontroller komponent, varme eller kjøling
									// Dette er ikke en god løsning og må tenkes ut en bedre
									if (signalName === "CV") {
										if (componentTypeSuffix.at(-1) === "V") {
											controlledComponent = "HEAT"
										} else if (componentTypeSuffix.at(-1) === "K") {
											controlledComponent = "COOL"
										}
									}

									//Opprett nytt objekt
									this.knxObjects.push(
										new KnxObject(
											lineIndex,
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
										)
									)

									knxIndex++
								}
							})

							if (dataError) {
								this.addInfo("Denne GA er ikke definert", res[0])
							}
						}
					}
				})
			})

			this.addInfo("Antall KNX-objekter opprettet", this.knxObjects.length + 1)
		} else {
			this.addInfo("Info:", "Ingen linjer funnet")
		}
	}

	extractKnxLinesFromObjects() {
		// Tell opp antall linjer
		const knxLines = []

		this.knxObjects.forEach((knxObject) => {
			const exists = knxLines.includes(knxObject.knxLineIndex)

			if (!exists) {
				knxLines.push(knxObject.knxLineIndex)
			}
		})

		return knxLines
	}

	xmlWriteKnxPou(writeXml) {
		const knxLines = this.extractKnxLinesFromObjects()

		// Lag en PRG for hver linje
		knxLines.forEach((knxLine) => {
			// Sett opp data
			const pouName = `PRG_KnxLine_${knxLine}`
			const pouId = crypto.randomUUID()
			const variables = []
			const functionBlocks = []

			// Opprett variabler
			this.knxObjects.forEach((knxObject) => {
				if (knxObject.knxLineIndex === knxLine) {
					const variable = {
						varName: knxObject.tag,
						varType: knxObject.varType,
					}
					variables.push(variable)
				}
			})

			// Opprett funksjonskall

			this.knxObjects.forEach((knxObject) => {
				if (knxObject.knxLineIndex === knxLine) {
					if (knxObject.signalName in knxFunctionBlocks) {
						const functionBlock = knxFunctionBlocks[knxObject.signalName](
							knxObject,
							knxLine
						)
						functionBlocks.push(functionBlock)
					} else {
						this.addCritical(
							"In line " +
								knxObject.knxLineIndex +
								"The following KNX signal does not have a corresponding function block defined",
							knxObject.signalName
						)
					}
				}
			})

			// Skriv POU-header
			writeXml.appendXmlData(xmlData.pouHeader(pouName))
			writeXml.appendXmlData(xmlData.pouLocalVars())

			// Legg til variabler
			variables.forEach((variable) => {
				writeXml.appendXmlData(
					xmlData.pouVariable(variable.varName, variable.varType)
				)
			})

			// Slutt av VAR-område, start funksjonsområde
			writeXml.appendXmlData(xmlData.pouEndLocalVars())
			writeXml.appendXmlData(xmlData.pouEndInterface())
			writeXml.appendXmlData(xmlData.pouMiddle())

			// Legg til funksjonskall
			functionBlocks.forEach((functionBlock) => {
				writeXml.appendXmlData(functionBlock)
			})

			// Avslutt POU
			writeXml.appendXmlData(xmlData.pouEnd(pouId))

			// Registrer POU i mappestruktur
			writeXml.registerPou(pouName, `3 - Fieldbus/Knx`, pouId)
		})
	}
}

module.exports = KnxObjectCollection
