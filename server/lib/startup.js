// ***************************************************************
// STARTUP (Will run as soon as the server process is finished starting)
// ***************************************************************


/* Tasks
  1. Go for broad customizability for reminder emails
  2. Integrate SMS txt (play with Twilio API)
  3. OnLoad page
*/

Meteor.startup(function() {

  var markFalseTask = function() {
    UserHabits.update(
        {},
        {$set: {lastYes: false}},
        { multi: true }
      )
  };

  FutureTasks.find().forEach ( function ( details ) {
    //SENDMAIL should be the last agument
    addTask( details.userId, /*'every 1 day at 3:00 AM'*/ 'at 7:05 AM on Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday', details );
  });

  process.env.MAIL_URL='smtp://postmaster%40sandbox2f612ffff1bc4c5aa681358f40348891.mailgun.org:4278877873ed0e12f6c1e219083570bb@smtp.mailgun.org:587';

	SyncedCron.start();
});