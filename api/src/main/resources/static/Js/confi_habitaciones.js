$(document).ready(function() {
    // Inicializar DataTable
    var table = $('#tablaHabitaciones').DataTable({
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
            url: 'http://localhost:8080/api/habitaciones/listarHabitaciones',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                table.clear();
                $.each(data, function (index, item) {
                    table.row.add([
                        item.id_habitacion,
                        item.numero,
                        item.capacidad,
                        item.estado,
                        item.nombreCategoria,
                        `<div class="text-center">
                            <div class="btn-group">
                                <button class="btn-editar" data-id="${item.id_habitacion}">Editar</button>
                            </div>
                            <div class="btn-group">
                                <button class="btn-eliminar" data-id="${item.id_habitacion}">Eliminar</button>
                            </div>
                        </div>`
                    ]).draw();
                });
            },
            error: function (xhr, status, error) {
                console.error('Error al cargar los datos:', error);
            }
        });
    }

    cargarDatos();



    $('#btnCrear').on('click', function () {
        abrirModal('crear'); // Abrir en modo creación
    });


    $('#tablaHabitaciones tbody').on('click', '.btn-editar', function () {
        var id = parseInt($(this).data('id'), 10);
        abrirModal('editar', id);
    });


    $('#tablaHabitaciones tbody').on('click', '.btn-eliminar', function () {
        var id = parseInt($(this).data('id'), 10);

        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            eliminarRegistro(id);
            cargarDatos();
        }
    });
});

$(document).ready(function() {
    $('#btnGuardarHabitacion').on('click', function() {
        var id = $('#registroId').val();
        var numero = $('#numero').val();
        var capacidad = $('#capacidad').val();
        var estado = $('#estado').val();
        var categoria = $('#categoria').val();

        var data = {
            numero: numero,
            capacidad: capacidad,
            estado: estado,
            id_Categoria: categoria
        };

        if (id){
            $.ajax({
                url: `http://localhost:8080/api/habitaciones/editarHabitacion/`+id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro actualizado exitosamente');
                    $('#modalHabitacion').modal('hide');
                },
                error: function(xhr, status, error) {
                    console.error('Error al actualizar el registro:', error);
                    alert('Ocurrió un error al actualizar el registro');
                }
            });
        }else  {
            $.ajax({
                url: 'http://localhost:8080/api/habitaciones/crearHabitacion',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro creado exitosamente');
                    $('#modalHabitacion').hide();

                },
                error: function(xhr, status, error) {
                    console.error('Error al crear el registro:', error);
                    alert('Ocurrió un error al crear el registro');
                }
            });
            console.log(data);
        }
    });
});


function abrirModal(modo, id) {
    if (modo === 'crear') {
        $('#modalCategoriaLabel').text('Crear Nueva Habitacion');
        $('#registroId').val('');
        $('#numero').val('');
        $('#capacidad').val('');
        $('#estado').val('');
        $.ajax({
            url: 'http://localhost:8080/api/categorias/listarCategorias',
            type: 'GET',
            success: function(data) {
                $('#categoria').empty();

                data.forEach(function(categoria) {
                    $('#categoria').append(new Option(categoria.nombre, categoria.id_categoria));
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los categorias:', error);
            }
        });

        $('#modalHabitacion').modal('show');
    }else if (modo === 'editar') {
        $('#modalHabitacionLabel').text('Editar Habitacion');
        $.ajax({
            url: `http://localhost:8080/api/habitaciones/buscarHabitacion/`+id,
            type: 'GET',
            success: function(data) {
                $('#registroId').val(data.id_habitacion);
                $('#numero').val(data.numero);
                $('#capacidad').val(data.capacidad);
                $('#estado').val(data.estado);
                $.ajax({
                    url: 'http://localhost:8080/api/categorias/listarCategorias',
                    type: 'GET',
                    success: function(data) {
                        $('#categoria').empty();

                        data.forEach(function(categoria) {
                            $('#categoria').append(new Option(categoria.nombre, categoria.id_categoria));
                        });
                        $('#categoria').val(data.id_Categoria);
                    },
                    error: function(xhr, status, error) {
                        console.error('Error al obtener los categorias:', error);
                    }
                });

                $('#modalHabitacion').modal('show');
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
        url: `http://localhost:8080/api/habitaciones/eliminarHabitacion/`+id,
        type: 'DELETE',
        success: function(response) {
            alert('Registro eliminado exitosamente');
            $('#tablaHabitaciones').DataTable().row(`#row-${id}`).remove().draw();
        },
        error: function(xhr, status, error) {
            console.error('Error al eliminar el registro:', error);
            alert('Ocurrió un error al eliminar el registro');
        }
    });


}
