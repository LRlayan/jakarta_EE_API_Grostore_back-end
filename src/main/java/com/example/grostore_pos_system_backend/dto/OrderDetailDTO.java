package com.example.grostore_pos_system_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
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
