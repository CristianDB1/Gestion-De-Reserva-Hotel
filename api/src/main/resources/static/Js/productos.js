$(document).ready(function() {
    // Inicializar DataTable
    var table = $('#tablaProducto').DataTable({
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
            url: 'http://localhost:8080/api/productos/listarProducto',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                table.clear();
                $.each(data, function(index, item) {
                    table.row.add([
                        item.codigo,
                        item.nombre,
                        item.detalle,
                        item.precio,
                        `<div class="text-center">
                            <div class="btn-group">
                                <button class="btn-editar" data-id="${item.id_producto}">Editar</button>
                            </div>
                            <div class="btn-group">
                            <button class="btn-eliminar" data-id="${item.id_producto}">Eliminar</button>
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
        abrirModal('crear');
    });

    $('#tablaProducto tbody').on('click', '.btn-editar', function() {
        var id = parseInt($(this).data('id'), 10);
        abrirModal('editar', id);
    });

    $('#tablaProducto tbody').on('click', '.btn-eliminar', function() {
        var id = parseInt($(this).data('id'), 10);

        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            eliminarRegistro(id);
            cargarDatos();
        }


    });
});

$(document).ready(function() {
    $('#btnGuardarProducto').on('click', function() {
        var id = $('#registroId').val();
        var codigo = $('#codigo').val();
        var nombre = $('#nombre').val();
        var detalle = $('#detalle').val();
        var precio = $('#precio').val();

        var data = {
            codigo: codigo,
            nombre: nombre,
            detalle: detalle,
            precio: precio
        };

        if (id){
            $.ajax({
                url: `http://localhost:8080/api/productos/editarProducto/`+id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro actualizado exitosamente');
                    $('#modalProducto').modal('hide');
                },
                error: function(xhr, status, error) {
                    console.error('Error al actualizar el registro:', error);
                    alert('Ocurrió un error al actualizar el registro');
                }
            });
        }else  {
            $.ajax({
                url: 'http://localhost:8080/api/productos/crearProducto',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro creado exitosamente');
                    $('#modalProducto').hide();

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
        $('#modalProductoLabel').text('Crear Nuevo Producto');
        var id = $('#registroId').val();
        var codigo = $('#codigo').val();
        var nombre = $('#nombre').val();
        var detalle = $('#detalle').val();
        var precio = $('#precio').val()
        $('#modalProducto').modal('show');
    } else if (modo === 'editar') {
        $('#modalProductoLabel').text('Editar Producto');
        $.ajax({
            url: `http://localhost:8080/api/productos/buscarProducto/`+id,
            type: 'GET',
            success: function(data) {
                var id = $('#registroId').val(data.id_producto);
                var codigo = $('#codigo').val(data.codigo);
                var nombre = $('#nombre').val(data.nombre);
                var detalle = $('#detalle').val(data.detalle);
                var precio = $('#precio').val(data.precio);
                $('#modalProducto').modal('show');
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
        url: `http://localhost:8080/api/productos/eliminarProducto/`+id,
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