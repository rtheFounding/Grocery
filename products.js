const mode = document.getElementById("mode");
const results = document.getElementById("results");
let select = undefined; // global scope

function showAll() {
  results.innerHTML = "";
  fetch("http://localhost:8081/api/products")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((p) => {
        const d = document.createElement("div");
        d.innerHTML = `<a href="detail.html?id=${p.productId}">${p.productName}</a>`;
        results.appendChild(d);
      });
    });
}

function showResults() {
  results.innerHTML = "";
  const id = select.selectedOptions[0].value;
  fetch("http://localhost:8081/api/categories/" + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((p) => {
        const d = document.createElement("div");
        d.innerHTML = `<a href="detail.html?id=${p.productId}">${p.productName}</a>`;
        results.appendChild(d);
      });
    });
}

function createSelect() {
  select = document.createElement("select");
  fetch("http://localhost:8081/api/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((c) => {
        const option = document.createElement("option");
        option.value = c.categoryId;
        option.innerHTML = c.name;
        select.appendChild(option);
      });
      //document.body.appendChild(select)
      select.addEventListener("change", () => showResults());
      mode.after(select); // inserts new select after
    });
}
mode.addEventListener("change", () => {
  const value = mode.selectedOptions[0].value;
  if ("category" == value) {
    results.innerHTML = "";
    // create select
    createSelect();
  } else {
    showAll();
  }
});
