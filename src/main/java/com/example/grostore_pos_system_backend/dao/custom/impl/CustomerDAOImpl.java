package com.example.grostore_pos_system_backend.dao.custom.impl;

import com.example.grostore_pos_system_backend.dao.SQLUtil;
import com.example.grostore_pos_system_backend.dao.custom.CustomerDAO;
import com.example.grostore_pos_system_backend.entity.Customer;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CustomerDAOImpl implements CustomerDAO {
    @Override
    public boolean save(Customer dto , Connection connection) throws SQLException {
        return SQLUtil.executeQuery("INSERT INTO customer VALUES(?,?,?,?)",connection,dto.getId(),dto.getName(),dto.getCity(),dto.getTel());
    }

    @Override
    public List<Customer> getAll(Connection connection) throws SQLException {
        ResultSet resultSet = SQLUtil.executeQuery("SELECT * FROM customer",connection);
        List<Customer> customerList = new ArrayList<>();
        while (resultSet.next()){
            Customer customers = new Customer(
                resultSet.getString(1),
                resultSet.getString(2),
                resultSet.getString(3),
                resultSet.getString(4)
            );
            customerList.add(customers);
        }
        return customerList;
    }

    @Override
    public boolean update(Customer dto, Connection connection) throws SQLException {
        return SQLUtil.executeQuery("UPDATE customer SET name = ?, city = ?, tel = ? WHERE id = ?",connection,dto.getName(),dto.getCity(),dto.getTel(),dto.getId());
    }

    @Override
    public boolean delete(String id,Connection connection) throws SQLException {
        return SQLUtil.executeQuery("DELETE FROM customer WHERE id = ?",connection,id);
    }
}
