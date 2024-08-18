package com.example.grostore_pos_system_backend.dao.custom.impl;

import com.example.grostore_pos_system_backend.dao.custom.OrderDAO;
import com.example.grostore_pos_system_backend.entity.Order;

import java.sql.Connection;
import java.util.List;

public class OrderDAOImpl implements OrderDAO {
    @Override
    public boolean save(Order dto , Connection connection) {
        return false;
    }

    @Override
    public List<Order> getAll(Connection connection) {
        return null;
    }

    @Override
    public boolean update(Order dto, Connection connection) {
        return false;
    }

    @Override
    public boolean delete(String id,Connection connection) {
        return false;
    }
}
