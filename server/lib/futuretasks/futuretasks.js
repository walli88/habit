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
  var profile = Meteor.users.find({ _id: details.userId /*'CS3MvJX4Goiaqe2wA'*/ }, { fields: {'profile': 1 } } ).fetch()[0].profile;
  console.log("profileobj: " + profile);
  profileObj = profile.grats;
  var length = profileObj.length;
  var originalLength = length;


/*
Meteor.users.find({_id: "CS3MvJX4Goiaqe2wA"}, { fields: {'profile': 1 } } ).fetch()[0].profile;

*/

  var messageString = "Hi," 
    + "<br><br>"
    + "I'm happy to say that we've introduced a new feature to the Gratitude Journal - a daily reminder with your New Year's Resolutions included."
    + "<br><br>Just go to your <a href='http://gratitudejournal.mteor.com'>dashboard</a> and add a few new year's resolutions. Your daily reminder email will now include a reminder of your resolutions. Want to dunk a basketball? Consider it done. Want to call your friends and family more often? They won't know what hit them. At the very least, if you abandon your New Year's Resolution after a few days, you'll have the burning black font of what-could-have-been staring at you for the next year or so. Possibly forever."
    + "<br><br>As always, reply to this email with what you're grateful for."

  while ( length > 0 && length > originalLength - 5 ) {
    var gratObj = profileObj [ length - 1 ];
    var grat = gratObj.grat;
    var date = gratObj.date.toString();
    console.log();
    date = date.match(/\w+\s\w+\s\w+\s\w+/)[0];

    messageString += "<br><br>On " + date + ", you were grateful for: "
      + "<br><br>" + grat;

    length = length - 1;
  };

  if (profile.resolution != undefined ) {
    messageString += "<br><br>Don't forget your New Year's Resolutions: <br><br>"

    profileObj = profile.resolution;
    length = profileObj.length;
    originalLength = length;

    while ( length > 0 ) {
      var res = profileObj [ length - 1 ];
      messageString += res + "<br><br>";
      length = length - 1;
    };
  }

  messageString += "<br><br>Update your progress here: http://gratitudejournal.meteor.com";

  Email.send({
    from: "The Gratitude Journal <postmaster@sandbox430629e9d36648f893dc50345e9b3c42.mailgun.org>",
    to: details.to,
    subject: "Your New Year's Resolutions!",
    html: messageString
  });
}

Meteor.methods({
  scheduleMail: function ( details ) {
    FutureTasks.insert ( details );
  }
});