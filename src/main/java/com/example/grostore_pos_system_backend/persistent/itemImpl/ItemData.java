package com.example.grostore_pos_system_backend.persistent.itemImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.dto.ItemDTO;

import java.sql.Connection;
import java.util.List;

public interface ItemData {
    List<ItemDTO> getAllItem(Connection connection);
    boolean saveItem(ItemDTO itemDTO , Connection connection);
    boolean updateItem(String id , Connection connection);
    boolean deleteItem(ItemDTO itemDTO , Connection connection);
}
