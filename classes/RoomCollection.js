// Importer romtyper
const roomTypes = require("../data/roomTypes")

// Importer klasser
const Debug = require("./Debug")
const Room = require("./Room")
const WriteXml = require("./WriteXml")

// Importer data
const xmlData = require("../data/xmlData")

class RoomCollection extends Debug {
	constructor() {
		super()
		this.roomCollection = []
	}

	writeXml = new WriteXml()

	createRooms(roomMatrixJson) {
		roomMatrixJson.forEach((res, index) => {
			// Hopp over første linje
			if (index > 0) {
				if (res[0]) {
					// Opprett romobjekt
					const roomName = res[0].toString()
					const roomType = res[1]
					const heatSys = res[2].toString()
					const coolSys = res[3].toString()
					const ventSys = res[4].toString()

					const room = new Room(roomName, roomType, heatSys, coolSys, ventSys)

					// room.addComponents(roomTypes)

					// Opprett rom
					this.roomCollection.push(room)
				}
			}
		})
	}

	addKnxObjectsToRooms(knxObjectCollection) {
		this.roomCollection.forEach((room) => {
			// Filtrer ut KNX-objektene som er tilknyttet dette rommet
			let noObjectFound = true
			knxObjectCollection.knxObjects.forEach((knxObject) => {
				if (knxObject.roomName === room.roomName) {
					noObjectFound = false
					room.addKnxObject(knxObject)
				}
			})

			if (noObjectFound)
				this.addWarning(
					"Følgende rom har ingen gruppeadresser tilknyttet",
					room.roomName
				)
		})
	}

	xmlWriteClimatePous(knxVariables, writeXml) {
		this.roomCollection.forEach((room) => {
			// Sett opp data
			const pouName = `ClimateControl_${room.roomName}`
			const pouId = crypto.randomUUID()
			const variables = []
			variables.push({
				varName: "climateController",
				varType: "FbMultiModeClimateControl_00_02",
			})
			variables.push({
				varName: "defaultSetpoints",
				varType: "typMultiModeClimateControllerDefaultSettings_00_01",
			})
			variables.push({
				varName: "dwConfigurationMask",
				varType: "DWORD := 2#0000_0000_0000_0000_0000_0001_0000_0010",
			})

			const outputVariables = []
			outputVariables.push({
				varName: "actualSetpointHeating",
				varType: "REAL",
				comment: "Variabler kun for overvåking",
			})
			outputVariables.push({
				varName: "actualSetpointCooling",
				varType: "REAL",
			})
			outputVariables.push({ varName: "actualSetpointCo2", varType: "REAL" })
			outputVariables.push({ varName: "meanTemp", varType: "REAL" })
			outputVariables.push({ varName: "meanCo2", varType: "REAL" })
			outputVariables.push({ varName: "presence", varType: "BOOL" })
			outputVariables.push({ varName: "gainHeating", varType: "REAL" })
			outputVariables.push({ varName: "gainCooling", varType: "REAL" })
			outputVariables.push({ varName: "gainAirQuality", varType: "REAL" })
			outputVariables.push({ varName: "damperOutput", varType: "REAL" })
			outputVariables.push({
				varName: "currentWorkingMode",
				varType: "enumMultiModeClimateActiveControlMode_00_01",
			})

			// Sett opp Actions

			const actions = [
				{
					actionName: "settings",
					actionContent: `
defaultSetpoints.heating.comfort.setpoint	:= 21;
defaultSetpoints.heating.standby.setpoint	:= 2;
defaultSetpoints.heating.economy.setpoint	:= 3;
defaultSetpoints.cooling.comfort.setpoint	:= 2;
defaultSetpoints.cooling.standby.setpoint	:= 3;
defaultSetpoints.cooling.economy.setpoint	:= 4;
defaultSetpoints.co2.comfort.setpoint		:= 600;
defaultSetpoints.presenceDelayOff			:= 30;
defaultSetpoints.heating.pidSettings.KP		:= 1;
defaultSetpoints.heating.pidSettings.TN		:= 60;
defaultSetpoints.cooling.pidSettings.KP		:= 1;
defaultSetpoints.cooling.pidSettings.TN		:= 60;
defaultSetpoints.co2.pidSettings.KP			:= 20;
defaultSetpoints.co2.pidSettings.TN			:= 4000;`,
				},
			]

			// Sett opp POU
			let pouStart = `
// Innstillinger for rom:
IF (firstScan) THEN
    PersistentVars.typClimateControllerSettingsRoom${room.roomName}.ahuSystem		:= 00${room.ventSys};
    PersistentVars.typClimateControllerSettingsRoom${room.roomName}.heatingSystem	:= 00${room.heatSys};
    PersistentVars.typClimateControllerSettingsRoom${room.roomName}.coolingSystem	:= 00${room.coolSys};
    defaultSetpoints 							:= PersistentVars.typClimateControlDefaultSettings;
    
// Hvis du ønsker egne innstillinger for rommet, kjør settings
    // settings();
END_IF

// Tilbakestill settpunkt (global kommando)
IF (GVL.initDefaultSettings) THEN
    climateController.setDefaultSetpoints();
END_IF

// Kjør funksjonsblokk
climateController(
    typController			:= typClimateControllerInterfaceRoom${room.roomName}, 
    typSettings				:= PersistentVars.typClimateControllerSettingsRoom${room.roomName}, 
    typDefaultSetpoints		:= defaultSetpoints,
    dwConfigurationMask		:= dwConfigurationMask            
);
        `
			// Skriv XML

			// Skriv POU-header
			writeXml.appendXmlData(xmlData.pouHeader(pouName))

			// Start VAR-område
			writeXml.appendXmlData(xmlData.pouLocalVars())

			// Legg til variabler
			variables.forEach((variable) => {
				writeXml.appendXmlData(
					xmlData.pouVariable(variable.varName, variable.varType)
				)
			})
			// Slutt av VAR-område, start VAR_OUTPUT-område
			writeXml.appendXmlData(xmlData.pouEndLocalVars())
			writeXml.appendXmlData(xmlData.pouOutputVars())

			// Variabler
			outputVariables.forEach((variable) => {
				writeXml.appendXmlData(
					xmlData.pouVariable(
						variable.varName,
						variable.varType,
						variable.comment
					)
				)
			})
			// Slutt av VAR_OUTPUT-område og Interface-område
			writeXml.appendXmlData(xmlData.pouEndOutputVars())
			writeXml.appendXmlData(xmlData.pouEndInterface())

			// Start ACTIONS
			writeXml.appendXmlData(xmlData.pouActions())

			actions.forEach((action) => {
				writeXml.appendXmlData(
					xmlData.pouAction(
						action.actionName,
						action.actionContent,
						crypto.randomUUID()
					)
				)
			})

			// Slutt ACTIONS, start POU
			writeXml.appendXmlData(xmlData.pouEndActions())
			writeXml.appendXmlData(xmlData.pouMiddle())

			// Kode
			writeXml.appendXmlData(pouStart)

			mapSensors(
				"Registrer temperaturer",
				knxVariables,
				room,
				"TMP_ACT",
				"Temp",
				"rValue_OUT"
			)

			mapSensors(
				"Registrer CO2",
				knxVariables,
				room,
				"CO2_ACT",
				"CO2",
				"rValue_OUT"
			)

			mapSensors(
				"Registrer tilstedeværelse",
				knxVariables,
				room,
				"MOV_ACT",
				"Presence",
				"xSwitch_OUT"
			)

			writeXml.appendXmlData(xmlData.pouEnd(pouId))

			writeXml.registerPou(pouName, `5 - Climate Control/Rooms`, pouId)

			// Hjelpefunksjoner:
			function mapSensors(
				comment,
				knxVariables,
				room,
				knxSignalType,
				funcionSignalType,
				knxOutputType
			) {
				const signalArray = []

				// Skriv kommentar
				writeXml.appendXmlData(`
// ${comment}`)

				const match = knxVariables.filter(
					(signal) =>
						signal.roomName === room.roomName &&
						signal.signalName === knxSignalType
				)
				signalArray.push(...match)

				signalArray.forEach((signal) => {
					writeXml.appendXmlData(
						`
climateController.${funcionSignalType}          := PRG_KnxLine_${signal.knxLineIndex}.${signal.tag}.${knxOutputType};`
					)
				})
				writeXml.appendXmlData(`\n`)
			}
		})
	}

	xmlWriteClimatePouCall(writeXml) {
		const pouName = `PRG_ClimateControl`
		const pouId = crypto.randomUUID()
		const variables = []
		const pou = []

		this.roomCollection.forEach((room) => {
			pou.push(`ClimateControl_${room.roomName}();\n`)
		})

		// Skriv POU-header
		writeXml.appendXmlData(xmlData.pouHeader(pouName))

		// Start VAR-område
		writeXml.appendXmlData(xmlData.pouLocalVars())

		// Slutt av VAR-område,
		writeXml.appendXmlData(xmlData.pouEndLocalVars())
		writeXml.appendXmlData(xmlData.pouEndInterface())

		writeXml.appendXmlData(xmlData.pouMiddle())

		// Kode
		pou.forEach((mapping) => {
			writeXml.appendXmlData(mapping)
		})

		// Avlslutt POU
		writeXml.appendXmlData(xmlData.pouEnd(pouId))

		// Registrer POU i mappestruktur
		writeXml.registerPou(pouName, `5 - Climate Control`, pouId)
	}

	xmlWriteClimateGvl(writeXml) {
		const gvlName = `GVL_ClimateControl`
		const glvId = crypto.randomUUID()
		const variables = []

		// Skriv XML
		// Start GVL-fil
		writeXml.appendXmlData(xmlData.gvlHeader(gvlName))

		// Skriv variabel til XML-filen
		this.roomCollection.forEach((room) => {
			writeXml.appendXmlData(
				xmlData.gvlVar(
					`typClimateControllerInterfaceRoom${room.roomName}`,
					"typMultiModeClimateControl_00_01"
				)
			)
		})
		writeXml.appendXmlData(
			xmlData.gvlVar(`SLETT_MEG`, "BOOL", "Kopier til PersistentVars!")
		)
		this.roomCollection.forEach((room) => {
			writeXml.appendXmlData(
				xmlData.gvlVar(
					`typClimateControllerSettingsRoom${room.roomName}`,
					"typMultiModeClimateControlSettings_00_01",
					"Kopier til PersistentVars!"
				)
			)
		})

		// Avslutt GVL
		writeXml.appendXmlData(xmlData.gvlFooter())
	}
}

module.exports = RoomCollection
