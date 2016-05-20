import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.emailTemplates.siteName = 'Dicecloud';
  Meteor.methods({
      verify: function(id) {
          Accounts.sendVerificationEmail(id);
      },
      updateUser: function(id, name, email) {
        Meteor.users.update(
          {_id: id},
          {$set: {
            "profile.name": name,
            "emails": [{
                address: email,
                verified: false
            }]
        }})},

  });
});
