document.addEventListener("DOMContentLoaded", traerDatos);

const burgerMenu = document.querySelector("#menu-icono");
const desktopMenu = document.querySelector(".menu-desktop");
const mobileMenu = document.querySelector(".menu-mobile");

let total = 0;

const carritoIcon = document.getElementById("carrito-icono");

carritoIcon.addEventListener('click', function(event) {
  event.stopPropagation(); //Evita que el evento de click se propague a elementos superiores
  toggleCarrito();
});

burgerMenu.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);

function traerDatos() {
  const listaCamperas = new XMLHttpRequest();
  listaCamperas.open("GET", "stockCamperas.json", true);

  const filtroInput = document.querySelector(".filtro");
  const filtrarButton = document.querySelector(".filtrar-button");
 
  filtroInput.style.display = "block";
  filtrarButton.style.display = "block";
  
  filtrarButton.addEventListener("click", function () {
    const filtroInput = document.querySelector(".filtro");
    const camperasDatos = document.querySelector(".camperas-datos");

    const filtroTexto = filtroInput.value.toLowerCase();

    const datosCamperas = JSON.parse(listaCamperas.responseText);

    const datosFiltradosCamperas = datosCamperas.filter(function (itemCamperas) {
      return (
        itemCamperas.articulo.toLowerCase().includes(filtroTexto) ||
        itemCamperas.precio.toString().includes(filtroTexto)
      );
    });

    camperasDatos.innerHTML = "";

    for (let itemCamperas of datosFiltradosCamperas) {
      camperasDatos.innerHTML += `    
        <section class="product"> 
          <img src="${itemCamperas.imagen}" alt="${itemCamperas.articulo}">    
          <div class="product-info"> 
            <p>${itemCamperas.articulo}</p>    
            <p>Talles: ${itemCamperas.talles}</p>    
            <p>Color:${itemCamperas.color}</p>    
            <p>$ ${itemCamperas.precio}</p>
            <button type="button" class="anadir-carrito" onclick="agregarAlCarrito('${itemCamperas.imagen}', '${itemCamperas.articulo}', ${itemCamperas.precio})"> Agregar al carrito </button>
          </div>
        </section>
      `;
    }
  });

  listaCamperas.onreadystatechange = function () {
    if (listaCamperas.readyState === 4 && listaCamperas.status === 200) {
      let datosCamperas = JSON.parse(listaCamperas.responseText);

      let retornoCamperas = document.querySelector(".camperas-datos");
      retornoCamperas.innerHTML = "";

      for (let itemCamperas of datosCamperas) {
        retornoCamperas.innerHTML += `
          <section class="product"> 
            <img src="${itemCamperas.imagen}" alt="${itemCamperas.articulo}">    
            <div class="product-info">
              <p>${itemCamperas.articulo}</p>    
              <p>Talles: ${itemCamperas.talles}</p>    
              <p>Color: ${itemCamperas.color}</p>    
              <p>$ ${itemCamperas.precio}</p>
              <button type="button" class="anadir-carrito" onclick="agregarAlCarrito('${itemCamperas.imagen}', '${itemCamperas.articulo}', ${itemCamperas.precio})" > Agregar al carrito </button>
            </div>    
          </section>            
        `;
      }
    }
  };

  listaCamperas.send();
}

function toggleDesktopMenu() {
  const carritoLista = document.getElementById("carrito-list");
  
  carritoLista.style.display = carritoLista.style.display === "block" ? "none" : "none";

  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu(){
  const carritoLista = document.getElementById("carrito-list");
  
  carritoLista.style.display = carritoLista.style.display === "block" ? "none" : "none";

  mobileMenu.classList.toggle('inactive');
}

function toggleCarrito() {
  const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');
  const isMobileMenuClosed = mobileMenu.classList.contains('inactive');

  if (!isDesktopMenuClosed) {
    desktopMenu.classList.add('inactive');
  }

  if (!isMobileMenuClosed) {
    mobileMenu.classList.add('inactive');
  }

  const carritoLista = document.getElementById("carrito-list");
  
  carritoLista.style.display = carritoLista.style.display === "none" || carritoLista.style.display === "" ? "block" : "none";
}

function agregarAlCarrito(imagen, articulo, precio) {
  const carritoContainer = document.getElementById("products-carrito");
  const nuevoProducto = document.createElement("div");

  const productId = Date.now().toString(); //Identificador unico para el producto

  nuevoProducto.id = productId;
  nuevoProducto.className = "producto-carrito";
  nuevoProducto.innerHTML = `<img src="${imagen}" alt="${articulo}"> 
                            <p> ${articulo} </p>  
                            <p> $ ${precio} </p>
                            <img src="/parcial_practicas/Imagenes/icon_close.png" alt="Eliminar producto" class="eliminar-producto" onclick="eliminarProducto('${productId}', ${precio})">
                            `;

  carritoContainer.appendChild(nuevoProducto);

  total += precio;
  actualizarTotal();
}

function eliminarProducto (productId, precio) {
  const product = document.getElementById(productId);

  product.remove();

  total -= precio;
  actualizarTotal();
}

function actualizarTotal() {
  const totalAmountElement = document.getElementById("total-amount");
  totalAmountElement.textContent = `$ ${total}`;
}