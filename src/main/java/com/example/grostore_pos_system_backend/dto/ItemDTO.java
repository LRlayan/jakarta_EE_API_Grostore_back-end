package com.example.grostore_pos_system_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO implements Serializable {
    private String itemCode;
    private String itemName;
    private int QTYOnHand;
    private double unitPrice;
    private String type;
    private List<ItemDTO> updateEachItemQTY;

    public ItemDTO(String itemCode, String itemName, int qtyOnHand, double unitPrice) {
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.QTYOnHand = qtyOnHand;
        this.unitPrice = unitPrice;
    }
}
