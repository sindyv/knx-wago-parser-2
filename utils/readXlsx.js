const CONFIG = require("../config/config.json")

module.exports = function readXlsx() {
	// hent biblioteker
	const fs = require("fs")
	const reader = require("xlsx")

	// Les fil
	const file = reader.readFile(`./${CONFIG.fileSettings.importFileName}`)

	// Konverter "Gruppeadresser" til JSON
	const groupAddressesJson = reader.utils.sheet_to_json(
		file.Sheets["Gruppeadresser"],
		{
			header: 1,
		}
	)
	// Konverter "Rommatrise" til JSON
	const roomMatrixJson = reader.utils.sheet_to_json(file.Sheets["Rommatrise"], {
		header: 1,
	})

	// Konverter "VAV-liste" til JSON
	const damperMatrixJson = reader.utils.sheet_to_json(
		file.Sheets["VAV-liste"],
		{
			header: 1,
		}
	)

	return { groupAddressesJson, roomMatrixJson, damperMatrixJson }
}
