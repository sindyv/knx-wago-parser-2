module.exports = {
	TMP_ACT: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex},
            dwIndex_DPT   := ${variable.knxIndex},
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}],
            xUpdate_PLC   => ,
            xTimeOut      => 
        );

        `
	},
	MOV_ACT: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
	CO2_ACT: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex},
            dwIndex_DPT   := ${variable.knxIndex},
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}],
            xUpdate_PLC   => ,
            xTimeOut      => 
        );

        `
	},
	CV: (variable, knxLineIndex) => {
		// Sjekk om dette er en kontroller komponent, varme eller kjøling
		// Dette er ikke en god løsning og må tenkes ut en bedre
		let controlledComponent = ""
		if (variable.controlledComponent === "HEAT") {
			controlledComponent = "heating"
		} else if (variable.controlledComponent === "COOL") {
			controlledComponent = "cooling"
		}
		return `
        ${variable.tag}(
            bPortKNX		  := ${knxLineIndex}, 
            dwIndex_DPT		:= ${variable.knxIndex}, 
            typDPT			  := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}],
            xUpdate_KNX		:= PRG_KnxMaster.updateHeat, 
        );

        ${variable.tag}.rValue_IN := GVL_ClimateControl.typClimateControllerInterfaceRoom${variable.roomName}.actuators.heating.controlledVariable;        
         `
	},
	POS_ACT: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX		   := ${knxLineIndex}, 
            dwIndex_DPT		:= ${variable.knxIndex}, 
            typDPT			  := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}], 
        );

        `
	},
	ON_OFF: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
	ON_OFF: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
	BTN1: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
	BTN2: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
	BTN3: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
	BTN4: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
	DIM: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX      := ${knxLineIndex}, 
            dwIndex_DPT   := ${variable.knxIndex}, 
            typDPT        := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}]
        );

        `
	},
}
