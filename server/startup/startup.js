// ***************************************************************
// STARTUP (Will run as soon as the server process is finished starting)
// ***************************************************************


//adds task to SyncedCron
/*
*/

addTask = function (id, details) {

  SyncedCron.add({
    name: id,
    schedule: function(parser) {
      return parser.text('every 1 min');
    },
    job: function() {
      sendMail(details);
          return id;
    }
  });

}

function sendMail ( details ) {
  Email.send({
    from: details.from,
      to: details.to,
      subject: 'are you closer to who you want to become?',
      text: details.text
  });

}

Meteor.startup(function() {

	FutureTasks.find().forEach(function(mail) {
		var d = new Date ();
		addTask(mail._id, mail);
	});

	SyncedCron.start();

});