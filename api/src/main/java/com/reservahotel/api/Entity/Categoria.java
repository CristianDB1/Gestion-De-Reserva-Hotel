package com.reservahotel.api.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_categoria;

    @Column
    private String nombre;
    @Column
    private String descripcion;
    @Column
    private float precio;

    public Categoria() {

    }

    public Categoria(int id_categoria, String nombre, String descripcion, float precio, Nivel nivel, List<Habitacion> habitaciones) {
        this.id_categoria = id_categoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.nivel = nivel;
        this.habitaciones = habitaciones;
    }

    @ManyToOne
    @JoinColumn(name = "nivel_id")
    @JsonBackReference
    private Nivel nivel;


    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Habitacion> habitaciones ;



}
