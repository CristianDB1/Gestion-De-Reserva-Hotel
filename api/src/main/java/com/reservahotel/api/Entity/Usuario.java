package com.reservahotel.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_usuario;

    @Column
    private String nombre;
    @Column
    private String usuario;
    @Column
    private String password;

    @ManyToOne
    @JoinColumn(name = "roles_id")
    @JsonIgnore
    private Roles roles;

    public Usuario(){

    }

    public Usuario(int id_usuario, String nombre, String usuario, String password, Roles roles) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.usuario = usuario;
        this.password = password;
        this.roles = roles;
    }
}

