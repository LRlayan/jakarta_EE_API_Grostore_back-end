package com.example.grostore_pos_system_backend.dao.custom.impl;

import com.example.grostore_pos_system_backend.dao.custom.ItemDAO;
import com.example.grostore_pos_system_backend.entity.Item;

import java.sql.Connection;
import java.util.List;

public class ItemDAOImpl implements ItemDAO {
    @Override
    public boolean save(Item dto , Connection connection) {
        return false;
    }

    @Override
    public List<Item> getAll(Connection connection) {
        return null;
    }

    @Override
    public boolean update(Item dto, Connection connection) {
        return false;
    }

    @Override
    public boolean delete(String id) {
        return false;
    }
}
