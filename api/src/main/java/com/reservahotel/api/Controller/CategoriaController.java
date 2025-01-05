package com.reservahotel.api.Controller;

import com.reservahotel.api.Entity.Categoria;
import com.reservahotel.api.Entity.CategoriaDTO;
import com.reservahotel.api.Entity.Nivel;
import com.reservahotel.api.Service.NivelService;
import com.reservahotel.api.Service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @Autowired
    private NivelService nivelService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping("/listarCategorias")
    public List<CategoriaDTO> listarCategorias() {
        List<Categoria> categorias = categoriaService.findAll();
        return categorias.stream().map(categoria -> {
            CategoriaDTO dto = new CategoriaDTO();
            dto.setId_categoria(categoria.getId_categoria());
            dto.setNombre(categoria.getNombre());
            dto.setDescripcion(categoria.getDescripcion());
            dto.setPrecio(categoria.getPrecio());
            dto.setNombreNivel(categoria.getNivel().getNombre());
            dto.setId_Nivel(categoria.getNivel().getId_nivel());
            return dto;
        }).collect(Collectors.toList());
    }


    @PostMapping("/crearCategoria")
    public ResponseEntity<CategoriaDTO> crearCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        try {

            Categoria categoria = new Categoria();
            categoria.setNombre(categoriaDTO.getNombre());
            categoria.setDescripcion(categoriaDTO.getDescripcion());
            categoria.setPrecio(categoriaDTO.getPrecio());


            Nivel nivel = nivelService.findById(categoriaDTO.getId_Nivel())
                    .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
            categoria.setNivel(nivel);


            Categoria categoriaGuardada = categoriaService.save(categoria);


            CategoriaDTO categoriaRespuesta = new CategoriaDTO();
            categoriaRespuesta.setId_categoria(categoriaGuardada.getId_categoria());
            categoriaRespuesta.setNombre(categoriaGuardada.getNombre());
            categoriaRespuesta.setDescripcion(categoriaGuardada.getDescripcion());
            categoriaRespuesta.setPrecio(categoriaGuardada.getPrecio());
            categoriaRespuesta.setId_Nivel(categoriaGuardada.getNivel().getId_nivel());
            categoriaRespuesta.setNombreNivel(categoriaGuardada.getNivel().getNombre());

            return ResponseEntity.status(HttpStatus.CREATED).body(categoriaRespuesta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/editarCategoria/{id}")
    public ResponseEntity<CategoriaDTO> editarCategoria(@PathVariable int id, @RequestBody CategoriaDTO categoriaDTO) {
        try {
            Categoria categoriaExistente = categoriaService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));

            categoriaExistente.setNombre(categoriaDTO.getNombre());
            categoriaExistente.setDescripcion(categoriaDTO.getDescripcion());
            categoriaExistente.setPrecio(categoriaDTO.getPrecio());


            Nivel nivel = nivelService.findById(categoriaDTO.getId_Nivel())
                    .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
            categoriaExistente.setNivel(nivel);

            Categoria categoriaActualizada = categoriaService.save(categoriaExistente);

            CategoriaDTO categoriaRespuesta = new CategoriaDTO();
            categoriaRespuesta.setId_categoria(categoriaActualizada.getId_categoria());
            categoriaRespuesta.setNombre(categoriaActualizada.getNombre());
            categoriaRespuesta.setDescripcion(categoriaActualizada.getDescripcion());
            categoriaRespuesta.setPrecio(categoriaActualizada.getPrecio());
            categoriaRespuesta.setId_Nivel(categoriaActualizada.getNivel().getId_nivel());
            categoriaRespuesta.setNombreNivel(categoriaActualizada.getNivel().getNombre());

            return ResponseEntity.status(HttpStatus.OK).body(categoriaRespuesta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/buscarCategoria/{id}")
    public ResponseEntity<CategoriaDTO> buscarCategoriaPorId(@PathVariable int id) {

        Categoria categoria = categoriaService.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada con ID: " + id));


        CategoriaDTO dto = new CategoriaDTO();
        dto.setId_categoria(categoria.getId_categoria());
        dto.setNombre(categoria.getNombre());
        dto.setDescripcion(categoria.getDescripcion());
        dto.setPrecio(categoria.getPrecio());
        dto.setId_Nivel(categoria.getNivel().getId_nivel());
        dto.setNombreNivel(categoria.getNivel().getNombre());

        return ResponseEntity.ok(dto);
    }



    @DeleteMapping("/eliminarCategoria/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable int id) {
        try {
            categoriaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/detalle-precio/{id}")
    public ResponseEntity<CategoriaDTO> obtenerCategoriaPorId(@PathVariable int id) {
        Optional<Categoria> categoria = categoriaService.findById(id);
        if (categoria.isPresent()) {
            CategoriaDTO categoriaDTO = new CategoriaDTO();
            categoriaDTO.setDescripcion(categoria.get().getDescripcion());
            categoriaDTO.setPrecio(categoria.get().getPrecio());
            return ResponseEntity.ok(categoriaDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
