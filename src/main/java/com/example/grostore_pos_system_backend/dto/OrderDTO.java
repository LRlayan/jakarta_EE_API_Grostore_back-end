package com.example.grostore_pos_system_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO implements Serializable {
    private String orderID;
    private LocalDate date;
    private String cusId;
    private double discountRate;
    private double discount;
    private double subTotal;
    private double balance;
    private List<OrderDetailDTO> orderDetails;

    public OrderDTO(String orderID, LocalDate date, String cusId, double discountRate, double discount, double subTotal, double balance) {
        this.orderID = orderID;
        this.date = date;
        this.cusId = cusId;
        this.discountRate = discountRate;
        this.discount = discount;
        this.subTotal = subTotal;
        this.balance = balance;
    }
}
