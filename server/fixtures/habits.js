if ( Habits.find().count() === 0 ) {
    Habits.insert({
      userId: "0",
      trait: 'Healthy',
      habit: 'Drink a glass of water first thing in the morning'
    });
    Habits.insert({
      userId: "0",
      trait: 'Healthy',
      habit: 'After you enter your building, think about how you’ll meet the love of your life on the stairwell'
    });
    Habits.insert({
      userId: "0",
      trait: 'Social',
      habit: 'Email or text one friend today'
    });
    Habits.insert({
      userId: "0",
      trait: 'Social',
      habit: 'Plan a hangout with one friend'
    });
    Habits.insert({
      userId: "0",
      trait: 'Organized',
      habit: 'After a shower, put clothes in the hamper'
    });
    Habits.insert({
      userId: "0",
      trait: 'Organized',
      habit: 'Wash the dishes right after eating'
    });
}