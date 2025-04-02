const knxObjectData = [
	{
		signalName: "TMP_ACT",
		signalType: "FbDPT_Value_Temp_pro",
		bacnetAlarmTag: true,
		bacnetAlarmTagName: "A1",
	},
	{
		signalName: "ON_OFF",
		signalType: "FbDPT_Switch_pro",
	},
	{
		signalName: "DIM",
		signalType: "FbDPT_Control_Dimming_pro",
	},
	{
		signalName: "MOV_ACT",
		signalType: "FbDPT_Switch_pro",
	},
	{
		signalName: "BTN1",
		signalType: "FbDPT_Switch_pro",
	},
	{
		signalName: "BTN2",
		signalType: "FbDPT_Switch_pro",
	},
	{
		signalName: "BTN3",
		signalType: "FbDPT_Switch_pro",
	},
	{
		signalName: "BTN4",
		signalType: "FbDPT_Switch_pro",
	},
	{ signalName: "CO2_ACT", signalType: "FbDPT_Value_AirQuality_pro" },
	{ signalName: "CV", signalType: "FbDPT_Scaling_pro" },
	{
		signalName: "POS_ACT",
		signalType: "FbDPT_Scaling_pro",
		bacnetAlarmTag: true,
		bacnetAlarmTagName: "A1",
	},
]

module.exports = knxObjectData
