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

// Change multi status
const checkBoxMulti = document.querySelector("[checkbox-multi]");

if (checkBoxMulti) {
  const checkBoxAll = checkBoxMulti.querySelector("input[name='checkall']");
  const checksBoxId = checkBoxMulti.querySelectorAll("input[name='id']");

  checkBoxAll.addEventListener("click", () => {
    checksBoxId.forEach((item) => {
      if (checkBoxAll.checked) {
        item.checked = true;
        cntCheckBox = checksBoxIdQuantity;
      } else {
        item.checked = false;
        cntCheckBox = 0;
      }
    });
  });

  const checksBoxIdQuantity = checksBoxId.length;
  let cntCheckBox = 0;

  checksBoxId.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.checked) {
        cntCheckBox++;
      } else {
        cntCheckBox--;
      }

      if (cntCheckBox == checksBoxIdQuantity) {
        checkBoxAll.checked = true;
      } else {
        checkBoxAll.checked = false;
      }
    });
  });
}

// Change multi form
const changeMultiForm = document.querySelector("[form-change-multi]");
if (changeMultiForm) {
  changeMultiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputsChecked = document.querySelectorAll("input[name='id']:checked");

    if (inputsChecked.length == 0) alert("Chon san pham de!!!");
    else {
      let ids = [];
      const inputIds = changeMultiForm.querySelector("input[name='ids']");

      inputsChecked.forEach((input) => ids.push(input.value));
      inputIds.value = ids.join(", ");

      changeMultiForm.submit();
    }
  });
}

// Delete product form
const deleteButton = document.querySelectorAll("[btn-delete]");
if (deleteButton.length > 0) {
  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      const isConform = confirm("Xac nhan xoa khong !???");

      if (isConform) {
        const id = button.getAttribute("data-id");
        const deleteForm = document.querySelector("#form-delete");
        const deletePath = deleteForm.getAttribute("path");

        deleteForm.action = `${deletePath}/${id}?_method=DELETE`;

        deleteForm.submit();
      }
    });
  });
}
