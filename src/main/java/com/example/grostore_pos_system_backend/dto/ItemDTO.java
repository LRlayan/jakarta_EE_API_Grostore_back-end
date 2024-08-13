package com.example.grostore_pos_system_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {
    private String itemCode;
    private String itemName;
    private String qtyOnHand;
    private String unitPrice;
}
