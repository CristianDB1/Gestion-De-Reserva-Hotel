$(document).ready(function() {
    // Inicializar DataTable
    var table = $('#tablaCliente').DataTable({
        destroy: true,
        "pageLength": 5,
        "lengthMenu": [5, 10, 25, 50, 100],
        "searching": true,
        "paging": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });


    function cargarDatos() {
        $.ajax({
            url: 'http://localhost:8080/api/clientes/listarCliente',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                table.clear();
                $.each(data, function(index, item) {
                    table.row.add([
                        item.documento,
                        item.nombre,
                        item.apellido,
                        item.correo,
                        item.telefono,
                        `<div class="text-center">
                            <div class="btn-group">
                                <button class="btn btn-warning" data-id="${item.id_cliente}">Editar</button>
                            </div>
                            <div class="btn-group">
                            <button class="btn btn-danger" data-id="${item.id_cliente}">Eliminar</button>
                            </div>
                        </div>`
                    ]).draw();
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar los datos:', error);
            }
        });
    }
    cargarDatos();


    $('#agregarCliente').on('click', function() {
        abrirModal('crear'); // Abrir en modo crear
    });

    $('#tablaCliente tbody').on('click', '.btn-warning', function() {
        var id = parseInt($(this).data('id'), 10);
        abrirModal('editar', id);
    });


    $('#tablaCliente tbody').on('click', '.btn-danger', function() {
        var id = parseInt($(this).data('id'), 10);

        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            eliminarRegistro(id);
            cargarDatos();
        }


    });
});

$(document).ready(function() {
    $('#guardarCliente').on('click', function() {
        var id = $('#registroId').val();
        var documento = $('#documento').val();
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var correo = $('#correo').val();
        var telefono = $('#telefono').val();

        var data = {
            documento: documento,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
        };

        if (id){
            $.ajax({
                url: `http://localhost:8080/api/clientes/editarCliente/`+id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro actualizado exitosamente');
                    $('#modalCliente').modal('hide');
                },
                error: function(xhr, status, error) {
                    console.error('Error al actualizar el registro:', error);
                    alert('Ocurrió un error al actualizar el registro');
                }
            });
        }else  {
            $.ajax({
                url: 'http://localhost:8080/api/clientes/crearCliente',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro creado exitosamente');
                    $('#modalCliente').hide();

                },
                error: function(xhr, status, error) {
                    console.error('Error al crear el registro:', error);
                    alert('Ocurrió un error al crear el registro');
                }
            });
        }
    });
});


function abrirModal(modo, id) {
    if (modo === 'crear') {
        $('#modalClienteLabel').text('Crear Cliente');
        $('#registroId').val('');
        $('#documento').val('');
        $('#nombre').val('');
        $('#apellido').val('');
        $('#correo').val('');
        $('#telefono').val('');

        $('#modalCliente').modal('show');
    } else if (modo === 'editar') {
        $('#modalNivelesLabel').text('Editar Cliente');
        $.ajax({
            url: `http://localhost:8080/api/clientes/buscarCliente/`+id,
            type: 'GET',
            success: function(data) {
                $('#registroId').val(data.id_cliente);
                $('#documento').val(data.documento);
                $('#nombre').val(data.nombre);
                $('#apellido').val(data.apellido);
                $('#correo').val(data.correo);
                $('#telefono').val(data.telefono);
                $('#modalCliente').modal('show');
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los datos:', error);
            }

        });
        console.log("ID a buscar:", id);

    }
}

function eliminarRegistro(id) {

    $.ajax({
        url: `http://localhost:8080/api/clientes/eliminarCliente/`+id,
        type: 'DELETE',
        success: function() {
            alert('Registro eliminado exitosamente');
        },
        error: function(xhr, status, error) {
            console.error('Error al eliminar el registro:', error);
            alert('Ocurrió un error al eliminar el registro');
        }
    });


}


