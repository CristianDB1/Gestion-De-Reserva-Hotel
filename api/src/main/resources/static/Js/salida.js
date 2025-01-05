let productCount = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productElement = this.closest('.product');
        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));
        const quantity = parseInt(productElement.querySelector('.quantity').value);
        const total = productPrice * quantity;

        const tableBody = document.querySelector('#tablaProductos tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${productName}</td>
                <td>$${productPrice.toFixed(2)}</td>
                <td>${quantity}</td>
                <td>
                    <button class="btn btn-danger btn-sm remove-product">Eliminar</button>
                </td>
                <td>$${total.toFixed(2)}</td>
            `;
        tableBody.appendChild(row);

        row.querySelector('.remove-product').addEventListener('click', function() {
            row.remove();
        });
    });
});

document.getElementById("buscarReservaBtn").addEventListener("click", cargarDatosReserva);

async function cargarDatosReserva() {
    const numeroReserva = document.getElementById("numeroReserva").value;

    if (!numeroReserva) {
        alert("Por favor, ingrese el número de reserva.");
        return;
    }

    try {
        const response = await fetch(`/api/reservas/buscarReserva/`+numeroReserva);
        if (!response.ok) {
            throw new Error("No se encontró la reserva.");
        }

        const reserva = await response.json();


        document.querySelector("#numeroHabitacion").textContent = reserva.numero || "N/A";
        document.querySelector("#categoriaHabitacion").textContent = reserva.nombreCategoria || "N/A";
        document.querySelector("#detallesHabitacion").textContent = reserva.descripcion || "N/A";
        document.querySelector("#condicionHabitacion").textContent = reserva.estado || "N/A";
        document.querySelector("#precioHabitacion").textContent = `$${reserva.precio || 0}`;


        document.querySelector("#documentoCliente").textContent = reserva.documento || "N/A";
        document.querySelector("#nombreCliente").textContent = reserva.nombreCliente || "N/A";
        document.querySelector("#apellidosCliente").textContent = reserva.apellidoCliente || "N/A";
        document.querySelector("#correoCliente").textContent = reserva.correo || "N/A";
        document.querySelector("#telefonoCliente").textContent = reserva.telefono || "N/A";
        document.querySelector("#fechaEntrada").textContent = reserva.fechaInicio || "N/A";

        cargarCostoAlojamientoAutomatico(reserva);

    } catch (error) {
        console.error("Error al buscar la reserva:", error);
        alert("No se pudo cargar la información de la reserva.");
    }
}


document.querySelectorAll('.remove-product').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('tr').remove();
        recalcularTotal();
    });
});

let costoTotalAlojamientoGlobal = 0;

function cargarCostoAlojamientoAutomatico(reserva) {

    const precioPorNoche = reserva.precio || 0;


    document.getElementById("precioPorNoche").textContent = `$${precioPorNoche.toFixed(2)}`;


    const diasEstadiaInput = document.getElementById("diasEstadiaInput");
    const costoTotalAlojamiento = document.getElementById("costoTotalAlojamiento");


    diasEstadiaInput.addEventListener("input", () => {
        const diasEstadia = parseInt(diasEstadiaInput.value, 10) || 1;
        const costoTotal = precioPorNoche * diasEstadia;
        costoTotalAlojamientoGlobal = precioPorNoche * diasEstadia;



        costoTotalAlojamiento.textContent = `$${costoTotal.toFixed(2)}`;

        recalcularTotal();
    });


    diasEstadiaInput.dispatchEvent(new Event("input"));
}

document.addEventListener('DOMContentLoaded', function () {
    $('#productModal').on('show.bs.modal', function () {
        fetch('/api/productos/listarProducto')
            .then(response => response.json())
            .then(data => {
                const modalBody = document.querySelector('#productosDisponibles');
                modalBody.innerHTML = '';


                data.forEach(producto => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product', 'mb-3');
                    productElement.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="product-name">${producto.nombre}</span>
                            <span class="product-price">$${producto.precio.toFixed(2)}</span>
                            <input type="number" min="1" value="1" class="form-control w-25 mx-2 quantity">
                            <button class="btn btn-success add-to-cart">Agregar</button>
                        </div>
                    `;
                    modalBody.appendChild(productElement);


                    productElement.querySelector('.add-to-cart').addEventListener('click', function () {
                        agregarProductoATabla(producto.nombre, producto.precio, productElement.querySelector('.quantity').value);
                    });
                });
            })
            .catch(error => console.error('Error al cargar productos:', error));
    });
});


function agregarProductoATabla(nombre, precio, cantidad) {
    const tableBody = document.querySelector('#tablaProductos tbody');
    const total = precio * cantidad;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${nombre}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>${cantidad}</td>
        <td>
            <button class="btn btn-danger btn-sm remove-product">Eliminar</button>
        </td>
        <td>$${total.toFixed(2)}</td>
    `;

    row.querySelector('.remove-product').addEventListener('click', function () {
        row.remove();

    });

    tableBody.appendChild(row);
    recalcularTotal();

}

function recalcularTotal() {

    const tableBody = document.querySelector('#tablaProductos tbody');
    let totalProductos = 0;


    tableBody.querySelectorAll('tr').forEach(row => {
        const cantidad = parseInt(row.querySelector('td:nth-child(3)').textContent) || 0;
        const precioUnitario = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('$', '').trim()) || 0;
        const total = cantidad * precioUnitario;
        totalProductos += total;
    });



    const totalFinal = totalProductos + costoTotalAlojamientoGlobal;


    document.getElementById('precioTotal').textContent = `$${totalFinal.toFixed(2)}`;
}


function generarPDF() {
    const { jsPDF } = window.jspdf;  // Cargar jsPDF

    const doc = new jsPDF();


    doc.setFontSize(14);
    doc.text('Factura de Reserva', 20, 10);


    const diasEstadia = parseInt(document.getElementById('diasEstadiaInput').value, 10) || 1;
    const precioHabitacion = parseFloat(document.getElementById('precioPorNoche').textContent.replace('$', '').trim()) || 0;
    const totalHabitacion = precioHabitacion * diasEstadia;


    doc.setFontSize(10);
    doc.text(`Precio por noche: $${precioHabitacion.toFixed(2)}`, 20, 20);
    doc.text(`Cantidad de días: ${diasEstadia}`, 20, 25);
    doc.text(`Costo total alojamiento: $${totalHabitacion.toFixed(2)}`, 20, 30);


    const tableBody = document.querySelector('#tablaProductos tbody');
    let yOffset = 40;


    doc.text('Producto', 20, yOffset);
    doc.text('Precio Unitario', 80, yOffset);
    doc.text('Cantidad', 140, yOffset);
    doc.text('Total', 180, yOffset);

    yOffset += 5;

    tableBody.querySelectorAll('tr').forEach(row => {
        const productName = row.querySelector('td:nth-child(1)').textContent;
        const productPrice = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('$', '').trim());
        const quantity = parseInt(row.querySelector('td:nth-child(3)').textContent);
        const total = parseFloat(row.querySelector('td:nth-child(5)').textContent.replace('$', '').trim());


        doc.text(productName, 20, yOffset);
        doc.text(`$${productPrice.toFixed(2)}`, 80, yOffset);
        doc.text(quantity.toString(), 140, yOffset);
        doc.text(`$${total.toFixed(2)}`, 180, yOffset);

        yOffset += 5;
    });


    doc.text(`Costo Total: $${(totalHabitacion + obtenerTotalProductos()).toFixed(2)}`, 20, yOffset + 10);


    doc.save('Factura_Reserva.pdf');
}


function obtenerTotalProductos() {
    const tableBody = document.querySelector('#tablaProductos tbody');
    let totalProductos = 0;

    tableBody.querySelectorAll('tr').forEach(row => {
        const total = parseFloat(row.querySelector('td:nth-child(5)').textContent.replace('$', '').trim()) || 0;
        totalProductos += total;
    });

    return totalProductos;
}

document.getElementById('pagarBtn').addEventListener('click', function() {
    generarPDF();
});