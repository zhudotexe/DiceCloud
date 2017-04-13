import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/server/methods/User.js';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.emailTemplates.siteName = 'Dicecloud';
    Meteor.methods({
        verify: () => Accounts.sendVerificationEmail(Meteor.userId()),
    });
});
