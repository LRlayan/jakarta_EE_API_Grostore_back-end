package com.example.grostore_pos_system_backend.persistent.orderDetailImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.dto.OrderDetailDTO;

import java.sql.Connection;
import java.util.List;

public class OrderDetailDataProcess implements OrderDetailData{
    @Override
    public List<OrderDetailDTO> getAllOrderDetail(Connection connection) {
        return null;
    }

    @Override
    public boolean updateCustomer(String id, Connection connection) {
        return false;
    }

    @Override
    public boolean deleteCustomer(CustomerDTO customerDTO, Connection connection) {
        return false;
    }
}
