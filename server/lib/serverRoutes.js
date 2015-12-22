Router.map(function() {

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {

      var self = this;

      self.response.writeHead(200, {'Content-Type': 'text/html'});

      //Update the person's profile with gratitudes
      console.log('this line: ');
      var grats = self.request.body [ "stripped-text" ]; // Mailgun does a HTTP post request and we acquire stripped-html      
      console.log(grats);

      grats = grats.split("\n");
      
      var email = self.request.body [ "from" ].match(/<([^>]+)>/)[1] // matches angular brackets and chooses index at one to get email sender's address
      // for key in self.request.FILES
      var user = Meteor.users.findOne( { emails: { $elemMatch: { address: email } } } );
      var date = self.request.body [ "Date" ];
      
      console.log("grats: " + grats);
      
      if ( !!JSON.stringify ( user ) ) console.log ( "success" );
      
      for ( var i = 0; i < grats.length; i++) {
        grat = grats[i];
        grat = grat.trim();
        console.log("loop grat " + grat + " loop i " + i);
        Meteor.users.update ( user._id, { $push: { "profile.grats" : { "grat": grat, "date": date } } } );
      };

      //For local testing purposes only
      self.response.write( "You wrote: " + JSON.stringify ( self.request.body [ "stripped-html" ] ) );
      self.response.write( "\n" );
      self.response.end( 'Success!\n');
      
      // Todo
      // 1. Provide support for attachments / pictures
      // 2. Improve design emails
      // 3. Provide rich text email reminders
      // 4. Have sender be from someone outside of postmaster
      // 5. Option to make public or anonymous (social dashboard)
      // 6. Registration confirmation page
      // 7. Provide customized email reminders over gratitude journal specific reminders
    }
  });
}); 