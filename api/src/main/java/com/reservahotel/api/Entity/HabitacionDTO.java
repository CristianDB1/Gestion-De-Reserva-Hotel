package com.reservahotel.api.Entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HabitacionDTO {
    private int id_habitacion;
    private int numero;
    private int capacidad;
    private String estado;
    private String nombreCategoria;
    private int id_Categoria;

    public  HabitacionDTO(){}

    public HabitacionDTO(int id_habitacion, int numero, int capacidad, String estado, String nombreCategoria, int id_Categoria) {
        this.id_habitacion = id_habitacion;
        this.numero = numero;
        this.capacidad = capacidad;
        this.estado = estado;
        this.nombreCategoria = nombreCategoria;
        this.id_Categoria = id_Categoria;

    }
}
