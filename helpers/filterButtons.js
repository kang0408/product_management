module.exports = (query) => {
  const filterButtons = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (query.status) {
    const idxButton = filterButtons.findIndex(
      (btn) => btn.status == query.status
    );
    filterButtons[idxButton].class = "active";
  } else {
    const idxButton = filterButtons.findIndex((btn) => btn.status == "");
    filterButtons[idxButton].class = "active";
  }

  return filterButtons;
};
