Router.map(function() {

  this.route('hook', {
    path: '/hook',
    where: 'server',
    action: function() {
      this.response.writeHead(200, {'Content-Type': 'text/html'});
      this.response.write("You wrote: " + this.request.body.message);
      this.response.write("\n");
      this.response.end('Success!\n');
    }
  });
});