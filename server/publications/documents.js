// ***************************************************************
// PUBLICATIONS (For Documents collection)
// ***************************************************************

// DOCUMENTS INDEX
// -------------------------------------------------------
Meteor.publish('documents', function() {
  return Documents.find({$or:[{userId: this.userId},{userId: "0"}]});
});

// DOCUMENT SHOW
// -------------------------------------------------------
Meteor.publish('document', function(id) {
  return Documents.find(id);
});
