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
  fix_ui_Error();

  var link_id = document.getElementById('link_id_box').value;

  firebase.database().ref('/tapsharedb/' + link_id + '/').once('value').then(function (snapshot) {
    var getLink = snapshot.val().user_link;

    document.getElementById('link_box').value = getLink;
    document.getElementById('link_box').disabled = true;
  })
}

// pushData function
function pushData() {
  fix_ui_Error();
  codeGenrator();

  if (document.getElementById('link_box').value != "") {

    firebase.database().ref('/tapsharedb/' + user_rand_code + '/').set({
      user_link: document.getElementById('link_box').value
    })

    window.alert("TapShared Successfully ❤️");
    document.getElementById('link_box').value = "";

    document.getElementById('link_id_box').value = space_error + user_rand_code;
    document.getElementById('link_id_box').disabled = true;


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
    //feedback_system();
  }
}

function codeGenrator() {
  user_rand_code = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
}

function fix_ui_Error() {
  space_error = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
  link_space_error = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
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
  if (user_name != null){
    var user_feed = window.prompt('How TapShare can be better, '+user_name);
  }

  if (user_name && user_feed != null) {
    firebase.database().ref('/tapsharedb/feedbacks/'+user_name).set({
      user_feed: user_feed
    });
    window.alert("Thanks for your great help, "+user_name);
  }else {
    console.log('No Feedback ...');
  }
}
