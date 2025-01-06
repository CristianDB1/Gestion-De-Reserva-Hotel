package com.reservahotel.api.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_usuario;

    @Column(unique = true)
    private String username;
    @Column
    private String password;

    public User(){
    }

    public User(int id_usuario, String username, String password) {
        this.id_usuario = id_usuario;
        this.username = username;
        this.password = password;
    }
}

