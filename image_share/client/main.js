////routing
///

//Application main container on layout placeholder
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
  this.render('welcome', { //render specific template to certain section of the site
    to: 'main'
  });
});

Router.route('/images', function() {
  this.render('navbar', {
    to: 'navbar'
  });
  this.render('images', {
    to: 'main'
  });
});

Router.route('/image/:_id', function() {
  this.render('image', {
    to: 'main',
    data: function() {
      return Images.findOne({_id: this.params._id});
    }
  });
});

Session.set('imageLimit', 8); //Number of maximum number of image loaded

lastScroll = 0;
$(window).scroll(function(event) {
  //console.log(new Date());
  //test if we are near the bottom of the window
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
    var scrollTop = $(this).scrollTop();
    if (lastScroll < scrollTop) { //check if go down
      console.log('going down');
      Session.set('imageLimit', Session.get('imageLimit') + 4);
    }
    lastScroll = scrollTop;
  }
});

//Account config
//Modify Meteor account registration, add more field on default form
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

// var image_data = [{
//   img_src: 'totoro_icon_1.jpg',
//   img_alt: 'totoro icon 1'
// }, {
//   img_src: 'totoro_icon_2.jpg',
//   img_alt: 'totoro icon 2'
// }, {
//   img_src: 'totoro_icon_3.jpg',
//   img_alt: 'totoro icon 3'
// }, {
//   img_src: 'totoro_icon_4.jpg',
//   img_alt: 'totoro icon 4'
// }, {
//   img_src: 'totoro_icon_5.png',
//   img_alt: 'totoro icon 5'
// }, {
//   img_src: 'totoro_icon_6.gif',
//   img_alt: 'totoro icon 6'
// }, {
//   img_src: 'totoro_icon_7.gif',
//   img_alt: 'totoro icon 7'
// }, {
//   img_src: 'totoro_icon_8.png',
//   img_alt: 'totoro icon 8'
// }, {
//   img_src: 'totoro_icon_9.jpg',
//   img_alt: 'totoro icon 9'
// }];

//Template.images.helpers({images: image_data}); //return data to template
// Template.images.helpers({images: Images.find()});
//
//Sorting by created date and rating
//

Template.images.helpers({
  images: function() {
    if (Session.get('userFilter')) {
      return Images.find({createdBy: Session.get('userFilter')}, {sort: {created_on: -1, rating: -1}, limit: Session.get('imageLimit')});
    } else {
      return Images.find({}, {sort: {created_on: -1, rating: -1}, limit: Session.get('imageLimit')});
    }
  },
  getUser: function(user_id) {
    // console.log(user_id);
    var user = Meteor.users.findOne({_id: user_id});
    if (user) {
      return user.username;
    } else {
      return 'anon';
    }
  },
  filtering_images: function() {
    if (!!Session.get('userFilter')) {
      return true;
    } else {
      return false;
    }
  },
  getFilterUser: function() {
    if (Session.get('userFilter')) {
      var user = Meteor.users.findOne({_id: Session.get('userFilter')});
      return user ? user.username : false;
    } else {
      return false;
    }
  }
});

Template.body.helpers({
  username: function() {
    if (Meteor.user()) {
      // console.log(Meteor.user().emails[0].address);
      // return 'Khanh';
      //return Meteor.user().emails[0].address;
      return Meteor.user().username;
    } else {
      return 'Anonymous';
    }
  }
});

//Listen to interactivity
Template.images.events({
  'click .js-image': function(event) {
    $(event.target).css('width', '50px'); //re-size image to thumbnail
  },
  'click .js-del-image': function(event) {
    var image_id = this._id; //mongo id
    // console.log(image_id);
    $('#' + image_id).hide('slow', function() { //animate image hiding
      Images.remove({'_id': image_id}); //mongo filter
    });
  },
  'click .js-rate-image': function(event) {
    var rating = $(event.currentTarget).data('userrating');
    console.log(rating);
    var image_id = this.id;
    // console.log(image_id);
    Images.update({_id: image_id},
                  {$set: {rating: rating}});
  },
  'click .js-add-image': function(event) {
    $('#image_add_form').modal('show');
  },

  'click .js-set-user-filter': function(event) {
    console.log('CreatedBy: ' + this.createdBy);
    Session.set('userFilter', this.createdBy);
  },

  'click .js-unset-user-filter': function(event) {
    Session.set('userFilter', undefined);
  }
});

Template.image_add_form.events({

  'submit .js-add-image': function(event) {
    event.preventDefault();
    var img_src = event.target.img_src.value;
    var img_alt = event.target.img_alt.value;
    // console.log('src: ' + img_src + '; alt: ' + img_alt);
    if (Meteor.user()) {
      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        created_on: new Date(),
        createdBy: Meteor.user()._id //Or Meteor.userId
      });
    }
    return false;
  }

});
