import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateUser = new ValidatedMethod({
    name: 'updateUser',
    validate: new SimpleSchema({
        name: {
            type: String,
            regEx: /[^\s]*/
        },
        address: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validator(),
    run({ name, address }) {
        const user = Meteor.users.findOne({_id: Meteor.userId()});
        const alreadyVerified = user.emails && user.emails.some(email => {
            return email.address === address & email.verified;
        });
        Meteor.users.update(
            {_id: Meteor.userId()},
            {$set: {
                'profile.name': name,
                'emails': [{
                    address: address,
                    verified: alreadyVerified
                }]
            }}
        );
    }
});
