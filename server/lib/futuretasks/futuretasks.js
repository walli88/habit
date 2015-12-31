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
    + "In Canada, today is Boxing Day - a holiday traditionally celebrated the day following Christmas Day, when servants and tradesmen would receive gifts, known as a 'Christmas box', from their masters, employers or customers."
    + "Here in the U.S., we don't do this, but some of us write what we're grateful via an in-line email reply. Cultural differences!"
    + "<br><br>"
    + "An additional note: have you clicked at the link on the bottom? The edit and delete buttons are now fully working on your online dashboard - have at it!";

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

  if (profile.resolution.length != undefined ) {
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
    subject: "Gratitude Journal: Boxing Day Edition",
    html: messageString
  });
}

Meteor.methods({
  scheduleMail: function ( details ) {
    FutureTasks.insert ( details );
  }
});