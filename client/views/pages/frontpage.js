Template.frontpage.rendered = function() {

};

Template.frontpage.helpers({
    traits: function(){
        return ["Healthy", "Organized", "Social", "Confident", "Thrifty"]; // If this is hardcoded, if there's a new category, it won't appear
    },
 
    habits: function(){
      if( getTrait() ) {
        return Habits.find( {'trait' : getTrait() } );
      } else {
        return;
      }
    }

});

Template.frontpage.events({
  'submit .register-form' : function(e, t){
    e.preventDefault();
    var email = t.find('#login-email').value
      , password = t.find('#login-password').value; /* Eventually, this should be replaced with default loginButtons for security purposes but with custom template. See here https://meteorhacks.com/extending-meteor-accounts */
      
    var habits = getSelectedHabits();
    
    Accounts.createUser ({
      email: email,
      password: password, // Need to generate public/private key to decrypt
      profile: {
        currentHabits: habits
        //add name here and to form
      }
    }, function ( err ) {
      if (err) console.log(err);
      else {
        console.log('success');
      };
    })

    return false;
  },

  'change #trait-picker': function(e) {
    var trait = $(e.target).val();
    Session.keys
    setTrait( trait );
  },

  'click #habit-button': function(e, t) {

    var habit = Blaze.getData ( e.target ); // gets habit in object form

    if($(e.currentTarget).hasClass("active")) {    
    
      var selectedHabits = getSelectedHabits(); // gets array of habits
      
      selectedHabits.splice ( selectedHabits.indexOf ( habit._id ), 1 ); // splice deselected habit

      updateSelectedHabits ( selectedHabits );
      $(e.currentTarget).removeClass("active"); // changes CSS
    
    } else {

      if ( doSelectedHabitsExist() ) {
        var selectedHabits = getSelectedHabits();
        selectedHabits.push ( habit._id );
        updateSelectedHabits ( selectedHabits ); // At some point we'll need to get rid of all sessions  
      } else {
        var initHabit = [ habit._id ];
        updateSelectedHabits ( initHabit );
      }

      $(e.currentTarget).addClass("active")

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

var getSelectedHabits = function () {

  return Session.get('selectedHabits');
}

var updateSelectedHabits = function ( newSelectedHabits ) {
  Session.set ( 'selectedHabits', newSelectedHabits );
  return newSelectedHabits;
}

var doSelectedHabitsExist = function () {
  return !!getSelectedHabits();
}