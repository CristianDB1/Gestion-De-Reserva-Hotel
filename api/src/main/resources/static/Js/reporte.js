$(document).ready(function() {
    var table = $('#reporteReserva').DataTable({
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
            url: 'http://localhost:8080/api/reservas/listarReservaCompleta',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                table.clear();
                $.each(data, function(index, item) {
                    table.row.add([
                        item.idReserva,
                        item.numero,
                        item.documento,
                        item.nombreCliente,
                        item.apellidoCliente,
                        item.fechaInicio
                    ]).draw();
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar los datos:', error);
            }
        });
    }
    cargarDatos();

});