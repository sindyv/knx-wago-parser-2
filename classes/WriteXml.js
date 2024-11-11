// Importer config-fil
const CONFIG = require("../config/config.json")

// Importer utility-klasser
const Debug = require("./Debug")

// Importer biblioteker
const fs = require("fs")

// Importer data
const xmlData = require("../data/xmlData")

class WriteXml extends Debug {
	constructor() {
		super()
	}

	exportFilePath = `./export/${CONFIG.fileSettings.exportFileName}`
	folderStructure = []

	writeHeader() {
		try {
			fs.writeFileSync(this.exportFilePath, xmlData.header())
		} catch (error) {
			console.log(error)
		}
	}

	appendXmlData(data) {
		try {
			fs.appendFileSync(this.exportFilePath, data)
		} catch (error) {
			console.log(error)
		}
	}

	registerPou(pouName, path, id) {
		const folderPath = path.split("/") // Split the folder path into an array

		// Helper function to recursively traverse and insert
		function insertRecursively(folders, pathArray) {
			const currentFolderName = pathArray[0]

			// Look for the current folder in the folders array
			let currentFolder = folders.find(
				(folder) => folder.folderName === currentFolderName
			)

			// If the folder does not exist, create it
			if (!currentFolder) {
				currentFolder = {
					folderName: currentFolderName,
					pous: [],
					children: [],
				}
				folders.push(currentFolder)
			}

			// If there are more parts of the path to process
			if (pathArray.length > 1) {
				// Recursively call the function for the next part of the path
				insertRecursively(currentFolder.children, pathArray.slice(1))
			} else {
				// If this is the last part of the path, insert the pouObject
				currentFolder.pous.push({
					id: id,
					pouName: pouName,
				})
			}
		}

		// Start the recursive insertion
		insertRecursively(this.folderStructure, folderPath)
	}
}

module.exports = WriteXml
