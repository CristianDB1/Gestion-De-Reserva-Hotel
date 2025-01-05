package com.reservahotel.api.Entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_cliente;

    @Column(unique = true)
    private String documento;
    @Column
    private String nombre;
    @Column
    private String apellido;
    @Column
    private String correo;
    @Column
    private String telefono;

    @OneToMany(mappedBy = "cliente",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("cliente-reserva")
    private List<Reserva> reservas;

    public Cliente() {}

    public Cliente(int id_cliente, String documento, String nombre, String apellido, String correo, String telefono, List<Reserva> reservas) {
        this.id_cliente = id_cliente;
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.reservas = reservas;
    }
}
