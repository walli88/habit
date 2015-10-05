Meteor.publish('activities', function () {
  return Activities.find({$or:[{userId: this.userId},{userId: "0"}]});
})