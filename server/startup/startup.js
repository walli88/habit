// ***************************************************************
// STARTUP (Will run as soon as the server process is finished starting)
// ***************************************************************


//adds task to SyncedCron
/*
*/




Meteor.startup(function() {

  var markFalseTask = function() {
    UserHabits.update(
        {},
        {$set: {lastYes: false}},
        { multi: true }
      )
  };

  var mailTask = function() {
    FutureTasks.find().forEach ( function ( details ) {
      var messageString = "Hey! Take a little bit of time to think about a few things that made you happy today. Just reply directly in this email, entering each gratitude entry on a new line: "
        + "<br><br>Update your progress here: http://gratitudejournal.meteor.com";

      console.log(messageString);

      Email.send({
        from: "postmaster@sandbox430629e9d36648f893dc50345e9b3c42.mailgun.org",
        to: details.to,
        subject: 'Your daily habit reminders',
        html: messageString
      });
      /*
      var habits_array = UserHabits.find({userId: details.userId}, {fields: {'habit':1, 'count':1}}).fetch()
      var messageString = "Here is your habits progress:"
        + _.map(habits_array, function(s) { return "<br><br>" + s.habit + " : " + s.count + "/7"}).join()
        + "<br><br>Update your progress here: http://habitio.meteor.com/dashboard";

      console.log(messageString)

      Email.send({
        from: "postmaster@sandbox430629e9d36648f893dc50345e9b3c42.mailgun.org",
        to: details.to,
        subject: 'Your daily habit reminders',
        html: messageString
      });
      */
    });
  };

  addTask("mailTask", 'at 7:00 pm', mailTask);
  // addTask("mailTask", 'every 2 minutes', mailTask);


  addTask("markFalseTask", 'at 7:00 pm', markFalseTask)

  process.env.MAIL_URL='smtp://postmaster%40sandbox2f612ffff1bc4c5aa681358f40348891.mailgun.org:4278877873ed0e12f6c1e219083570bb@smtp.mailgun.org:587';

	SyncedCron.start();
});