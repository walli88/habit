// ***************************************************************
// STATIC PAGES
// ***************************************************************

Router.map(function() {

  // FRONTPAGE
  // -------------------------------------------------------
  this.route('frontpage', {
    path: '/',
    template: 'frontpage'
  });

  this.route('habits', {
    path: '/habits',
    template: 'habits'
  });

  this.route('dashboard', {
    path: '/dashboard',
    template: 'dashboard'
  });

  this.route('newhabit', {
    path: '/newhabit',
    template: 'newhabit'
  });
});

Router.route ('/inboundEmails', function () {
  }, { where: "server"} ).post ( 
  function () {
      console.log( "Request received" );
      post = this.request.body;

      Habits.insert({
        userId: "10",
        trait: 'Post if successful',
        habit: post
      });

      this.response.statusCode = 200;
      this.response.end ( post );
})

