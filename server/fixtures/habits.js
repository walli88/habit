if ( Habits.find().count() === 0 ) {
    Habits.insert({
      trait: 'Healthy',
      habit: 'Drink a glass of water first thing in the morning'
    });
    Habits.insert({
      trait: 'Healthy',
      habit: 'After you enter your building, think about how you’ll meet the love of your life on the stairwell'
    });
    Habits.insert({
      trait: 'Social',
      habit: 'Email or text one friend today'
    });
    Habits.insert({
      trait: 'Social',
      habit: 'Plan a hangout with one friend'
    });
    Habits.insert({
      trait: 'Organized',
      habit: 'After a shower, put clothes in the hamper'
    });
    Habits.insert({
      trait: 'Organized',
      habit: 'Wash the dishes right after eating'
    });
}

if (UserHabits.find().count() === 0 ) {
  UserHabits.insert({
    UserId : "asd32523",
    TraitId : " 23ssfd"
  })
}