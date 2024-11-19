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
				type: "SBV",
				suffix: "601",
				bacnetVars: ["C"],
			},
			{
				type: "SBC",
				suffix: "601",
				bacnetVars: ["C"],
			},
			{
				type: "RY",
				suffix: "601",
				bacnetVars: ["SP", "MV"],
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
