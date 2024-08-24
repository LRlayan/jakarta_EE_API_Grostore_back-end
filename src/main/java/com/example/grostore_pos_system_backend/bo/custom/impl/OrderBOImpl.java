package com.example.grostore_pos_system_backend.bo.custom.impl;

import com.example.grostore_pos_system_backend.bo.custom.OrderBO;
import com.example.grostore_pos_system_backend.dao.DAOFactory;
import com.example.grostore_pos_system_backend.dao.custom.OrderDAO;
import com.example.grostore_pos_system_backend.dao.custom.OrderDetailDAO;
import com.example.grostore_pos_system_backend.dto.OrderDTO;
import com.example.grostore_pos_system_backend.dto.OrderDetailDTO;
import com.example.grostore_pos_system_backend.entity.Order;
import com.example.grostore_pos_system_backend.entity.OrderDetail;
import jakarta.transaction.Transactional;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderBOImpl implements OrderBO {
    OrderDAO orderDAO = (OrderDAO) DAOFactory.getDAOFactory().DAOTypes(DAOFactory.DAOTypes.ORDER);
    OrderDetailDAO orderDetailDAO = (OrderDetailDAO) DAOFactory.getDAOFactory().DAOTypes(DAOFactory.DAOTypes.ORDER_DETAIL);

    @Override
    @Transactional
    public boolean saveOrder(OrderDTO orderDTO, Connection connection) throws SQLException {
        try {
            // Save the main order
            boolean orderSaved = orderDAO.save(new Order(orderDTO.getOrderID(),orderDTO.getDate(),orderDTO.getCusId(),orderDTO.getDiscountRate(), orderDTO.getDiscount(), orderDTO.getSubTotal(), orderDTO.getBalance()), connection);

            // Save each order detail
            for (OrderDetailDTO detail : orderDTO.getOrderDetails()) {
                System.out.println("OrderBO : " + detail.getOrderId() + detail.getDate()+detail.getCusId()+detail.getCusName()+
                        detail.getCity()+detail.getTel()+detail.getItemCode()+detail.getItemName()+
                        detail.getOrderQTY()+detail.getUnitPrice());
                boolean detailSaved = orderDetailDAO.save(new OrderDetail(detail.getOrderId(),detail.getDate(),detail.getCusId(),detail.getCusName(),
                                                          detail.getCity(),detail.getTel(),detail.getItemCode(),detail.getItemName(),
                                                          detail.getOrderQTY(),detail.getUnitPrice()), connection);

                if (!detailSaved) {
                    // Rollback the transaction if any detail fails
                    throw new SQLException("Failed to save order details");
                }
            }
            return orderSaved;
        } catch (Exception e) {
            // If any exception occurs, the transaction will be rolled back automatically
            e.printStackTrace();
            throw e;
        }
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

    @Override
    public boolean updateOrder(OrderDTO orderDTO, Connection connection) throws SQLException {
        return orderDAO.update(new Order(orderDTO.getOrderID(),orderDTO.getDate(),orderDTO.getCusId(),orderDTO.getDiscountRate(), orderDTO.getDiscount(), orderDTO.getSubTotal(), orderDTO.getBalance()),connection);
    }

    @Override
    public boolean deleteOrder(String orderID, Connection connection) throws SQLException {
        return orderDAO.delete(orderID,connection);
    }
}
