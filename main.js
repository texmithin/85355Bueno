document.getElementById("btnRecoger").addEventListener("click", function() {
    alert("Para recoger tu pedido, llama al: 8331105755");
});

document.getElementById("btnDomicilio").addEventListener("click", function() {
    let nombre = solicitarDato("Ingresa tu nombre completo:", "string");
    let calle = solicitarDato("Ingresa el nombre de tu calle:", "string");
    let colonia = solicitarDato("Ingresa el nombre de tu colonia:", "string");
    let codigoPostal = solicitarDato("Ingresa tu código postal:", "number");
    let telefono = solicitarDato("Ingresa tu número de teléfono:", "number");

    alert(`Gracias ${nombre}, tu pedido será enviado a:\n${calle}, ${colonia}, C.P: ${codigoPostal}.\nNos comunicaremos contigo al ${telefono}.`);
});

// Función para validar los datos
function solicitarDato(mensaje, tipo) {
    let valor;
    do {
        valor = prompt(mensaje);
        if (tipo === "string" && !/^[a-zA-Z\s]+$/.test(valor)) {
            alert("Lo siento, dato inválido. Ingresa solo letras.");
        } else if (tipo === "number" && !/^\d+$/.test(valor)) {
            alert("Lo siento, dato inválido. Ingresa solo números.");
        } else {
            return valor;
        }
    } while (true);
}