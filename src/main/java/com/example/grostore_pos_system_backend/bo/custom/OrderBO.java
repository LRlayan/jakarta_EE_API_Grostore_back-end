package com.example.grostore_pos_system_backend.bo.custom;

import com.example.grostore_pos_system_backend.bo.SuperBO;
import com.example.grostore_pos_system_backend.dto.OrderDTO;

import java.sql.Connection;
import java.sql.SQLException;

public interface OrderBO extends SuperBO {
    boolean saveOrder(OrderDTO orderDTO , Connection connection) throws SQLException;
}
