package com.reservahotel.api.Controller;

import com.reservahotel.api.Entity.Nivel;
import com.reservahotel.api.Service.NivelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/niveles")
public class NivelController {
    private final NivelService nivelService;

    @Autowired
    public NivelController(NivelService nivelService) {
        this.nivelService = nivelService;
    }

    @GetMapping("/listarNiveles")
    public List<Nivel> listarNiveles() {
        return nivelService.findAll();
    }

    @PostMapping("/crearNiveles")
    public Nivel CrearNivel(@RequestBody Nivel nivel) {
        return nivelService.save(nivel);
    }

    @PutMapping("/editarNiveles/{id}")
    public Nivel updateNivel(@PathVariable int id, @RequestBody Nivel nivelDetails){
        return nivelService.updateNivel(id, nivelDetails);
    }

    @GetMapping("/buscarNiveles/{id}")
    public Nivel buscarNivel(@PathVariable int id) {
        return nivelService.findById(id)
                .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
    }

    @DeleteMapping("/eliminarNiveles/{id}")
    public void eliminarNivel(@PathVariable int id) {
        nivelService.deleteById(id);
    }
}
