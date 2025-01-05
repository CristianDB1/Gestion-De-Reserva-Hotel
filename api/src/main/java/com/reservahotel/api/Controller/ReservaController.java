package com.reservahotel.api.Controller;
import com.reservahotel.api.Entity.Reserva;
import com.reservahotel.api.Entity.ReservaCompletaDTO;
import com.reservahotel.api.Entity.ReservaDTO;
import com.reservahotel.api.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping("/crearReserva")
    public ResponseEntity<ReservaDTO> crearReserva(@RequestBody ReservaDTO reservaDTO) {

        ReservaDTO nuevaReserva = reservaService.crearReserva(reservaDTO);

        return ResponseEntity.ok(nuevaReserva);
    }

    @GetMapping("/buscarReserva/{id}")
    public ResponseEntity<ReservaCompletaDTO> obtenerDetallesReserva(@PathVariable int id) {
        ReservaCompletaDTO detalles = reservaService.obtenerDetallesReserva(id);
        return ResponseEntity.ok(detalles);
    }
    
    @GetMapping("/listarReservaCompleta")
    public ResponseEntity<List<ReservaCompletaDTO>> listarReservasCompletas() {
        List<ReservaCompletaDTO> reservasCompletas = reservaService.listarReservasCompletas();

        return ResponseEntity.ok(reservasCompletas);
    }

}
