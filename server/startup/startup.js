// ***************************************************************
// STARTUP (Will run as soon as the server process is finished starting)
// ***************************************************************

Meteor.startup(function() {

	FutureTasks.find().forEach(function(mail) {
		var d = new Date ();
		addTask(mail._id, mail);
	});

	SyncedCron.start();

});