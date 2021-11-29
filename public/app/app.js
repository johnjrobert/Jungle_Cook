function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase
        .auth()
        .currentUser.updateProfile({
          // displayName: fullName,
        })
        .then(() => {
          UpdateSiteWithInfo();
        });
      // $(".pName").css("display", "block");
      // $(".pName").html(user.fName);
      // loadUserRecipe();
    }
    // else {
    //   loadPublicRecipes();
    //   console.log("user is not there");
    //   $(".pName").css("display", "none");
    //   _db = "";
    // }
  });
}

function UpdateSiteWithInfo() {
  let user = firebase.auth().currentUser;
  // fullName = firstName + " " + lastName;
  // $(".pName").html(user.displayName);
  // console.log(user.displayName);
}

function createUser() {
  let password = "password"; //$("#password").val();
  let email = "johnjrobert@gmail.com";
  let firstName = "John";
  let lastName = "Robert";
  // fullName = firstName + " " + lastName;

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
  loginClick();
  route();
  $(window).on("hashchange", route);
}

function LoginButton() {
  $.get(`pages/login/login.html`, (data) => {
    // console.log(data);
    $("#app").html(data);
  });
}

function loginClick() {
  // $("#loginButtonClick").on("click", () => {
  //   loginUser();
  //   console.log("Logged in!");
  // });
  console.log("getting called");
}

function loadPublicRecipes() {
  $("#app").empty();
  $.getJSON("data/data.json", (recipe) => {
    $.each(recipe.RECIPES, function (index, recipe) {
      console.log("Recipe:" + recipe.recipeName);
      $(".recipeImage").append(`<img href="${recipe.url}">`);
      $(".recipeTitle").append(`<h1>${recipe.recipeTitle}</h1>`);
      $(".recipeInfo").append(`${recipe.description}`);
      $(".recipeTime").append(`${recipe.time}`);
      $(".recipeServings").append(`${recipe.servings}`);
    });
    // recipe.USER_RECIPES;
    console.log(recipe.USER_RECIPES);
  }).fail((error) => {
    console.log(error);
  });
}

function loadUserRecipe() {
  $("#app").empty();
  $.getJSON("data/data.json", (recipe) => {
    $.each(recipe.USER_RECIPES, function (index, recipe) {
      // console.log("Recipe:" + recipe.recipeName);
      $("#app").append(`<p>Recipes: ${recipe.recipeName}</p>`);
    });
    // recipe.USER_RECIPES;
    console.log(recipe.USER_RECIPES);
  }).fail((error) => {
    console.log(error);
  });
}

//reads page, loads everything to be used.
$(document).ready(() => {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
    loadPublicRecipes();
  } catch {
    console.error(e);
  }
});
