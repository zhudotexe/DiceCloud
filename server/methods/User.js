export const updateUser = new ValidatedMethod({
    name: 'updateUser',
    validate: new SimpleSchema({
        name: {
            type: String,
            regEx: /[^\s]+/
        },
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validator(),
    run({ name, email }) {
        Meteor.users.update(
            {_id: this.userId},
            {$set: {
                'profile.name': name,
                'emails': [{
                    address: email,
                    verified: false
                }]
            }}
        )
    }
});

