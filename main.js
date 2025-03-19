document.addEventListener("DOMContentLoaded", () => {
    const btnRecoger = document.getElementById("btnRecoger");
    const btnDomicilio = document.getElementById("btnDomicilio");

    btnRecoger.addEventListener("click", () => {
        alert("Para recoger tu pedido, llama al: 8331105755");
    });

    btnDomicilio.addEventListener("click", () => {
        const nombre = solicitarDato("Ingresa tu nombre completo:", validarTexto);
        const calle = solicitarDato("Ingresa el nombre de tu calle:", validarTexto);
        const colonia = solicitarDato("Ingresa el nombre de tu colonia:", validarTexto);
        const codigoPostal = solicitarDato("Ingresa tu código postal:", validarCodigoPostal);
        const telefono = solicitarDato("Ingresa tu número de teléfono:", validarTelefono);

        alert(`Gracias ${nombre}, tu pedido será enviado a:
${calle}, ${colonia}, C.P: ${codigoPostal}.
Nos comunicaremos contigo al ${telefono}.`);
    });

    // Parte corregida: Listener para crear usuario
    const crearUsuarioBtn = document.getElementById("crearUsuarioBtn");

    if (!crearUsuarioBtn) {
        console.error("El botón 'Crear Usuario' no se encontró en el DOM.");
        return;
    }

    const solicitarCredenciales = () => {
        let username = prompt("Ingresa tu nombre de usuario:");
        let password = prompt("Ingresa tu contraseña:");

        if (username && password) {
            localStorage.setItem("usuario", username);
            localStorage.setItem("password", password);
            console.log(`Usuario guardado: ${username}`);
            alert(`Usuario creado con éxito: ${username}`);
        } else {
            alert("Por favor, ingresa un usuario y una contraseña válidos.");
        }
    };
    crearUsuarioBtn.addEventListener("click", solicitarCredenciales);
});

const productos = [
    { id: 1, nombre: "Hot Dog", precio: 50 },
    { id: 2, nombre: "Hamburguesa de Res", precio: 80 },
    { id: 3, nombre: "Hamburguesa de Pollo", precio: 75 },
    { id: 4, nombre: "Boneless", precio: 90 },
    { id: 5, nombre: "Alitas", precio: 85 },
    { id: 6, nombre: "Dedos de Queso", precio: 60 },
    { id: 7, nombre: "Aros de Cebolla", precio: 40 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function mostrarProductos() {
    const contenedor = document.getElementById("productosContainer");

    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("col-md-4", "mb-4");

        divProducto.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-success agregar-carrito" 
                        data-id="${producto.id}" 
                        data-nombre="${producto.nombre}" 
                        data-precio="${producto.precio}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(divProducto);
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

            const producto = { id, nombre, precio };
            
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert(`${nombre} agregado al carrito.`);
        });
    });
}

document.addEventListener("DOMContentLoaded", mostrarProductos);