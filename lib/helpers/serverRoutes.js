Router.map(function() {

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {
      this.response.writeHead(200, {'Content-Type': 'text/html'});

      //Update the person's profile with gratitudes

      var user = Meteor.users.findOne( { emails: { $elemMatch: { address: this.request.body["sender"] } } } );
      Meteor.user.update ( user, { $push: { "profile.grats" : { "grat": this.request.body [ "stripped-html" ], "date": this.request.body [ "date" ] } } },true);
      this.response.write("You wrote: " + JSON.stringify(this.request.body["stripped-html"]));
      this.response.write("\n");
      this.response.end('Success!\n');

      //Todo
      //1. Parse lines and update user database
      //2. Make it so that the alias is one name, but the subject is still elsewhere



    }
  });
});