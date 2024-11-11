const knxObjectData = [
	{
		signalName: "TMP_ACT",
		signalType: "FbDPT_Value_Temp_pro",
	},
	{
		signalName: "MOV_ACT",
		signalType: "FbDPT_Switch_pro",
	},
	{ signalName: "CO2_ACT", signalType: "FbDPT_Value_AirQuality_pro" },
	{ signalName: "CV", signalType: "FbDPT_Scaling_pro" },
	{
		signalName: "POS_ACT",
		signalType: "FbDPT_Scaling_pro",
		bacnetAlarmTag: true,
	},
]

module.exports = knxObjectData
