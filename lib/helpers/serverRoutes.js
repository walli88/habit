Router.map(function() {

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {
      this.response.writeHead(200, {'Content-Type': 'text/html'});
      this.response.write("You wrote: " + this.request.body.email);
      this.response.write("\n");
      this.response.write(user.emails[0].address)
      this.response.end('Success!\n');
    }
  });
});