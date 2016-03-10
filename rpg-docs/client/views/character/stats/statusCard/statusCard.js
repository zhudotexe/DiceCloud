Template.statusCard.helpers({
  activeBuffs: function() {
    // Get only those buffs which aren't encumberance buffs
    return Buffs.find({
      charId: this._id,
      type: "inate",
      name: {$nin: [
        "Encumbered",
        "Heavily encumbered",
        "Over encumbered",
        "Can't move load",
      ]},
    });
	}
});

Template.statusCard.events({
  "tap #addStatus": function(event){
    GlobalUI.showDialog({
      template: "statusDialog",
      data: {charId: this._id},
    })
  },
  "tap .item": function(event){
    var buffId = this._id;
    var charId = Template.parentData()._id;
    GlobalUI.setDetail({
      template: "buffDialog",
      data:     {buffId: buffId, charId: charId},
      heroId:   buffId,
    });
  },
});