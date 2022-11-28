//Modificación de la carga del listado del producto
const productos = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";
let listaProductos = [];
//Constantes para filtrar
const ORDER_ASC_BY_PRICE = "Precio";
const ORDER_DESC_BY_PRICE = "precio";
const ORDER_BY_PROD_COUNT = "Cant.";

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function verProductos(array){
    let htmlcodazo = "";
    for (let i = 0; i < array.length; i++){
        producto = array[i]; 
        htmlcodazo += `<div onclick="setProductID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt=" `+ producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1 ">`+ producto.name + `</h4> 
                        <small class="text-muted"> ` + producto.currency  + `' '` + producto.cost + `</small>
                    </div>
                    <div class="text-muted"> <h5>` + producto.description + `</h5></div>
                    </div>
                </div>
            </div>
        </div>`
        document.getElementById("listaprod").innerHTML = htmlcodazo;
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    getJSONData(productos).then(function(result){
        if (result.status === "ok"){
            verProductos(result.data.products);
            listaProductos = result.data.products;
        }
    });

    //agregar usuario
    document.getElementById("userShow").innerHTML = localStorage.getItem("Usuario");

    //Según el identificador es que mensaje completará en la página.
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            resultObj.data.forEach(e => {
                if (e.id == localStorage.getItem("catID")) {
                    document.getElementById("quees").innerHTML += `<p class="lead">Verás aquí todos los productos de la categoría ${e.name}.</p>`
                }
            });
        }
    });

    // Filtros 
    function productosOrdenados(criterio, array){
        let resultado = [];
        
        //Orden Ascendente de precios. (Min a max)
        if(criterio === ORDER_ASC_BY_PRICE){
            resultado = array.sort(function(a, b){
                if(a.cost < b.cost){return -1;}
                if(a.cost > b.cost){return 1;}
                return 0;
            });
        
        //Orden descendente de precios. (Max a min)
        }else if(criterio === ORDER_DESC_BY_PRICE){
            resultado = array.sort(function(a, b){
                if (a.cost > b.cost) {return -1;}
                if (a.cost < b.cost) {return 1;}
                return 0;
            });
        
        //Cantidad de vendidos
        }else if (criterio === ORDER_BY_PROD_COUNT){
            resultado = array.sort(function(a, b){
                let aCount = parseInt(a.soldCount);
                let bCount = parseInt(b.soldCount);
                if (aCount > bCount) {return -1;}
                if (aCount < bCount) {return 1;}
                return 0;
            });
        }
        return resultado;
    }

    //1ero del Menor al mayor
    document.getElementById("sortMinMax").addEventListener("click", function(){
        let arrayOrdenado = productosOrdenados(ORDER_ASC_BY_PRICE, listaProductos);
        verProductos(arrayOrdenado);
    });

    //2do del Mayor al menor
    document.getElementById("sortMaxMin").addEventListener("click", function(){
        let arrayOrdenado = productosOrdenados(ORDER_DESC_BY_PRICE, listaProductos);
        verProductos(arrayOrdenado);
    });

    //3ero Según cantidad de vendidos.
    document.getElementById("sortByCount").addEventListener("click", function(){
        let arrayOrdenado = productosOrdenados(ORDER_BY_PROD_COUNT, listaProductos);
        verProductos(arrayOrdenado);
    });

    //por rango de precio elegido
    document.getElementById("rangeFiltrar").addEventListener("click", function(){
        let filtro = listaProductos.filter(function(e){
                return e.cost >= rangeFilterMin.value && e.cost <= rangeFilterMax.value;  
        });
        verProductos(filtro);
    });

    //"Limpiar" lista según el JSON
    document.getElementById("limpiarRangeFilter").addEventListener("click", function(){
        getJSONData(productos).then(function(result){
            if (result.status === "ok"){
                verProductos(result.data.products);
            }
        });
    });


    cerrar.addEventListener("click", ()=>{
        localStorage.removeItem("Usuario");
        window.location = "index.html";
});

});