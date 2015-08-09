// ***************************************************************
// COMMON HELPERS (server-side only)
// ***************************************************************

FutureTasks = new Meteor.Collection('future_tasks')


function sendMail ( details ) {

  Email.send({
    from: details.from,
      to: details.to,
      subject: 'are you closer to who you want to become?',
      text: details.text
  });

}

//adds task to SyncedCron
function addTask(id, details) {

  //understand this
  SyncedCron.add({
    name: id,
    schedule: function(parser) {
      return parser.text('every 1 min');
    },
    job: function() {
      sendMail(details);
          return id;
    }
  });

}

Meteor.methods({
  /*sendEmail: function(email) {
    Email.send({to:email, from: email, subject:'Hello from the future', text: "Think happy bots :)."});
  },*/

  addJoy : function ( content, user ) { 
    return Joys.insert ( {
    	createdAt: new Date (),
    	content: content,
      user_id: Meteor.userId()
    } );
  },

  scheduleMail: function ( details ) {
    var thisId = FutureTasks.insert(details);
    addTask(thisId, details);
    return true;
  },

  saveSelectedHabits: function ( habits ) {
  	savedHabits = habits;
  	console.log(savedHabits);
  }

});