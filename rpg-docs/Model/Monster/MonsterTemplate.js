MonsterTemplates = new Mongo.Collection("monsterTemplates");

Schemas.MonsterFeature = new SimpleSchema({
	name:        {type: String, trim: false},
	description: {type: String, optional: true, trim: false},
	uses:        {type: Number, defaultValue: 0},
	used:        {type: Number, defaultValue: 0},
	reset:       {type: String, optional: true, trim: false},
});

Schemas.MonsterAction = new SimpleSchema({
	name:        {type: String, trim: false},
	description: {type: String, optional: true, trim: false},
	uses:        {type: Number, defaultValue: 0},
	used:        {type: Number, defaultValue: 0},
	reset:       {type: String, optional: true, trim: false},
});

Schemas.MonsterLegendaryAction = new SimpleSchema({
	name:         {type: String, trim: false},
	description:  {type: String, optional: true, trim: false},
	cost:         {type: Number, defaultValue: 1},
});

Schemas.MonsterTemplate = new SimpleSchema({
	//strings
	name:        {type: String, optional: true, trim: false},
	description: {type: String, optional: true, trim: false},
	size:        {type: String, optional: true, trim: false},
	type:        {type: String, optional: true, trim: false},
	alignment:   {type: String, optional: true, trim: false},

	//stats
	armor:      {type: Number, optional: true},
	hitPoints:  {type: Number, optional: true},
	speed:      {type: Number, optional: true},
	burrow:     {type: Number, optional: true},
	climb:      {type: Number, optional: true},
	fly:        {type: Number, optional: true},
	swim:       {type: Number, optional: true},
	challenge:  {type: Number, optional: true},
	experience: {type: Number, optional: true},

	//abilityScores
	strength:     {type: Number, optional: true},
	dexterity:    {type: Number, optional: true},
	constitution: {type: Number, optional: true},
	intelligence: {type: Number, optional: true},
	wisdom:       {type: Number, optional: true},
	charisma:     {type: Number, optional: true},

	//saving throws
	strengthSave:     {type: Number, optional: true},
	dexteritySave:    {type: Number, optional: true},
	constitutionSave: {type: Number, optional: true},
	intelligenceSave: {type: Number, optional: true},
	wisdomSave:       {type: Number, optional: true},
	charismaSave:     {type: Number, optional: true},

	//skills
	acrobatics:     {type: Number, optional: true},
	animalHandling: {type: Number, optional: true},
	arcana:         {type: Number, optional: true},
	athletics:      {type: Number, optional: true},
	deception:      {type: Number, optional: true},
	history:        {type: Number, optional: true},
	insight:        {type: Number, optional: true},
	intimidation:   {type: Number, optional: true},
	investigation:  {type: Number, optional: true},
	medicine:       {type: Number, optional: true},
	nature:         {type: Number, optional: true},
	perception:     {type: Number, optional: true},
	performance:    {type: Number, optional: true},
	persuasion:     {type: Number, optional: true},
	religion:       {type: Number, optional: true},
	sleightOfHand:  {type: Number, optional: true},
	stealth:        {type: Number, optional: true},
	survival:       {type: Number, optional: true},

	//damage multipliers
	acidMultiplier:        {type: Number, optional: true},
	bludgeoningMultiplier: {type: Number, optional: true},
	coldMultiplier:        {type: Number, optional: true},
	fireMultiplier:        {type: Number, optional: true},
	forceMultiplier:       {type: Number, optional: true},
	lightningMultiplier:   {type: Number, optional: true},
	necroticMultiplier:    {type: Number, optional: true},
	piercingMultiplier:    {type: Number, optional: true},
	poisonMultiplier:      {type: Number, optional: true},
	psychicMultiplier:     {type: Number, optional: true},
	radiantMultiplier:     {type: Number, optional: true},
	slashingMultiplier:    {type: Number, optional: true},
	thunderMultiplier:     {type: Number, optional: true},

	//senses
	passivePerception: {type: Number, optional: true},
	blindSight: {type: Number, optional: true},
	darkvision: {type: Number, optional: true},
	tremorsense: {type: Number, optional: true},
	truesight: {type: Number, optional: true},

	//arrays
	languages: {type: [String], defaultValue: []},
	features: {type: [Schemas.MonsterFeature], defaultValue: []},
	actions: {type: [Schemas.MonsterAction], defaultValue: []},
	reactions: {type: [Schemas.MonsterAction], defaultValue: []},

	//lair and region
	lairDescription: {type: String, optional: true, trim: false},
	lairActionText: {type: String, optional: true, trim: false},
	lairActions: {type: [Schemas.MonsterAction], defaultValue: []},
	regionalEffectText: {type: String, optional: true, trim: false},
	regionalEffects: {type: [Schemas.MonsterFeature], defaultValue: []},

	//legendary
	legendaryActions: {type: [Schemas.MonsterLegendaryAction], defaultValue: []},
	legendaryACtionUses: {type: Number, optional: true},
});

MonsterTemplates.attachSchema(Schemas.MonsterTemplate);
