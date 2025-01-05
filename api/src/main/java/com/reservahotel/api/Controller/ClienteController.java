package com.reservahotel.api.Controller;

import com.reservahotel.api.Entity.Cliente;
import com.reservahotel.api.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;


    @GetMapping("/listarCliente")
    public List<Cliente> listar() {
        return clienteService.findAll();
    }

    @GetMapping("/buscarCliente/{id}")
    public Cliente buscarPorId(@PathVariable int id) {
        return clienteService.findById(id);
    }

    @PostMapping("/crearCliente")
    public Cliente crearCliente(@RequestBody Cliente cliente) {
        return clienteService.save(cliente);
    }

    @PutMapping("/editarCliente/{id}")
    public Cliente actualizarCliente(@PathVariable int id, @RequestBody Cliente cliente) {
        return clienteService.updateCliente(id, cliente);
    }

    @DeleteMapping("/eliminarCliente/{id}")
    public void eliminarCliente(@PathVariable int id) {
        clienteService.delete(id);
    }

    @GetMapping("/buscarDocumentoCliente")
    public Cliente buscarDocumento(@RequestParam String documento) {
        return clienteService.buscarDocumento(documento);
    }
}
