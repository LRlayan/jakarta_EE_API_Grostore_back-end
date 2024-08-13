package com.example.grostore_pos_system_backend.persistent.orderDetailImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.dto.OrderDetailDTO;

import java.sql.Connection;
import java.util.List;

public interface OrderDetailData {
    List<OrderDetailDTO> getAllOrderDetail(Connection connection);
    boolean updateCustomer(String id , Connection connection);
    boolean deleteCustomer(CustomerDTO customerDTO , Connection connection);
}
