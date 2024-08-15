package com.example.grostore_pos_system_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail {
    private String orderId;
    private LocalDate date;
    private String cusId;
    private String cusName;
    private String city;
    private String tel;
    private String itemCode;
    private String itemName;
    private String unitPrice;
}
