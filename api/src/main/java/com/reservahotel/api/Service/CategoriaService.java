package com.reservahotel.api.Service;

import com.reservahotel.api.Entity.Categoria;
import com.reservahotel.api.Repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria updateCategoria(int id, Categoria categoriaDetails) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada con ID: " + id));


        categoria.setNombre(categoriaDetails.getNombre());
        categoria.setDescripcion(categoriaDetails.getDescripcion());
        categoria.setPrecio(categoriaDetails.getPrecio());
        categoria.setNivel(categoriaDetails.getNivel());


        return categoriaRepository.save(categoria);
    }


    public Optional<Categoria> findById(int id) {
        return categoriaRepository.findById(id);
    }

    public void deleteById(int id) {
        Categoria categoria = categoriaRepository.findById(id).orElse(null);
        if (categoria != null) {
            categoriaRepository.delete(categoria);
        } else {
            throw new RuntimeException("Categoria no encontrada");
        }
    }
}
