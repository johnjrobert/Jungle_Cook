function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: fullName,
        })
        .then(() => {
          UpdateSiteWithInfo();
        });
      $(".pName").css("display", "block");
      $(".pName").html(user.fName);
      loadUserRecipe();
    } else {
      loadPublicRecipes();
      console.log("user is not there");
      $(".pName").css("display", "none");
      _db = "";
    }
  });
}

function UpdateSiteWithInfo() {
  let user = firebase.auth().currentUser;
  // fullName = firstName + " " + lastName;
  $(".pName").html(user.displayName);
  console.log(user.displayName);
}

function createUser() {
  let password = "password"; //$("#password").val();
  let email = "johnjrobert@gmail.com";
  let firstName = "John";
  let lastName = "Robert";
  fullName = firstName + " " + lastName;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function loginUser() {
  let email = "johnjrobert@gmail.com";
  let password = "password";
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Logged in!");
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

function signoutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");
  let homeID = "home";

  if (pageID == "") {
    pageID = homeID;
  } else {
    pageID = pageID;
  }

  MODEL.navToPage(pageID);
}

function initListeners() {
  LoginButton();
  route();
  $(window).on("hashchange", route);
}

function LoginButton() {
  $.get(`pages/login/login.html`, (data) => {
    console.log(data);
    $("#app").html(data);
  });
}

//reads page, loads everything to be used.
$(document).ready(() => {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
    loginUser();
    signoutUser();
    //dont use plus sign to add to the string. use a comma.
    // console.log("The users first name is ", User.firstName);
    // console.log("The recipes are ", RECIPES);
  } catch {
    console.error(e);
  }
});
