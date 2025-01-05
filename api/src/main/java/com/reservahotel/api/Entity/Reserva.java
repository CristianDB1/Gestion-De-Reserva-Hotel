package com.reservahotel.api.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_reserva;

    @Column
    private LocalDateTime fechaInicio =  LocalDateTime.now();

    public Reserva(){

    }

    public Reserva(int id_reserva, LocalDateTime fechaInicio, Cliente cliente, Habitacion habitacion) {
        this.id_reserva = id_reserva;
        this.fechaInicio = fechaInicio;
        this.cliente = cliente;
        this.habitacion = habitacion;
    }


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    @JsonBackReference("cliente-reserva")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habitacion_id")
    @JsonBackReference("habitacion-reserva")
    private Habitacion habitacion;


}
