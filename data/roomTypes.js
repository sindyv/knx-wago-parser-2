module.exports = [
	{
		type: 1,
		components: [
			{
				type: "RT",
				suffix: "601",
				bacnetVars: [
					"SPV",
					"SPV_Komf",
					"SPV_Stdb",
					"SPV_Natt",
					"SPC",
					"SPC_Komf",
					"SPC_Stdb",
					"SPC_Natt",
					"MV",
					"KMD_MSV",
					"MOD_FB",
					"COM_A",
				],
			},
			{
				type: "RB",
				suffix: "601",
				bacnetVars: ["D"],
			},
			{
				type: "SB",
				suffix: "601",
				bacnetVars: ["C"],
			},
			{
				type: "RY",
				suffix: "601",
				bacnetVars: ["SP", "MV"],
			},
			{
				type: "SQ",
				suffix: "601",
				bacnetVars: ["CO2_C", "KJL_C"],
			},
		],
	},
	{
		type: 2,
		components: [
			{
				type: "RT",
				suffix: "601",
				bacnetVars: [
					"SPV",
					"SPV_Komf",
					"SPV_Stdb",
					"SPV_Natt",
					"SPC",
					"SPC_Komf",
					"SPC_Stdb",
					"SPC_Natt",
					"MV",
					"KMD_MSV",
					"MOD_FB",
				],
			},
			{
				type: "RB",
				suffix: "601",
				bacnetVars: ["D"],
			},
			{
				type: "LH",
				suffix: "601",
				bacnetVars: ["C"],
			},
			{
				type: "SQ",
				suffix: "x01",
				bacnetVars: ["KJL_C"],
			},
		],
	},
	{
		type: 3,
		components: [
			{
				type: "RT",
				suffix: "601",
				bacnetVars: ["MV"],
			},
			{
				type: "RB",
				suffix: "601",
				bacnetVars: ["D"],
			},
		],
	},
	{
		type: 4,
		components: [
			{
				type: "RT",
				suffix: "601",
				bacnetVars: ["SPV", "SPV_Komf", "MV"],
			},
			{
				type: "LH",
				suffix: "601",
				bacnetVars: ["C"],
			},
		],
	},
]
