const products = document.querySelectorAll(".product-item");
products.forEach((product) => {
  product.addEventListener("click", () => {
    const url = window.location.href;
    const productId = product.getAttribute("item-id");

    window.location.href = `${url}/detail/${productId}`;
    console.log(productId);
  });
});
