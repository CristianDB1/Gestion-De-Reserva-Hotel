$(document).ready(function() {
    // Inicializar DataTable
    var table = $('#tablaNiveles').DataTable({
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
            url: 'http://localhost:8080/api/niveles/listarNiveles',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                table.clear();
                $.each(data, function(index, item) {
                    table.row.add([
                        item.id_nivel,
                        item.nombre,
                        item.descripcion,
                        `<div class="text-center">
                            <div class="btn-group">
                                <button class="btn-editar" data-id="${item.id_nivel}">Editar</button>
                            </div>
                            <div class="btn-group">
                            <button class="btn-eliminar" data-id="${item.id_nivel}">Eliminar</button>
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


    $('#btnCrear').on('click', function() {
        abrirModal('crear'); // Abrir en modo creación
    });

    $('#tablaNiveles tbody').on('click', '.btn-editar', function() {
        var id = parseInt($(this).data('id'), 10);
        abrirModal('editar', id);
    });

    $('#tablaNiveles tbody').on('click', '.btn-eliminar', function() {
        var id = parseInt($(this).data('id'), 10);

        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            eliminarRegistro(id);
            cargarDatos();
        }


    });
});

$(document).ready(function() {
    $('#btnGuardarNivel').on('click', function() {
        var id = $('#registroId').val();
        var nombre = $('#nombre').val();
        var descripcion = $('#descripcion').val();

        var data = {
            nombre: nombre,
            descripcion: descripcion
        };

        if (id){
            $.ajax({
                url: `http://localhost:8080/api/niveles/editarNiveles/`+id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro actualizado exitosamente');
                    $('#modalNiveles').modal('hide'); // Ocultar el modal
                },
                error: function(xhr, status, error) {
                    console.error('Error al actualizar el registro:', error);
                    alert('Ocurrió un error al actualizar el registro');
                }
            });
        }else  {
            $.ajax({
                url: 'http://localhost:8080/api/niveles/crearNiveles',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro creado exitosamente');
                    $('#modalNiveles').hide();

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
        $('#modalNivelesLabel').text('Crear Nuevo Nivel');
        $('#registroId').val('');
        $('#nombre').val('');
        $('#descripcion').val('');
        $('#modalNiveles').modal('show');
    } else if (modo === 'editar') {
        $('#modalNivelesLabel').text('Editar nivel');
        $.ajax({
            url: `http://localhost:8080/api/niveles/buscarNiveles/`+id,
            type: 'GET',
            success: function(data) {
                $('#registroId').val(data.id_nivel);
                $('#nombre').val(data.nombre);
                $('#descripcion').val(data.descripcion);
                $('#modalNiveles').modal('show');
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
        url: `http://localhost:8080/api/niveles/eliminarNiveles/`+id,
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





