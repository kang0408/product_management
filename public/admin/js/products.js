const changeStatusButton = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
const path = formChangeStatus.getAttribute("path");

if (changeStatusButton) {
  changeStatusButton.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const changeStatus = statusCurrent == "active" ? "inactive" : "active";

      formChangeStatus.action = path + `/${changeStatus}/${id}?_method=PATCH`;
      formChangeStatus.submit();
    });
  });
}
