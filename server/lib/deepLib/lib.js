// ***************************************************************
// COMMON HELPERS (server-side only)
// ***************************************************************

FutureTasks = new Meteor.Collection('future_tasks')

addTask = function (name, schedule, task) {

  schedule = typeof schedule !== 'undefined' ? schedule : 'every 1 min';
  SyncedCron.add({
    name: name,
    schedule: function(parser) {
      return parser.text(schedule);
    },
    job: task
  });

}

Meteor.methods({
  scheduleMail: function ( details ) {
    FutureTasks.insert(details);
  },

  sendConfirmationEmail: function ( ) {
    
    var text = "Thanks for signing up for The Gratitude Journal! I'm really excited about this and I'll be following up here and there to get some of your feedback. "
    + "Email me at anytime at charlesmzhu@gmail.com with feedback or questions! \n\n"
    + "Your first gratitude entry:\n\n" 
    + Meteor.user().profile.grats[0].grat
    + "\n\nStay tuned for reminder emails from this account.";

    Email.send ({
      to: Meteor.user().emails[0],
      from: "postmaster@sandbox430629e9d36648f893dc50345e9b3c42.mailgun.org",
      subject: "Thanks for signing up for The Gratitude Journal",
      text: text
    })
  }

});