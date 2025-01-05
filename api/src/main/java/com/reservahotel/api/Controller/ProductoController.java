package com.reservahotel.api.Controller;

import com.reservahotel.api.Entity.Producto;
import com.reservahotel.api.Service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping("/listarProducto")
    public List<Producto> listarProducto() {
        return productoService.findAll();
    }

    @PostMapping("/crearProducto")
    public Producto save(@RequestBody Producto producto) {
        return productoService.save(producto);
    }

    @PutMapping("/editarProducto/{id}")
    public Producto updateProducto(@PathVariable int id, @RequestBody Producto producto) {
        return productoService.updateProducto(id,producto);
    }

    @GetMapping("/buscarProducto/{id}")
    public Producto findById(@PathVariable int id) {
        return productoService.findById(id);
    }

    @DeleteMapping("/eliminarProducto/{id}")
    public void eliminarProducto(@PathVariable int id) {
        productoService.delete(id);
    }
}
