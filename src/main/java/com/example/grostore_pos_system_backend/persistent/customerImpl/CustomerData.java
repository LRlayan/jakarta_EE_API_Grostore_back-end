package com.example.grostore_pos_system_backend.persistent.customerImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;

import java.sql.Connection;
import java.util.List;

public interface CustomerData {
    List<CustomerDTO> getAllCustomer(Connection connection);
    boolean saveCustomer(CustomerDTO customerDTO , Connection connection);
    boolean updateCustomer(String id , Connection connection);
    boolean deleteCustomer(CustomerDTO customerDTO , Connection connection);
}
