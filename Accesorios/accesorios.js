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
  const listaAccesorios = new XMLHttpRequest();
  listaAccesorios.open("GET", "stockAccesorios.json", true);

  const filtroInput = document.querySelector(".filtro");
  const filtrarButton = document.querySelector(".filtrar-button");
 
  filtroInput.style.display = "block";
  filtrarButton.style.display = "block";

  filtrarButton.addEventListener("click", function () {
    const filtroInput = document.querySelector(".filtro");
    const accesoriosDatos = document.querySelector(".accesorios-datos");

    const filtroTexto = filtroInput.value.toLowerCase();

    const datosAccesorios = JSON.parse(listaAccesorios.responseText);

    const datosFiltradosAccesorios = datosAccesorios.filter(function (itemAccesorios) {
      return (
        itemAccesorios.articulo.toLowerCase().includes(filtroTexto) ||
        itemAccesorios.precio.toString().includes(filtroTexto)
      );
    });

    accesoriosDatos.innerHTML = "";

    for (let itemAccesorios of datosFiltradosAccesorios) {
      accesoriosDatos.innerHTML += `    
        <section> 
          <img src="${itemAccesorios.imagen}" alt="${itemAccesorios.articulo}">    
          <p>${itemAccesorios.articulo}</p>   
          <p>${itemAccesorios.color}</p>    
          <p>${itemAccesorios.precio}</p>
        </section>
      `;
    }
  });

  listaAccesorios.onreadystatechange = function () {
    if (listaAccesorios.readyState === 4 && listaAccesorios.status === 200) {
      let datosAccesorios = JSON.parse(listaAccesorios.responseText);

      let retornoAccesorios = document.querySelector(".accesorios-datos");
      retornoAccesorios.innerHTML = "";

      for (let itemAccesorios of datosAccesorios) {
        retornoAccesorios.innerHTML += `
          <section> 
            <img src="${itemAccesorios.imagen}" alt="${itemAccesorios.articulo}">    
            <p>${itemAccesorios.articulo}</p>    
            <p>Color: ${itemAccesorios.color}</p>    
            <p>$ ${itemAccesorios.precio}</p>
            <button type="button" class="anadir-carrito" onclick="agregarAlCarrito('${itemAccesorios.imagen}', '${itemAccesorios.articulo}', ${itemAccesorios.precio})"> Agregar al carrito </button>
          </section>            
        `;
      }
    }
  };

  listaAccesorios.send();
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