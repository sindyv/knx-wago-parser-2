module.exports = [
	{
		type: 1,
		components: [
			{
				type: "RBA",
				suffix: "01",
				bacnetVars: ["D"],
			},
			{
				type: "RTC",
				suffix: "01",
				bacnetVars: [
					"MV",
					"SPV",
					"SPV_Komf",
					"SPV_Stdb",
					"SPV_Natt",
					"SPC",
					"SPC_Komf",
					"SPC_Stdb",
					"SPC_Natt",
					"MOD_FB",
					"KMD_MSV",
					"SP_Tid_Stdb",
				],
			},
			{
				type: "RYA",
				suffix: "601",
				bacnetVars: ["SP", "MV"],
			},
			{
				type: "SBB",
				suffix: "01",
				bacnetVars: ["C"],
			},
			// {
			// 	type: "SQZ",
			// 	suffix: "01",
			// 	bacnetVars: ["CO2_C", "KJL_C"],
			// },
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
					"SPC",
					"SPC_Komf",
					"SPC_Stdb",
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
				type: "SB",
				suffix: "601_K",
				bacnetVars: ["C"],
			},
			{
				type: "SB",
				suffix: "601_V",
				bacnetVars: ["C"],
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
				type: "SB",
				suffix: "601",
				bacnetVars: ["C"],
			},
		],
	},
	{
		type: 5,
		components: [],
	},
]
