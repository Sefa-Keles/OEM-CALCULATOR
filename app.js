// STORAGE CONTROLLER (IMMEDIATE FUNCTION)
const StorageController = (function(){



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

    //DUMMY DATA
    const data = {
        products: [
            // {
            //     id: 1, name: "Dell Monitor", price: 170
            // },
            // {
            //     id: 2, name: "Philips Monitor", price: 110
            // },
            // {
            //     id: 3, name: "MSI Monitor", price: 100
            // }
        ],
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
        }
    }
        
    
})();



// UI CONTROLLER (IMMEDIATE FUNCTION)
const UiController = (function(){

    //Selectors Types For Querry Selector
    const selectors = {
        productList: "#item-list",
        productName: "#productName",
        productPrice: "#productPrice",
        addBtn: ".addBtn",
        productCard: "#productCard"
    }

    return {
        createProductList: function(products){
            
            let html= "";
            products.forEach(prd => {
                html += `
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td class="text-right">
                            <button type="submit" class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i>
                            </button>
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
        addProductToList: function(prd){

            document.querySelector(selectors.productCard).style.display = "block";

            let item = `
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price}</td>
                    <td class="text-right">
                        <button type="submit" class="btn btn-warning btn-sm">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;

            document.querySelector(selectors.productList).innerHTML += item;
        },
        clearInputs: function(){
            document.querySelector(selectors.productName).value = "";
            document.querySelector(selectors.productPrice).value = "";
        },
        hideCardList: function(){
            document.querySelector(selectors.productCard).style.display = "none";
        }
    }

})();



// APP CONTROLLER (IMMEDIATE FUNCTION)
const AppController = (function(productController, uiController){
    
    const selectors = uiController.getSelectors();

    // Where  All Event Listeners Are Managed
    const loadEventListeners = function(){
        
        //Add Product
        document.querySelector(selectors.addBtn).addEventListener("click", submitAddProduct);
    }

    const submitAddProduct = (e) =>{

        const productName = document.querySelector(selectors.productName).value;
        const productPrice = document.querySelector(selectors.productPrice).value;

        if(productName !=="" || productPrice !==""){

            //Add Product
            const newProduct = productController.addProduct(productName, parseFloat(productPrice));
            
            //Add Product To UI List
            uiController.addProductToList(newProduct);

            // Clear Inputs
            uiController.clearInputs();
        }

        e.preventDefault();
    }

    return {
        //Bu fonksiyon, hangi modulun ilk once baslatilacagini yani tetiklenecegini belirler. Bu yuzden onemlidir. 
        init: function(){
            console.log("App is starting...")
            const products = productController.getProducts();

            if(products.length === 0){
                uiController.hideCardList();
            }else{
                uiController.createProductList(products);
            }
           
            

            //Load Event Listener
            loadEventListeners();
        }
    }

})(ProductController, UiController);

AppController.init();