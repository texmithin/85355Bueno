// CARRITO 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  mostrarCarrito();
  actualizarContadorCarrito();
  mostrarUsuarioLogueado();

  const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");
  if (crearUsuarioBtn) {
    crearUsuarioBtn.addEventListener("click", crearUsuario);
  }

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", loginUsuario);
  }
});

// USUARIOS 

function crearUsuario() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  Swal.fire({
    title: 'Ingresa tu nombre de usuario',
    input: 'text',
    inputPlaceholder: 'Ej: JuanPerez',
    showCancelButton: true,
    confirmButtonText: 'Siguiente'
  }).then(result => {
    if (result.isConfirmed && result.value) {
      const username = result.value.trim();
      const existente = usuarios.find(u => u.username === username);

      if (existente) {
        Swal.fire('Error', 'Ese nombre de usuario ya existe. Elige otro.', 'error');
        return crearUsuario();
      }

      Swal.fire({
        title: 'Ingresa tu contraseña',
        input: 'password',
        inputPlaceholder: 'Contraseña segura',
        showCancelButton: true,
        confirmButtonText: 'Crear'
      }).then(res => {
        if (res.isConfirmed && res.value) {
          const password = res.value.trim();
          const existentePass = usuarios.find(u => u.password === password);

          if (existentePass) {
            Swal.fire('Error', 'Esa contraseña ya está en uso. Elige otra.', 'error');
            return crearUsuario();
          }

          usuarios.push({ username, password });
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          localStorage.setItem("usuarioLogueado", username);

          Swal.fire('¡Usuario creado!', `Bienvenido, ${username}`, 'success').then(() => {
            window.location.href = "inicioSesion.html"; // Cambia si tu archivo tiene otro nombre
          });
        }
      });
    }
  });
}

function loginUsuario() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  Swal.fire({
    title: 'Usuario',
    input: 'text',
    inputPlaceholder: 'Tu nombre de usuario',
    showCancelButton: true,
    confirmButtonText: 'Siguiente'
  }).then(result => {
    if (result.isConfirmed && result.value) {
      const username = result.value.trim();
      Swal.fire({
        title: 'Contraseña',
        input: 'password',
        inputPlaceholder: 'Tu contraseña',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión'
      }).then(res => {
        if (res.isConfirmed && res.value) {
          const password = res.value.trim();
          const usuario = usuarios.find(u => u.username === username && u.password === password);

          if (usuario) {
            localStorage.setItem("usuarioLogueado", username);
            Swal.fire(`¡Bienvenido de nuevo, ${username}!`, '', 'success').then(() => {
              window.location.href = "../index.html"; // Redirige al home
            });
          } else {
            Swal.fire('Error', 'Credenciales incorrectas', 'error');
          }
        }
      });
    }
  });
}

function mostrarUsuarioLogueado() {
  const user = localStorage.getItem("usuarioLogueado");
  if (user) {
    const navbar = document.querySelector(".navbar .container") || document.body;
    const userDiv = document.createElement("div");
    userDiv.classList.add("ms-3", "fw-bold", "d-flex", "align-items-center", "gap-2");
    userDiv.innerHTML = `
      <span class="text-danger"> ${user}</span>
      <button id="logoutBtn" class="btn btn-outline-danger btn-sm">Cerrar sesión</button>
    `;
    navbar.appendChild(userDiv);

    document.getElementById("logoutBtn").addEventListener("click", cerrarSesion);
  }
}

function cerrarSesion() {
  Swal.fire({
    title: "¿Cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, salir",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      localStorage.removeItem("usuarioLogueado");
      Swal.fire("Sesión cerrada", "Has salido correctamente", "success").then(() => {
        window.location.href = "index.html"; // redirige al index
      });
    }
  });
}

//PRODUCTOS Y CARRITO

function mostrarProductos() {
  const contenedor = document.getElementById("productosContainer");
  if (!contenedor) return;

  const productos = [
    { id: 1, nombre: "Hot Dog", precio: 50 },
    { id: 2, nombre: "Hamburguesa de Res", precio: 80 },
    { id: 3, nombre: "Hamburguesa de Pollo", precio: 75 },
    { id: 4, nombre: "Boneless", precio: 90 },
    { id: 5, nombre: "Alitas", precio: 85 },
    { id: 6, nombre: "Dedos de Queso", precio: 60 },
    { id: 7, nombre: "Aros de Cebolla", precio: 40 }
  ];

  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-4");

    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text text-success fs-5">$${producto.precio}</p>
          <button class="btn btn-success agregar-carrito"
            data-id="${producto.id}"
            data-nombre="${producto.nombre}"
            data-precio="${producto.precio}">
            <i class="bi bi-plus-circle me-1"></i> Agregar al carrito
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  agregarEventosBotones();
}

function agregarEventosBotones() {
  const botones = document.querySelectorAll(".agregar-carrito");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.getAttribute("data-id"));
      const nombre = boton.getAttribute("data-nombre");
      const precio = parseFloat(boton.getAttribute("data-precio"));

      const index = carrito.findIndex(p => p.id === id);
      if (index !== -1) {
        carrito[index].cantidad++;
      } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${nombre} ha sido añadido al carrito.`,
        timer: 1500,
        showConfirmButton: false
      });

      actualizarContadorCarrito();
      mostrarCarrito();
    });
  });
}

function mostrarCarrito() {
  const contenedor = document.getElementById("listaCarrito");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `<div class="text-center text-muted fs-5">Tu carrito está vacío.</div>`;
    return;
  }

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("col-md-6", "col-lg-4", "mb-4");

    div.innerHTML = `
      <div class="card shadow-sm h-100 border-0">
        <div class="card-body text-center">
          <h5 class="card-title fw-bold">${producto.nombre}</h5>
          <p class="card-text fs-5 text-success">Precio: $${producto.precio}</p>
          <p class="card-text">Cantidad: ${producto.cantidad}</p>
          <button class="btn btn-outline-danger eliminar-producto" data-index="${index}">
            <i class="bi bi-trash3-fill me-1"></i> Eliminar
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  document.querySelectorAll(".eliminar-producto").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      Swal.fire({
        title: '¿Eliminar producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          carrito.splice(index, 1);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          mostrarCarrito();
          actualizarContadorCarrito();
        }
      });
    });
  });

  const totalCarrito = calcularTotalCarrito();
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("col-12", "text-center", "mt-4");
  totalDiv.innerHTML = `
    <h5>Total: $${totalCarrito}</h5>
    <button class="btn btn-primary" id="pagarBtn">Pagar</button>
  `;
  contenedor.appendChild(totalDiv);

  const pagarBtn = document.getElementById("pagarBtn");
  if (pagarBtn) {
    pagarBtn.addEventListener("click", () => {
      Swal.fire({
        icon: 'info',
        title: 'Finalizar Compra',
        text: '¡Te llevaremos al proceso de pago!',
        confirmButtonText: 'Ir a pagar',
      }).then(() => {
        window.location.href = "pago.html";
      });
    });
  }
}

function calcularTotalCarrito() {
  return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  if (contador) {
    const totalCantidad = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    contador.textContent = totalCantidad;
  }
}