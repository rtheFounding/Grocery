const mode = document.getElementById("mode");
const results = document.getElementById("results");
const tBody = document.getElementById("tBody");
const tableDisplay = document.getElementById("tbl-display-section");
const images = document.getElementById("images")
let select = undefined; // global scope

function showAll() {
  tableDisplay.style.display = "block";
  fetch("http://localhost:8081/api/products")
    .then(response => response.json())
    .then(data => {
      data.sort(sortByProperty("productName"));
      data.forEach(product => {
        let row = tBody.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerText = product.productId;
        cell2.innerText = product.productName;

        const anchor = document.createElement("a");
        anchor.innerText = "see details";
        anchor.href = `./detail.html?id=${product.productId}`;
        cell3.appendChild(anchor);
      });
    });
}

function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
}

function showResults() {
  results.innerHTML = "";
  images.innerHTML = "";
  const id = select.selectedOptions[0].value;
  fetch("http://localhost:8081/api/categories/" + id)
    .then(response => response.json())
    .then(data => {
      data.forEach((p) => {
        images.innerHTML = `<img src="images/c${id}.png" class="icon"></a>`;
        data.sort(sortByProperty("productName"));
        const d = document.createElement("div");
        d.innerHTML += `<a href="detail.html?id=${p.productId}">${p.productName}</a>`;
        results.appendChild(d);
      });
    });
}

function createSelect() {
  select = document.createElement("select");
  fetch("http://localhost:8081/api/categories")
    .then(response => response.json())
    .then(data => {
      select.innerHTML = `<option value="0">Select a Category:</option>`;
      data.forEach(c => {
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
    if (undefined !== select) {
      select.remove();
    }
  }
});
