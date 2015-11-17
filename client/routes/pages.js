// ***************************************************************
// STATIC PAGES
// ***************************************************************

Router.map(function() {

  // FRONTPAGE
  // -------------------------------------------------------
  this.route('frontpage', {
    path: '/',
    template: 'frontpage',
    onBeforeAction: function () {
      if (Meteor.user()) { 
        if (Meteor.loggingIn()) {}
        else {
          Router.go('documentsIndex');
        }
      }
      this.next();
    }
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

  this.route('pieChart', {
    path: '/pieChart',
    template: 'pieChart'
  });
});