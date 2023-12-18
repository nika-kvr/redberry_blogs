var settings = {
  url: "https://api.blog.redberryinternship.ge/api/categories",
  method: "GET",
  timeout: 0,
};

$.ajax(settings).done(function (response) {
    const categories = response.data;
    const container = $('#divCategory');

    categories.forEach(function(category) {
        const paragraph = $('<p>').text(category.title);
        container.append(paragraph);
    });
});


function loginModalFunc() {
  console.log("modal");
}
