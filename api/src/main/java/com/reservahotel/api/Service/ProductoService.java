package com.reservahotel.api.Service;

import com.reservahotel.api.Entity.Cliente;
import com.reservahotel.api.Entity.Producto;
import com.reservahotel.api.Repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Producto updateProducto(int id, Producto productoActualizado ){
        Producto producto = findById(id);

        producto.setCodigo(productoActualizado.getCodigo());
        producto.setNombre(productoActualizado.getNombre());
        producto.setDetalle(productoActualizado.getDetalle());
        producto.setPrecio(productoActualizado.getPrecio());

        return productoRepository.save(producto);
    }


    public Producto findById(int id) {
        return productoRepository.findById(id).orElse(null);
    }

    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    public void delete(int id) {
        productoRepository.deleteById(id);
    }
}
