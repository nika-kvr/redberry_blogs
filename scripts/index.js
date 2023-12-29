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
  openModal.style.display = "none";
  addBlogbtn.style.display = "block";
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

// Ger categories
const categoriesSettings = {
  url: "https://api.blog.redberryinternship.ge/api/categories",
  method: "GET",
  timeout: 0,
};

function handleCategoriesResponse(response) {
  console.log(response);
  const categories = response.data;
  const container = $("#divCategory");

  categories.forEach(function (category) {
    const paragraph = $("<button>")
      .text(category.title)
      .attr("data-id", category.id)
      .addClass("categorie-btn")
      .on("click", filterByCategories)
      .css({
        color: category.text_color,
        background: category.background_color,
      });
    container.append(paragraph);
  });
}

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

// Get all Blogs

//append blogs in div
function viewBlog(e){
  let blogId = e.target.getAttribute('blog-id')
  window.location.href = 'blogInfo.html?id=' + blogId;
}

let blogs;
let selectedCategories = [];

function appendBlogs(blogs) {
  const today = new Date();

  blogs.forEach(function (blog) {
    const blogDate = new Date(blog.publish_date);
    if (blogDate > today) {
      return;
    }
    let newDiv = $("<div>")
      .attr("id", "div_" + blog.id)
      .addClass("blog-content-div");

    let image = $("<img>")
      .attr("src", blog.image)
      .attr("alt", "blog image")
      .addClass("blog-img");
    let author = $("<p>").text(blog.author).addClass("blog-author");
    let date = $("<p>").text(blog.publish_date).addClass("blog-publish_date");
    let title = $("<p>").text(blog.title).addClass("blog-title");
    let categoriesDiv = $("<div>").addClass("blog-categories");

    blog.categories.forEach(function (categorie) {
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
      .text(blog.description)
      .addClass("blog-description");
    let openBlogDiv = $("<div>").addClass("open-blog-div");
    let buttonView = $("<p>")
      .text("სრულად ნახვა")
      .attr("blog-id", blog.id)
      .addClass("open-blog")
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

    $("#mainBlogsContainer").append(newDiv);
    let paragraphs = document.querySelectorAll(".blog-description");
    let maxLength = 115;

    paragraphs.forEach(function (paragraph) {
      if (paragraph.textContent.length > maxLength) {
        paragraph.textContent =
          paragraph.textContent.substring(0, maxLength) + "...";
      }
    });
  });
}

//description max size

const blogsSettings = {
  url: "https://api.blog.redberryinternship.ge/api/blogs",
  method: "GET",
  timeout: 0,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer 7e61cf75f6d019d5a46ed03bc3533a96f305e7aa74d5ff016c66db8eb2d55835",
  },
};

function requestAsPromise(settings) {
  return new Promise(function (res, rej) {
    return $.ajax({
      ...settings,
      success: function (data) {
        res(data);
      },
      error: function (error) {
        rej(error);
      },
    });
  });
}

Promise.all([
  requestAsPromise(categoriesSettings),
  requestAsPromise(blogsSettings),
]).then(function ([cateogoriesResponse, blogsResponse]) {
  handleCategoriesResponse(cateogoriesResponse);
  handleBlogsResponse(blogsResponse);
  if (localStorage.getItem("selectedCategories")) {
    selectedCategories = JSON.parse(localStorage.getItem("selectedCategories"));
    filterByCategories();
  }
});

function handleBlogsResponse(response) {
  blogs = response.data;
  appendBlogs(response.data);
}

function filterByCategories(e) {
  if (e) {
    const button = e.target;
    button.classList.toggle("selected");
    const categorieId = +e.target.dataset.id;
    if (selectedCategories.includes(categorieId)) {
      const categoryIndex = selectedCategories.indexOf(categorieId);
      selectedCategories.splice(categoryIndex, 1);
    } else {
      selectedCategories.push(categorieId);
    }

    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
  } else {
    $(".categorie-btn").each(function () {
      if (selectedCategories.includes(+this.dataset.id)) {
        $(this).addClass("selected");
      }
    });
  }

  $("#mainBlogsContainer")[0].textContent = "";
  if (selectedCategories.length === 0) {
    appendBlogs(blogs);
    return;
  }
  const filteredBlogs = blogs.filter(function (blog) {
    return blog.categories.some(function (category) {
      return selectedCategories.includes(category.id);
    });
  });

  appendBlogs(filteredBlogs);

}
