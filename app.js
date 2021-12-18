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
            {
                id: 1, name: "Dell Monitor", price: 170
            },
            {
                id: 2, name: "Philips Monitor", price: 110
            },
            {
                id: 3, name: "MSI Monitor", price: 100
            }
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
        }
    }
        
    
})();



// UI CONTROLLER (IMMEDIATE FUNCTION)
const UiController = (function(){

    //Selectors Types For Querry Selector
    const selectors = {
        productList: "#item-list"
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
        }
    }

})();



// APP CONTROLLER (IMMEDIATE FUNCTION)
const AppController = (function(productController, uiController){
 

    return {
        //Bu fonksiyon, hangi modulun ilk once baslatilacagini yani tetiklenecegini belirler. Bu yuzden onemlidir. 
        init: function(){
            console.log("App is starting...")
            const products = productController.getProducts();
           
            uiController.createProductList(products);
        }
    }

})(ProductController, UiController);

AppController.init();