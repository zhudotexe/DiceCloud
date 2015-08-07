function Attribute(base){
	base = base || 0;
	check(base, Number);

	this.base = base;
	this.adjustment = 0;
	this.value = base;
	this.dependents = [];
}

Attribute.pattern = {
	base: Number,
	adjustment: Number,
	value: Number,
	dependents: [String],
};

function Skill(ability){
	check(ability, String);

	this.ability = ability;
	this.proficiency = 0;
	this.value = 0;
	this.passiveValue = 0;
	this.dependents = [];
}

Monsters = new Mongo.Collection("monsters");

Monsters.strings = [
	"name",
	"alignment",
	"gender",
	"race",
	"picture",
	"description",
	"personality",
	"ideals",
	"bonds",
	"flaws",
	"backstory",
	"type",
	"size",
];

Monsters.attributes = {
	strength:          {type: "ability",  default: 10},
	dexterity:         {type: "ability",  default: 10},
	constitution:      {type: "ability",  default: 10},
	intelligence:      {type: "ability",  default: 10},
	wisdom:            {type: "ability",  default: 10},
	charisma:          {type: "ability",  default: 10},

	armor:             {type: "stat",     default: 10},
	challenge:         {type: "stat",     default:  0},
	experience:        {type: "stat",     default:  0},
	hitPoints:         {type: "stat",     default:  1},
	proficiencyBonus:  {type: "stat",     default:  2},

	speed:             {type: "speed",    default: 30},
	burowSpeed:        {type: "speed",    default:  0},
	climbSpeed:        {type: "speed",    default:  0},
	flySpeed:          {type: "speed",    default:  0},
	swimSpeed:         {type: "speed",    default:  0},

	level1SpellSlots:  {type: "resource", default:  0},
	level2SpellSlots:  {type: "resource", default:  0},
	level3SpellSlots:  {type: "resource", default:  0},
	level4SpellSlots:  {type: "resource", default:  0},
	level5SpellSlots:  {type: "resource", default:  0},
	level6SpellSlots:  {type: "resource", default:  0},
	level7SpellSlots:  {type: "resource", default:  0},
	level8SpellSlots:  {type: "resource", default:  0},
	level9SpellSlots:  {type: "resource", default:  0},
	ki:                {type: "resource", default:  0},
	sorceryPoints:     {type: "resource", default:  0},
	rages:             {type: "resource", default:  0},
	superiorityDice:   {type: "resource", default:  0},
	expertiseDice:     {type: "resource", default:  0},

	rageDamage:        {type: "feature",  default:  0},

	blindsight:        {type: "sense",    default:  0},
	darkvision:        {type: "sense",    default:  0},
	tremorsense:       {type: "sense",    default:  0},
	truesight:         {type: "sense",    default:  0},
};

Monsters.skills = {
	strengthSave:      {type: "save",     ability: "strength"},
	dexteritySave:     {type: "save",     ability: "dexterity"},
	constitutionSave:  {type: "save",     ability: "constitution"},
	intelligenceSave:  {type: "save",     ability: "intelligence"},
	wisdomSave:        {type: "save",     ability: "wisdom"},
	charismaSave:      {type: "save",     ability: "charisma"},

	acrobatics:        {type: "skill",    ability: "dexterity"},
	animalHandling:    {type: "skill",    ability: "wisdom"},
	arcana:            {type: "skill",    ability: "intelligence"},
	athletics:         {type: "skill",    ability: "strength"},
	deception:         {type: "skill",    ability: "charisma"},
	history:           {type: "skill",    ability: "intelligence"},
	insight:           {type: "skill",    ability: "wisdom"},
	intimidation:      {type: "skill",    ability: "charisma"},
	investigation:     {type: "skill",    ability: "intelligence"},
	medicine:          {type: "skill",    ability: "wisdom"},
	nature:            {type: "skill",    ability: "intelligence"},
	perception:        {type: "skill",    ability: "wisdom"},
	performance:       {type: "skill",    ability: "charisma"},
	persuasion:        {type: "skill",    ability: "charisma"},
	religion:          {type: "skill",    ability: "intelligence"},
	sleightOfHand:     {type: "skill",    ability: "dexterity"},
	stealth:           {type: "skill",    ability: "dexterity"},
	survival:          {type: "skill",    ability: "wisdom"},

	initiative:        {type: "mechanic", ability: "dexterity"},
};

//functions that can only be called from trusted code
Monsters.insertNew = function(owner) {
	var monster = {name: "New Monster", owner: owner};
	_.each(Monsters.attributes, function(attribute, name) {
		monster[name] = new Attribute(attribute.default);
	});
	Monsters.insert(monster);
};
Monsters.setAttributeBase = function(id, attribute, base) {
	var setter = {};
	setter[attribute + ".base"] = base;
	Monsters.update(id, {$set: setter});
};
Monsters.setAttributeAdjustment = function(id, attribute, adjustment) {
	var setter = {};
	setter[attribute + ".adjustment"] = adjustment;
	Monsters.update(id, {$set: setter});
};
Monsters.recalculateAttribute = function(monsterId, attributeName) {
	var monster = Monsters.findOne(monsterId);
	var attribute = monster && monster[attributeName];
	if (!attribute) throw new Meteor.Error(
		"Attribute not defined",
		"Could not find the attribute to recalculate it"
	);
	//calculate the new value
	var value, base = 0, add = 0, mul = 1;
	var min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY;
	Effects.find(
		{
			charId: monsterId,
			stat: attributeName,
			enabled: true,
			operation: {$in: ["base", "add", "mul", "min", "max"]},
		},
		{fields: {value: 1}}
	).forEach(function(effect) {
		value = effect.value;
		switch (effect.operation){
			case "base": if (value > base) base = value; break;
			case "add": add += value; break;
			case "mul": mul *= value; break;
			case "min": if (value > min) min = value; break;
			case "max": if (value < max) max = value; break;
		}
	});
	base = base || attribute.base;
	var result = (base + add) * mul;
	if (result < min) result = min;
	if (result > max) result = max;

	var setter = {};
	setter[attributeName].value = result;
	Monsters.update(monsterId, {$set: setter});
};

//Loop checking:
// Edges go from effects to effects that depend on their stat
// Follow the edges, but don't visit an effect twice
// if the edited effect gets visited, it causes a dependency loop

//security checks
Monsters.IsOwner = function(monsterId, userId) {
	if(!userId || !monsterId) return false;
	var monster = Monsters.findOne(monsterId);
	return monster && monster.owner === userId;
};

//methods can be called from untrusted code: check inputs, permissions
Meteor.methods({
	"monster.insert": function() {
		if (!this.userId) throw new Meteor.Error(
			"User not defined",
			"You need to be logged in to create a monster."
		);
		var monster = {name: "New Monster", owner: this.userId};
		Monsters.insertNew(monster);
	},
	"monster.setAttributeBase": function(id, attribute, value) {
		value = value || 0;
		check(id, String);
		check(attribute, String);
		check(value, Number);
		Monsters.setAttributeBase(id, attribute, value);
	},
	"monster.setAttributeAdjustment": function(id, attribute, value) {
		value = value || 0;
		check(id, String);
		check(attribute, String);
		check(value, Number);
		Monsters.setAttributeAdjustment(id, attribute, value);
	},
	"monster.recalculateAttribute": function(monsterId, attributeName) {
		check(monsterId, String);
		check(attribute, String);


	}
});
