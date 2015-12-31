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
  replaceResolutionWith = $('<input name="temp" class = "editResolutionEntry" type="text" />'),
  connectWith = $('input[name="hiddenField"]');
  $('.inlineEdit').inlineEdit ( replaceWith, connectWith );
  $('.inlineEditResolution').inlineEdit ( replaceResolutionWith, connectWith );
};

Template.documentsIndex.helpers({
	documents: function () {
		return Meteor.user().profile.grats;
	},

  resolutions: function () {
    return Meteor.user().profile.resolution;
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
  },

  "submit .new-resolution": function (e) {
    e.preventDefault();
    var resolution = e.currentTarget.resolution.value;
    e.currentTarget.resolution.value = "";
    Meteor.call( "newResolution" , resolution );
  },

  "blur .editResolutionEntry": function (e) {
    var newValue = e.currentTarget.value;
    var originalValue = Session.get ( "originalValue" );
    console.log(newValue);
    console.log(originalValue);
    Meteor.call ( "updateResolution", originalValue, newValue );
  },

  'click .delete-resolution': function (e) {
    e.preventDefault();
    var item = String(this);
    if (confirm("Are you sure?")) {
      Meteor.call ( "deleteResolution", item );
      console.log("Deleted!");
    }
  }
});