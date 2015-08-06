Items = new Mongo.Collection('items');
Habits = new Mongo.Collection('habits');

Items.helpers({

});

Items.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
