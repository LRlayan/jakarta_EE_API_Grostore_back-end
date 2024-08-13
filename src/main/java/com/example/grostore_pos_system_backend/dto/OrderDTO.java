package com.example.grostore_pos_system_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private String orderID;
    private LocalDate date;
    private String cusId;
    private double discountRate;
    private double discount;
    private double subTotal;
    private double balance;
}
