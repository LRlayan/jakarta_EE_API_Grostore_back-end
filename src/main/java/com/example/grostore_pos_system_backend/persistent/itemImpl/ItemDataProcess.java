package com.example.grostore_pos_system_backend.persistent.itemImpl;

import com.example.grostore_pos_system_backend.dto.ItemDTO;

import java.sql.Connection;
import java.util.List;

public class ItemDataProcess implements ItemData{
    @Override
    public List<ItemDTO> getAllItem(Connection connection) {
        return null;
    }

    @Override
    public boolean saveItem(ItemDTO itemDTO, Connection connection) {
        return false;
    }

    @Override
    public boolean updateItem(String id, Connection connection) {
        return false;
    }

    @Override
    public boolean deleteItem(ItemDTO itemDTO, Connection connection) {
        return false;
    }
}
