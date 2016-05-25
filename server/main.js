import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.emailTemplates.siteName = 'Dicecloud';
  Meteor.methods({
      verify: function() {
          Accounts.sendVerificationEmail(this.userId);
      },
      updateUser: function(name, email) {
        Meteor.users.update(
          {_id: this.userId},
          {$set: {
            "profile.name": name,
            "emails": [{
                address: email,
                verified: false
            }]
        }})},

  });
});
