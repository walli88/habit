Meteor.publishComposite("habits", function() {
  return {
    find: function() {
      return Habits.find({});
    }
  }
});
