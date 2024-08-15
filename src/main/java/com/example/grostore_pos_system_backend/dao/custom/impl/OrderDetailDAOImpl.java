package com.example.grostore_pos_system_backend.dao.custom.impl;

import com.example.grostore_pos_system_backend.dao.custom.OrderDetailDAO;
import com.example.grostore_pos_system_backend.entity.OrderDetail;

import java.sql.Connection;
import java.util.List;

public class OrderDetailDAOImpl implements OrderDetailDAO {
    @Override
    public boolean save(OrderDetail dto , Connection connection) {
        return false;
    }

    @Override
    public List<OrderDetail> getAll(Connection connection) {
        return null;
    }

    @Override
    public boolean update(OrderDetail dto) {
        return false;
    }

    @Override
    public boolean delete(String id) {
        return false;
    }
}
