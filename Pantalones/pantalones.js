const burgerMenu = document.querySelector("#menu-icono");
const desktopMenu = document.querySelector(".menu-desktop");
const mobileMenu = document.querySelector(".menu-mobile");

document.addEventListener("DOMContentLoaded", traerDatos);

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
            <button type="button" class="anadir-carrito"> Agregar al carrito </button>
          </section>       
        `;
      }
    }
  };

  listaPantalones.send();
}

burgerMenu.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu(){
  mobileMenu.classList.toggle('inactive');
}