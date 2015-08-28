// ***************************************************************
// COMMON HELPERS (server-side only)
// ***************************************************************

FutureTasks = new Meteor.Collection('future_tasks')

addTask = function (name, schedule, task) {

  schedule = typeof schedule !== 'undefined' ? schedule : 'every 1 min';
  SyncedCron.add({
    name: name,
    schedule: function(parser) {
      return parser.text(schedule);
    },
    job: task
  });

}

Meteor.methods({
  scheduleMail: function ( details ) {
    FutureTasks.insert(details);
  },

});