// ***************************************************************
// COMMON HELPERS (server-side only)
// ***************************************************************

FutureTasks = new Meteor.Collection('future_tasks')

addTask = function ( name, schedule, details ) {

  schedule = typeof schedule !== 'undefined' ? schedule : 'every 10 min';
  SyncedCron.add({
    name: name,
    schedule: function(parser) {
      return parser.text(schedule);
    },
    job: function () {
      sendMail ( details );
    }
  });
}


sendMail = function ( details ) {
  console.log("details.userId: " + details.userId);
  var profileObj = Meteor.users.find({ _id: details.userId /*'CS3MvJX4Goiaqe2wA'*/ }, { fields: {'profile': 1 } } ).fetch()[0].profile;
  console.log("profileobj: " + profileObj);
  profileObj = profileObj.grats;
  var length = profileObj.length;
  var originalLength = length;

  var messageString = "Hi," 
    + "<br><br>"
    + "What are you grateful for this holiday season? As always, reply in-line to this email with your gratitude journal entries."
    + "<br><br>"
    + "Over break, we'll be integrating the following features: 1. Export your entries to excel; 2. Move to permanent serverse instead of temproary ones; and 3. Better web dashboard and working edit/delete buttons."

  while ( length > 0 && length > originalLength - 5 ) {
    var gratObj = profileObj [ length - 1 ];
    var grat = gratObj.grat;
    var date = gratObj.date;

    messageString += "<br><br>On " + date + ", you were grateful for: "
      + "<br><br>" + grat;

    length = length - 1;
  };

  messageString += "<br><br>Update your progress here: http://gratitudejournal.meteor.com";
  
  Email.send({
    from: "The Gratitude Journal <postmaster@sandbox430629e9d36648f893dc50345e9b3c42.mailgun.org>",
    to: details.to,
    subject: "Gratitude Journal: Happy Holidays Edition",
    html: messageString
  });
}

Meteor.methods({
  scheduleMail: function ( details ) {
    FutureTasks.insert ( details );
  }
});