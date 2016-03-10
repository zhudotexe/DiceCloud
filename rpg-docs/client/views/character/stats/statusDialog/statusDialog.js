Template.statusDialog.events({
	"tap #closeButton": function(event, instance){
	},
	"core-select": function(event){
		var detail = event.originalEvent.detail;
		var condition = detail.item.getAttribute("name");
		if (detail.isSelected) {
			Meteor.call("giveCondition", this.charId, condition);
		} else {
			Meteor.call("removeCondition", this.charId, condition);
		}
	},
});


Template.statusDialog.helpers({
  activeConditions: function() {
    // Get only those enabled buffs which aren't encumberance or exhaustion buffs
    var conditions = Buffs.find({
      charId: this.charId,
      type: "inate",
      name: {$nin: [
        "Encumbered",
        "Heavily encumbered",
        "Over encumbered",
        "Can't move load",
        "Exhaustion - 1",
        "Exhaustion - 2",
        "Exhaustion - 3",
        "Exhaustion - 4",
        "Exhaustion - 5",
        "Exhaustion - 6",
      ]},
    }).fetch();
    conds = [];
    condition_names = Object.keys(CONDITIONS);
		condition_names.sort();
    _.each(conditions, function(co) {
    	_.each(condition_names, function(cname) {
    		if (co.name === CONDITIONS[cname].buff.name) {
    			conds.push(cname)
    		}
    	});
    });
    console.log(conds);
    return conds;
	},
	activeExhaustion: function() {
    // Get only those enabled buffs which are exhaustion buffs
		var exhaustion = Buffs.find({
      charId: this.charId,
      type: "inate",
      name: {$in: [
        "Exhaustion - 1",
        "Exhaustion - 2",
        "Exhaustion - 3",
        "Exhaustion - 4",
        "Exhaustion - 5",
        "Exhaustion - 6",
      ]},
    }).fetch();
    exhaust = [];
    condition_names = Object.keys(CONDITIONS);
		condition_names.sort();
    _.each(exhaustion, function(ex) {
    	_.each(condition_names, function(cname) {
    		if (ex.name === CONDITIONS[cname].buff.name) {
    			exhaust.push(cname)
    		}
    	});      
    });
    console.log(exhaust);
    return exhaust;
	},
	conditions: function(){
		condition_names = Object.keys(CONDITIONS);
		condition_names.sort();
		conds = [];
		_.each(condition_names, function(cond) {
			if (!(cond.indexOf('encumbered') > -1) && !(cond.indexOf('exhaustion') > -1)) {
				conds.push({name:cond, detail:CONDITIONS[cond]});
			}			
		});
		return conds;
	},
	exhaustion: function(){
		condition_names = Object.keys(CONDITIONS);
		condition_names.sort();
		exhaust = [];
		_.each(condition_names, function(cond) {
			if (cond.indexOf('exhaustion') > -1) {
				exhaust.push({name:cond, detail:CONDITIONS[cond]});
			}			
		});
		return exhaust;
	},
});
