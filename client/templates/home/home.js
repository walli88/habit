Template.home.rendered = function() {

};

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
  }
});

