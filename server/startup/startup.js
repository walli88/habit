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
      Email.send({
        from: details.from,
        to: details.to,
        subject: 'are you closer to who you want to become?',
        text: details.text
      });
    });
  };

  addTask("mailTask", 'every 1 day', mailTask);

  addTask("markFalseTask", 'every 1 day', markFalseTask)

	SyncedCron.start();

});