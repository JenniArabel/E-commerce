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
