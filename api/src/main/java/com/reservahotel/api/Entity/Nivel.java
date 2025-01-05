package com.reservahotel.api.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class Nivel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_nivel;

    @Column
    private String nombre;
    @Column
    private String descripcion;

    public Nivel() {

    }

    public Nivel(int id_nivel, String nombre, String descripcion, List<Categoria> categorias) {
        this.id_nivel = id_nivel;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categorias = categorias;
    }

    @OneToMany(mappedBy = "nivel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Categoria> categorias;



}
