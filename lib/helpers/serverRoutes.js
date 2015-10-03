Router.map(function() {

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {
      this.response.writeHead(200, {'Content-Type': 'text/html'});

      Email.send({
        from: "charlesmzhu@gmail.com",
        to: "charlesmzhu@gmail.com",
        subject: this.request.body.subject,
        html: this.request.body["body-plain"]
      });

      this.response.write("You wrote: " + this.request.body.message);
      this.response.write("\n");
      this.response.write(user.emails[0].address)
      this.response.end('Success!\n');





      //Todo
      //1. Ensure that full messages are parseable by meteor app and understand structure
      //2. Configure email server such that replies go to the mailfun meteor server
      //3. Receive emails
      //4. Break lines apart 
    }
  });
});