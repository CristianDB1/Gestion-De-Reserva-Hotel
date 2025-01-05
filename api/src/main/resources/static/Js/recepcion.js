document.getElementById('finalizarBtn').addEventListener('click', function () {
    var checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();

    document.querySelectorAll('.modal-backdrop').forEach(function(backdrop) {
        backdrop.remove();
    });


    setTimeout(function() {
        var verificarModal = new bootstrap.Modal(document.getElementById('verificar'));
        verificarModal.show();
    }, 300);
});

document.getElementById('aceptarBtn').addEventListener('click', function () {

    var verificarModal = bootstrap.Modal.getInstance(document.getElementById('verificar'));
    verificarModal.hide();


    document.querySelectorAll('.modal-backdrop').forEach(function(backdrop) {
        backdrop.remove();
    });
});



function cargarHabitaciones() {
    fetch('/api/habitaciones/listarHabitaciones')
        .then(response => response.json())
        .then(habitaciones => {
            const container = document.getElementById('habitaciones-container');


            container.innerHTML = '';

            let totalHabitaciones = habitaciones.length;
            let ocupadas = 0;
            let disponibles = 0;

            habitaciones.forEach(habitacion => {

                if (habitacion.estado === 'ocupado') {
                    ocupadas++;
                } else if (habitacion.estado === 'disponible') {
                    disponibles++;
                }


                const tarjeta = document.createElement('div');
                tarjeta.classList.add('col-md-4', 'mb-4');


                tarjeta.innerHTML = `
                    <div class="card" 
                         data-bs-toggle="modal" 
                         data-bs-target="#checkoutModal"
                         data-id="${habitacion.id_habitacion}"
                         data-numero="${habitacion.numero}"
                         data-categoria="${habitacion.nombreCategoria || 'Categoría no disponible'}"
                         data-detalles="Cargando detalles..." 
                         data-condicion="${habitacion.estado}"
                         data-precio="Cargando precio...">
                        <i class="fa-solid fa-bed fa-3x text-primary text-center mt-3"></i>
                        <div class="card-body">
                            <h5 class="card-title">${habitacion.numero}</h5>
                            <p class="card-text">${habitacion.nombreCategoria || 'Categoría no disponible'}</p>
                            <p class="card-text detalles-categoria">Detalles: Cargando...</p>
                            <p class="card-text precio-categoria">Precio: Cargando...</p>
                            <p class="card-text ${habitacion.estado === 'ocupado' ? 'text-danger' : 'text-success'}">
                                ${habitacion.estado}
                            </p>
                        </div>
                    </div>
                `;

                container.appendChild(tarjeta);

                if (habitacion.id_Categoria) {
                    fetch(`/api/categorias/detalle-precio/`+habitacion.id_Categoria)
                        .then(response => response.json())
                        .then(categoria => {

                            tarjeta.querySelector('.detalles-categoria').textContent = `Detalles: ${categoria.descripcion || 'No disponibles'}`;
                            tarjeta.querySelector('.precio-categoria').textContent = `Precio: $${categoria.precio || 'No disponible'}`;

                            tarjeta.querySelector('.card').setAttribute('data-detalles', categoria.descripcion || 'No disponibles');
                            tarjeta.querySelector('.card').setAttribute('data-precio', categoria.precio || 'No disponible');

                        })
                        .catch(error => {
                            console.error(`Error al cargar la categoría ${habitacion.id_Categoria}:`, error);
                        });
                }
            });


            document.getElementById('total-habitaciones').textContent = totalHabitaciones;
            document.getElementById('ocupadas-habitaciones').textContent = ocupadas;
            document.getElementById('disponibles-habitaciones').textContent = disponibles;
        })
        .catch(error => console.error('Error al cargar las habitaciones:', error));
}

document.addEventListener("click", function (event) {
    const tarjeta = event.target.closest(".card");
    if (tarjeta) {
        const idHabitacion = tarjeta.getAttribute("data-id");


        document.getElementById("idHabitacion").value = idHabitacion;

        console.log("ID de la habitación seleccionada:", idHabitacion);
    }
});



document.addEventListener('DOMContentLoaded', cargarHabitaciones);


document.addEventListener("DOMContentLoaded", () => {
    const checkoutModal = document.getElementById("checkoutModal");

    checkoutModal.addEventListener("show.bs.modal", (event) => {
        const card = event.relatedTarget;


        const id = card.getAttribute("idHabitacion")
        const numero = card.getAttribute("data-numero");
        const categoria = card.getAttribute("data-categoria");
        const detalles = card.getAttribute("data-detalles");
        const condicion = card.getAttribute("data-condicion");
        const precio = card.getAttribute("data-precio");


        document.querySelector("#checkoutModal .modal-body .nombreHabitacion").textContent = numero;
        document.querySelector("#checkoutModal .modal-body .categoriaHabitacion").textContent = categoria;
        document.querySelector("#checkoutModal .modal-body .detallesHabitacion").textContent = detalles;
        document.querySelector("#checkoutModal .modal-body .condicionHabitacion").textContent = condicion;
        document.querySelector("#checkoutModal .modal-body .precioHabitacion").textContent = precio;
    });

    function cargarDatosCliente(cliente) {
        document.getElementById("idCliente").value = cliente.id_cliente || "";
        document.getElementById("docCliente").textContent = cliente.documento || "";
        document.getElementById("nombreCliente").textContent = cliente.nombre || "";
        document.getElementById("apellidoCliente").textContent = cliente.apellido || "";
        document.getElementById("correoCliente").textContent = cliente.correo || "";
        document.getElementById("telefonoCliente").textContent = cliente.telefono || "";

    }

    function limpiarDatosCliente() {
        document.getElementById("idCliente").textContent = "";
        document.getElementById("docCliente").textContent = "";
        document.getElementById("nombreCliente").textContent = "";
        document.getElementById("apellidoCliente").textContent = "";
        document.getElementById("correoCliente").textContent = "";
        document.getElementById("telefonoCliente").textContent = "";
        document.getElementById("buscarCliente").value = "";
    }


    document.getElementById("checkoutModal").addEventListener("click", () => {
        limpiarDatosCliente();
    });


    document.getElementById("buscarClienteBtn").addEventListener("click", () => {
        const documentoCliente = document.getElementById("buscarCliente").value;

        if (!documentoCliente) {
            alert("Por favor, ingrese un documento para buscar.");
            return;
        }


        fetch(`/api/clientes/buscarDocumentoCliente?documento=` + documentoCliente)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Cliente no encontrado.");
                }
                return response.json();
            })
            .then(data => {
                cargarDatosCliente(data);
            })
            .catch(error => {
                alert(error.message);
                console.error("Error al buscar el cliente:", error);
            });
    });

    document.getElementById("aceptarBtn").addEventListener("click", function () {




        const idCliente = document.getElementById("idCliente").value;
        const idHabitacion = document.getElementById("idHabitacion").value;
        var id =parseInt(idCliente,10)


        if (!id || !idHabitacion) {
            alert("Por favor, complete todos los campos.");
            return;
        }


        const reservaData = {
            idCliente: id,
            idHabitacion: idHabitacion
        };


        fetch("/api/reservas/crearReserva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservaData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al guardar la reserva.");
                }
                return response.json();
            })
            .then(data => {

                alert("Reserva creada con éxito. ID de la reserva: " + data.idReserva);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un problema al guardar la reserva.");
            });
    });

});


