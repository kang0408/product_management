// Button status
const buttonStatus = document.querySelectorAll("[btn-status]");

if (buttonStatus.length > 0) {
  const url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("btn-status");

      if (status) url.searchParams.set("status", status);
      else url.searchParams.delete("status");

      window.location.href = url;
    });
  });
}
// End button status

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  const url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) url.searchParams.set("keyword", keyword);
    else url.searchParams.delete("keyword");

    window.location.href = url;
  });
}
// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[btn-pagination]");
if (buttonsPagination) {
  const url = new URL(window.location.href);
  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("btn-pagination");

      url.searchParams.set("page", page);

      window.location.href = url;
    });
  });
}
// End Pagination

// Image preview
const imgPreview = document.querySelector("[img-preview]");
if (imgPreview) {
  const imgPreviewInput = document.querySelector("[img-preview-input]");
  const imgPreviewOutput = document.querySelector("[img-preview-output]");

  imgPreviewInput.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      imgPreviewOutput.src = URL.createObjectURL(file);
    }
  });
}
// End image preview
