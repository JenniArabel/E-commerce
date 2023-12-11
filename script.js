let currentIndex = 0;

const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

const burgerMenu = document.querySelector("#menu-icono");
const desktopMenu = document.querySelector(".menu-desktop");
const mobileMenu = document.querySelector(".menu-mobile");

let total = 0;

const carritoIcon = document.getElementById("carrito-icono");

carritoIcon.addEventListener('click', function(event) {
  event.stopPropagation(); //Evita que el evento de click se propague a elementos superiores
  toggleCarrito();
});

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

//Cambiar de imagen cada 8 segundos
setInterval(() => {
  showSlide(currentIndex + 1);
}, 8000);

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

// document.getElementById("enviar").addEventListener("click", () => {
//   alert('Enviado!')
// });

burgerMenu.addEventListener('click', toggleDesktopMenu);
burgerMenu.addEventListener('click', toggleMobileMenu);

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