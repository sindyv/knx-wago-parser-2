const fs = require("fs")
class Debug {
	constructor() {
		this.info = ``
		this.warning = ``
		this.critical = ``
	}

	addInfo(description, text) {
		this.info += description + " : " + text + "\n"
	}

	addWarning(description, text) {
		this.warning += description + " : " + text + "\n"
	}

	addCritical(description, text) {
		this.critical += description + " : " + text + "\n"
	}

	createDebugFiles() {
		fs.writeFileSync("./logs/debug_info.txt", "INFO-LOG\n")
		fs.writeFileSync("./logs/debug_warning.txt", "WARNING-LOG\n")
		fs.writeFileSync("./logs/debug_critical.txt", "CRITICAL-LOG\n")
	}

	printDebug() {
		try {
			fs.appendFileSync("./logs/debug_info.txt", this.info)
			fs.appendFileSync("./logs/debug_warning.txt", this.warning)
			fs.appendFileSync("./logs/debug_critical.txt", this.critical)
		} catch (err) {
			console.error(err)
		}
	}
}

module.exports = Debug
