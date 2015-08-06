Template.home.rendered = function() {

};

Template.home.events({
    'submit .register-form' : function(e, t){
      e.preventDefault();
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;
        console.log(email);
        console.log(password);
    Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            console.log("success")
          } else {
            console.log("error")
          }
        });
      return false;
  }
});

