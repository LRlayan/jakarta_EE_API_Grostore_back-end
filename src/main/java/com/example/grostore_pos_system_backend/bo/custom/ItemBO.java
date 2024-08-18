package com.example.grostore_pos_system_backend.bo.custom;

import com.example.grostore_pos_system_backend.bo.SuperBO;
import com.example.grostore_pos_system_backend.dto.ItemDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface ItemBO extends SuperBO {
    List<ItemDTO> getAllItem(Connection connection) throws SQLException;
    boolean updateItem(ItemDTO itemDTO,Connection connection) throws SQLException;
    boolean saveItem(ItemDTO itemDTO , Connection connection) throws SQLException;
    boolean deleteItem(String id,Connection connection) throws SQLException;
}
