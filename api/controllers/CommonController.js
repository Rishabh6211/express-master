var FCM = require('fcm-push');

var serverKey = 'AIzaSyDadfRO4w2kulYNEwI03zXOAI1nxsYsvhs';
var fcm = new FCM(serverKey);

var message = {
    to: 'csLTs_MhpLg:APA91bGakF8EUhL0L970DPQByKtDgu3SNfK3_-iJThnGJRnAivRlCySjT-54bM57RVcvDUfs5fUT-fO0I9aAY5b7EisaC4hzO3NaAX3hYZqNfto5EekZoLKKpGBifIAea3EQ3hucA9XE', // required fill with device token or topics
    notification: {
        title: 'Fitness24',
        body: 'hello its me'
    }
};


//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })