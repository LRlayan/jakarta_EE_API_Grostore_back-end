package com.example.grostore_pos_system_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO implements Serializable {
    private String itemCode;
    private String itemName;
    private int QTYOnHand;
    private double unitPrice;
}
