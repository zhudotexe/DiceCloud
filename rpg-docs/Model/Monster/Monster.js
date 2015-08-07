//TODO weaknesses/resistances for monsters
var monsterSubSchema = {
	attribute: function(defaultValue) {
		return new SimpleSchema({
			//the value of the attribute if uneffected
			//Overridden by any "base" effects, regardless of their value
			base: {
				type: Number,
				defaultValue: defaultValue,
			},
			//the temporary shift of the attribute
			//Should be zero when the creature spawns
			adjustment: {
				type: Number,
				defaultValue: 0,
			},
			//the cached value of the attribute before adjustment
			//recalculated when an effect that influences it changes
			value: {
				type: Number,
				defaultValue: defaultValue,
			},
			//track stats that rely on this attribute
			dependents: {
				type: [String],
				defaultValue: [],
			},
		});
	},
	skill: function(ability) {
		return new SimpleSchema({
			//default ability to use when working out the value of this skill
			ability: {
				type: String,
				defaultValue: ability,
			},
			//the value of the attribute if uneffected
			//Overridden by any "base" effects, regardless of their value
			base: {
				type: Number,
				defaultValue: 0,
			},
			//the temporary shift of the skill
			//Should be zero when the creature spawns
			adjustment: {
				type: Number,
				defaultValue: 0,
			},
			//the cached value of the skill
			//recalculated when an effect that influences it changes
			value: {
				type: Number,
				defaultValue: 0,
			},
			//the cached passive value of the skill
			passiveValue: {
				type: Number,
				defaultValue: 10,
			},
			//the cached proficiency of the skill
			proficiency: {
				type: Number,
				decimal: true,
				defaultValue: 0,
			},
			//track stats that rely on this skill
			dependents: {
				type: [String],
				defaultValue: [],
			},
		});
	},
};

//set up the collection for monsters
Monsters = new Mongo.Collection("monsters");

if (Meteor.isServer){
	Schemas.Monster = new SimpleSchema({
		//strings
		name:        {type: String, defaultValue: "", trim: false, optional: true},
		alignment:   {type: String, defaultValue: "", trim: false, optional: true},
		gender:      {type: String, defaultValue: "", trim: false, optional: true},
		race:        {type: String, defaultValue: "", trim: false, optional: true},
		picture:     {type: String, defaultValue: "", trim: true,  optional: true},
		description: {type: String, defaultValue: "", trim: false, optional: true},
		personality: {type: String, defaultValue: "", trim: false, optional: true},
		ideals:      {type: String, defaultValue: "", trim: false, optional: true},
		bonds:       {type: String, defaultValue: "", trim: false, optional: true},
		flaws:       {type: String, defaultValue: "", trim: false, optional: true},
		backstory:   {type: String, defaultValue: "", trim: false, optional: true},

		//monster specific
		type:        {type: String, defaultValue: "", trim: false, optional: true},
		size:        {type: String, defaultValue: "", trim: false, optional: true},
		challenge:   {type: monsterSubSchema.attribute(0)},

		//attributes
		//ability scores
		strength:         {type: monsterSubSchema.attribute(10)},
		dexterity:        {type: monsterSubSchema.attribute(10)},
		constitution:     {type: monsterSubSchema.attribute(10)},
		intelligence:     {type: monsterSubSchema.attribute(10)},
		wisdom:           {type: monsterSubSchema.attribute(10)},
		charisma:         {type: monsterSubSchema.attribute(10)},

		//stats
		hitPoints:        {type: monsterSubSchema.attribute(1)},
		experience:       {type: monsterSubSchema.attribute(0)},
		proficiencyBonus: {type: monsterSubSchema.attribute(2)},
		speed:            {type: monsterSubSchema.attribute(30)},
		burowSpeed:       {type: monsterSubSchema.attribute(0)},
		climbSpeed:       {type: monsterSubSchema.attribute(0)},
		flySpeed:         {type: monsterSubSchema.attribute(0)},
		swimSpeed:        {type: monsterSubSchema.attribute(0)},
		armor:            {type: monsterSubSchema.attribute(10)},

		//resources
		level1SpellSlots: {type: monsterSubSchema.attribute(0)},
		level2SpellSlots: {type: monsterSubSchema.attribute(0)},
		level3SpellSlots: {type: monsterSubSchema.attribute(0)},
		level4SpellSlots: {type: monsterSubSchema.attribute(0)},
		level5SpellSlots: {type: monsterSubSchema.attribute(0)},
		level6SpellSlots: {type: monsterSubSchema.attribute(0)},
		level7SpellSlots: {type: monsterSubSchema.attribute(0)},
		level8SpellSlots: {type: monsterSubSchema.attribute(0)},
		level9SpellSlots: {type: monsterSubSchema.attribute(0)},
		ki:               {type: monsterSubSchema.attribute(0)},
		sorceryPoints:    {type: monsterSubSchema.attribute(0)},
		rages:            {type: monsterSubSchema.attribute(0)},
		superiorityDice:  {type: monsterSubSchema.attribute(0)},
		expertiseDice:    {type: monsterSubSchema.attribute(0)},

		//specific features
		rageDamage:       {type: monsterSubSchema.attribute(0)},

		//hit dice
		d6HitDice:        {type: monsterSubSchema.attribute(0)},
		d8HitDice:        {type: monsterSubSchema.attribute(0)},
		d10HitDice:       {type: monsterSubSchema.attribute(0)},
		d12HitDice:       {type: monsterSubSchema.attribute(0)},

		//senses
		blindsight:       {type: monsterSubSchema.attribute(0)},
		darkvision:       {type: monsterSubSchema.attribute(0)},
		tremorsense:      {type: monsterSubSchema.attribute(0)},
		truesight:        {type: monsterSubSchema.attribute(0)},

		//vulnerabilities
		acidMultiplier:        {type: monsterSubSchema.attribute(1)},
		bludgeoningMultiplier: {type: monsterSubSchema.attribute(1)},
		coldMultiplier:        {type: monsterSubSchema.attribute(1)},
		fireMultiplier:        {type: monsterSubSchema.attribute(1)},
		forceMultiplier:       {type: monsterSubSchema.attribute(1)},
		lightningMultiplier:   {type: monsterSubSchema.attribute(1)},
		necroticMultiplier:    {type: monsterSubSchema.attribute(1)},
		piercingMultiplier:    {type: monsterSubSchema.attribute(1)},
		poisonMultiplier:      {type: monsterSubSchema.attribute(1)},
		psychicMultiplier:     {type: monsterSubSchema.attribute(1)},
		radiantMultiplier:     {type: monsterSubSchema.attribute(1)},
		slashingMultiplier:    {type: monsterSubSchema.attribute(1)},
		thunderMultiplier:     {type: monsterSubSchema.attribute(1)},

		//skills
		//saves
		strengthSave:     {type: monsterSubSchema.skill("strength")},
		dexteritySave:	  {type: monsterSubSchema.skill("dexterity")},
		constitutionSave: {type: monsterSubSchema.skill("constitution")},
		intelligenceSave: {type: monsterSubSchema.skill("intelligence")},
		wisdomSave:       {type: monsterSubSchema.skill("wisdom")},
		charismaSave:     {type: monsterSubSchema.skill("charisma")},
		//skill skills
		acrobatics:       {type: monsterSubSchema.skill("dexterity")},
		animalHandling:   {type: monsterSubSchema.skill("wisdom")},
		arcana:           {type: monsterSubSchema.skill("intelligence")},
		athletics:        {type: monsterSubSchema.skill("strength")},
		deception:        {type: monsterSubSchema.skill("charisma")},
		history:          {type: monsterSubSchema.skill("intelligence")},
		insight:          {type: monsterSubSchema.skill("wisdom")},
		intimidation:     {type: monsterSubSchema.skill("charisma")},
		investigation:	  {type: monsterSubSchema.skill("intelligence")},
		medicine:		  {type: monsterSubSchema.skill("wisdom")},
		nature:			  {type: monsterSubSchema.skill("intelligence")},
		perception:		  {type: monsterSubSchema.skill("wisdom")},
		performance:	  {type: monsterSubSchema.skill("charisma")},
		persuasion:       {type: monsterSubSchema.skill("charisma")},
		religion:         {type: monsterSubSchema.skill("intelligence")},
		sleightOfHand:	  {type: monsterSubSchema.skill("dexterity")},
		stealth:		  {type: monsterSubSchema.skill("dexterity")},
		survival:		  {type: monsterSubSchema.skill("wisdom")},
		//Mechanical Skills
		initiative:       {type: monsterSubSchema.skill("dexterity")},
		dexterityArmor:	  {type: monsterSubSchema.skill("dexterity")},

		//mechanics
		deathSave:        {type: Schemas.DeathSave},

		//permissions and properties
		party:    {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
		owner:    {type: String, regEx: SimpleSchema.RegEx.Id},
		readers:  {type: [String], regEx: SimpleSchema.RegEx.Id, defaultValue: []},
		writers:  {type: [String], regEx: SimpleSchema.RegEx.Id, defaultValue: []},
		template: {type: Boolean, defaultValue: true},
		color:   {
			type: String,
			allowedValues: _.pluck(colorOptions, "key"),
			defaultValue: "q",
		},
		//TODO add per-character settings
		//how many experiences to load at a time in XP table
		"settings.experiencesInc":         {type: Number, defaultValue: 20},
		//slowed down by carrying too much?
		"settings.useVariantEncumbrance":  {type: Boolean, defaultValue: false},
		"settings.useStandardEncumbrance": {type: Boolean, defaultValue: true},
		//hide spellcasting
		"settings.hideSpellcasting":       {type: Boolean, defaultValue: false},
		//show to anyone with link
		"settings.viewPermission": {
			type: String,
			defaultValue: "whitelist",
			allowedValues: ["whitelist", "public"],
		},
	});

	Monsters.attachSchema(Schemas.Monster);
}

Monsters.isOwner = function(userId, monsterId) {
	monsterOwner = Monsters.findOne(monsterId).owner;
	return userId && userId === monsterOwner;
};

Monsters.canEdit = function(userId, monsterId) {
	var monster = Monsters.findOne(
		monsterId,
		{fields: {owner: 1, writers: 1}}
	);
	return (userId && userId === monster.owner) ||
		_.contains(monster.writers, userId);
};

//methods to interact with a monster
Meteor.methods({
	newMonster: function() {
		return Monsters.insert({owner: this.userId});
	},
	removeMonster: function(monsterId) {
		if (Monsters.isOwner(this.userId, monsterId)){
			Monsters.remove(monsterId);
		}
	},
});

//clean up all data related to that monster before removing it
Monsters.after.remove(function(userId, character) {
	Actions       .remove({charId: character._id});
	Attacks       .remove({charId: character._id});
	Buffs         .remove({charId: character._id});
	Classes       .remove({charId: character._id});
	Effects       .remove({charId: character._id});
	Experiences   .remove({charId: character._id});
	Features      .remove({charId: character._id});
	Notes         .remove({charId: character._id});
	Proficiencies .remove({charId: character._id});
	SpellLists    .remove({charId: character._id});
	Items         .remove({charId: character._id});
	Containers    .remove({charId: character._id});
});
