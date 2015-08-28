// ***************************************************************
// COMMON HELPERS (server-side only)
// ***************************************************************

FutureTasks = new Meteor.Collection('future_tasks')

addTask = function (id, details, schedule, task) {

  schedule = typeof schedule !== 'undefined' ? schedule : 'every 1 min';
  SyncedCron.add({
    name: id,
    schedule: function(parser) {
      return parser.text(schedule);
    },
    job: task
  });

}

sendMail = function ( details ) {
  Email.send({
    from: details.from,
      to: details.to,
      subject: 'are you closer to who you want to become?',
      text: details.text
  });

}


Meteor.methods({
  /*sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },*/

  scheduleMail: function ( details ) {

    var mailTask = function() {
      sendMail(details);
          return id;
    };
    var thisId = FutureTasks.insert(details);
    addTask(thisId, details, 'every 1 min', mailTask);
    return true;
  },

});