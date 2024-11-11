module.exports = [
	{
		signalType: "SPV",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Arbeidende settpunkt'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_ClimateControl",
			mapSourceSuffix:
				"typClimateControllerInterfaceRoom{{roomName}}.actuators.heating.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SPV_Komf",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt komfort'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"typClimateControllerSettingsRoom{{roomName}}.heating.comfort.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SPV_Stdb",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt Standby'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"typClimateControllerSettingsRoom{{roomName}}.heating.standby.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SPV_Natt",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt Natt'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"typClimateControllerSettingsRoom{{roomName}}.heating.economy.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SPC",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Arbeidende settpunkt kjøling'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_ClimateControl",
			mapSourceSuffix:
				"typClimateControllerInterfaceRoom{{roomName}}.actuators.cooling.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SPC_Komf",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt komfort kjøling'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"typClimateControllerSettingsRoom{{roomName}}.cooling.comfort.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SPC_Stdb",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt Standby kjøling'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"typClimateControllerSettingsRoom{{roomName}}.cooling.standby.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SPC_Natt",
		componentType: "RT",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt Natt kjøling'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"typClimateControllerSettingsRoom{{roomName}}.cooling.economy.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "C",
		componentType: "SB",
		type: "FbAnalogOutput",
		size: "Medium",
		config: [
			"_sDescription := 'Pådrag varmeovn'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PERCENT",
		],
		mappings: {
			incomingValue: false,
			mapSource: "typClimateControllerInterfaceRoom{{roomName}}",
			mapSourceSuffix: "actuators.heating.controlledVariable",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "SP",
		componentType: "RY",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PARTS_PER_MILLION",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"typClimateControllerSettingsRoom{{roomName}}.co2.comfort.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "MV",
		componentType: "RT",
		type: "FbAnalogInput",
		size: "Large",
		config: [
			"_sDescription := 'Målt temperatur'",
			"_rCov_Increment := 0.1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_DEGREES_C",
			"_rHighLimit := 28",
			"_ILimitEnable := ( xLowLimitReporting := FALSE, xHighLimitReporting := TRUE )",
			"_udiNotificationClass := 22",
		],
		mappings: {
			incomingValue: false,
			mapSource: "ClimateControl_{{roomName}}",
			mapSourceSuffix: "climateController.Temp",
			mapTarget: ".rIN",
		},
	},
	{
		signalType: "MOD_FB",
		componentType: "RT",
		type: "FbMultiStateValue",
		size: "Large",
		config: [
			"_sDescription := 'Tilbakemelding driftmodus'",
			"_udiNumberOfStates := 5",
			"_xEventDetectionEnable := FALSE",
			"_udiNotificationClass := 99",
		],
		stateTexts: [
			"Frostbeskyttelse",
			"Økonomi",
			"Standby",
			"Komfort",
			"Nattkjøling",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_ClimateControl",
			mapSourceSuffix:
				"typClimateControllerInterfaceRoom{{roomName}}.currentMode",
			mapTarget: ".udiPresentValue",
		},
	},
	{
		signalType: "KMD_MSV",
		componentType: "RT",
		type: "FbMultiStateValue",
		size: "Large",
		config: [
			"_sDescription := 'Kalender'",
			"_udiNumberOfStates := 10",
			"_xEventDetectionEnable := FALSE",
			"_udiNotificationClass := 99",
		],
		stateTexts: [
			"Kalender 1",
			"Kalender 2",
			"Kalender 3",
			"Kalender 4",
			"Kalender 5",
			"Kalender 6",
			"Kalender 7",
			"Kalender 8",
			"Kalender 9",
			"Kalender 10",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix: "typClimateControllerSettingsRoom{{roomName}}.calendar",
			mapTarget: ".udiPresentValue",
		},
	},
	{
		signalType: "MV",
		componentType: "RY",
		type: "FbAnalogInput",
		size: "Large",
		config: [
			"_sDescription := 'Målt CO2-konsentrasjon'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PARTS_PER_MILLION",
			"_rHighLimit := 1000",
			"_ILimitEnable := ( xLowLimitReporting := FALSE, xHighLimitReporting := TRUE )",
			"_udiNotificationClass := 22",
		],
		mappings: {
			incomingValue: false,
			mapSource: "ClimateControl_{{roomName}}",
			mapSourceSuffix: "climateController.Co2",
			mapTarget: ".rIN",
		},
	},
	{
		signalType: "CO2_C",
		componentType: "SQ",
		type: "FbAnalogOutput",
		size: "Medium",
		config: [
			"_sDescription := 'Pådrag VAV fra luftkvalitetsregulator'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PERCENT",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_ClimateControl",
			mapSourceSuffix:
				"typClimateControllerInterfaceRoom{{roomName}}.actuators.airQuality.controlledVariable",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "KJL_C",
		componentType: "SQ",
		type: "FbAnalogOutput",
		size: "Medium",
		config: [
			"_sDescription := 'Pådrag VAV fra kjøleregulator'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PERCENT",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_ClimateControl",
			mapSourceSuffix:
				"typClimateControllerInterfaceRoom{{roomName}}.actuators.cooling.controlledVariable",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "D",
		componentType: "RB",
		type: "FbBinaryOutput",
		size: "Medium",
		config: [
			"_sDescription := 'Tilstedeværelsesdetektor'",
			"_sActiveText := 'Tilstedeværelse'",
			"_sInactiveText := 'Ingen tilstedeværelse'",
		],
		mappings: {
			incomingValue: false,
			mapSource: "ClimateControl_{{roomName}}",
			mapSourceSuffix: "climateController.Presence",
			mapTarget: ".xPresentValue",
		},
	},
	{
		signalType: "VOL",
		componentType: "SQ",
		type: "FbAnalogInput",
		size: "Medium",
		config: [
			"_sDescription := 'Faktisk luftmengde'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_CUBIC_METERS_PER_HOUR",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].flow",
			mapTarget: ".rIn",
		},
	},
	{
		signalType: "SP",
		componentType: "SQ",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_CUBIC_METERS_PER_HOUR",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].setpointCommandM3h",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "FB",
		componentType: "SQ",
		type: "FbAnalogInput",
		size: "Medium",
		config: [
			"_sDescription := 'Spjeldvinkel'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PERCENT",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].position",
			mapTarget: ".rIn",
		},
	},
	{
		signalType: "C",
		componentType: "SQ",
		type: "FbAnalogOutput",
		size: "Medium",
		config: [
			"_sDescription := 'Pådrag'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PERCENT",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].damperClimateInterface.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "KMD",
		componentType: "SQ",
		type: "FbMultiStateValue",
		size: "Large",
		config: [
			"_sDescription := 'Manuell overstyring'",
			"_udiNumberOfStates := 8",
		],
		stateTexts: [
			"Auto",
			"Åpne",
			"Lukke",
			"Til minste luftmengde",
			"Til midterste luftmengde",
			"Til største luftmengde",
			"Åpne (rask)",
			"Lukke (rask)",
		],
		mappings: {
			incomingValue: true,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].control",
			mapTarget: ".udiPresentValue",
		},
	},
	{
		signalType: "OPT_EKSKL",
		componentType: "SQ",
		type: "FbBinaryValue",
		size: "Medium",
		config: [
			"_sDescription := 'Optimizer'",
			"_sActiveText := 'Utkoblet'",
			"_sInactiveText := 'Innkoblet'",
		],
		mappings: {
			incomingValue: true,
			retain: true,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"ModbusDamperSetpoints[{{lineIndex}}][{{lineAddress}}].excludeFromOptimizer",
			mapTarget: ".xPresentValue",
		},
	},
	{
		signalType: "A1",
		componentType: "SQ",
		type: "FbBinaryInput",
		size: "Medium",
		config: [
			"_sDescription := 'Luftmengde Sjeld'",
			"_sActiveText := 'Feil på luftmengde'",
			"_sInactiveText := 'Ingen feil'",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].deviationFromSetpoint",
			mapTarget: ".xIn",
		},
	},
	{
		signalType: "A2",
		componentType: "SQ",
		type: "FbBinaryInput",
		size: "Medium",
		config: [
			"_sDescription := 'Kommunikasjonovervåking'",
			"_sActiveText := 'Kommunikasjonsfeil'",
			"_sInactiveText := 'Ingen feil'",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].communicationError",
			mapTarget: ".xIn",
		},
	},

	{
		signalType: "VOL",
		componentType: "SK",
		type: "FbAnalogInput",
		size: "Medium",
		config: [
			"_sDescription := 'Faktisk luftmengde'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_CUBIC_METERS_PER_HOUR",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].flow",
			mapTarget: ".rIn",
		},
	},
	{
		signalType: "SP",
		componentType: "SK",
		type: "FbAnalogValue",
		size: "Medium",
		config: [
			"_sDescription := 'Settpunkt'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_CUBIC_METERS_PER_HOUR",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].setpointCommandM3h",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "FB",
		componentType: "SK",
		type: "FbAnalogInput",
		size: "Medium",
		config: [
			"_sDescription := 'Spjeldvinkel'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PERCENT",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].position",
			mapTarget: ".rIn",
		},
	},
	{
		signalType: "C",
		componentType: "SK",
		type: "FbAnalogOutput",
		size: "Medium",
		config: [
			"_sDescription := 'Pådrag'",
			"_rCov_Increment := 1",
			"_eUnits := WagoTypesBacnet.eBACnetUnits.UNIT_PERCENT",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].damperClimateInterface.setpoint",
			mapTarget: ".rPresentValue",
		},
	},
	{
		signalType: "KMD",
		componentType: "SK",
		type: "FbMultiStateValue",
		size: "Large",
		config: [
			"_sDescription := 'Manuell overstyring'",
			"_udiNumberOfStates := 8",
		],
		stateTexts: [
			"Auto",
			"Åpne",
			"Lukke",
			"Til minste luftmengde",
			"Til midterste luftmengde",
			"Til største luftmengde",
			"Åpne (rask)",
			"Lukke (rask)",
		],
		mappings: {
			incomingValue: true,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].control",
			mapTarget: ".udiPresentValue",
		},
	},
	{
		signalType: "OPT_EKSKL",
		componentType: "SK",
		type: "FbBinaryValue",
		size: "Medium",
		config: [
			"_sDescription := 'Optimizer'",
			"_sActiveText := 'Utkoblet'",
			"_sInactiveText := 'Innkoblet'",
		],
		mappings: {
			incomingValue: true,
			retain: false,
			mapSource: "PersistentVars",
			mapSourceSuffix:
				"ModbusDamperSetpoints[{{lineIndex}}][{{lineAddress}}].excludeFromOptimizer",
			mapTarget: ".xPresentValue",
		},
	},
	{
		signalType: "A1",
		componentType: "SK",
		type: "FbBinaryInput",
		size: "Medium",
		config: [
			"_sDescription := 'Luftmengde Sjeld'",
			"_sActiveText := 'Feil på luftmengde'",
			"_sInactiveText := 'Ingen feil'",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].deviationFromSetpoint",
			mapTarget: ".xIn",
		},
	},
	{
		signalType: "A2",
		componentType: "SK",
		type: "FbBinaryInput",
		size: "Medium",
		config: [
			"_sDescription := 'Kommunikasjonovervåking'",
			"_sActiveText := 'Kommunikasjonsfeil'",
			"_sInactiveText := 'Ingen feil'",
		],
		mappings: {
			incomingValue: false,
			mapSource: "GVL_Modbus",
			mapSourceSuffix:
				"ModbusDamperInterface[{{lineIndex}}][{{lineAddress}}].communicationError",
			mapTarget: ".xIn",
		},
	},
]
