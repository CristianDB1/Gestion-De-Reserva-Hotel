package com.reservahotel.api.Service;

import com.reservahotel.api.Entity.Nivel;
import com.reservahotel.api.Repository.NivelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NivelService {

    private final NivelRepository nivelRepository;

    @Autowired
    public NivelService(NivelRepository nivelRepository) {
        this.nivelRepository = nivelRepository;
    }

    public List<Nivel> findAll() {
        return nivelRepository.findAll();
    }

    public Nivel save(Nivel nivel) {
        return nivelRepository.save(nivel);
    }

    public Nivel updateNivel(int id, Nivel nivelDetails) {

        Optional<Nivel> optionalNivel = findById(id);


        if (optionalNivel.isPresent()) {
            Nivel nivel = optionalNivel.get();


            nivel.setNombre(nivelDetails.getNombre());
            nivel.setDescripcion(nivelDetails.getDescripcion());


            return nivelRepository.save(nivel);
        } else {

            return null;

        }
    }


    public Optional<Nivel> findById(int id) {
        return nivelRepository.findById(id);
    }

    public void deleteById(int id) {
        nivelRepository.deleteById(id);
    }
}
