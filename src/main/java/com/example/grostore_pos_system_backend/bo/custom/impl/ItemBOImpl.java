package com.example.grostore_pos_system_backend.bo.custom.impl;

import com.example.grostore_pos_system_backend.bo.custom.ItemBO;
import com.example.grostore_pos_system_backend.dao.DAOFactory;
import com.example.grostore_pos_system_backend.dao.custom.ItemDAO;
import com.example.grostore_pos_system_backend.dto.ItemDTO;
import com.example.grostore_pos_system_backend.entity.Item;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemBOImpl implements ItemBO {
    ItemDAO itemDAO = (ItemDAO) DAOFactory.getDAOFactory().DAOTypes(DAOFactory.DAOTypes.iTEM);

    @Override
    public List<ItemDTO> getAllItem(Connection connection) throws SQLException {
        List<ItemDTO> itemDTOList = new ArrayList<>();
        List<Item> itemList = itemDAO.getAll(connection);
        for (Item item:itemList) {
            itemDTOList.add(new ItemDTO(item.getItemCode(),item.getItemName(),item.getQTYOnHand(),item.getUnitPrice()));
        }
        return itemDTOList;
    }

    @Override
    public boolean updateItem(ItemDTO itemDTO, Connection connection) throws SQLException {
        System.out.println("call update method");
        for (ItemDTO items : itemDTO.getUpdateEachItemQTY()) {
            System.out.println("type " + items.getType());
            if (items.getType().equals("list")){
                System.out.println("match list");
                System.out.println(items.getItemCode() + items.getItemName() + items.getQTYOnHand() + items.getUnitPrice());
                return itemDAO.update(new Item(items.getItemCode(), items.getItemName(), items.getQTYOnHand(), items.getUnitPrice()),connection);
            }else {
                System.out.println("not list");
                return itemDAO.update(new Item(itemDTO.getItemCode(), itemDTO.getItemName(),itemDTO.getQTYOnHand(), itemDTO.getUnitPrice()),connection);
            }
        }
        return false;
    }

    @Override
    public boolean saveItem(ItemDTO itemDTO, Connection connection) throws SQLException {
        return itemDAO.save(new Item(itemDTO.getItemCode(), itemDTO.getItemName(), itemDTO.getQTYOnHand(), itemDTO.getUnitPrice()),connection);
    }

    @Override
    public boolean deleteItem(String id, Connection connection) throws SQLException {
        return itemDAO.delete(id,connection);
    }
}
