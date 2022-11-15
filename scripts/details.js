let params = new URL(document.location).searchParams;
let id = params.get('id');


const results = document.getElementById("results");
const table = document.getElementById("tBody");


function buildInfoRow(table, product) {
  let row = table.insertRow(-1);

  let cell1 = row.insertCell(0);
  cell1.innerText = product.productName;

  let cell2 = row.insertCell(1);
  cell2.innerText = product.supplier;

  let cell3 = row.insertCell(2);
  let price = Number(product.unitPrice);
  cell3.innerText = `Price: ${price.toFixed(2)}`;

  let cell4 = row.insertCell(3);
  cell4.innerText = product.unitsInStock;
}

table.innerHTML = "";
fetch("http://localhost:8081/api/products/" + id)
  .then(response => response.json())
  .then(data => {
    buildInfoRow(table, data)
    });
