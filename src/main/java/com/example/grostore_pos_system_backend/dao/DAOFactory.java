package com.example.grostore_pos_system_backend.dao;

import com.example.grostore_pos_system_backend.bo.BOFactory;
import com.example.grostore_pos_system_backend.dao.custom.impl.CustomerDAOImpl;
import com.example.grostore_pos_system_backend.dao.custom.impl.ItemDAOImpl;
import com.example.grostore_pos_system_backend.dao.custom.impl.OrderDAOImpl;
import com.example.grostore_pos_system_backend.dao.custom.impl.OrderDetailDAOImpl;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory(){}

    public static DAOFactory getDAOFactory(){
        return (daoFactory == null)?daoFactory = new DAOFactory() : daoFactory;
    }

    public enum DAOTypes{
        CUSTOMER,iTEM,ORDER,ORDER_DETAIL
    }

    public SuperDAO DAOTypes(DAOTypes daoTypes){
        switch (daoTypes){
            case CUSTOMER:
                return new CustomerDAOImpl();
            case iTEM:
                return new ItemDAOImpl();
            case ORDER:
                return new OrderDAOImpl();
            case ORDER_DETAIL:
                return new OrderDetailDAOImpl();
            default:
                return null;
        }
    }
}
