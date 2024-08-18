package com.example.grostore_pos_system_backend.bo.custom.impl;

import com.example.grostore_pos_system_backend.bo.custom.CustomerBO;
import com.example.grostore_pos_system_backend.dao.DAOFactory;
import com.example.grostore_pos_system_backend.dao.custom.CustomerDAO;
import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.entity.Customer;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CustomerBOImpl implements CustomerBO {

    CustomerDAO customerDAO = (CustomerDAO) DAOFactory.getDAOFactory().DAOTypes(DAOFactory.DAOTypes.CUSTOMER);

    @Override
    public List<CustomerDTO> getAllCustomer(Connection connection) throws SQLException {
        List<CustomerDTO> customerDTOList = new ArrayList<>();
        List<Customer> customerList = customerDAO.getAll(connection);
        for (Customer customers:customerList) {
            customerDTOList.add(new CustomerDTO(customers.getId(),customers.getName(),customers.getCity(),customers.getTel()));
        }
        return customerDTOList;
    }

    @Override
    public boolean updateCustomer(CustomerDTO customerDTO , Connection connection) throws SQLException {
        System.out.println("CustomerBO " + customerDTO.getId() + customerDTO.getName() + customerDTO.getCity() + customerDTO.getTel());
        return customerDAO.update(new Customer(customerDTO.getId(), customerDTO.getName(),customerDTO.getCity(), customerDTO.getTel()),connection);
    }

    @Override
    public boolean saveCustomer(CustomerDTO customerDTO , Connection connection) throws SQLException {
        return customerDAO.save(new Customer(customerDTO.getId(), customerDTO.getName(), customerDTO.getCity(), customerDTO.getTel()),connection);
    }

    @Override
    public boolean deleteCustomer() {
        return false;
    }
}
