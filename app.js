// STORAGE CONTROLLER (IMMEDIATE FUNCTION)
const StorageController = (function(){

    return {
        storeProduct: function(prd) {
            let products;
            if(localStorage.getItem("products") === null){
                products = [];
                products.push(prd);
            }else{
                products = JSON.parse(localStorage.getItem("products"));
                products.push(prd);
            }
            localStorage.setItem("products", JSON.stringify(products));
        },
        getProductFromLS: function() {
            let products;
            if(localStorage.getItem("products") === null){
                products = [];
            }else{
                products = JSON.parse(localStorage.getItem("products"))
            }
            return products;
        },
        updateLocalStorage: function(updatedProduct){
            let products = JSON.parse(localStorage.getItem("products"));

            products.forEach(function(prd,index){
                if(prd.id === updatedProduct.id){
                    products.splice(index,1,updatedProduct);
                }
                localStorage.setItem("products", JSON.stringify(products));
            })
        },
        deleteProducFromLS: function(id){
            let products = JSON.parse(localStorage.getItem("products"));

            products.forEach(function(prd,index){
                if(prd.id === id){
                    products.splice(index,1);
                }
                localStorage.setItem("products", JSON.stringify(products));
            })
        }
    }

})();



// PRODUCT CONTROLLER (IMMEDIATE FUNCTION)
const ProductController = (function(){
    
    //Private Section
    //PRODUCT CONSTRUCTOR
    class Product {
        constructor(id, name, price){
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }

    //Database
    const data = {
        products: StorageController.getProductFromLS(),
        selectedProduct: null,
        totalPrice: 0
    }
    

    //Public Section
    return {
        getProducts: function(){
            return data.products;
        },
        getData: function(){
            return data;
        },
        addProduct: function(name, price){

            //Editing The Product Id
            let id;
            if(data.products.length > 0){
                id = data.products[data.products.length-1].id+1;                
            }else{
                id = 0;
            }

            const newProduct = new Product(id, name, price);
            data.products.push(newProduct);
            return newProduct;
        },
        updateProduct: function(name, price){
            let product = null;

            data.products.forEach(function(prd){
                if(prd.id === data.selectedProduct.id){
                    prd.name = name;
                    prd.price = parseFloat(price);
                    product = prd;
                }
            });

            return product;
        },
        deleteSelectedProduct: function(product){
            data.products.forEach(function(prd, index){
                if(prd.id ===product.id){
                    data.products.splice(index, 1)
                }
            })
        },
        getTotalPrice: function(){
            let total = 0; 

            data.products.forEach(item => {
                total += item.price;
            });
            data.totalPrice = total;
            return data.totalPrice;

        },
        getProductById: function(id){
            let product = null;
            
            data.products.forEach(function(prd){
                if(prd.id == id){
                    product = prd;
                }
            })

            return product;
        },
        getCurrentProductData: function(){
            return data.selectedProduct;
        },
        setCurrentProduct: function(product){
            data.selectedProduct = product;
        }
    }
        
    
})();



// UI CONTROLLER (IMMEDIATE FUNCTION)
const UiController = (function(){

    //Selectors Types For Querry Selector
    const selectors = {
        productList: "#item-list",
        productListItems: "#item-list tr",
        productName: "#productName",
        productPrice: "#productPrice",
        addBtn: ".addBtn",
        updateBtn: ".updateBtn",
        deleteBtn: ".deleteBtn",
        cancelBtn: ".cancelBtn",
        productCard: "#productCard",
        totalTL: "#total-tl",
        totalPound: "#total-pound"
    }

    return {
        //Show All Product List
        createProductList: function(products){
            
            let html= "";
            products.forEach(prd => {
                html += `
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td class="text-right">
                            <i class="fas fa-edit edit-product"></i>
                        </td>
                    </tr>
                `;
            });

            //Dynamic Selector 
            document.querySelector(selectors.productList).innerHTML = html;
        },
        getSelectors: function(){
            return selectors;
        },
        //Add Product To List
        addProductToUI: function(prd){

            document.querySelector(selectors.productCard).style.display = "block";

            let item = `
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price}</td>
                    <td class="text-right">
                        <i class="fas fa-edit edit-product"></i>
                    </td>
                </tr>
            `;

            document.querySelector(selectors.productList).innerHTML += item;
        },
        updateProductUI: function(prd){
            let updatedItem = null;
            let tableRows = document.querySelectorAll(selectors.productListItems);

            tableRows.forEach(function(item){
                if(item.classList.contains("bg-warning")){
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price + " £";
                    updatedItem = item;
                }
            })

            return updatedItem;
        },
        deleteProductUI: function(){
            let items = document.querySelectorAll(selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains("bg-warning")){
                    item.remove();
                }
            })
        },
        showTotalPrice: function(total){
            document.querySelector(selectors.totalPound).textContent = total;
            document.querySelector(selectors.totalTL).textContent = 2*total;
        },
        addProductToForm: function(){
            const selectedProduct = ProductController.getCurrentProductData();
            document.querySelector(selectors.productName).value = selectedProduct.name;
            document.querySelector(selectors.productPrice).value = selectedProduct.price;
        },
        addingState: function(){
            UiController.removeWarnings();
            UiController.clearInputs();
            document.querySelector(selectors.addBtn).style.display = "inline"
            document.querySelector(selectors.updateBtn).style.display = "none"
            document.querySelector(selectors.deleteBtn).style.display = "none"
            document.querySelector(selectors.cancelBtn).style.display = "none"
        },
        editingState: function(tr){
            tr.classList.add("bg-warning");
            document.querySelector(selectors.addBtn).style.display = "none"
            document.querySelector(selectors.updateBtn).style.display = "inline"
            document.querySelector(selectors.deleteBtn).style.display = "inline"
            document.querySelector(selectors.cancelBtn).style.display = "inline"
        },
        clearInputs: function(){
            document.querySelector(selectors.productName).value = "";
            document.querySelector(selectors.productPrice).value = "";
        },
        removeWarnings: function(){
            const warningRows = document.querySelectorAll(selectors.productListItems);
            warningRows.forEach(function(item){
                if(item.classList.contains("bg-warning")){
                    item.classList.remove("bg-warning");
                }
            })
        },
        hideCardList: function(){
            document.querySelector(selectors.productCard).style.display = "none";
        }
    }

})();



// APP CONTROLLER (IMMEDIATE FUNCTION)
const AppController = (function(productController, uiController, localStorageController){
    
    const selectors = uiController.getSelectors();

    // Where  All Event Listeners Are Managed
    const loadEventListeners = function(){
        
        //Add Product
        document.querySelector(selectors.addBtn).addEventListener("click", submitAddedProduct);
        
        //Edit Product Item From UI
        document.querySelector(selectors.productList).addEventListener("click", clickEditedProduct);

        //Click Save Changes To Submit
        document.querySelector(selectors.updateBtn).addEventListener("click", submitEditProduct);

        //Click Cancel Button
        document.querySelector(selectors.cancelBtn).addEventListener("click", cancelUpdateProduct);

        //Delete Button
        document.querySelector(selectors.deleteBtn).addEventListener("click", deleteSelectedProduct);


    }

    const submitAddedProduct = (e) =>{

        const productName = document.querySelector(selectors.productName).value;
        const productPrice = document.querySelector(selectors.productPrice).value;

        if(productName !=="" || productPrice !==""){

            //Add Product
            const newProduct = productController.addProduct(productName, parseFloat(productPrice));
            
            //Add Product To UI List
            uiController.addProductToUI(newProduct);

            //Add Product To Local Storage
            localStorageController.storeProduct(newProduct);

            //Get Total Price
            const total = productController.getTotalPrice();

            //Show Total Price in UI
            uiController.showTotalPrice(total);

            // Clear Inputs
            uiController.clearInputs();
        }

        e.preventDefault();
    }

    const clickEditedProduct = (e) =>{
        if(e.target.classList.contains("edit-product")){
            const productId = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            //Get Selected Product
            const product = productController.getProductById(productId);

            //Set Current Product
            productController.setCurrentProduct(product);

            //Clear Warning
            uiController.removeWarnings();

            //Add Product To UI
            uiController.addProductToForm();

            const tr = e.target.parentNode.parentNode;
            uiController.editingState(tr);
        };


        e.preventDefault();
    }

    const submitEditProduct = (e) => {
        const productName = document.querySelector(selectors.productName).value;
        const productPrice = document.querySelector(selectors.productPrice).value;

        if(productName !== "" && productPrice !== ""){

            //Update Product
            const updatedProduct = productController.updateProduct(productName, productPrice);

            //Update UI
            const updatedItem = uiController.updateProductUI(updatedProduct);

            //Get Total Price
            const total = productController.getTotalPrice();

            //Show Total Price in UI
            uiController.showTotalPrice(total);

            //Update Local Storage
            localStorageController.updateLocalStorage(updatedProduct);

            uiController.addingState();
        }

        


        e.preventDefault();
    }

    const cancelUpdateProduct = (e) => {
        uiController.addingState();
        uiController.removeWarnings();

        e.preventDefault();
    }

    const deleteSelectedProduct = (e) => {

        //Get Selected Product
        const selectedProduct = productController.getCurrentProductData();

        //Delete Selected Product
        productController.deleteSelectedProduct(selectedProduct);

        // Delete Selected  Product From UI
        uiController.deleteProductUI();

        //Get Total Price
        const total = productController.getTotalPrice();

        //Show Total Price in UI
        uiController.showTotalPrice(total);

        //Delete Product From Local Storage
        localStorageController.deleteProducFromLS(selectedProduct.id);

        uiController.addingState();

        if(total == 0){
         uiController.hideCardList();
        }

        e.preventDefault();
    }

    return {
        //Bu fonksiyon, hangi modulun ilk once baslatilacagini yani tetiklenecegini belirler. Bu yuzden onemlidir. 
        init: function(){
            console.log("App is starting...")
            uiController.addingState();
            const products = productController.getProducts();

            if(products.length === 0){
                uiController.hideCardList();
            }else{
                uiController.createProductList(products);
            }

            //Get Total Price
            const total = productController.getTotalPrice();

            //Show Total Price in UI
            uiController.showTotalPrice(total);


            //Load Event Listener
            loadEventListeners();
        }
    }

})(ProductController, UiController, StorageController);

AppController.init();