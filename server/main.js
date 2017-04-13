import '../imports/server/methods/User.js';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Accounts.emailTemplates.siteName = 'Dicecloud';
    Meteor.methods({
        verify: () => Accounts.sendVerificationEmail(Meteor.userId()),
    });
});
