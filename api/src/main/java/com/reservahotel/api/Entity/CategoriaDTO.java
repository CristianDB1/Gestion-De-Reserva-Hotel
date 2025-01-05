package com.reservahotel.api.Entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaDTO {
    private int id_categoria;
    private String nombre;
    private String descripcion;
    private float precio;
    private String nombreNivel;
    private int id_Nivel;

    public CategoriaDTO() {}

    public CategoriaDTO(int id_categoria, String nombre, String descripcion, float precio, String nombreNivel, int id_Nivel) {
        this.id_categoria = id_categoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.nombreNivel = nombreNivel;
        this.id_Nivel = id_Nivel;
    }
}
