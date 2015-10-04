Router.map(function() {

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {

      var self = this;

      self.response.writeHead(200, {'Content-Type': 'text/html'});

      //Update the person's profile with gratitudes

      var grats = self.request.body [ "stripped-html" ];
      grats = grats.split("\n");
      var user = Meteor.users.findOne( { emails: { $elemMatch: { address: self.request.body["sender"] } } } );

      grats.forEach ( function ( grat ) {
        grat = grat.trim();
        Meteor.user.update ( user, { $push: { "profile.grats" : { "grat": grat, "date": self.request.body [ "date" ] } } }, true );
      })

    
      //For local testing purposes only
      self.response.write("You wrote: " + JSON.stringify( self .request.body["stripped-html"]));
      self.response.write("\n");
      self.response.end('Success!\n');
      
      //Todo
      //1. Parse new lines as new entries
      //2. Make it so that the alias is one name, but the subject is still elsewhere

    }
  });
}); 