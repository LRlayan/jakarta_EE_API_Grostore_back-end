package com.example.grostore_pos_system_backend.dao.custom.impl;

import com.example.grostore_pos_system_backend.dao.SQLUtil;
import com.example.grostore_pos_system_backend.dao.custom.OrderDAO;
import com.example.grostore_pos_system_backend.entity.Order;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderDAOImpl implements OrderDAO {
    @Override
    public boolean save(Order dto , Connection connection) throws SQLException {
        return SQLUtil.executeQuery("INSERT INTO orders VALUES(?,?,?,?,?,?,?)",connection,dto.getOrderID(),dto.getDate(),dto.getCusId(),dto.getDiscountRate(),dto.getDiscount(),dto.getSubTotal(),dto.getBalance());
    }

    @Override
    public List<Order> getAll(Connection connection) throws SQLException {
        ResultSet resultSet = SQLUtil.executeQuery("SELECT * FROM orders",connection);
        List<Order> orderList = new ArrayList<>();
        while (resultSet.next()){
            Order orders = new Order(
                    resultSet.getString(1),
                    resultSet.getDate(2).toLocalDate(),
                    resultSet.getString(3),
                    resultSet.getDouble(4),
                    resultSet.getDouble(5),
                    resultSet.getDouble(6),
                    resultSet.getDouble(7)
            );
            orderList.add(orders);
        }
        return orderList;
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
