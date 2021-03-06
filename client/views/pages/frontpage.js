Template.frontpage.rendered = function() {
setTrait( "Healthy" );
Session.set('selectedHabits',[])
};

Template.frontpage.helpers({
    traits: function(){
        return ["Healthy", "Organized", "Social", "Confident", "Thrifty"]; // If this is hardcoded, if there's a new category, it won't appear
    },

    habits: function(){
       if( getTrait() ) {

        return Habits.find( {$and:[{'trait' : getTrait() }, {_id: {$nin: _.toArray(getSelectedHabits())}}]});
      } else {
        return;
      }
    },

    habitsSelected: function(){
      // if (UserHabits.find()) {
      //   return UserHabits.find();
      // }
      // else

      if ( getTrait() ) {
        return Habits.find({_id: {$in: _.toArray(getSelectedHabits())}});
      } else {
        return;
      }
  }

});

Template.frontpage.events({
  'submit .register-form' : function(e, t){
    e.preventDefault();
    var email = t.find('#login-email').value
      , password = t.find('#login-password').value
      , grat = t.find('#login-first-grat').value
      , gratArr = []; /* Eventually, this should be replaced with default loginButtons for security purposes but with custom template. See here https://meteorhacks.com/extending-meteor-accounts */

    gratArr.push({grat:grat, date: new Date()});
    /*var habits = getSelectedHabits();
    savedHabits = habits;*/
    console.log(grat);
    console.log(email);
    if (Meteor.user() === null) {
      Accounts.createUser ({
        email:          email,
        password:       password,
        profile:  {
          "grats": gratArr
        }
      }, function ( err ) {
        if (err) console.log(err);
        else {
          Meteor.call('sendConfirmationEmail');
          Meteor.call('scheduleMail', {
            userId: Meteor.user()._id,
            to: Meteor.user().emails[0].address,
          });
        }
      }
      )
    }

      
    return false;
  },


/*
TODO
1. need to be able to add or remove habits so only 3 userHabits are active
2. Deduplicate userHabits being added to
*/
  'click #submit-habits' : function(e, t){
    var habitsDiff = _.difference(getSessionHabits(), getUserHabits());
    if(habitsDiff) {
      Meteor.call('saveUserHabits', habitsDiff);
    }
  },


  'change #trait-picker': function(e) {
    var trait = $(e.target).val();
    Session.keys;
    setTrait(trait);
  },

  'click #habit-button': function(e, t) {
    var habit = Blaze.getData ( e.target ); // gets habit in object form
    if (_.contains(getUserHabits(),habit._id)){
          new Confirmation({
          message: "Are you sure you want to remove a habit you're currently working on?\nThis will remove it from your dashboard.",
          title: "Giving up?!?!",
          cancelText: "Cancel",
          okText: "Ok",
          success: true // wether the button should be green or red
          }, function (ok) {
              if (ok) {
                Meteor.call('deleteUserHabit', habit._id);
                removeSelectedHabits(habit);
              } else {
              }
          });
      return;
    }

    if($(e.currentTarget).hasClass("active")) {
      removeSelectedHabits(habit);
      $(e.currentTarget).removeClass("active"); // changes CSS
    } else {
      if(getSelectedHabits().length > 3) {
        sAlert.error('You can add at most 3 habits', {offset: '0px', stack: false})
      } else {
        addSelectedHabits(habit)
        $(e.currentTarget).addClass("active")
      }
    }
  },

});


/*
  Helper methods: Repeatedly typing Session.set() / Session.get() is tedious. Also, at some point if we want to get rid of Session variables, we can easily modify through the API below.
 */

//Flushes Session var

var flushSession = function () {
  Session.keys = {};
}

var getTrait = function () {
  return Session.get ( 'trait' );
}

var setTrait = function ( trait ) {
  return Session.set ( 'trait', trait );
}

var getUserHabits = function() {
  return allUserHabits = _(UserHabits.find({},{fields: {'habitsId':1}}).fetch()).pluck("habitsId");
}

var getSessionHabits = function() {
  return Session.get('selectedHabits');
}

var getSelectedHabits = function () {
  return _.union(getUserHabits(),getSessionHabits());
}

var updateSelectedHabits = function ( newSelectedHabits ) {
  Session.set ( 'selectedHabits', newSelectedHabits );
  return newSelectedHabits;
}

var removeSelectedHabits = function(habit) {
  updateSelectedHabits(_.without(getSelectedHabits(),habit._id));
}

var addSelectedHabits = function(habit) {
    updateSelectedHabits(_.uniq(getSelectedHabits().concat(habit._id)));
}


