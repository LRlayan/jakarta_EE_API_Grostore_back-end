package com.example.grostore_pos_system_backend.bo.custom.impl;

import com.example.grostore_pos_system_backend.bo.custom.OrderBO;
import com.example.grostore_pos_system_backend.dao.DAOFactory;
import com.example.grostore_pos_system_backend.dao.custom.OrderDAO;
import com.example.grostore_pos_system_backend.dto.OrderDTO;
import com.example.grostore_pos_system_backend.entity.Order;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderBOImpl implements OrderBO {
    OrderDAO orderDAO = (OrderDAO) DAOFactory.getDAOFactory().DAOTypes(DAOFactory.DAOTypes.ORDER);
    @Override
    public boolean saveOrder(OrderDTO orderDTO, Connection connection) throws SQLException {
        return orderDAO.save(new Order(orderDTO.getOrderID(),orderDTO.getDate(),orderDTO.getCusId(),orderDTO.getDiscountRate(), orderDTO.getDiscount(), orderDTO.getSubTotal(), orderDTO.getBalance()) , connection);
    }

    @Override
    public List<OrderDTO> getAllOrder(Connection connection) throws SQLException {
        List<OrderDTO> orderDTOList = new ArrayList<>();
        List<Order> ordersList = orderDAO.getAll(connection);
        for (Order orders : ordersList) {
            orderDTOList.add(new OrderDTO(orders.getOrderID(),orders.getDate(),orders.getCusId(),orders.getDiscountRate(),orders.getDiscount(),orders.getSubTotal(),orders.getBalance()));
        }
        return orderDTOList;
    }
}
