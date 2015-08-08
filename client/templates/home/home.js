Template.home.rendered = function() {

};

Template.home.helpers({
    habitsCat: function(){
        return ["Healthy", "Organized", "Social", "Confident", "Thrifty"]
    },
    habits: function(){
      if(Session.get("habitCat")) {
        return Habits.find({'habit' : Session.get("habitCat")});
      } else
      {
        return Habits.find({});
      }
    }

});

Template.home.events({
    'submit .register-form' : function(e, t){
      e.preventDefault();
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;
        console.log(email);
        console.log(password);
    Meteor.call('ATCreateUserServer', {
    profile: {},
    email: email,
    password: Accounts._hashPassword(password)
    }, function(err) {
      console.log(err)
    });
      return false;
  },
  'change #habit-picker': function(e) {
  var habitValue = $(e.target).val();
  Session.set("habitCat", habitValue);
  },
  'click #trait-button': function(e, t) {
    if($(e.currentTarget).hasClass("active")) {
      $(e.currentTarget).removeClass("active")
    } else {
      $(e.currentTarget).addClass("active")
    }
  },

});

