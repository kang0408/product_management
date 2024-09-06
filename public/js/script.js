// Posts
const tags = document.querySelectorAll(".form-check-input");
const buttonSearch = document.querySelector(".btn-search");
const buttonRefresh = document.querySelector(".btn-refresh");

buttonSearch.addEventListener("click", () => {
  tags.forEach((tag) => {
    if (tag.checked) console.log(tag.value);
  });
});
// End posts
