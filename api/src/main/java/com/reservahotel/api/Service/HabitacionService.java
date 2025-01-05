package com.reservahotel.api.Service;

import com.reservahotel.api.Entity.Habitacion;
import com.reservahotel.api.Repository.HabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HabitacionService {

    private final HabitacionRepository habitacionRepository;

    @Autowired
    public HabitacionService(HabitacionRepository habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    public List<Habitacion> findAll() {
        return habitacionRepository.findAll();
    }

    public Habitacion save(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    public Habitacion updateHabitacion(int id, Habitacion habitacionDetails) {

        Optional<Habitacion> habitacionOptional = habitacionRepository.findById(id);


        if (habitacionOptional.isEmpty()) {
            return null;
        }


        Habitacion habitacion = habitacionOptional.get();


        habitacion.setNumero(habitacionDetails.getNumero());
        habitacion.setCapacidad(habitacionDetails.getCapacidad());
        habitacion.setEstado(habitacionDetails.getEstado());




        return habitacionRepository.save(habitacion);
    }


    public Optional<Habitacion> findById(int id) {
        return habitacionRepository.findById(id);
    }

    public void deleteById(int id) {
        habitacionRepository.deleteById(id);
    }
}
