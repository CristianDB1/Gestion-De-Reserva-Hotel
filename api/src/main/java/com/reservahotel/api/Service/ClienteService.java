package com.reservahotel.api.Service;

import com.reservahotel.api.Entity.Cliente;
import com.reservahotel.api.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> findAll() {return clienteRepository.findAll();
    }

    public Cliente save(Cliente cliente) {return clienteRepository.save(cliente);
    }

    public Cliente updateCliente(int id, Cliente clienteActualizado ){
        Cliente cliente = findById(id);

        cliente.setDocumento(clienteActualizado.getDocumento());
        cliente.setNombre(clienteActualizado.getNombre());
        cliente.setApellido(clienteActualizado.getApellido());
        cliente.setCorreo(clienteActualizado.getCorreo());
        cliente.setTelefono(clienteActualizado.getTelefono());

        return clienteRepository.save(cliente);
    }

    public Cliente buscarDocumento(String documento) {
        return clienteRepository.findByDocumento(documento);
    }

    public Cliente findById(int id) {return clienteRepository.findById(id).orElse(null);
    }

    public void delete(int id) {clienteRepository.deleteById(id); }
}
