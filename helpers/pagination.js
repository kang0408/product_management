module.exports = (objectPagination, countPages, query) => {
  objectPagination.totalPages = Math.ceil(
    countPages / objectPagination.limitedPage
  );

  if (query.page) {
    objectPagination.currentPage = Number(query.page);
    objectPagination.skipPage = Number(
      (objectPagination.currentPage - 1) * objectPagination.limitedPage
    );
  }

  return objectPagination;
};
