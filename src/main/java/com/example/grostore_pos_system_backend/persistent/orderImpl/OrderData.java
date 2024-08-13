package com.example.grostore_pos_system_backend.persistent.orderImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.dto.OrderDTO;

import java.sql.Connection;
import java.util.List;

public interface OrderData {
    List<OrderDTO> getAllOrder(Connection connection);
    boolean saveOrder(OrderDTO orderDTO , Connection connection);
    boolean updateOrder(String id , Connection connection);
    boolean deleteOrder(OrderDTO orderDTO , Connection connection);
}
