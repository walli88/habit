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

  // ABOUT
  // -------------------------------------------------------
  this.route('about', {
    path: '/about',
    template: 'about'
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
