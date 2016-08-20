Images = new Mongo.Collection('images');
// console.log(Images.find().count());


//Specify security in Meteor
//The message will be printed on console.log server side
Images.allow({
  insert: function(userId, doc) {
    console.log('Testing security on image insert');
    if (Meteor.user()) {
      console.log(doc);
      return (doc.createdBy === userId);
    } else {
      return false;
    }
  },
  //Note: when you try to delete image without security check, you'll see the image delete and re-popup again
  //The reason for that is because collection is deleted locally first (for faster reactive render)
  //However, when server re-checked, return the real time collection again, and your image is not deleted due to security restriction
  remove: function(userId, doc) {
    if (Meteor.user()) {
      console.log(doc);
      return (doc.createdBy === userId);
    } else {
      return false;
    }
  }
});
