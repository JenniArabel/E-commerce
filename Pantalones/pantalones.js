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
  const listaPantalones = new XMLHttpRequest();
  listaPantalones.open("GET", "stockPantalones.json", true);

  const filtroInput = document.querySelector(".filtro");
  const filtrarButton = document.querySelector(".filtrar-button");

  filtroInput.style.display = "block";
  filtrarButton.style.display = "block";
  
  filtrarButton.addEventListener("click", function () {
    const filtroInput = document.querySelector(".filtro");
    const pantalonesDatos = document.querySelector(".pantalones-datos");

    const filtroTexto = filtroInput.value.toLowerCase();

    const datosPantalones = JSON.parse(listaPantalones.responseText);

    const datosFiltradosPantalones = datosPantalones.filter(function (itemPantalones) {
      return (
        itemPantalones.articulo.toLowerCase().includes(filtroTexto) ||
        itemPantalones.precio.toString().includes(filtroTexto)
      );
    });

    pantalonesDatos.innerHTML = "";

    for (let itemPantalones of datosFiltradosPantalones) {
      pantalonesDatos.innerHTML += `    
        <section> 
          <img src="${itemPantalones.imagen}" alt="${itemPantalones.articulo}">    
          <p>${itemPantalones.articulo}</p>    
          <p>${itemPantalones.talles}</p>    
          <p>${itemPantalones.color}</p>    
          <p>${itemPantalones.precio}</p>
        </section>
      `;
    }
  });

  listaPantalones.onreadystatechange = function () {
    if (listaPantalones.readyState === 4 && listaPantalones.status === 200) {
      let datosPantalones = JSON.parse(listaPantalones.responseText);

      let retornoPantalones = document.querySelector(".pantalones-datos");
      retornoPantalones.innerHTML = "";

      for (let itemPantalones of datosPantalones) {
        retornoPantalones.innerHTML += `
          <section> 
            <img src="${itemPantalones.imagen}" alt="${itemPantalones.articulo}">    
            <p>${itemPantalones.articulo}</p>    
            <p>Talles: ${itemPantalones.talles}</p>    
            <p>Color: ${itemPantalones.color}</p>    
            <p>$ ${itemPantalones.precio}</p>
            <button type="button" class="anadir-carrito" onclick="agregarAlCarrito('${itemPantalones.imagen}', '${itemPantalones.articulo}', ${itemPantalones.precio})"> Agregar al carrito </button>
          </section>       
        `;
      }
    }
  };

  listaPantalones.send();
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