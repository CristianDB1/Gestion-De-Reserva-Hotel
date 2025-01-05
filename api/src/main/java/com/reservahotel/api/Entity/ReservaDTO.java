package com.reservahotel.api.Entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservaDTO {

    private int idReserva;
    private int idCliente;
    private int idHabitacion;

    public ReservaDTO(){

    }

    public ReservaDTO(int idReserva, int idCliente, int idHabitacion) {
        this.idReserva = idReserva;
        this.idCliente = idCliente;
        this.idHabitacion = idHabitacion;
    }
}
