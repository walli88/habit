// ***************************************************************
// COMMON HELPERS (server-side only)
// ***************************************************************

FutureTasks = new Meteor.Collection('future_tasks')

Meteor.methods({
  /*sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },*/

  scheduleMail: function ( details ) {
    var thisId = FutureTasks.insert(details);
    addTask(thisId, details);
    return true;
  },

});