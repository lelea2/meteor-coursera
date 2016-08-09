Images = new Mongo.Collection('images');
console.log(Images.find().count());

if (Meteor.isClient) {
  var image_data = [{
    img_src: 'totoro_icon_1.jpg',
    img_alt: 'totoro icon 1'
  }, {
    img_src: 'totoro_icon_2.jpg',
    img_alt: 'totoro icon 2'
  }, {
    img_src: 'totoro_icon_3.jpg',
    img_alt: 'totoro icon 3'
  }, {
    img_src: 'totoro_icon_4.jpg',
    img_alt: 'totoro icon 4'
  }, {
    img_src: 'totoro_icon_5.png',
    img_alt: 'totoro icon 5'
  }, {
    img_src: 'totoro_icon_6.gif',
    img_alt: 'totoro icon 6'
  }, {
    img_src: 'totoro_icon_7.gif',
    img_alt: 'totoro icon 7'
  }, {
    img_src: 'totoro_icon_8.png',
    img_alt: 'totoro icon 8'
  }, {
    img_src: 'totoro_icon_9.jpg',
    img_alt: 'totoro icon 9'
  }];

  //Template.images.helpers({images: image_data}); //return data to template
  // Template.images.helpers({images: Images.find()});
  //
  //Sorting by created date and rating
  Template.images.helpers({
    images: Images.find({}, {sort: {created_on: -1, rating: -1}})
  });

  //Listen to interactivity
  Template.images.events({
    'click .js-image': function(event) {
      $(event.target).css('width', '50px');
    },
    'click .js-del-image': function(event) {
      var image_id = this._id; //mongo id
      console.log(image_id);
      $('#' + image_id).hide('slow', function() { //animate image hiding
        Images.remove({'_id': image_id}); //mongo filter
      });
    },
    'click .js-rate-image': function(event) {
      // console.log('You clicked a star');
      var rating = $(event.currentTarget).data('userrating');
      console.log(rating);
      var image_id = this.id;
      console.log(image_id);
      Images.update({_id: image_id},
                    {$set: {rating: rating}});
    },
    'click .js-add-image': function(event) {
      $('#image_add_form').modal('show');
    }
  });

  Template.image_add_form.events({

    'submit .js-add-image': function(event) {
      event.preventDefault();
      var img_src = event.target.img_src.value;
      var img_alt = event.target.img_alt.value;
      console.log('src: ' + img_src + '; alt: ' + img_alt);
      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        created_on: new Date()
      });
      return false;
    }

  });
}

if (Meteor.isServer) {
  /*Meteor.startup(function () {
    // code to run on server at startup
  });*/
  console.log('I am a server');
}
