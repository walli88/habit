// ***************************************************************
// ACCOUNTS CONFIGURATION (server-side)
// ***************************************************************

Accounts.onCreateUser(function(options, user) {
    user.profile = {};
    //   // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() { //Hacky. Why do we have to wait?
    Accounts.sendVerificationEmail (user._id);
    }, 2 * 1000);

    Meteor.call('scheduleMail', {
        userId: user._id,
        from: user.emails[0].address,
        to: user.emails[0].address,
        subject: "Are you closer to who you want to be?",
    })

  return user;

});