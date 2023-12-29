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

document.getElementById("backBtnMain").addEventListener("click", function () {
  window.location.href = "index.html";
});

//Get blog data by id
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

let singleBlog;

var settings = {
  url: "https://api.blog.redberryinternship.ge/api/blogs/" + blogId,
  method: "GET",
  timeout: 0,
  async: false,
  headers: {
    Authorization:
      "Bearer 7e61cf75f6d019d5a46ed03bc3533a96f305e7aa74d5ff016c66db8eb2d55835",
  },
};

$.ajax(settings).done(function (response) {
  singleBlog = response;

  let image = $("<img>")
    .attr("src", response.image)
    .attr("alt", "blog image")
    .addClass("blog-img-main");
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

// slider
let sliderContent = document.querySelector(".slider-content");
let backBtn = document.querySelector("#backBtn");
let nextBtn = document.querySelector("#nextBtn");

nextBtn.addEventListener("click", () => {
  sliderContent.style.scrollBehavior = "smooth";
  sliderContent.scrollLeft += 440;
});

backBtn.addEventListener("click", () => {
  sliderContent.style.scrollBehavior = "smooth";
  sliderContent.scrollLeft -= 440;
});

//Get all blogs


function viewBlog(e){
  let blogId = e.target.getAttribute('blog-id')
  window.location.href = 'blogInfo.html?id=' + blogId;
}

var settings = {
  url: "https://api.blog.redberryinternship.ge/api/blogs",
  method: "GET",
  timeout: 0,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer 7e61cf75f6d019d5a46ed03bc3533a96f305e7aa74d5ff016c66db8eb2d55835",
  },
};

$.ajax(settings).done(function (response) {
  const relatedBlogs = response.data.filter(function (blog) {
    return blog.categories.some(function (category) {
      return (
        singleBlog.categories.some(function (blogCategory) {
          return blogCategory.id === category.id;
        }) && singleBlog.id !== blog.id
      );
    });
  });
  if (relatedBlogs.length > 0) {
    const today = new Date();
    relatedBlogs.forEach((blog) => {
      const blogDate = new Date(blog.publish_date);
      if (blogDate > today) {
        console.log('ak aris')
        return;
      }
      let newDiv = $("<div>")
        .addClass("slider-div");

      let image = $("<img>")
        .attr("src", blog.image)
        .attr("alt", "blog image")
        .addClass("rlt-blog-img");

      let author = $("<p>").text(blog.author).addClass("rlt-blog-author");
      let date = $("<p>").text(blog.publish_date).addClass("rlt-blog-publish_date");
      let title = $("<p>").text(blog.title).addClass("rlt-blog-title");
      let categoriesDiv = $("<div>").addClass("rlt-blog-categories");

      blog.categories.forEach(function (categorie) {
        let categorieElement = $("<button>")
          .text(categorie.title)
          .addClass("rlt-categorie-btn-blog")
          .css({
            background: categorie.background_color,
            color: categorie.text_color,
          });
        categoriesDiv.append(categorieElement);
      });

      let description = $("<p>")
        .text(blog.description)
        .addClass("rlt-blog-description");
      let openBlogDiv = $("<div>").addClass("rlt-open-blog-div");
      let buttonView = $("<p>")
        .text("სრულად ნახვა")
        .attr("blog-id", blog.id)
        .addClass("rlt-open-blog")
        .on("click", viewBlog);
      let svg = $(
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z" fill="#5D37F3"/></svg>'
      );
      openBlogDiv.append(buttonView, svg);
      newDiv.append(
        image,
        author,
        date,
        title,
        categoriesDiv,
        description,
        openBlogDiv
      );
      $(".slider-content").append(newDiv);
      let paragraphs = document.querySelectorAll(".rlt-blog-description");
      let maxLength = 115;
  
      paragraphs.forEach(function (paragraph) {
        if (paragraph.textContent.length > maxLength) {
          paragraph.textContent =
            paragraph.textContent.substring(0, maxLength) + "...";
        }
      });
    });
  } else {
    let sameBlogsError = $("<p>")
      .text("მსგავსი სტატიები არ მოიძებნა")
      .addClass("same-blogs-error");
    $(".slider").empty();
    $(".slider").append(sameBlogsError);
  }
});
