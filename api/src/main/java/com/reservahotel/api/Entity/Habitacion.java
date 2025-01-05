package com.reservahotel.api.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_habitacion;

    @Column
    private int numero;
    @Column
    private int capacidad;
    @Column
    private String estado;

    public Habitacion() {}

    public Habitacion(int id_habitacion, int numero, int capacidad, String estado, Categoria categoria, List<Reserva> reservas) {
        this.id_habitacion = id_habitacion;
        this.numero = numero;
        this.capacidad = capacidad;
        this.estado = estado;
        this.categoria = categoria;
        this.reservas = reservas;
    }

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    @JsonBackReference
    private Categoria categoria;

    @OneToMany(mappedBy = "habitacion",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("habitacion-reserva")
    private List<Reserva> reservas;
}
