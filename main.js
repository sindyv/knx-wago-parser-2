// Importer klasser
const Debug = require("./classes/Debug")
const BacnetObjectCollection = require("./classes/BacnetObjectCollection")
const DamperObjectCollection = require("./classes/DamperObjectCollection")
const KnxObjectCollection = require("./classes/KnxObjectCollection")
const RoomCollection = require("./classes/RoomCollection")
const WriteXml = require("./classes/WriteXml")

// Opprett klasseinstanser
const debug = new Debug()
const knxCollection = new KnxObjectCollection()
const roomCollection = new RoomCollection()
const bacnetCollection = new BacnetObjectCollection()
const damperCollection = new DamperObjectCollection()
const writeXml = new WriteXml()

// Hent hjelpefunksjoner
const fs = require("fs")
const readXlsx = require("./utils/readXlsx")

// Importer data
const xmlData = require("./data/xmlData")

// Hent data fra Excel-ark
const { groupAddressesJson, damperMatrixJson, roomMatrixJson } = readXlsx()

// Strukturer data fra Excel-ark
knxCollection.createKnxObjects(groupAddressesJson) // Opprett KNX objekter
damperCollection.createDamperCollection(damperMatrixJson) // Opprett spjeldobjekter
roomCollection.createRooms(roomMatrixJson) // Opprett rom
roomCollection.addKnxObjectsToRooms(knxCollection) // Legg til KNX-objekter til rommene

// BACnet
bacnetCollection.createClimateBacnetObjects(roomCollection.roomCollection) // Legg til BACnet tags for klimastyring
bacnetCollection.createDamperBacnetObjects(damperCollection.damperCollection) // Legg til BACnet tags for spjeld
//
//
// Kontruer XML-fil
// Header
writeXml.writeHeader()

// Lag ClimateControl
roomCollection.xmlWriteClimatePous(knxCollection.knxObjects, writeXml)
roomCollection.xmlWriteClimatePouCall(writeXml)
// Lag KNX-prg
knxCollection.xmlWriteKnxPou(writeXml)
// BACnet-mappings
bacnetCollection.xmlWriteClimateBacnetMappings(writeXml)
bacnetCollection.xmlWriteDamperBacnetMappings(
	writeXml,
	damperCollection.damperCollection
)
bacnetCollection.xmlWriteReadRetainValues(writeXml)
bacnetCollection.xmlWriteStateTexts(writeXml)

// Parti mellom POU og GVL
writeXml.appendXmlData(xmlData.middle())

// GVL
roomCollection.xmlWriteClimateGvl(writeXml)
bacnetCollection.xmlWriteBacnetGvl(writeXml)
// Avlustt XML-fil
writeXml.appendXmlData(xmlData.footer(writeXml.folderStructure))

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Skriv til JSON-fil (TEMP)
try {
	fs.writeFileSync(
		"./json/knxCollection.json",
		JSON.stringify({ knxObjects: knxCollection.knxObjects })
	)
	fs.writeFileSync(
		"./json/roomCollection.json",
		JSON.stringify({ rooms: roomCollection.roomCollection })
	)
	fs.writeFileSync(
		"./json/bacnetCollection.json",
		JSON.stringify({ bacnetObjects: bacnetCollection.bacnetObjects })
	)
	fs.writeFileSync(
		"./json/damperCollection.json",
		JSON.stringify({ damperObjects: damperCollection.damperCollection })
	)
} catch (err) {
	console.error(err)
}

// Debugging:
debug.createDebugFiles()
bacnetCollection.logNumberOfBacnetObjects()

knxCollection.printDebug()
bacnetCollection.printDebug()
damperCollection.printDebug()
