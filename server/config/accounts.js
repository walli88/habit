// ***************************************************************
// ACCOUNTS CONFIGURATION (server-side)
// ***************************************************************

Accounts.onCreateUser(function(options, user) {
  user.profile = {};
//   // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() { //Hacky. Why do we have to wait?
    Accounts.sendVerificationEmail (user._id);
  }, 2 * 1000);

  return user;

});