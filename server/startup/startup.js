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
    FutureTasks.find().forEach(function(details) {
    var habits_array = UserHabits.find({userId: details.userId}, {fields: {'habit':1, 'count':1}}).fetch()
    var messageString = "Here is your habits progress:"
    + _.map(habits_array, function(s) { return "<br><br>" + s.habit + " : " + s.count + "/7"}).join();

    console.log(messageString)

      Email.send({
        from: details.from,
        to: details.to,
        subject: 'are you closer to who you want to become?',
        html: messageString
      });
    });
  };

  addTask("mailTask", 'at 00:00 am', mailTask);
  // addTask("mailTask", 'every 1 minute', mailTask);


  addTask("markFalseTask", 'at 00:00 am', markFalseTask)

  process.env.MAIL_URL='smtp://postmaster%40sandbox2f612ffff1bc4c5aa681358f40348891.mailgun.org:4278877873ed0e12f6c1e219083570bb@smtp.mailgun.org:587';

	SyncedCron.start();


});