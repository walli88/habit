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

  this.route('tryPie', {
  path: '/tryPie',
  template: 'tryPie'
});
});