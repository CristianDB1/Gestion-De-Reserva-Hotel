package com.reservahotel.api.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_roles;
    @Column
    private String nombre;
    @Column
    private String descripcion;


    @OneToMany(mappedBy = "roles", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Usuario> usuarios;

    public Roles (){

    }

    public Roles(int id_roles, String nombre, String descripcion, List<Usuario> usuarios) {
        this.id_roles = id_roles;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.usuarios = usuarios;
    }
}
