package com.reservahotel.api.Controller;

import com.reservahotel.api.Entity.Categoria;
import com.reservahotel.api.Entity.Habitacion;
import com.reservahotel.api.Entity.HabitacionDTO;
import com.reservahotel.api.Entity.Nivel;
import com.reservahotel.api.Service.CategoriaService;
import com.reservahotel.api.Service.HabitacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    private final HabitacionService habitacionService;

    @Autowired
    private CategoriaService categoriaService;


    @Autowired
    public HabitacionController(HabitacionService habitacionService) {
        this.habitacionService = habitacionService;
    }

    @GetMapping("/listarHabitaciones")
    public List<HabitacionDTO> listarHabitaciones() {

        List<Habitacion> habitaciones = habitacionService.findAll();


        return habitaciones.stream().map(habitacion -> {
            HabitacionDTO dto = new HabitacionDTO();
            dto.setId_habitacion(habitacion.getId_habitacion());
            dto.setNumero(habitacion.getNumero());
            dto.setCapacidad(habitacion.getCapacidad());
            dto.setEstado(habitacion.getEstado());


            Categoria categoria = habitacion.getCategoria();
            if (categoria != null) {
                dto.setId_Categoria(categoria.getId_categoria());
                dto.setNombreCategoria(categoria.getNombre());

            }

            return dto;
        }).collect(Collectors.toList());
    }


    @PostMapping("/crearHabitacion")
    public ResponseEntity<HabitacionDTO> crearHabitacion(@RequestBody HabitacionDTO habitacionDTO) {
        try {

            Habitacion habitacion = new Habitacion();
            habitacion.setNumero(habitacionDTO.getNumero());
            habitacion.setCapacidad(habitacionDTO.getCapacidad());
            habitacion.setEstado(habitacionDTO.getEstado());


            Categoria categoria = categoriaService.findById(habitacionDTO.getId_Categoria())
                    .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
            habitacion.setCategoria(categoria);


            Habitacion nuevaHabitacion = habitacionService.save(habitacion);


            HabitacionDTO habitacionRespuesta = new HabitacionDTO();
            habitacionRespuesta.setId_habitacion(nuevaHabitacion.getId_habitacion());
            habitacionRespuesta.setNumero(nuevaHabitacion.getNumero());
            habitacionRespuesta.setCapacidad(nuevaHabitacion.getCapacidad());
            habitacionRespuesta.setEstado(nuevaHabitacion.getEstado());
            habitacionRespuesta.setId_Categoria(nuevaHabitacion.getCategoria().getId_categoria());
            habitacionRespuesta.setNombreCategoria(nuevaHabitacion.getCategoria().getNombre());

            return ResponseEntity.status(HttpStatus.CREATED).body(habitacionRespuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/editarHabitacion/{id}")
    public ResponseEntity<HabitacionDTO> editarHabitacion(@PathVariable int id, @RequestBody HabitacionDTO habitacionDTO) {
        try {

            Optional<Habitacion> habitacionOptional = habitacionService.findById(id);
            if (habitacionOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }


            Categoria categoria = categoriaService.findById(habitacionDTO.getId_Categoria())
                    .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));


            Habitacion habitacionExistente = habitacionOptional.get();


            habitacionExistente.setNumero(habitacionDTO.getNumero());
            habitacionExistente.setCapacidad(habitacionDTO.getCapacidad());
            habitacionExistente.setEstado(habitacionDTO.getEstado());
            habitacionExistente.setCategoria(categoria);


            Habitacion habitacionActualizada = habitacionService.save(habitacionExistente);


            HabitacionDTO habitacionRespuesta = new HabitacionDTO();
            habitacionRespuesta.setId_habitacion(habitacionActualizada.getId_habitacion());
            habitacionRespuesta.setNumero(habitacionActualizada.getNumero());
            habitacionRespuesta.setCapacidad(habitacionActualizada.getCapacidad());
            habitacionRespuesta.setEstado(habitacionActualizada.getEstado());
            habitacionRespuesta.setId_Categoria(habitacionActualizada.getCategoria().getId_categoria());
            habitacionRespuesta.setNombreCategoria(habitacionActualizada.getCategoria().getNombre());

            return ResponseEntity.status(HttpStatus.OK).body(habitacionRespuesta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/buscarHabitacion/{id}")
    public ResponseEntity<HabitacionDTO> buscarHabitacion(@PathVariable int id) {
        Optional<Habitacion> habitacionOptional = habitacionService.findById(id);

        if (habitacionOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Habitacion habitacion = habitacionOptional.get();


        HabitacionDTO dto = new HabitacionDTO();
        dto.setId_habitacion(habitacion.getId_habitacion());
        dto.setNumero(habitacion.getNumero());
        dto.setCapacidad(habitacion.getCapacidad());
        dto.setEstado(habitacion.getEstado());
        dto.setId_Categoria(habitacion.getCategoria().getId_categoria());
        dto.setNombreCategoria(habitacion.getCategoria().getNombre());

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/eliminarHabitacion/{id}")
    public ResponseEntity<String> eliminarHabitacion(@PathVariable int id) {
        Optional<Habitacion> habitacionOptional = habitacionService.findById(id);

        if (habitacionOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("La habitación con ID " + id + " no fue encontrada.");
        }

        habitacionService.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body("La habitación con ID " + id + " fue eliminada exitosamente.");
    }

}
