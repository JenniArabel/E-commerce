const burgerMenu = document.querySelector("#menu-icono");
const desktopMenu = document.querySelector(".menu-desktop");
const mobileMenu = document.querySelector(".menu-mobile");

document.addEventListener("DOMContentLoaded", traerDatos);

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
        <section> 
          <img src="${itemCamperas.imagen}" alt="${itemCamperas.articulo}">    
          <p>${itemCamperas.articulo}</p>    
          <p>${itemCamperas.talles}</p>    
          <p>${itemCamperas.color}</p>    
          <p>${itemCamperas.precio}</p>
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
          <section> 
            <img src="${itemCamperas.imagen}" alt="${itemCamperas.articulo}">    
            <p>${itemCamperas.articulo}</p>    
            <p>Talles: ${itemCamperas.talles}</p>    
            <p>Color: ${itemCamperas.color}</p>    
            <p>$ ${itemCamperas.precio}</p>
            <button type="button" class="anadir-carrito"> Agregar al carrito </button>
          </section>            
        `;
      }
    }
  };

  listaCamperas.send();
}

burgerMenu.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu(){
  mobileMenu.classList.toggle('inactive');
}