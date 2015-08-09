// ***************************************************************
// ACCOUNTS CONFIGURATION (server-side)
// ***************************************************************

Accounts.onCreateUser(function(options, user) {

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() { //Hacky. Why do we have to wait?
    Accounts.sendVerificationEmail ( user._id );
  
      console.log(savedHabits);
      user.profile = {};
      user.profile['currentHabits'] = savedHabits;

      var str = "Here are the habits that you chose:"
      console.log(user);
      user.profile.currentHabits.forEach ( function (habit) {
      	str = str.concat("<br><br>", habit);
      	str = str.concat("<br><br>", "Were you able to do them today? :)");
      })
      
      Meteor.call('scheduleEmail', {
          from: emails.address,
          to: emails.address,
          subject: "Are you closer to who you want to be?",
          text: str
      })

  }, 2 * 1000);
  return user;
});