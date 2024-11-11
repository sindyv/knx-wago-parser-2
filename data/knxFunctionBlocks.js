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
		return `
        ${variable.tag}(
            bPortKNX		  := ${knxLineIndex}, 
            dwIndex_DPT		:= ${variable.knxIndex}, 
            typDPT			  := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}],
            xUpdate_KNX		:= PRG_KnxMaster.updateHeat, 
        );

         `
	},
	POS_ACT: (variable, knxLineIndex) => {
		return `
        ${variable.tag}(
            bPortKNX		   := ${knxLineIndex}, 
            dwIndex_DPT		:= ${variable.knxIndex}, 
            typDPT			  := PersistentVars.typDPT[${knxLineIndex}][${variable.knxIndex}],
            xUpdate_KNX		:= PRG_KnxMaster.updateHeat, 
        );

        
        `
	},
}
