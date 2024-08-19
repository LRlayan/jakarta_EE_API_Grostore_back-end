package com.example.grostore_pos_system_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    private String itemCode;
    private String itemName;
    private int QTYOnHand;
    private double unitPrice;
}
