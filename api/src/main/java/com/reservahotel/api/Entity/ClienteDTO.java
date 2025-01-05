package com.reservahotel.api.Entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteDTO {
    private int id;
    private String documento;
    private String nombre;
    private String correo;
    private String telefono;

    public ClienteDTO() {

    }

    public ClienteDTO(int id, String documento, String nombre, String correo, String telefono) {
        this.id = id;
        this.documento = documento;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
    }
}
