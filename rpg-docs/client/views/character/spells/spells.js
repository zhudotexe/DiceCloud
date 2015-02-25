var spellLevels = [
	{ name: "Cantrips", level: 0 },
	{ name: "Level 1",  level: 1 },
	{ name: "Level 2",  level: 2 },
	{ name: "Level 3",  level: 3 },
	{ name: "Level 4",  level: 4 },
	{ name: "Level 5",  level: 5 },
	{ name: "Level 6",  level: 6 },
	{ name: "Level 7",  level: 7 },
	{ name: "Level 8",  level: 8 },
	{ name: "Level 9",  level: 9 },
];

Template.spells.helpers({
	spellLists: function(){
		return SpellLists.find({charId: this._id}, {sort: {color: 1, name: 1}});
	},
	spellCount: function(list, charId){
		if(list.settings.showUnprepared){
			return Spells.find( {charId: charId, listId: list._id, level: this.level}, 
							   {fields: {_id: 1, level: 1}} ).count() > 0;
		} else{
			return Spells.find( {charId: charId, listId: list._id, level: this.level, prepared: {$in: ["prepared", "always"]} }, 
							   {fields: {_id: 1, level: 1}} ).count() > 0;
		}
	},
	spells: function(listId, charId){
		return Spells.find( {charId: charId, listId: listId, level: this.level}, {sort: {color: 1, name: 1}} );
	},
	levels: function(){
		return spellLevels;
	},
	numPrepared: function(){
		return Spells.find({charId: Template.parentData()._id, listId: this._id, prepared: "prepared"}).count();
	},
	order: function(){
		return _.indexOf(_.keys(colorOptions), this.color);
	},
	spellComponents: function(){
		var components = "";
		if(this.components.verbal){
			components += "V"
		}
		if(this.components.somatic){
			components += components? ", S" : "S";
		}
		if(this.components.material){
			components += components? ", M" : "M";
			components += " ("+this.components.material+")";
		}
		if(this.components.concentration){
			components += " - Requires concentration"
		}
		return components;
	},
	isPrepared: function(){
		return this.prepared === "prepared" || this.prepared === "always";
	},
	showSpell: function(listShowPrepped){
		if(listShowPrepped) {
			return true;
		} else {
			return this.prepared === "prepared" || this.prepared === "always";
		}
	},
	cantUnprepare: function(){
		return this.prepared === "always";
	},
	cantCast: function(level, char){
		for(var i = level; i <= 9; i++){
			if (char.attributeValue("level"+i+"SpellSlots") > 0){
				return false;
			}
		}
		return true;
	},
	baseSlots: function(char){
		return char.attributeBase("level" + this.level +"SpellSlots");
	},
	slots: function(char){
		return char.attributeValue("level" + this.level +"SpellSlots");
	},
	showSlots: function(char){
		return this.level && char.attributeBase("level" + this.level +"SpellSlots");
	},
	hasSlots: function(){
		for(var i = 1; i <= 9; i += 1){
			if(this.attributeBase("level"+i+"SpellSlots")){
				return true;
			}
		}
		return false;
	},
	slotBubbles: function(char){
		var baseSlots = char.attributeBase("level" + this.level +"SpellSlots"),
			currentSlots = char.attributeValue("level" + this.level +"SpellSlots"),
			slotsUsed = baseSlots - currentSlots,
			bubbles = [], i;
		for(i = 0; i < currentSlots; i++){
			bubbles.push({
				icon: "radio-button-on", 
				disabled: i !== currentSlots -1, //last full slot not disabled
				attribute: "level" + this.level +"SpellSlots",
				charId: char._id
			});
		}
		for(i = 0; i < slotsUsed; i++){
			bubbles.push({
				icon: "radio-button-off", 
				disabled: i !== 0, //first empty slot not disabled
				attribute: "level" + this.level +"SpellSlots",
				charId: char._id
			});
		}
		return bubbles;
	}
});

Template.spells.events({
	"tap .slotBubble": function(event){
		if(!event.currentTarget.disabled){
			var char = Characters.findOne(this.charId);
			if(event.currentTarget.icon === "radio-button-off"){
				if(char.attributeValue(this.attribute) < char.attributeBase(this.attribute)){
					var modifier = {$inc: {}};
					modifier.$inc[this.attribute + ".adjustment"] = 1;
					Characters.update(this.charId, modifier, {validate: false});
				}
			} else {
				if(char.attributeValue(this.attribute) > 0){
					var modifier = {$inc: {}};
					modifier.$inc[this.attribute + ".adjustment"] = -1;
					Characters.update(this.charId, modifier, {validate: false});
				}
			}
		}
		event.stopPropagation();
	},
	"tap .containerTop": function(event){
		GlobalUI.setDetail({
			template: "spellListDialog",
			data:     {spellListId: this._id, charId: this.charId},
			heroId:   this._id
		});
	},
	"tap .spell": function(event){
		GlobalUI.setDetail({
			template: "spellDialog",
			data:     {spellId: this._id, charId: this.charId},
			heroId:   this._id
		});
	},
	"tap #addSpellList": function(event){
		var charId = this.charId;
		SpellLists.insert({
			name: "New SpellList", 
			charId: this._id,
			saveDC: "8 + intelligenceMod + proficiencyBonus",
			attackBonus: "intelligenceMod + proficiencyBonus"
		}, function(error, id){
			if(!error){
				GlobalUI.setDetail({
					template: "spellListDialog",
					data:     {spellListId: id, charId: charId},
					heroId:   id
				});
			}
		});
	},
	"tap #addSpell": function(event){
		var charId = this.charId;
		var listId = this.listId;
		Spells.insert({
			name: "New Spell", 
			charId: this._id,
			listId: SpellLists.findOne({charId: this._id})._id,
			prepared: "prepared"
		}, function(error, id){
			if(!error){
				GlobalUI.setDetail({
					template: "spellDialog",
					data:     {spellId: id, charId: charId, listId: listId},
					heroId:   id
				});
			}
		});
	},
	"tap .preparedCheckbox": function(event){
		event.stopPropagation();
	},
	"change .preparedCheckbox": function(event){
		var value = event.currentTarget.checked;
		if(this.prepared === "unprepared" && value)
			Spells.update(this._id, {$set: {prepared: "prepared"}});
		else if(this.prepared === "prepared" && !value)
			Spells.update(this._id, {$set: {prepared: "unprepared"}});
	},
	"tap .prepSpells": function(event){
		SpellLists.update(this._id, {$set: {"settings.showUnprepared": true}});
		event.stopPropagation();
	},
	"tap .finishPrep": function(event){
		SpellLists.update(this._id, {$set: {"settings.showUnprepared": false}});
		event.stopPropagation();
	},
});
