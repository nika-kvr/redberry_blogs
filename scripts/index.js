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
})

function redirectToAddBlogs(){
  window.location.href = "addBlogs.html";
}

// Check if user is logged in
var loggedinUser = localStorage.getItem('loggedInUser');
if(loggedinUser){
  openModal.style.display = "none";
  addBlogbtn.style.display = "block";
}else{
  openModal.style.display = "block";
  addBlogbtn.style.display = "none";
}

// Ger categories
var settings = {
  url: "https://api.blog.redberryinternship.ge/api/categories",
  method: "GET",
  timeout: 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
  const categories = response.data;
  const container = $("#divCategory");


  categories.forEach(function (category) {
    const paragraph = $("<button>")
      .text(category.title)
      .addClass("categorie-btn")
      .css({
        color: category.text_color,
        background: category.background_color,
      });
    container.append(paragraph);
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
      success: function (response, status, jqXHR) {
        if(jqXHR.status==204){
          console.log('loged in');
          $(".login-success-div").remove();
          $(".div-dialog-success").show();
          localStorage.setItem('loggedInUser', 'user');
        }else{
          console.log('invalid email')
          $("#dialogEmail").removeClass("dialog-login-btn");
          $("#dialogEmail").addClass("dialog-email-error");
          $(".dialog-email-error-msg").show()
        }
      },
      error: function (error) {
        console.log("Error:", error);
      },
    });
  });
});
