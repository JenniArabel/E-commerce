document.addEventListener("DOMContentLoaded", traerDatos);

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
            <p>${itemAccesorios.color}</p>    
            <p>${itemAccesorios.precio}</p>
          </section>            
        `;
      }
    }
  };

  listaAccesorios.send();
}