var firebaseConfig = {
    apiKey: "AIzaSyBlGFQUeVuhqaJh_Tlv7BZPjVRsmmo0C2g",
    authDomain: "tapshare-e7d28.firebaseapp.com",
    databaseURL: "https://tapshare-e7d28.firebaseio.com",
    projectId: "tapshare-e7d28",
    storageBucket: "tapshare-e7d28.appspot.com",
    messagingSenderId: "549120343316",
    appId: "1:549120343316:web:6117bc543743cb7dbd9601",
    measurementId: "G-7VNFHFTGHP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


// getData function
function getData() {
  firebase.database().ref('tapsharedb/').once('value', function(snapshot){
    snapshot.forEach(function(childsnapshot){
      var childKey = childsnapshot.key;
      var childData = childsnapshot.val();
      var getLink = childData['link'];
      document.getElementById('link_box').value = getLink;
    })
  })
}

// pushData function
function pushData() {
  if (document.getElementById('link_box').value != "") {

    firebase.database().ref('/tapsharedb/taplink/').set({
      link: document.getElementById('link_box').value
    })

    window.alert("TapShared Successfully ❤️");
    document.getElementById('link_box').value = "";

  }else {
    window.alert("Link is required !!")
  }
}

// openLink function
function openLink() {
  if (document.getElementById('link_box').value != "") {
    window.open(document.getElementById('link_box').value,'_blank');
  }else {
    //window.alert('Click again when you link apper to open it.');
    console.log("Link Not Found !!");
    feedback_system();
  }
}

// copy link function [ Upgrade ]
function copyLink() {
  var copyText = document.getElementById('link_box');
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  window.alert("Link Copied => " + copyText.value);
}

// ios detection [ Upgrade ]
function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
}

// feedback system
function feedback_system() {
  var user_name =  window.prompt("What's Your Name ? ");
  var user_feed = window.prompt('How TapShare can be better, '+user_name);

  if (user_name && user_feed != null) {
    firebase.database().ref('/tapsharedb/feedbacks/'+user_name).set({
      user_feed: user_feed
    });
    window.alert(user_name + ', ' + user_feed);
  }else {
    console.log('No Feedback ...');
  }
}
