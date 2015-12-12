// ***************************************************************
// STARTUP (Will run as soon as the server process is finished starting)
// ***************************************************************


/* Tasks
  1. Go for broad customizability for reminder emails
  2. Integrate SMS txt (play with Twilio API)
  3. OnLoad page
*/

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
    console.log(FutureTasks.find().fetch());
    FutureTasks.find().forEach ( function ( details ) {
      console.log("details.userId: " + details.userId);
      var profileObj = Meteor.users.find({ _id: details.userId /*'CS3MvJX4Goiaqe2wA'*/ }, { fields: {'profile': 1 } } ).fetch()[0].profile;
      console.log("profileobj: " + profileObj);
      profileObj = profileObj.grats;
      var length = profileObj.length;

      if ( length > 0 ) {
        var gratObj0 = profileObj [ length - 1 ];
        var grat0 = gratObj0.grat;
        var date0 = gratObj0.date;
        messageString = "Hi," 
          + "<br><br>"
          + "GOOD LUCK WITH FINAL EXAMS EVERYONE! You are going to crush it. As always, reply with something that you're grateful for. Your entries will be encrypted."
          + "<br><br>On " + date0 + ", you were grateful for: "
          + "<br><br>" + grat0;

        if ( length > 1 ) {
          var gratObj1 = profileObj [ length - 2 ];
          var grat1 = gratObj1.grat;
          var date1 = gratObj1.date;

          messageString = messageString
          + "<br><br>On " + date1 + ", you were grateful for: "
          + "<br><br>" + grat1;

          if ( length > 2 ) {
            var gratObj2 = profileObj [ length - 3 ];
            var grat2 = gratObj2.grat;
            var date2 = gratObj2.date;

            messageString = messageString
            + "<br><br>On " + date2 + ", you were grateful for: "
            + "<br><br>" + grat2;
          }

        }
      }

      messageString = messageString
        + "<br><br>Update your progress here: http://gratitudejournal.meteor.com";

      Email.send({
        from: "The Gratitude Journal <postmaster@sandbox430629e9d36648f893dc50345e9b3c42.mailgun.org>",
        to: details.to,
        subject: 'Gratitude Journal: Final exams edition',
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
        subject: 'Your daily habit remincders',
        html: messageString
      });
      */
    });
  };

  //addTask("mailTask", 'every 30 seconds', mailTask);
  addTask("mailTask", 'at 5:00 am', mailTask);


  //addTask("markFalseTask", 'at 7:00 pm', markFalseTask)

  process.env.MAIL_URL='smtp://postmaster%40sandbox2f612ffff1bc4c5aa681358f40348891.mailgun.org:4278877873ed0e12f6c1e219083570bb@smtp.mailgun.org:587';

	SyncedCron.start();
});