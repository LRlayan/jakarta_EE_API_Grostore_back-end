package com.example.grostore_pos_system_backend.bo;

import com.example.grostore_pos_system_backend.bo.custom.impl.CustomerBOImpl;
import com.example.grostore_pos_system_backend.bo.custom.impl.ItemBOImpl;
import com.example.grostore_pos_system_backend.bo.custom.impl.OrderBOImpl;
import com.example.grostore_pos_system_backend.bo.custom.impl.OrderDetailBOImpl;

public class BOFactory {
    private static BOFactory boFactory;

    private BOFactory(){}

    public static BOFactory getBOFactory(){
        return (boFactory == null)?boFactory = new BOFactory() : boFactory;
    }

    public enum BOTypes{
        CUSTOMER,ITEM,ORDER,ORDER_DETAIL
    }

    public SuperBO BOTypes(BOTypes boTypes){
        switch (boTypes){
            case CUSTOMER:
                return new CustomerBOImpl();
            case ITEM:
                return new ItemBOImpl();
            case ORDER:
                return new OrderBOImpl();
            case ORDER_DETAIL:
                return new OrderDetailBOImpl();
            default:
                return null;
        }
    }
}
