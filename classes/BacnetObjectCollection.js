// Importer CONFIG
const CONFIG = require("../config/config.json")

// Importer romtyper
const roomTypes = require("../data/roomTypes")
const lightTypes = require("../data/lightTypes")
const damperObjectData = require("../data/damperObjectData")
const bacnetObjectData = require("../data/bacnetObjectData")

// Importer hjelpefunksjoner
const usePlaceholders = require("../utils/usePlaceholders")

// Importer klasser
const BacnetObject = require("./BacnetObject")
const Debug = require("./Debug")

// Importer data
const xmlData = require("../data/xmlData")

// Importer hjelpefunksjoner
const useCreateMappings = require("../utils/useCreateMapping")
const useCreateRetainMappings = require("../utils/useCreateRetainMappings")

class BacnetObjectCollection extends Debug {
	constructor() {
		super()
		this.bacnetObjects = []
		this.objectCount = {
			FbAnalogValue: 0,
			FbAnalogInput: 0,
			FbAnalogOutput: 0,
			FbBinaryValue: 0,
			FbBinaryInput: 0,
			FbBinaryOutput: 0,
			FbMultiStateValue: 0,
		}
	}

	logNumberOfBacnetObjects() {
		this.addInfo("BACnet-objekter opprettet", "")
		this.addInfo("Analog input", this.objectCount.FbAnalogInput)
		this.addInfo("Analog output", this.objectCount.FbAnalogOutput)
		this.addInfo("Analog value", this.objectCount.FbAnalogValue)
		this.addInfo("Binary input", this.objectCount.FbBinaryInput)
		this.addInfo("Binary output", this.objectCount.FbBinaryOutput)
		this.addInfo("Binary value", this.objectCount.FbBinaryValue)
		this.addInfo("MSV value", this.objectCount.FbMultiStateValue)
		let total = 0
		for (const [key, value] of Object.entries(this.objectCount)) {
			total += value
		}

		this.addInfo("Totalt", total)
	}

	createDamperBacnetObjects(damperCollection) {
		let indexes = {
			FbAnalogValue: 2000,
			FbAnalogInput: 2000,
			FbAnalogOutput: 2000,
			FbBinaryValue: 2000,
			FbBinaryInput: 2000,
			FbBinaryOutput: 2000,
			FbMultiStateValue: 2000,
		}

		damperCollection.forEach((damper) => {
			const roomName = damper.roomName || ""
			const componentType = damper.componentType
			const componentTypeSuffix = damper.componentTypeSuffix
			// Sjekk hvilke BACnet tags spjeldtypen skal ha
			damperObjectData.forEach((damperObject) => {
				if (componentType.includes(damperObject.componentType)) {
					damperObject.bacnetVars.forEach((bacnetVar) => {
						const signalType = bacnetVar
						// Finn BACnet objektinformasjon
						let bacnetError = true
						bacnetObjectData.forEach((bacnetObjectData) => {
							if (
								bacnetObjectData.signalType === signalType &&
								componentType.includes(bacnetObjectData.componentType)
							) {
								bacnetError = false
								const bacnetType = bacnetObjectData.type
								const bacnetSize = bacnetObjectData.size
								const mappings = { ...bacnetObjectData.mappings }

								const config = [...bacnetObjectData.config]
								const bacnetPrefix = damper.tfmLocation
								const bacnetSystem = damper.tfmSystem
								const bacnetNumber = damper.tfmNumber
								const bacnetInstanceIndex = indexes[bacnetType]
								let stateTexts = []

								if ("stateTexts" in bacnetObjectData) {
									stateTexts = [...bacnetObjectData.stateTexts]
								}
								const interopMapping = bacnetObjectData.interopMapping
								const bacnetObject = new BacnetObject(
									roomName,
									componentType,
									componentTypeSuffix,
									signalType,
									bacnetType,
									bacnetSize,
									bacnetInstanceIndex,
									mappings,
									config,
									bacnetPrefix,
									bacnetSystem,
									bacnetNumber,
									CONFIG.bacnetSettings.damperBacnetTagStructure,
									stateTexts,
									interopMapping
								)

								bacnetObject.mappings.mapSourceSuffix = usePlaceholders(
									bacnetObject.mappings.mapSourceSuffix,
									damper
								)

								this.bacnetObjects.push(bacnetObject)

								// Øk indeksen
								indexes[bacnetType]++

								// Tell antall BACnet-tags
								this.objectCount[bacnetType]++
							}
						})
						if (bacnetError) {
							this.addWarning(
								`VAV-spjeld +${damper.tfmLocation}=${damper.tfmSystem}.${damper.tfmNumber}-${damper.componentType}${damper.componentTypeSuffix} har ikke korresponderende BACnet tag i bacnetObjectData.js`,
								signalType
							)
						}
					})
				}
			})
		})
	}

	createClimateBacnetObjects(roomCollection, knxCollection) {
		let indexes = {
			FbAnalogValue: 0,
			FbAnalogInput: 0,
			FbAnalogOutput: 0,
			FbBinaryValue: 0,
			FbBinaryInput: 0,
			FbBinaryOutput: 0,
			FbMultiStateValue: 0,
		}
		// Gå igjennom alle rom
		roomCollection.forEach((room) => {
			// Match romtype fra romtypedata
			roomTypes.forEach((roomType) => {
				if (roomType.type === room.roomType) {
					roomType.components.forEach((component) => {
						const roomName = room.roomName
						const componentType = component.type
						const componentTypeSuffix = component.suffix
						component.bacnetVars.forEach((bacnetVar) => {
							const signalType = bacnetVar

							// Finn objektdata
							bacnetObjectData.forEach((bacnetObjectData) => {
								if (
									bacnetObjectData.signalType === signalType &&
									bacnetObjectData.componentType === componentType
								) {
									const mappings = { ...bacnetObjectData.mappings }
									const config = [...bacnetObjectData.config]
									const bacnetType = bacnetObjectData.type
									const bacnetSize = bacnetObjectData.size
									const bacnetInstanceIndex = indexes[bacnetType]
									const bacnetNumber = usePlaceholders(
										CONFIG.bacnetSettings.bacnetNumber,
										room
									)
									let stateTexts = []

									if ("stateTexts" in bacnetObjectData) {
										stateTexts = [...bacnetObjectData.stateTexts]
									}

									const interopMapping = bacnetObjectData.interopMapping

									const bacnetObject = new BacnetObject(
										roomName,
										componentType,
										componentTypeSuffix,
										signalType,
										bacnetType,
										bacnetSize,
										bacnetInstanceIndex,
										mappings,
										config,
										undefined,
										undefined,
										bacnetNumber,
										CONFIG.bacnetSettings.climateBacnetTagStructure,
										stateTexts,
										interopMapping
									)

									bacnetObject.mappings.mapSource = usePlaceholders(
										bacnetObject.mappings.mapSource,
										room
									)
									bacnetObject.mappings.mapSourceSuffix = usePlaceholders(
										bacnetObject.mappings.mapSourceSuffix,
										room
									)

									this.bacnetObjects.push(bacnetObject)

									// Øk indeksen
									indexes[bacnetType]++

									// Tell antall BACnet-tags
									this.objectCount[bacnetType]++
								}
							})
						})
					})
				}
			})
		})

		// Gå igjennom KNX-objekter og se om noen skal ha kommunikasjonsalarm
		knxCollection.forEach((knxObject) => {
			if (knxObject.bacnetAlarmTag) {
				const {
					roomName,
					componentType,
					componentTypeSuffix,
					bacnetAlarmTagName,
				} = knxObject
				bacnetObjectData.forEach((bacnetObjectData) => {
					if (
						bacnetObjectData.componentType === componentType &&
						bacnetObjectData.signalType === bacnetAlarmTagName
					) {
						const signalType = bacnetAlarmTagName
						const mappings = { ...bacnetObjectData.mappings }
						const config = [...bacnetObjectData.config]
						const bacnetType = bacnetObjectData.type
						const bacnetSize = bacnetObjectData.size
						const bacnetInstanceIndex = indexes[bacnetType]
						const bacnetNumber = usePlaceholders(
							CONFIG.bacnetSettings.bacnetNumber,
							knxObject
						)
						let stateTexts = []

						if ("stateTexts" in bacnetObjectData) {
							stateTexts = [...bacnetObjectData.stateTexts]
						}

						const interopMapping = bacnetObjectData.interopMapping

						const bacnetObject = new BacnetObject(
							roomName,
							componentType,
							componentTypeSuffix,
							signalType,
							bacnetType,
							bacnetSize,
							bacnetInstanceIndex,
							mappings,
							config,
							undefined,
							undefined,
							bacnetNumber,
							CONFIG.bacnetSettings.climateBacnetTagStructure,
							stateTexts,
							interopMapping
						)

						bacnetObject.mappings.mapSource = usePlaceholders(
							bacnetObject.mappings.mapSource,
							knxObject
						)
						bacnetObject.mappings.mapSourceSuffix = usePlaceholders(
							bacnetObject.mappings.mapSourceSuffix,
							knxObject
						)

						this.bacnetObjects.push(bacnetObject)

						// Øk indeksen
						indexes[bacnetType]++

						// Tell antall BACnet-tags
						this.objectCount[bacnetType]++
					}
				})
				//
			}
		})
	}

	createLightingBacnetObjects(roomCollection, knxCollection) {
		let indexes = {
			FbAnalogValue: 3000,
			FbAnalogInput: 3000,
			FbAnalogOutput: 3000,
			FbBinaryValue: 3000,
			FbBinaryInput: 3000,
			FbBinaryOutput: 3000,
			FbMultiStateValue: 3000,
		}
		// Gå igjennom alle rom
		roomCollection.forEach((room) => {
			// Match romtype fra romtypedata
			lightTypes.forEach((lightType) => {
				if (lightType.type === room.lightType) {
					lightType.components.forEach((component) => {
						const roomName = room.roomName
						const componentType = component.type
						const componentTypeSuffix = component.suffix
						component.bacnetVars.forEach((bacnetVar) => {
							const signalType = bacnetVar

							// Finn objektdata
							bacnetObjectData.forEach((bacnetObjectData) => {
								if (
									bacnetObjectData.signalType === signalType &&
									bacnetObjectData.componentType === componentType
								) {
									const mappings = { ...bacnetObjectData.mappings }
									const config = [...bacnetObjectData.config]
									const bacnetType = bacnetObjectData.type
									const bacnetSize = bacnetObjectData.size
									const bacnetInstanceIndex = indexes[bacnetType]
									const bacnetNumber = usePlaceholders(
										CONFIG.bacnetSettings.bacnetNumber,
										room
									)
									let stateTexts = []

									if ("stateTexts" in bacnetObjectData) {
										stateTexts = [...bacnetObjectData.stateTexts]
									}

									const interopMapping = bacnetObjectData.interopMapping

									const bacnetObject = new BacnetObject(
										roomName,
										componentType,
										componentTypeSuffix,
										signalType,
										bacnetType,
										bacnetSize,
										bacnetInstanceIndex,
										mappings,
										config,
										undefined,
										undefined,
										bacnetNumber,
										CONFIG.bacnetSettings.climateBacnetTagStructure,
										stateTexts,
										interopMapping
									)

									bacnetObject.mappings.mapSource = usePlaceholders(
										bacnetObject.mappings.mapSource,
										room
									)
									bacnetObject.mappings.mapSourceSuffix = usePlaceholders(
										bacnetObject.mappings.mapSourceSuffix,
										room
									)

									this.bacnetObjects.push(bacnetObject)

									// Øk indeksen
									indexes[bacnetType]++

									// Tell antall BACnet-tags
									this.objectCount[bacnetType]++
								}
							})
						})
					})
				}
			})
		})
	}
	// -------------------DEPRECATED-------------------
	// 	xmlWriteClimateBacnetMappings(writeXml) {
	// 		const pouName = `PRG_ClimateControl_Mapping`
	// 		const pouId = crypto.randomUUID()
	// 		const variables = []
	// 		const pou = []
	// 		let room = ``
	// 		this.bacnetObjects.forEach((bacnetObject) => {
	// 			if (room !== bacnetObject.roomName) {
	// 				room = bacnetObject.roomName
	// 				pou.push(`
	// // Mapping for rom ${room}\n`)
	// 			}
	// 			if (bacnetObject.bacnetSystem === CONFIG.bacnetSettings.bacnetSystem) {
	// 				let mapping = ``

	// 				if (bacnetObject.mappings.incomingValue) {
	// 					mapping = `${usePlaceholders(
	// 						bacnetObject.mappings.mapSource,
	// 						bacnetObject
	// 					)}.${usePlaceholders(
	// 						bacnetObject.mappings.mapSourceSuffix,
	// 						bacnetObject
	// 					)} := ${bacnetObject.bacnetTagName}${
	// 						bacnetObject.mappings.mapTarget
	// 					};\n`
	// 				} else {
	// 					mapping = `${bacnetObject.bacnetTagName}${
	// 						bacnetObject.mappings.mapTarget
	// 					} := ${usePlaceholders(
	// 						bacnetObject.mappings.mapSource,
	// 						bacnetObject
	// 					)}.${usePlaceholders(
	// 						bacnetObject.mappings.mapSourceSuffix,
	// 						bacnetObject
	// 					)};\n`
	// 				}

	// 				pou.push(mapping)
	// 			}
	// 		})

	// 		// Skriv POU-header
	// 		writeXml.appendXmlData(xmlData.pouHeader(pouName))

	// 		// Start VAR-område
	// 		writeXml.appendXmlData(xmlData.pouLocalVars())

	// 		// Slutt av VAR-område, start VAR_OUTPUT-område
	// 		writeXml.appendXmlData(xmlData.pouEndLocalVars())
	// 		writeXml.appendXmlData(xmlData.pouOutputVars())

	// 		// Slutt av VAR_OUTPUT-område og Interface-område
	// 		writeXml.appendXmlData(xmlData.pouEndOutputVars())
	// 		writeXml.appendXmlData(xmlData.pouEndInterface())

	// 		writeXml.appendXmlData(xmlData.pouMiddle())

	// 		// Kode
	// 		pou.forEach((mapping) => {
	// 			writeXml.appendXmlData(mapping)
	// 		})

	// 		// Avlslutt POU
	// 		writeXml.appendXmlData(xmlData.pouEnd(pouId))

	// 		// Registrer POU i mappestruktur
	// 		writeXml.registerPou(pouName, `5 - Climate Control`, pouId)
	// 	}

	xmlWriteReadRetainValues(writeXml) {
		const pouName = `PRG_ReadRetain`
		const pouId = crypto.randomUUID()
		const variables = []
		const pou = []

		// Lag retain handlings
		this.bacnetObjects.forEach((bacnetObject) => {
			if (bacnetObject.mappings.retain) {
				pou.push(useCreateRetainMappings(bacnetObject))
			}
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
		writeXml.registerPou(pouName, `99 - Retain handling`, pouId)
	}

	xmlWriteStateTexts(writeXml) {
		const pouName = `PRG_StateTexts`
		const pouId = crypto.randomUUID()
		const variables = []
		const pou = []

		// Lag retain handlings
		this.bacnetObjects.forEach((bacnetObject) => {
			if (bacnetObject.stateTexts.length > 0) {
				bacnetObject.stateTexts.forEach((stateText, index) => {
					pou.push(
						`${bacnetObject.bacnetTagName}.setStateText(${
							index + 1
						}, '${stateText}');\n`
					)
				})
			}
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
		writeXml.appendXmlData(`
	IF (firstScan) THEN\n`)
		pou.forEach((mapping) => {
			writeXml.appendXmlData(mapping)
		})
		writeXml.appendXmlData(`END_IF`)

		// Avlslutt POU
		writeXml.appendXmlData(xmlData.pouEnd(pouId))

		// Registrer POU i mappestruktur
		writeXml.registerPou(pouName, `1 - Initialization`, pouId)
	}

	xmlWriteDamperBacnetMappings(writeXml, damperObjects) {
		// Finn antall linjer
		const damperLines = []
		damperObjects.forEach((damperObject) => {
			const exists = damperLines.includes(damperObject.lineIndex)

			if (!exists) damperLines.push(damperObject.lineIndex)
		})

		// Lag en PRG pr linje
		damperLines.forEach((damperLine) => {
			const pouName = `PRG_DamperLine_${damperLine}`
			const pouId = crypto.randomUUID()
			const variables = []
			const pou = []

			const actions = [
				{
					actionName: "initialSettings",
					actionContent: ``,
				},
			]

			// Lag default settings action
			// Enable
			damperObjects.forEach((damper) => {
				if (damper.lineIndex === damperLine)
					actions[0].actionContent += `
	GVL_Modbus.modbusDamperInterface[${damper.lineIndex}][${damper.lineAddress}].enable     := TRUE;`
			})

			// Systmenummer
			damperObjects.forEach((damper) => {
				if (damper.lineIndex === damperLine)
					actions[0].actionContent += `
	GVL_Modbus.modbusDamperInterface[${damper.lineIndex}][${damper.lineAddress}].systemNumber     := ${damper.tfmNumber};`
			})

			// Systemprefix
			damperObjects.forEach((damper) => {
				if (damper.lineIndex === damperLine)
					if (damper.tfmLocation) {
						actions[0].actionContent += `
	GVL_Modbus.modbusDamperInterface[${damper.lineIndex}][${damper.lineAddress}].systemPrefix     := '${damper.tfmLocation}';`
					}
			})

			// Luftretning
			damperObjects.forEach((damper) => {
				if (damper.lineIndex === damperLine)
					actions[0].actionContent += `
	GVL_Modbus.modbusDamperInterface[${damper.lineIndex}][${
						damper.lineAddress
					}].airDirection     := ${damper.airDirection ? "1" : "0"};`
			})

			// vMid
			damperObjects.forEach((damper) => {
				if (damper.lineIndex === damperLine)
					if (damper.vMid) {
						actions[0].actionContent += `
	PersistentVars.ModbusDamperSetpoints[${damper.lineIndex}][${damper.lineAddress}].vMidM3h     := ${damper.vMid};`
					}
			})

			// Lag kall for action
			pou.push(`
	if (firstScan) then
	    initialSettings();
	end_if
	`)

			// Map opp navn
			damperObjects.forEach((damper) => {
				if (damper.lineIndex === damperLine)
					pou.push(`
	GVL_Modbus.modbusDamperInterface[${damper.lineIndex}][${damper.lineAddress}].tag     := '${damper.tfmLocation}=${damper.tfmSystem}.${damper.tfmNumber}-${damper.componentType}${damper.componentTypeSuffix}';`)
			})

			// Map opp pådrag
			damperObjects.forEach((damper) => {
				if (damper.lineIndex === damperLine)
					pou.push(`
	GVL_Modbus.modbusDamperInterface[${damper.lineIndex}][${
						damper.lineAddress
					}].damperClimateInterface${damper.cav ? ".setpoint" : ""}     := ${
						damper.cav
							? "100"
							: `GVL_ClimateControl.typClimateControllerInterfaceRoom${damper.roomName}.actuators.damper`
					};`)
			})

			// Gå igjennom spjeldobjekter og finn BACnet-tag som matcher, og print dette
			// 			damperObjects.forEach((damper) => {
			// 				if (damper.lineIndex === damperLine)
			// 					pou.push(`
			// Mapping for spjeld ${damper.tfmLocation}=${damper.tfmSystem}.${damper.tfmNumber}-${damper.componentType}${damper.componentTypeSuffix}\n`)

			// 				if (damper.lineIndex === damperLine) {
			// 					this.bacnetObjects.forEach((bacnetObject) => {
			// 						if (
			// 							bacnetObject.bacnetPrefix === damper.tfmLocation &&
			// 							bacnetObject.bacnetSystem === damper.tfmSystem &&
			// 							bacnetObject.bacnetNumber === damper.tfmNumber &&
			// 							bacnetObject.componentType === damper.componentType &&
			// 							bacnetObject.componentTypeSuffix === damper.componentTypeSuffix
			// 						) {
			// 							const mapping = useCreateMappings(
			// 								bacnetObject,
			// 								bacnetObject.bacnetTagName
			// 							)

			// 							pou.push(mapping)
			// 						}
			// 					})
			// 				}
			// 			})

			// Skriv POU-header
			writeXml.appendXmlData(xmlData.pouHeader(pouName))

			// Start VAR-område
			writeXml.appendXmlData(xmlData.pouLocalVars())

			// Slutt av VAR-område, start VAR_OUTPUT-område
			writeXml.appendXmlData(xmlData.pouEndLocalVars())
			writeXml.appendXmlData(xmlData.pouOutputVars())

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
			pou.forEach((mapping) => {
				writeXml.appendXmlData(mapping)
			})

			// Avlslutt POU
			writeXml.appendXmlData(xmlData.pouEnd(pouId))

			// Registrer POU i mappestruktur
			writeXml.registerPou(pouName, `6 - Ventilation/Dampers`, pouId)
		})
	}

	xmlWriteBacnetGvl(writeXml) {
		const gvlName = `GVL_BACnet`
		const glvId = crypto.randomUUID()
		const variables = []

		// Skriv XML
		writeXml.appendXmlData(xmlData.gvlHeader(gvlName))

		this.bacnetObjects.forEach((bacnetObject) => {
			let initData = ``
			// Sjekk om BACnet-tagget har egen config componentSuffix
			if (bacnetObject.hasOwnProperty("config")) {
				initData = `\n`
				bacnetObject?.config.forEach((config, index) => {
					if (index === bacnetObject.config.length - 1) {
						initData += `               ${config} \n`
					} else {
						initData += `               ${config}, \n`
					}
				})
			}

			// Definer codesys-deklarasjonen
			const type = `${bacnetObject.bacnetType}_${bacnetObject.bacnetSize} (${
				bacnetObject.bacnetInstanceIndex
			}) ${initData !== "" ? `:= (${initData}         )` : ""}`

			// Skriv variabel til XML-filen
			writeXml.appendXmlData(xmlData.gvlVar(bacnetObject.bacnetTagName, type))

			// skriv GVL-footer
		})
		// Avslutt GVL
		writeXml.appendXmlData(xmlData.gvlFooter())

		// Registrer POU i mappestruktur
		writeXml.registerPou(gvlName, `3 - Fieldbus/BACnet`, glvId)
	}

	xmlWriteModbusMapping(writeXml, roomCollection, damperCollection) {
		const pouName = `PRG_Mapping`
		const pouId = crypto.randomUUID()
		const variables = [
			{
				varName: "bacnetModbusClimateInterop",
				varType: `ARRAY[0..${roomCollection.length}] OF bacnetModbusClimateInterop_00_01`,
			},
			{
				varName: "bacnetModbusDamperInterop",
				varType: `ARRAY[1..GVL_Modbus.numberOfModbusDamperLines] OF ARRAY [1..30] OF bacnetModbusDamperInterop_00_01`,
			},
			{
				varName: "i",
				varType: "INT",
			},
		]
		const pou = []

		// Lag modbus mappinger
		pou.push(`i := 0;\n`)

		// =======================================================================
		// Romstyring
		// =======================================================================
		roomCollection.forEach((room) => {
			// Finn bacnet objekter som tilhører rommet
			const roomBacnetObjects = this.bacnetObjects.filter((bacnetObject) => {
				const correctRoom =
					bacnetObject.roomName === room.roomName &&
					bacnetObject.bacnetSystem === CONFIG.bacnetSettings.bacnetSystem

				let existsInList = false
				if (correctRoom) {
					roomTypes.forEach((roomType) => {
						if (roomType.type === room.roomType) {
							roomType.components.forEach((component) => {
								if (component.bacnetVars.includes(bacnetObject.signalType)) {
									existsInList = true
								}
							})
						}
					})
				}

				return correctRoom && existsInList
			})

			// Finn største tekstlengde
			const maxLabelLength = Math.max(
				...roomBacnetObjects.map(
					(bacnetObject) => bacnetObject.interopMapping.length
				)
			)

			pou.push(`
                
// Mappinger for rom ${room.roomName}\n
bacnetModbusClimateInterop[i](\n`)

			roomBacnetObjects.forEach((bacnetObject) => {
				const tabs = "\t".repeat(
					Math.ceil((maxLabelLength - bacnetObject.interopMapping.length) / 4) +
						1
				)
				pou.push(
					`  ${bacnetObject.interopMapping}${tabs}:= ${bacnetObject.bacnetTagName},\n`
				)
			})
			pou.push(
				`  modbusHoldingRegisters		:= ADR(GVL_Modbus.awHoldingRegisters[i * 40]), \n`
			)
			pou.push(`  modbusCoilRegisters			:= ADR(GVL_Modbus.axCoils[i]), \n`)
			pou.push(
				`  typClimateControllerInterface	:= GVL_ClimateControl.typClimateControllerInterfaceRoom${room.roomName}, \n`
			)
			pou.push(
				`  typClimateControllerSettings  := PersistentVars.typClimateControllerSettingsRoom${room.roomName}`
			)
			pou.push(`
);
i := i +1;`)
		})

		// =======================================================================
		// VAV-spjeld
		// =======================================================================
		pou.push(`\ni := 50;\n`)
		damperCollection.forEach((damper) => {
			// Finn BACnet-objekter tilknyttet spjeldet
			const damperBacnetObjects = this.bacnetObjects.filter(
				(bacnetObject) =>
					bacnetObject.roomName === damper.roomName &&
					bacnetObject.bacnetPrefix === damper.tfmLocation &&
					bacnetObject.bacnetNumber === damper.tfmNumber &&
					bacnetObject.componentType === damper.componentType &&
					bacnetObject.componentTypeSuffix === damper.componentTypeSuffix
			)

			// Finn største tekstlengde
			const maxLabelLength = Math.max(
				...damperBacnetObjects.map(
					(bacnetObject) => bacnetObject.interopMapping.length
				)
			)

			pou.push(`
                
// Mappinger for spjeld +${damper.tfmLocation}=${damper.tfmSystem}.${damper.tfmNumber}-${damper.componentType}${damper.componentTypeSuffix}\n
bacnetModbusDamperInterop[${damper.lineIndex}][${damper.lineAddress}](\n`)

			damperBacnetObjects.forEach((bacnetObject) => {
				const tabs = "\t".repeat(
					Math.ceil((maxLabelLength - bacnetObject.interopMapping.length) / 4) +
						1
				)
				pou.push(
					`  ${bacnetObject.interopMapping}${tabs}:= ${bacnetObject.bacnetTagName},\n`
				)
			})

			pou.push(
				`  modbusHoldingRegisters		:= ADR(GVL_Modbus.awHoldingRegisters[i * 30]), \n`
			)
			pou.push(`  modbusCoilRegisters			:= ADR(GVL_Modbus.axCoils[i]), \n`)
			pou.push(
				`  typDamperInterface	    :=  GVL_Modbus.ModbusDamperInterface[${damper.lineIndex}][${damper.lineAddress}], \n`
			)
			pou.push(
				`  typDamperSettings       := PersistentVars.ModbusDamperSetpoints[${damper.lineIndex}][${damper.lineAddress}]`
			)
			pou.push(`
);
i := i +1;`)

			// Kommunikasjonsalarmer
			pou.push(`\n// Kommunikasjonsalarmer\n`)

			this.bacnetObjects.forEach((bacnetObject) => {})
		})

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
		writeXml.registerPou(pouName, `3 - Fieldbus`, pouId)
	}
}

module.exports = BacnetObjectCollection
