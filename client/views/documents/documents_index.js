Template.documentsIndex.rendered = function() {
};

Template.documentsIndex.helpers({
	documents: function () {
		return Meteor.user().profile.grats;
	}
});

Template.documentsIndex.events ({
  'click .delete-document': function(e) {
    e.preventDefault();
    var item = this;

    if (confirm("Are you sure?")) {
      Documents.remove(item._id);
      console.log("Deleted!")
    }
  }
});
