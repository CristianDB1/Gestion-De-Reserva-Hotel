package com.reservahotel.api.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("Gestion")
public class Controlador {

    @GetMapping("/niveles")
    public String panelNiveles(){
        return "confi_niveles";
    }

    @GetMapping("/home")
    public String panelRecepcion(){
        return "recepcion";
    }

    @GetMapping("/categorias")
    public String panelCategorias(){
        return "confi_categorias";
    }

    @GetMapping("/habitaciones")
    public String panelHabitaciones(){
        return "confi_habitaciones";
    }

    @GetMapping("/salida")
    public String panelSalida(){
        return "salida";
    }

    @GetMapping("/apertura")
    public String panelApertura(){
        return "caja_apertura";
    }

    @GetMapping("/cierre")
    public String panelCierre(){
        return "caja_cierre";
    }

    @GetMapping("/reporte")
    public String panelReporte(){
        return "reporte";
    }

    @GetMapping("/productos")
    public String panelProductos(){
        return "PV_productos";
    }

    @GetMapping("/clientes")
    public String panelClientes(){
        return "clientes";
    }

    @GetMapping("/login")
    public String panelLogin(){
        return "login";
    }
}
