const URL_PRDUCTO = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('productID')}.json`;
const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('productID')}.json`

function verInformacionProductos(e){
    informacion.innerHTML = `
    <div class="text-center p-4">
      <h2>Descripción del Producto</h2>
    </div>
    <h3>`+ e.name +`</h3>
    <hr class="my-3">
    <dl>
      <dt>Descripción:</dt>
      <dd>
        <p>`+ e.description +`</p>
      </dd>
      <dt>Categoría:</dt>
      <dd>
        <p>`+ e.category +`</p>
      </dd>
      <dt>Precio:</dt>
      <dd>
        <p>`+ e.currency +' '+ e.cost +`</p>
      </dd>
      <dt>Cantidad de Vendidos:</dt>
      <dd>
        <p>`+ e.soldCount +`</p>
      </dd>
      <dt>Imágenes ilustrativas:</dt>
      <dd>
        <p class='row' id='imagenes'></p>
      </dd>
      </dl>
      <div id='comentarioProducto'>
      </div>
      <div>
        <div class="mb-3">
            <label for="comentario" class="form-label">Comentario:</label>
            <textarea class="form-control" id="comentario" rows="3"></textarea>
            <label for="puntos">Puntuación:</label>
            <select name="puntos">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <br>
            <button>Enviar</button>
        </div>
      </div>
      <br>
      <hr class="my-3">
      <h3> Productos Relacionados: </h3>
      <div class="container" id="listaprodRela">
      </div>
      <hr class="my-3">

      `
}

function verImagenes(a){
    a.forEach(element => {
        imagenes.innerHTML  += `
    <div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
          <a>  <img class="img-fluid img-thumbnail"  src="` + element + `" alt=""> </a>
        </div>
    </div>
    `;
});
}

function verProductosRela(array){
  let htmlcodazo = "";
  for (let i = 0; i < array.length; i++){
    producto = array[i]; 
    htmlcodazo += `<div onclick="setProductID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="` + producto.image + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1 ">`+ producto.name + `</h4> 
                </div>
            </div>
        </div>
    </div>`
      document.getElementById("listaprodRela").innerHTML = htmlcodazo;
  }
}

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

function verComentarios(a){
    let comments = " ";
    let estrella = "";

    a.forEach(element => {
        let neg = 5;
        for (let e = 0; e < element.score; e++) {
            estrella += ` <span class="fa fa-star checked"></span>`
            neg--;
        }
        for (let e = 0; e < neg; e++) {
            estrella += ` <span class="fa fa-star"></span>`
        }
        comments += `
        <div class="container mt-3">
    
            <hr class="my-3">
            <dd>
                <div class="chip"> <i class="fas fa-user-alt"> </i>` + element.user + ` </div>  
            </dd>  
            <dd>
                <p > ` + element.description + `   <br>  </span>
                ` + estrella + `</p>
            </dd>
    <dt>Fecha: </dt>
            <dd>
                <p >  `+ element.dateTime + `</p>
            </dd>
            
            
    </div>`
    estrella = "";
  });
  comentarioProducto.innerHTML = comments;
}


document.addEventListener('DOMContentLoaded', ()=>{
    getJSONData(URL_PRDUCTO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            verInformacionProductos(resultObj.data);
            verImagenes(resultObj.data.images);
            verProductosRela(resultObj.data.relatedProducts);
        }
    });
    getJSONData(URL_COMMENTS).then(async function(resultObj){
        let response = await fetch(resultObj);
        if (resultObj.status === "ok")
        {
            verComentarios(resultObj.data);
        }
    });
    
    document.getElementById("userShow").innerHTML = localStorage.getItem("Usuario");

    cerrar.addEventListener("click", ()=>{
      localStorage.removeItem("Usuario");
      window.location = "index.html";
    });

});