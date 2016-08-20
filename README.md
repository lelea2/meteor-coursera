# meteor-coursera
Learning meteor.js on coursera

```
meteor create myapp
cd myapp
~myapp/ meteor
```


```javascript
//Template helpers eg
Template.images.helpers({images: image_data});

```

* Find package:

https://atmospherejs.com/

```
meteor search .

meteor search twbs

meteor add twbs:bootstrap //adding bootrap to meteor package

```

##### Meteor distributed data model
* Create cluster of local data (connected to central data) ==> reactive programming
* Local data === # of web client + 1 master central data
* ```meteor reset``` wipe your metor DB
* Create startup script "startup.js" to insert Mongo data

* In Mongo
1. _id refers to a unique identifier for an item in a Mongo collection
2. 'this' refers to the data the temaplet was displaying

* Collection.find: http://docs.meteor.com/#/full/find

* Reactive Programming: data change, template re-render

##### User authentication on Meteor

* Accounts.ui.config: http://docs.meteor.com/#/full/accounts_ui_config
* MongoDB filters: http://docs.mongodb.org/manual/reference/method/db.collection.find/
* Meteor Sessions: http://docs.meteor.com/#/full/session

```
meteor add accounts-ui accounts-password //bring in pre-built account intereaction ui
```

```
//Console check for re-set password
I20160810-06:37:48.547(-7)? ====== BEGIN MAIL #0 ======
I20160810-06:37:48.549(-7)? (Mail not sent; to enable sending, set the MAIL_URL environment variable.)
I20160810-06:37:48.549(-7)? MIME-Version: 1.0
I20160810-06:37:48.549(-7)? From: "Meteor Accounts" <no-reply@meteor.com>
I20160810-06:37:48.549(-7)? To: test2@test.com
I20160810-06:37:48.549(-7)? Subject: How to reset your password on localhost:3000
I20160810-06:37:48.550(-7)? Content-Type: text/plain; charset=utf-8
I20160810-06:37:48.550(-7)? Content-Transfer-Encoding: quoted-printable
I20160810-06:37:48.550(-7)?
I20160810-06:37:48.550(-7)? Hello,
I20160810-06:37:48.550(-7)?
I20160810-06:37:48.550(-7)? To reset your password, simply click the link below.
I20160810-06:37:48.550(-7)?
I20160810-06:37:48.550(-7)? http://localhost:3000/#/reset-password/bahd9crf4PN9T9XayWWgQvmgpbiw_XC14Py1X9DVJA4
I20160810-06:37:48.551(-7)?
I20160810-06:37:48.551(-7)? Thanks.
I20160810-06:37:48.551(-7)?
I20160810-06:37:48.553(-7)? ====== END MAIL #0 ======
```

* Meteor render template on load, and when data change, it's re-rendered

* Access Meteor user information

```javascript
Meteor.users.find()
Meteor.user().emails[0].address
Meteor.user().username
```

##### How to organize your code in meteor
* Client vs. server code
