import * as XLSX from "xlsx";
console.log("hola");

var selectedFile;
var change = document.getElementById("fileUpload7");

var stok = [];
change.addEventListener("change", function (event) {
  //selectedFile = event.target.files[0];
  selectedFile = event.target.files;
  console.log(event.target.files);
});

// ===El contador y el database estan separados=== //
// ===El contador acciona el guardar en la database=== //

// ==La variable "stonk" almacena la database dispobible== //
// ==La variable "shop" almacena la database deseable== //

function additem(item, amount) {
  // =Del item se extrae el identificador code= //
  // =code esta ligado al item correspondiende de la database= //
  let code = item.__EMPTY;
  let empaque = item.__EMPTY_7;
  if (amount == 0.5) {
    item.__amount__ = amount;
    console.log("amount", amount);
    shop.push(item);
    let it = shop.findIndex(({ __EMPTY }) => __EMPTY == code);
    let index = it + 1;
    console.log("ITTTTTTT", it);
    let total = empaque * amount;
    console.log(empaque, "emp", amount, "amoun", total, "total", index, it);
    createRow(item);

  }
  if (amount >= 1) {
    console.log("search");
    // search into shop the code and change amount //
    let it = shop.findIndex(({ __EMPTY }) => __EMPTY == code);
    console.log("it");
    console.log(it);
    shop[it].__amount__ = amount;
    console.log("INDEXXXXXXXXXXXXX", it);
    let index = it + 1;
    console.log("holaaa", shop[it]);
    //======================================//
    //Encontrar el amount del row y multiplicarlo
    //convertir en funcion

  }
  console.log("additemwork");
  console.log(shop);
}

function delitem(item, amount) {
  let code = item.__EMPTY;
  let it = shop.findIndex(({ __EMPTY }) => __EMPTY == code);
  let empaque = item.__EMPTY_7;
  let index = it + 1;
  if (amount == 0) {
    console.log("del item");
    //del item from shop
    shop.splice(it, 1);
    //==============================================//
    document.getElementById("tbl_exporttable_to_xls").deleteRow(index);
  }
  if (amount > 0) {
    console.log("ES Mayor");
    console.log("it");
    console.log(it);
    shop[it].__amount__ = amount;
    console.log("holaaa", shop[it]);
    //=======================================================//
    var x = document.getElementById("tbl_exporttable_to_xls").rows[index].cells;
    x[4].innerHTML = empaque * amount;
  }
}
var upload = document.getElementById("uploadExcel");
var upload10 = document.getElementById("uploadExcel10");

upload.addEventListener("click", function () {
  for (let i = 0; i < selectedFile.length; i++) {
    console.log(selectedFile[i]);
    if (selectedFile[i]) {
      //console.log("hi");
      productos.innerHTML = "";
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var data = event.target.result;

        var workbook = XLSX.read(data, {
          type: "binary"
        });
        workbook.SheetNames.forEach((sheet) => {
          var rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          console.log(rowObject);

          //=A;adiendo los datos al array stok=
          rowObject.map((el) => {
            //console.log(el);
            if (el.__EMPTY != null && el.__EMPTY != "CODIGO") {
              stok.push(el);
              createItem(el);
            }
          });

          //===================================
          for (let i = 0; i < Object.keys(rowObject).length; i++) {
            var newObj = rowObject[i];
          }

          let jsonObject = JSON.stringify(rowObject, undefined, 4);
        });
       
        let limit = selectedFile.length - 1;
        if (i == limit) {
          actButton();
        }
      };
      fileReader.readAsBinaryString(selectedFile[i]);
    }
  }
});

var click = document.getElementById("click");

click.addEventListener("click", function () {
  console.log(stok);
});

var shop = [];

//apendChild
// == Div que cotendra la database disponible == //
const productos = document.getElementById("productos");

function createItem(el) {
  // Make the document element )that visualize the data
  var item = document.createElement("li");

  let code = el.__EMPTY;
  let name = el.__EMPTY_1;
  let empaque = el.__EMPTY_7;
  let stock = el.__EMPTY_8;

  //console.log("item" + name);
  //console.log("code" + code);

  const itemHTML = `
    <div class="maria">
      <div class="center">
        <div class="texto">
        <p>${name}</p>
        <p>${code} <strong>${empaque} / ${stock}</strong></p>
        </div>
      </div>
      <div class="controls">
          <i ope="minus" code="${code}" class="fa-solid fa-minus icons operation"></i>
          <i class="icons count" count="0" id="${code}">0</i>
          <i ope="sum" code="${code}" class="fa-solid fa-plus icons operation"></i>
      </div>
    </div>
    `;
  item.innerHTML = itemHTML;
  productos.appendChild(item);
}

const carrito = document.getElementById("tbl_items");

//Create table
function createRow(il) {
  var row = document.createElement("tr");
  let code = il.__EMPTY;
  let desc = il.__EMPTY_1;
  let amount = il.__amount__;
  let empaque = il.__EMPTY_7;
  const rowHTML = `
    <td class='code'>${code}</td>
    <td class='item'><p></p></td>
    <td class='desc'>${desc}</td>
    <td class='uni'>UNI</td>
    <td class='cant' contenteditable>${empaque}</td>
  `;
  row.innerHTML = rowHTML;
  carrito.append(row);
}

//document.getElementById("tbl_exporttable_to_xls").deleteRow(2);

//0 es para el primero y despues el 2 corresponde con el index2;

//creo una funcion que les agrege el valor a item alfinal.

//Al stok le pongo un amount PARA RECORDAR el numero de cantidad.

const buscador = document.getElementById("Buscador");

buscador.addEventListener("input", function (el) {
  productos.innerHTML = "";
  console.log(this.value);
  //let it = stok.filter(({ __EMPTY_1 }) => __EMPTY_1.match(`${this.value}`));
  let what = this.value;
  let pattern = new RegExp(what, "gi");
  let it = stok.filter(({ __EMPTY_1 }) => __EMPTY_1.match(pattern));
  console.log(it);

  //console.log("stok", stok);

  it.map((el) => {
    console.log(el);
    createItem(el);
  });
  actButton();
  it = [];
});

//CREAR UN SISTEMA QUE OCULTE LOS DISPLAY NO UTILIZADOS,
//ASI NO SE PIERDE EL REACTIVIDAD

function actButton() {
  const elements = document.querySelectorAll(".operation");

  elements.forEach((element) => {
    let numCount = 0;
    element.addEventListener("click", (element) => {
      console.log("Clicked!");
      if (element.target.classList.contains("fa-minus")) {
        //Get count value to aument
        let code = element.target.getAttribute("code");
        //With code get count
        let count = document.getElementById(`${code}`);
        let counter = count.getAttribute("count");
        //increase counter
        console.log(counter);
        if (counter == 0.5) {
          counter = parseFloat(counter) - 0.5;
        } else {
          counter--;
        }
        console.log(counter);
        //Set counter to element
        count.setAttribute("count", `${counter}`);
        //Change display value to increment
        count.innerHTML = counter;
        // find code into database(stok)
        let it = stok.find(({ __EMPTY }) => __EMPTY == code);
        console.log(it);
        delitem(it, counter);
        // push from database to shop array
        console.log("Shop", shop);
      }
      if (element.target.classList.contains("fa-plus")) {
        //Get count value to aument
        let code = element.target.getAttribute("code");
        //With code get count
        let count = document.getElementById(`${code}`);
        let counter = count.getAttribute("count");
        //increase counter
        console.log(counter);
        if (counter == 0) {
          counter = 0.5;
        } else {
          counter = Math.round(parseFloat(counter) + 0.5);
          console.log("COUNTERRRR", counter);
        }
        console.log(counter);
        //Set counter to element
        count.setAttribute("count", `${counter}`);
        //Change display value to increment
        count.innerHTML = counter;
        // find code into database(stok)
        let it = stok.find(({ __EMPTY }) => __EMPTY == code);
        console.log(it);
        additem(it, counter);

        //

        // delete from database to shop array
        console.log("Shop", shop);
      }
    });
  });
}

function delRow(el) {
  var tbl = el.parentNode.parentNode.parentNode;
  var row = el.parentNode.parentNode.rowIndex;
  console.log(row);
  console.log(tbl);
  tbl.deleteRow(row);
}

function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById("tbl_exporttable_to_xls");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MySheetName." + (type || "xlsx"));
}

const button = document.getElementById("click");

button.addEventListener("click", function () {
  ExportToExcel("xlsx");
});

const market = document.getElementById("market");

market.addEventListener("click", function () {
  let izq = document.getElementById("cajaizquierda");
  let der = document.getElementById("cajaderecha");
  console.log(izq.classList.contains("activeizq"));
  if (izq.classList.contains("activeizq")) {
    izq.classList.remove("activeizq");
    izq.classList.add("disableizq");
    der.classList.add("activeder");
    der.classList.remove("disableder");
  } else {
    izq.classList.add("activeizq");
    izq.classList.remove("disableizq");
    der.classList.remove("activeder");
    der.classList.add("disableder");
  }
  console.log(der);
});

function deletedata(){
  shop = [];
  let table = document.getElementById('tbl_items');
  table.innerHTML = "";
}


const buttondel = document.getElementById("buttondel");

buttondel.addEventListener("click", function () {
  deletedata();
});
