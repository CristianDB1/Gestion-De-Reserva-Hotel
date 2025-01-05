package com.reservahotel.api.Entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReservaCompletaDTO {

    private int idReserva;
    private LocalDateTime fechaInicio;
    private int idHabitacion;
    private int numero;
    private String estado;
    private String descripcion;
    private String nombreCategoria;
    private float precio;
    private int idCliente;
    private String documento;
    private String nombreCliente;
    private String apellidoCliente;
    private String correo;
    private String telefono;

    public ReservaCompletaDTO(int idReserva, LocalDateTime fechaInicio, int idHabitacion, int numero, String estado, String descripcion, String nombreCategoria, float precio, int idCliente, String documento, String nombreCliente, String apellidoCliente, String correo, String telefono) {
        this.idReserva = idReserva;
        this.fechaInicio = fechaInicio;
        this.idHabitacion = idHabitacion;
        this.numero = numero;
        this.estado = estado;
        this.descripcion = descripcion;
        this.nombreCategoria = nombreCategoria;
        this.precio = precio;
        this.idCliente = idCliente;
        this.documento = documento;
        this.nombreCliente = nombreCliente;
        this.apellidoCliente = apellidoCliente;
        this.correo = correo;
        this.telefono = telefono;
    }
}
