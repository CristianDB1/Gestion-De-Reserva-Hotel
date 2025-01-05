package com.reservahotel.api.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_producto;

    @Column
    private String codigo;
    @Column
    private String nombre;
    @Column
    private String detalle;
    @Column
    private float precio;

    public Producto() {}

    public Producto(int id_producto, String codigo, String nombre, String detalle, float precio) {
        this.id_producto = id_producto;
        this.codigo = codigo;
        this.nombre = nombre;
        this.detalle = detalle;
        this.precio = precio;
    }
}
