Meteor.startup(function() {

    if (Habits.find({}).count() === 0) {
        Habits.insert({
            habit: 'Healthy',
            trait: 'Drink a glass of water first thing in the morning'
          });
          Habits.insert({
            habit: 'Healthy',
            trait: 'After you enter your building, think about how you’ll meet the love of your life on the stairwell'
          });
          Habits.insert({
            habit: 'Social',
            trait: 'Email or text one friend today'
          });
          Habits.insert({
            habit: 'Social',
            trait: 'Plan a hangout with one friend'
          });
          Habits.insert({
            habit: 'Organized',
            trait: 'After a shower, put clothes in the hamper'
          });
          Habits.insert({
            habit: 'Organized',
            trait: 'Wash the dishes right after eating'
          });
        }
});
