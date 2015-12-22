Template.documentsIndex.rendered = function() {
  $.fn.inlineEdit = function(replaceWith, connectWith) {

    $(this).hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    $(this).click(function() {
        var elem = $(this);
        var originalValue = elem.context.innerText;
        replaceWith.val ( originalValue );
        Session.set("originalValue", elem.context.innerText);
        elem.hide();
        elem.after(replaceWith);
        replaceWith.focus();
        replaceWith.blur(function() {
            /*if ($(this).val() != "") {
                connectWith.val($(this).val()).change();
                elem.text($(this).val());
            }*///commenting out: prevents duplicate value from meteor updating and front-end change
            $(this).remove();
            elem.show();
        });
    });
  };


  var replaceWith = $('<input name="temp" class = "editGratEntry" type="text" />'),
  connectWith = $('input[name="hiddenField"]');
  $('.inlineEdit').inlineEdit ( replaceWith, connectWith );
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
    console.log(item);
    if (confirm("Are you sure?")) {
      Meteor.call ( "deleteGrat", item );
      console.log("Deleted!");
    }
  },

  "blur .editGratEntry": function (e) {
    var newValue = e.currentTarget.value;
    var originalValue = Session.get ( "originalValue" );
    Meteor.call ( "updateGrat", originalValue, newValue );
  }
});