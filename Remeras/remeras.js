const burgerMenu = document.querySelector("#menu-icono");
const desktopMenu = document.querySelector(".menu-desktop");
const mobileMenu = document.querySelector(".menu-mobile");

document.addEventListener("DOMContentLoaded", traerDatos);

function traerDatos() {
  const listaRemeras = new XMLHttpRequest();
  listaRemeras.open("GET", "stockRemeras.json", true);

  const filtroInput = document.querySelector(".filtro");
  const filtrarButton = document.querySelector(".filtrar-button");
 
  filtroInput.style.display = "block";
  filtrarButton.style.display = "block";

  filtrarButton.addEventListener("click", function () {
    const filtroInput = document.querySelector(".filtro");
    const remerasDatos = document.querySelector(".remeras-datos");

    const filtroTexto = filtroInput.value.toLowerCase();

    const datosRemeras = JSON.parse(listaRemeras.responseText);

    const datosFiltradosRemeras = datosRemeras.filter(function (itemRemeras) {
      return (
        itemRemeras.articulo.toLowerCase().includes(filtroTexto) ||
        itemRemeras.precio.toString().includes(filtroTexto)
      );
    });

    remerasDatos.innerHTML = "";

    for (let itemRemeras of datosFiltradosRemeras) {
      remerasDatos.innerHTML += `    
        <section> 
          <img src="${itemRemeras.imagen}" alt="${itemRemeras.articulo}">    
          <p>${itemRemeras.articulo}</p>    
          <p>${itemRemeras.talles}</p>    
          <p>${itemRemeras.color}</p>    
          <p>${itemRemeras.precio}</p>
        </section>
      `;
    }
  });

  listaRemeras.onreadystatechange = function () {
    if (listaRemeras.readyState === 4 && listaRemeras.status === 200) {
      let datosRemeras = JSON.parse(listaRemeras.responseText);

      let retornoRemeras = document.querySelector(".remeras-datos");
      retornoRemeras.innerHTML = "";

      for (let itemRemeras of datosRemeras) {
        retornoRemeras.innerHTML += ` 
          <section> 
            <img src="${itemRemeras.imagen}" alt="${itemRemeras.articulo}">    
            <p>${itemRemeras.articulo}</p>    
            <p>Talles: ${itemRemeras.talles}</p>    
            <p>Color: ${itemRemeras.color}</p>    
            <p>$ ${itemRemeras.precio}</p>
            <button type="button" class="anadir-carrito"> Agregar al carrito </button>
          </section>      
        `;
      }
    }
  };

  listaRemeras.send();
}

burgerMenu.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu(){
  mobileMenu.classList.toggle('inactive');
}