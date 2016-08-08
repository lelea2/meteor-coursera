'use strict';

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

  Template.images.helpers({images: image_data}); //return data to template

  //Listen to interactivity
  Template.images.events({
    'click .js-image': function(event) {
      $(event.target).css("width", "50px");
    }
  });
}

if (Meteor.isServer) {
  /*Meteor.startup(function () {
    // code to run on server at startup
  });*/
  console.log('I am a server');
}
