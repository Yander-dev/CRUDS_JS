let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let newUpdate = "create"
let tmp;


// get total

function getTotal() {
    if(price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result
        total.style.background = "green"
    }else{
        total.innerHTML = "";
        total.style.background = "rgb(167, 24, 14)"
    }
}

// create product

let dataPro;
if(localStorage.product !=null) {
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = []
}

submit.onclick = function() {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }


    // count items 
    if(title.value != "" && price.value != "" && category.value != "" ){
        if(newUpdate === "create") {
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }}else{
                    dataPro.push(newPro);
                }
        }else{
            dataPro[tmp] = newPro;
            newUpdate = "create";
            submit.innerHTML = "Create"
            count.style.display = "block"

            clearData() // dont clear the data if any condition didnt work
        }
    }


    

    // save in localstorage 
    localStorage.setItem("product", JSON.stringify(dataPro))

    showData()
}

// clear data 

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// show data 

function showData() {

    getTotal()

    let table = "";
    for(let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }

    document.getElementById("tbody").innerHTML = table;

    let deleteAll = document.getElementById("deleteAll");
    if(dataPro.length > 0) {
        deleteAll.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        deleteAll.innerHTML = "";
    }
}
showData()

// delete 1 item 

function deleteData (i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

// delete all items 

function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// update 

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal() //
    count.style.display = "none"
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    newUpdate = "Update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


// search

let searchMood = "title"
let search = document.getElementById("search")

function getSearch(id) {
    if(id == "searchTitle"){
        searchMood = "title"
        search.placeholder = "search by title"
    }else{
        searchMood = "category"
        search.placeholder = "search by category"
    }

    search.focus()
    search.value = ""
    showData()
}

function searchData(value) {
    let table = "";

    if(searchMood == "title"){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `
            }
        }



    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){

                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;

}


