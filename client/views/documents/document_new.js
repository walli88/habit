Template.documentNew.rendered = function() {
};

Template.documentNew.helpers({
});

Template.documentNew.events ({
	'click .new-entry' : function () {
		console.log("test");
		var userId = Meteor.userId();
		var grat = $('textarea').val();
		var date = new Date();
  		Meteor.users.update ( userId, { $push: { "profile.grats" : { "grat": grat, "date": date } } }, true ); 
	}
});
