const mostrarButton = document.querySelector(".mostrar-button");
mostrarButton.addEventListener("click", traerDatos);

function traerDatos() {
  const lista = new XMLHttpRequest();
  lista.open("GET", "stockRemeras.json", true);

  lista.onreadystatechange = function () {
    if (lista.readyState === 4 && lista.status === 200) {
      let datos = JSON.parse(lista.responseText);

      let retorno = document.querySelector(".remeras-datos");
      retorno.innerHTML = "";

      for (let item of datos) {
        retorno.innerHTML += `
                <tr>
                  <td>${item.articulo}</td>
                  <td>${item.talles}</td>
                  <td>${item.color}</td>
                  <td>${item.precio}</td>
                  <td> <img src="${item.imagen}" alt="${item.articulo}"> </td>
                </tr>
              `;
      }
    }
  };

  lista.send();

  const lista2 = new XMLHttpRequest();
  lista2.open("GET", "stockPantalones.json", true);

  lista2.onreadystatechange = function () {
    if (lista2.readyState === 4 && lista2.status === 200) {
      let datos2 = JSON.parse(lista2.responseText);

      let retorno2 = document.querySelector(".pantalones-datos");
      retorno2.innerHTML = "";

      for (let item2 of datos2) {
        retorno2.innerHTML += `
                <tr>
                  <td>${item2.articulo}</td>
                  <td>${item2.talles}</td>
                  <td>${item2.color}</td>
                  <td>${item2.precio}</td>
                  <td> <img src="${item2.imagen}" alt="${item2.articulo}"> </td>
                </tr>
              `;
      }
    }
  };

  lista2.send();

  const lista3 = new XMLHttpRequest();
  lista3.open("GET", "stockAccesorios.json", true);

  lista3.onreadystatechange = function () {
    if (lista3.readyState === 4 && lista3.status === 200) {
      let datos3 = JSON.parse(lista3.responseText);

      let retorno3 = document.querySelector(".accesorios-datos");
      retorno3.innerHTML = "";

      for (let item3 of datos3) {
        retorno3.innerHTML += `
                <tr>
                  <td>${item3.articulo}</td>
                  <td>${item3.color}</td>
                  <td>${item3.precio}</td>
                  <td> <img src="${item3.imagen}" alt="${item3.articulo}"> </td>
                </tr>
              `;
      }
    }
  };

  lista3.send();

  const lista4 = new XMLHttpRequest();
  lista4.open("GET", "stockCamperas.json", true);

  lista4.onreadystatechange = function () {
    if (lista4.readyState === 4 && lista4.status === 200) {
      let datos4 = JSON.parse(lista4.responseText);

      let retorno4 = document.querySelector(".camperas-datos");
      retorno4.innerHTML = "";

      for (let item4 of datos4) {
        retorno4.innerHTML += `
                <tr>
                  <td>${item4.articulo}</td>
                  <td>${item4.talles}</td>
                  <td>${item4.color}</td>
                  <td>${item4.precio}</td>
                  <td> <img src="${item4.imagen}" alt="${item4.articulo}"> </td>
                </tr>
              `;
      }
    }
  };

  lista4.send();

  const filtroInput = document.querySelector(".filtro");
  const filtrarButton = document.querySelector(".filtrar-button");
  const pantalonesDatos = document.querySelector(".pantalones-datos");

  filtrarButton.addEventListener("click", function() {
    const filtroTexto = filtroInput.value.toLowerCase(); //Obtener el valor en minusculas

    const datos2 = JSON.parse(lista2.responseText);

    //Filtra los fatos del JSON en fx del término de busqueda
    const datosFiltrados = datos2.filter(function (item2){
      return item2.articulo.toLowerCase().includes(filtroTexto);
    });
    pantalonesDatos.innerHTML= "";

    for (let item2 of datosFiltrados) {
      pantalonesDatos.innerHTML += `
      <tr>
        <td>${item2.articulo}</td>
        <td>${item2.talles}</td>
        <td>${item2.color}</td>
        <td>${item2.precio}</td>
        <td><img src="${item2.imagen}" alt="${item2.articulo}"></td>
      </tr>
    `;
    }
  });
  
}


