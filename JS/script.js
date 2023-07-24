//Varibles
var addBtn = document.querySelector("#add-product-btn");
var productName = document.getElementById("product-name-input");
var productDescription= document.getElementById("product-description-input");
var productCategory= document.getElementById("product-category-input");
var productPrice = document.getElementById("product-price-input");
var productQuantity = document.getElementById("product-quantity-input");
var displayProductData = document.getElementById("product-data-container");
var allProducts; //undefined

//Conditions

if(localStorage.getItem("products")){
    allProducts = JSON.parse(localStorage.getItem("products"));
    displayData();
}
else
{
    allProducts = [];
    displayProductData.innerHTML = "<p style='color:red'>There are no items to display.</p>";
}


//Listeners
addBtn.addEventListener("click",addProduct);

//Functions
function addProduct(){
    if(productName.value === "" || productDescription.value === "" || productCategory.value === "" || productPrice.value === "" || productQuantity.value === ""){
        alert("Please fill all fields with the valid data");
        return;
    }

    var product = {
        name: productName.value ,
        description: productDescription.value ,
        price: productPrice.value ,
        category: productCategory.value ,
        quantity: productQuantity.value
    }
    allProducts.unshift(product);
    localStorage.setItem("products" , JSON.stringify(allProducts));
    displayData();
    clearInputs();

    function displayData(){
        if(allProducts.length === 0){
            displayProductData.innerHTML = "<p style='color:red'>There are no items to display.</p>";
            return;
        }

        var temp = "";
        for(var i = 0 ; i < allProducts.length; i++){
            temp += `
            <div class="col-lg-4 col-md-6 mb-5">
            <div class="card">
            <img src=".\Images\Try.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${allProducts[i].name} <span class="badge bg-danger">${allProducts[i].category}</span></h5>
            <p class="card-text">${allProducts[i].price} L.E</p>
            <p class="card-text">${allProducts[i].description}</p>
            <p class="card-text">Quantity: ${allProducts[i].quantity}</p>
            <a href="#" class="btn btn-primary">details</a>
            <a onclick="deleteProduct(${i})" class="btn btn-danger">delete</a>
            <a href="#" class="btn btn-info">update</a>
            </div>
            </div>
            </div>
            `;
        }

        displayProductData.innerHTML = temp;

    }

    function deleteProduct(i) {
        var confirmation = confirm ("Are you sure you want to delete this product?");
        if (confirmation){
            allProducts.splice(i,1);
            localStorage.setItem("products", JSON.stringify(allProducts));
            displayData();
        }
    }

    function clearInputs(){
        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";
        productCategory.value = "";
        productQuantity.value = "";
    }
}

