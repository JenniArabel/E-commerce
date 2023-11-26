let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

document.getElementById('nextBtn').addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

document.getElementById('antBtn').addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

//Mostar la primer imagen al cargar la página:
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex);
})

//Cambiar de imagen cada 5 segundos
setInterval(() => {
  showSlide(currentIndex + 1);
}, 5000);

function showSlide (index) {
  slides[currentIndex].style.display = 'none';

  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  slides[currentIndex].style.display = 'block';
}

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
            <p>${itemRemeras.talles}</p>    
            <p>${itemRemeras.color}</p>    
            <p>${itemRemeras.precio}</p>
          </section>      
        `;
      }
    }
  };

  listaRemeras.send();

  const listaPantalones = new XMLHttpRequest();
  listaPantalones.open("GET", "stockPantalones.json", true);
  
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
            <p>${itemPantalones.talles}</p>    
            <p>${itemPantalones.color}</p>    
            <p>${itemPantalones.precio}</p>
          </section>       
        `;
      }
    }
  };

  listaPantalones.send();

  const listaAccesorios = new XMLHttpRequest();
  listaAccesorios.open("GET", "stockAccesorios.json", true);

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
            <p>${itemAccesorios.color}</p>    
            <p>${itemAccesorios.precio}</p>
          </section>            
        `;
      }
    }
  };

  listaAccesorios.send();

  const listaCamperas = new XMLHttpRequest();
  listaCamperas.open("GET", "stockCamperas.json", true);

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
            <p>${itemCamperas.talles}</p>    
            <p>${itemCamperas.color}</p>    
            <p>${itemCamperas.precio}</p>
          </section>            
        `;
      }
    }
  };

  listaCamperas.send();
}

document.getElementById("formulario").addEventListener("input", function(event){
  var target = event.target;

  //Utilizar expresiones regulares para validar los inputs
  if (target.id === "celular"){
      var celularPattern = /^[0-9]{9,10}$/;
      if(!celularPattern.test(target.value)){
          target.setCustomValidity("El número de celular debe tener 9 dígitos numéricos.");
      } else{
          target.setCustomValidity("");
      }
  } else if(target.id === "nombre"){
      var nombrePattern = /^[a-zA-Z]+$/;
      if(!nombrePattern.test(target.value)){
          target.setCustomValidity("El nombre debe contener sólo letras.");
      } else{
          target.setCustomValidity("");
      }
  } else if (target.id === "apellido") {
    var apellidoPattern = /^[a-zA-Z]+$/;
      if(!apellidoPattern.test(target.value)){
          target.setCustomValidity("El apellido debe contener sólo letras.");
      } else{
          target.setCustomValidity("");
      }
  }
});

document.getElementById("enviar").addEventListener("click", () => {
  alert('Enviado!')
});
