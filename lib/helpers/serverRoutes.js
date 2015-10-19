Router.map(function() {

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {

      var self = this;

      self.response.writeHead(200, {'Content-Type': 'text/html'});

      //Update the person's profile with gratitudes

      var grats = self.request.body [ "stripped-text" ]; // Mailgun does a HTTP post request and we acquire stripped-html      
      grats = grats.split("\n");
      
      var email = self.request.body [ "from" ].match(/<([^>]+)>/)[1] // matches angular brackets and chooses index at one to get email sender's address

      // for key in self.request.FILES
      var user = Meteor.users.findOne( { emails: { $elemMatch: { address: email } } } );
      console.log("grats: " + grats);
      console.log("email: " + email);
      
      if ( !!JSON.stringify(user) ) console.log ( "success" );
      
      grats.forEach ( function ( grat ) {
        grat = grat.trim();
        Meteor.users.update ( user, { $push: { "profile.grats" : { "grat": grat, "date": self.request.body [ "Date" ] } } }, true );
      })

      //For local testing purposes only
      self.response.write( "You wrote: " + JSON.stringify ( self.request.body [ "stripped-html" ] ) );
      self.response.write( "\n" );
      self.response.end( 'Success!\n');
      
      // Todo
      // 1. Provide support for attachments
      // 2. Revamp CSS
      // 3. Provide templated email
      // 4. Include past emails
      // 5. Have sender be from someone else
      // 6. Option to make public or anonymous
    }
  });
}); 