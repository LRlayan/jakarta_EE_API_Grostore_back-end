package com.example.grostore_pos_system_backend.persistent.orderImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.dto.OrderDTO;

import java.sql.Connection;
import java.util.List;

public class OrderDataProcess implements OrderData{
    @Override
    public List<OrderDTO> getAllOrder(Connection connection) {
        return null;
    }

    @Override
    public boolean saveOrder(OrderDTO orderDTO, Connection connection) {
        return false;
    }

    @Override
    public boolean updateOrder(String id, Connection connection) {
        return false;
    }

    @Override
    public boolean deleteOrder(OrderDTO orderDTO, Connection connection) {
        return false;
    }
}
