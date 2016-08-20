//This is to check if we run the server,
//This run when the app started up

// if (Meteor.isServer) {
Meteor.startup(function() {
  if (Images.find().count() === 0) { //Insert image into mongo in stratup
    for (var i = 1; i <= 9; i++) {
      Images.insert({
        img_src: 'totoro_icon_' + i + '.jpg',
        img_alt: 'Totoro Icon ' + i
      });
    }
    // Images.insert({
    //   img_src: 'totoro_icon_1.jpg',
    //   img_alt: 'Totoro Icon 1'
    // });
    // Images.insert({
    //   img_src: 'totoro_icon_2.jpg',
    //   img_alt: 'Totoro Icon 2'
    // });
    // Images.insert({
    //   img_src: 'totoro_icon_3.jpg',
    //   img_alt: 'Totoro Icon 3'
    // });
  }
});
// }
