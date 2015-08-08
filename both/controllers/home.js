HomeController = AppController.extend({
  waitOn: function() {
    return this.subscribe('habits');
  },
  data: {
    habits: Habits.find({})
  }
});
