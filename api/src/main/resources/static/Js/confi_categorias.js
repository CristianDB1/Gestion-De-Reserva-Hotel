$(document).ready(function() {
    // Inicializar DataTable
    var table = $('#tablaCategorias').DataTable({
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
            url: 'http://localhost:8080/api/categorias/listarCategorias',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                table.clear();
                $.each(data, function (index, item) {
                    table.row.add([
                        item.id_categoria,
                        item.nombre,
                        item.descripcion,
                        item.precio,
                        item.nombreNivel,
                        `<div class="text-center">
                            <div class="btn-group">
                                <button class="btn-editar" data-id="${item.id_categoria}">Editar</button>
                            </div>
                            <div class="btn-group">
                                <button class="btn-eliminar" data-id="${item.id_categoria}">Eliminar</button>
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
        abrirModal('crear');
    });


    $('#tablaCategorias tbody').on('click', '.btn-editar', function () {
        var id = parseInt($(this).data('id'), 10);
        abrirModal('editar', id);
    });


    $('#tablaCategorias tbody').on('click', '.btn-eliminar', function () {
        var id = parseInt($(this).data('id'), 10);

        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            eliminarRegistro(id);
            cargarDatos();
        }
    });

});

$(document).ready(function() {
    $('#btnGuardarCategoria').on('click', function() {
        var id = $('#registroId').val();
        var nombre = $('#nombre').val();
        var descripcion = $('#descripcion').val();
        var precio = $('#precio').val();
        var nivel = $('#nivel').val();

        var data = {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            id_Nivel: nivel
        };

        if (id){
            $.ajax({
                url: `http://localhost:8080/api/categorias/editarCategoria/`+id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro actualizado exitosamente');
                    $('#modalCategoria').modal('hide');
                },
                error: function(xhr, status, error) {
                    console.error('Error al actualizar el registro:', error);
                    alert('Ocurrió un error al actualizar el registro');
                }
            });
        }else  {
            $.ajax({
                url: 'http://localhost:8080/api/categorias/crearCategoria',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Registro creado exitosamente');
                    $('#modalCategoria').hide();

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
        $('#modalCategoriaLabel').text('Crear Nueva Categoria');
        $('#registroId').val('');
        $('#nombre').val('');
        $('#descripcion').val('');
        $('#precio').val('');


        $.ajax({
            url: 'http://localhost:8080/api/niveles/listarNiveles',
            type: 'GET',
            success: function(data) {

                $('#nivel').empty();


                data.forEach(function(nivel) {
                    $('#nivel').append(new Option(nivel.nombre, nivel.id_nivel));
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los niveles:', error);
            }
        });

        $('#modalCategoria').modal('show');
    } else if (modo === 'editar') {
        $('#modalCategoriaLabel').text('Editar Categoria');
        $.ajax({
            url: `http://localhost:8080/api/categorias/buscarCategoria/`+id,
            type: 'GET',
            success: function(data) {
                $('#registroId').val(data.id_categoria);
                $('#nombre').val(data.nombre);
                $('#descripcion').val(data.descripcion);
                $('#precio').val(data.precio);
                $.ajax({
                    url: 'http://localhost:8080/api/niveles/listarNiveles',
                    type: 'GET',
                    success: function(data) {

                        $('#nivel').empty();


                        data.forEach(function(nivel) {
                            $('#nivel').append(new Option(nivel.nombre, nivel.id_nivel));
                        });
                        $('#nivel').val(data.id_Nivel);
                    },
                    error: function(xhr, status, error) {
                        console.error('Error al obtener los niveles:', error);
                    }
                });
                $('#modalCategoria').modal('show');
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
        url: `http://localhost:8080/api/categorias/eliminarCategoria/`+id,
        type: 'DELETE',
        success: function(response) {
            alert('Registro eliminado exitosamente');
            $('#tablaCategorias').DataTable().row(`#row-${id}`).remove().draw();
        },
        error: function(xhr, status, error) {
            console.error('Error al eliminar el registro:', error);
            alert('Ocurrió un error al eliminar el registro');
        }
    });


}






