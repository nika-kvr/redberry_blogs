// Button listeners
const openModal = document.getElementById("loginBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("dialogClose");
const successbtn = document.getElementById("successBtn");
const addBlogbtn = document.getElementById("addBlogbtn");

openModal.addEventListener("click", () => {
  modal.showModal();
});
closeModal.addEventListener("click", () => {
  modal.close();
});
successbtn.addEventListener("click", () => {
  openModal.style.display = "none";
  addBlogbtn.style.display = "block";
  modal.close();
});

function redirectToAddBlogs() {
  window.location.href = "addBlogs.html";
}

// Check if user is logged in
var loggedinUser = localStorage.getItem("loggedInUser");
if (loggedinUser) {
  openModal.style.display = "none";
  addBlogbtn.style.display = "block";
} else {
  openModal.style.display = "block";
  addBlogbtn.style.display = "none";
}
$(document).ready(function () {
  $("#dialogLoginBtn").click(function (event) {
    event.preventDefault();

    var formData = {
      email: $("#dialogEmail").val(),
    };

    $.ajax({
      type: "POST",
      url: "https://api.blog.redberryinternship.ge/api/login",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (__, status, jqXHR) {
        if (jqXHR.status == 204) {
          console.log("loged in");
          $(".login-success-div").remove();
          $(".div-dialog-success").show();
          localStorage.setItem("loggedInUser", "user");
        } else {
          console.log("invalid email");
          $("#dialogEmail").removeClass("dialog-login-btn");
          $("#dialogEmail").addClass("dialog-email-error");
          $(".dialog-email-error-msg").show();
        }
      },
      error: function (error) {
        console.log("Error:", error);
      },
    });
  });
});
//Post request email

$(document).ready(function () {
  $("#dialogLoginBtn").click(function (event) {
    event.preventDefault();

    var formData = {
      email: $("#dialogEmail").val(),
    };

    $.ajax({
      type: "POST",
      url: "https://api.blog.redberryinternship.ge/api/login",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (__, status, jqXHR) {
        if (jqXHR.status == 204) {
          console.log("loged in");
          $(".login-success-div").remove();
          $(".div-dialog-success").show();
          localStorage.setItem("loggedInUser", "user");
        } else {
          console.log("invalid email");
          $("#dialogEmail").removeClass("dialog-login-btn");
          $("#dialogEmail").addClass("dialog-email-error");
          $(".dialog-email-error-msg").show();
        }
      },
      error: function (error) {
        console.log("Error:", error);
      },
    });
  });
});

document.getElementById("backBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

//Get blog data by id
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

var settings = {
  url: "https://api.blog.redberryinternship.ge/api/blogs/" + blogId,
  method: "GET",
  timeout: 0,
  async: false,
  headers: {
    Authorization:
      "Bearer 68a4399dfe02608c084486976c178a211bab0ce0ff4ec2efcdbe8bca761f7a39",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
  let image = $("<img>")
    .attr("src", response.image)
    .attr("alt", "blog image")
    .addClass("blog-img");
  let author = $("<p>").text(response.author).addClass("blog-author");
  let date = $("<p>").text(response.publish_date).addClass("blog-publish_date");
  let email;
  if (response.email === null) {
    email = "";
  } else {
    email = $("<p>")
      .text(" · " + response.email)
      .addClass("blog-email");
  }
  let title = $("<p>").text(response.title).addClass("blog-title");

  let categoriesDiv = $("<div>").addClass("blog-categories");

  response.categories.forEach(function (categorie) {
    let categorieElement = $("<button>")
      .text(categorie.title)
      .addClass("categorie-btn-blog")
      .css({
        background: categorie.background_color,
        color: categorie.text_color,
      });
    categoriesDiv.append(categorieElement);
  });

  let description = $("<p>")
    .text(response.description)
    .addClass("blog-description");

  $(".main-blog-content").append(
    image,
    author,
    date,
    email,
    title,
    categoriesDiv,
    description
  );
});
