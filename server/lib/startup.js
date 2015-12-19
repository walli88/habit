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

//On startup, addtasks to SyncCron for "every day at 10:00 PM".
//

  FutureTasks.find().forEach ( function ( details ) {
    //SENDMAIL should be the last agument
    addTask(details.userId, 'every day at 10:00 PM', details );
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

  //addTask("mailTask", 'every 30 seconds', mailTask);


  //addTask("markFalseTask", 'at 7:00 pm', markFalseTask)

  process.env.MAIL_URL='smtp://postmaster%40sandbox2f612ffff1bc4c5aa681358f40348891.mailgun.org:4278877873ed0e12f6c1e219083570bb@smtp.mailgun.org:587';

	SyncedCron.start();
});