'use strict';

if (Meteor.isClient) {

  Template.time.helpers({now: new Date()}); //return data to template

}

if (Meteor.isServer) {
  /*Meteor.startup(function () {
    // code to run on server at startup
  });*/
  console.log('I am a server');
}
