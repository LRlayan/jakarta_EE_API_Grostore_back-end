package com.example.grostore_pos_system_backend.bo.custom;

import com.example.grostore_pos_system_backend.bo.SuperBO;
import com.example.grostore_pos_system_backend.dto.CustomerDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface CustomerBO extends SuperBO {
    List<CustomerDTO> getAllCustomer();
    boolean updateCustomer();
    boolean saveCustomer(CustomerDTO customerDTO , Connection connection) throws SQLException;
    boolean deleteCustomer();
}
