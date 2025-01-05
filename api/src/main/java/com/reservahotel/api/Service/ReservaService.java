package com.reservahotel.api.Service;

import com.reservahotel.api.Entity.*;
import com.reservahotel.api.Repository.ClienteRepository;
import com.reservahotel.api.Repository.HabitacionRepository;
import com.reservahotel.api.Repository.ReservaRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;

    public ReservaDTO crearReserva(ReservaDTO reservaDTO) {

        Reserva reserva = new Reserva();


        Cliente cliente = clienteRepository.findById(reservaDTO.getIdCliente())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        Habitacion habitacion = habitacionRepository.findById(reservaDTO.getIdHabitacion())
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));


        reserva.setCliente(cliente);
        reserva.setHabitacion(habitacion);


        Reserva reservaGuardada = reservaRepository.save(reserva);


        ReservaDTO resultado = new ReservaDTO();
        resultado.setIdReserva(reservaGuardada.getId_reserva());
        resultado.setIdCliente(cliente.getId_cliente());
        resultado.setIdHabitacion(habitacion.getId_habitacion());

        return resultado;
    }

    public ReservaCompletaDTO obtenerDetallesReserva(int id) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con ID: " + id));

        Cliente cliente = reserva.getCliente();
        Habitacion habitacion = reserva.getHabitacion();
        Categoria categoria = habitacion.getCategoria();

        return new ReservaCompletaDTO(
                reserva.getId_reserva(),
                reserva.getFechaInicio(),
                habitacion.getId_habitacion(),
                habitacion.getNumero(),
                habitacion.getEstado(),
                categoria.getDescripcion(),
                categoria.getNombre(),
                categoria.getPrecio(),
                cliente.getId_cliente(),
                cliente.getDocumento(),
                cliente.getNombre(),
                cliente.getApellido(),
                cliente.getCorreo(),
                cliente.getTelefono()
        );
    }

    public List<ReservaCompletaDTO> listarReservasCompletas() {
        List<Reserva> reservas = reservaRepository.findAll();

        if (reservas.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron reservas.");
        }

        return reservas.stream().map(reserva -> {
            Cliente cliente = reserva.getCliente();
            Habitacion habitacion = reserva.getHabitacion();
            Categoria categoria = habitacion.getCategoria();

            return new ReservaCompletaDTO(
                    reserva.getId_reserva(),
                    reserva.getFechaInicio(),
                    habitacion.getId_habitacion(),
                    habitacion.getNumero(),
                    habitacion.getEstado(),
                    categoria.getDescripcion(),
                    categoria.getNombre(),
                    categoria.getPrecio(),
                    cliente.getId_cliente(),
                    cliente.getDocumento(),
                    cliente.getNombre(),
                    cliente.getApellido(),
                    cliente.getCorreo(),
                    cliente.getTelefono()
            );
        }).collect(Collectors.toList());
    }

    public List<Reserva> obtenerReservas() {
        return reservaRepository.findAll();
    }


}
