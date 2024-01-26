var productName =document.getElementById("productName")
var productPrice =document.getElementById("productPrice")
var productCatg =document.getElementById("productCatg")
var productDesc =document.getElementById("productDesc")
var productCount =document.getElementById("productCount")
var products ;
var total = 0;

if (localStorage.getItem("saved") == null) {
    products= [];
    
}
else{
    products= JSON.parse(localStorage.getItem("saved")) ;
    displayCart();

    
}
function addProduct() {
    if (validateForm()) {
        var product = {
            pName: productName.value,
            pPrice: productPrice.value,
            pCatg: productCatg.value,
            pDesc: productDesc.value,
            pCount: productCount.value
        };

        products.push(product);
        localStorage.setItem("saved", JSON.stringify(products));

        displayCart();
        clr();
    }
}
function displayCart(filteredProducts) {
    var productlist = "";
    var productsToDisplay = filteredProducts || products;

    // Reset total price
    total = 0;

    for (let i = 0; i < productsToDisplay.length; i++) {
        // Calculate the price for each row (price per item)
        var priceForRow = parseFloat(productsToDisplay[i].pPrice) * parseInt(productsToDisplay[i].pCount);
        
        // Add the price for this row to the total
        total += priceForRow;

        productlist += `
        <tr>
            <td>${i + 1}</td>
            <td>${productsToDisplay[i].pName}</td>
            <td>${productsToDisplay[i].pPrice}</td>
            <td>${productsToDisplay[i].pCatg}</td>
            <td>${productsToDisplay[i].pDesc}</td>
            <td>${productsToDisplay[i].pCount}</td>
            <td>${priceForRow.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="delRow(${i})" data-index="${i}"><i class="fa-regular fa-trash-can"></i></button>
                <button type="button" class="btn btn-warning" onclick="editRow(${i})"><i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i></button>
            </td>
        </tr>
        `;
    }

    // Display the total price as the sum of the prices in the "Price" column
    document.getElementById("totalPrice").textContent = total.toFixed(2);

    document.getElementById("tbody").innerHTML = productlist;
}



function clr() {
    productName.value =""
    productPrice.value =""
    productCatg.value =""
    productDesc.value =""
}
function delAll() {

    clr();
    products.splice(0)
    displayCart()
localStorage.setItem("saved" , JSON.stringify(products));

}
function delRow(index) {
    if (products[index].pCount > 1) {
        // If the count is greater than 1, decrement the count by 1
        products[index].pCount--;
    } else {
        // If the count is 1 or less, remove the entire product from the array
        products.splice(index, 1);
    }

    localStorage.setItem("saved", JSON.stringify(products));
    displayCart();
}
function editRow(i) {
    productName.value = products[i].pName;
    productPrice.value = products[i].pPrice;
    productCatg.value = products[i].pCatg;
    productDesc.value = products[i].pDesc;
    productCount.value = products[i].pCount; 

    // Update the local storage
    localStorage.setItem("saved", JSON.stringify(products));

    // Display the "Update" button and hide the "Add Product" button
    document.getElementById("addProduct").style.display = "none";
    document.getElementById("upProduct").style.display = "inline-block";
    document.getElementById("upProduct").onclick = function () {
        updateProduct(i); // Pass the index to updateProduct
    };

    // Update the display
    displayCart();
}

// Function to update an edited product
function updateProduct(i) {
    if (validateForm()) {
        products[i].pName = productName.value;
        products[i].pPrice = productPrice.value;
        products[i].pCatg = productCatg.value;
        products[i].pDesc = productDesc.value;
        products[i].pCount = productCount.value; 

        localStorage.setItem("saved", JSON.stringify(products));

        clr();
        displayCart();
    }
}

// Function to validate the form
function validateForm() {
    var isValid = true;

    if (productName.value.trim() === "") {
        isValid = false;
        alert("Product Name is required.");
    }
    if (productPrice.value.trim() === "") {
        isValid = false;
        alert("Product Price is required.");
    }
    if (productCatg.value.trim() === "") {
        isValid = false;
        alert("Product Category is required.");
    }
    if (productDesc.value.trim() === "") {
        isValid = false;
        alert("Product Description is required.");
    }

    return isValid;
}


function searchProducts() {
    var searchInput = document.getElementById("search");
    var searchTerm = searchInput.value.toLowerCase();
    var filteredProducts = products.filter(function (product) {
        return (
            product.pName.toLowerCase().includes(searchTerm) ||
            product.pCatg.toLowerCase().includes(searchTerm) ||
            product.pDesc.toLowerCase().includes(searchTerm)
        );
    });
    displayCart(filteredProducts);
}
