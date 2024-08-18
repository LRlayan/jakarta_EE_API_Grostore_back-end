package com.example.grostore_pos_system_backend.dao.custom.impl;

import com.example.grostore_pos_system_backend.dao.SQLUtil;
import com.example.grostore_pos_system_backend.dao.custom.ItemDAO;
import com.example.grostore_pos_system_backend.entity.Item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemDAOImpl implements ItemDAO {
    @Override
    public boolean save(Item dto , Connection connection) {
        return false;
    }

    @Override
    public List<Item> getAll(Connection connection) throws SQLException {
        ResultSet resultSet = SQLUtil.executeQuery("SELECT * FROM item",connection);
        List<Item> itemList = new ArrayList<>();
        while (resultSet.next()){
            Item item = new Item(
                    resultSet.getString(1),
                    resultSet.getString(2),
                    resultSet.getString(3),
                    resultSet.getString(4)
            );
            itemList.add(item);
        }
        return itemList;
    }

    @Override
    public boolean update(Item dto, Connection connection) {
        return false;
    }

    @Override
    public boolean delete(String id,Connection connection) {
        return false;
    }
}
