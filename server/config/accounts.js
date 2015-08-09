// ***************************************************************
// ACCOUNTS CONFIGURATION (server-side)
// ***************************************************************

Accounts.onCreateUser(function(options, user) {

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail ( user._id );
  }, 2 * 1000);

  return user;
});