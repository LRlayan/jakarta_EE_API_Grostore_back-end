package com.example.grostore_pos_system_backend.dao.custom.impl;

import com.example.grostore_pos_system_backend.dao.SQLUtil;
import com.example.grostore_pos_system_backend.dao.custom.OrderDetailDAO;
import com.example.grostore_pos_system_backend.entity.OrderDetail;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class OrderDetailDAOImpl implements OrderDetailDAO {
    @Override
    public boolean save(OrderDetail dto , Connection connection) throws SQLException {
        return SQLUtil.executeQuery("INSERT INTO orderDetail (orderId, date, customerId, customerName, customerCity, customerTel, itemCode, itemName, orderQTY, unitPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",connection,dto.getOrderId(),dto.getDate(),dto.getCustomerId(),dto.getCustomerName(),dto.getCustomerCity(),dto.getCustomerTel(),dto.getItemCode(),dto.getItemName(),dto.getOrderQTY(),dto.getUnitPrice());
    }

    @Override
    public List<OrderDetail> getAll(Connection connection) {
        return null;
    }

    @Override
    public boolean update(OrderDetail dto, Connection connection) {
        return false;
    }

    @Override
    public boolean delete(String id,Connection connection) {
        return false;
    }
}
