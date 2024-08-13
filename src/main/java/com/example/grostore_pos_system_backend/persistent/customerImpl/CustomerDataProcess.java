package com.example.grostore_pos_system_backend.persistent.customerImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;

import java.sql.Connection;
import java.util.List;

public class CustomerDataProcess implements CustomerData{
    @Override
    public List<CustomerDTO> getAllCustomer(Connection connection) {
        return null;
    }

    @Override
    public boolean saveCustomer(CustomerDTO customerDTO, Connection connection) {
        return false;
    }

    @Override
    public boolean updateCustomer(String id, Connection connection) {
        return false;
    }

    @Override
    public boolean deleteCustomer(CustomerDTO customerDTO, Connection connection) {
        return false;
    }
}
