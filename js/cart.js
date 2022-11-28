const CART_EXIST = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let articulo = [];
let cantidades = 1;

function verCarrito(array){
    for (let i = 0; i < array.length; i++){
        carro = array[i];
        listacarrito.innerHTML += `<div class="container mt-3">
        <h2>Carrito de compras</h2>
        <p>Artículos a comprar:</p>            
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Costo</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>
                    <img src="` + carro.image + `" width=150px class="mx-auto d-block"">
              </td>
              <td>
                  <p>` + carro.name + `</p>
              </td>
              <td>
                  <p> `+ carro.currency+` `+ carro.unitCost +`</p>
              </td>
              <td>
                  <input type="number" id="numProducto" value="1" min="1" oninput="subTotal()">
              </td>
              <td>
                  <strong> ` + carro.currency + `<strong>
                  <strong id="subTotalCarro"> ` + carro.unitCost + ` <strong>
              </td>  
            </tr> 
          </tbody>
        </table> 
      </div>
      </div>
        `
    }
}

function verCostos(){
    totalCarrito = subTotal();
    console.log(totalCarrito); 
    costosCarrito.innerHTML += ` <br>
      <hr>
      <h4>Costos</h4>
      <div class="list-group">
        <a class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Subtotal</h5>
            <small> ` + subTotal() + `</small>
          </div>
          <p class="mb-1">Costo unitario del producto por cantidad</p>
        </a>
        <a class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Costo de envio</h>
            <small class="text-muted"> ` + costoEnvio() + ` </small>
          </div>
          <p class="mb-1">Según tipo de envio</p>
        </a>
        <a class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Total ($)</h5>
            <small class="text-muted"> ` + subTotal() + costoEnvio() + `</small>
          </div>
        </a>
      </div> `
}

function costoEnvio(){
    let cost = 0;
    if (premium.checked){
        return cost += subTotal() * 0.15;
    } else if(express.checked){
        return cost += subTotal() * 0.07;
    } else if(standar.checked){
        return cost += subTotal() * 0.05;
    }
}

function subTotal(){
    articulo.forEach(element => {
        valores = element;
        subTotalCarro.innerHTML = (cantidades.value * valores.unitCost);
    });
}

document.addEventListener("DOMContentLoaded", function(){
    
    getJSONData(CART_EXIST).then(function(result){
        if (result.status === "ok"){
            verCarrito(result.data.articles);
            articulo = result.data.articles;
            cantidades = document.getElementById("numProducto");
            verCostos();
        }
    });

    document.getElementById("userShow").innerHTML = localStorage.getItem("Usuario");

    cerrar.addEventListener("click", ()=>{
        localStorage.removeItem("Usuario");
        window.location = "index.html";
    });

});
