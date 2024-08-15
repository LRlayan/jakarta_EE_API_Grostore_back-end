package com.example.grostore_pos_system_backend.persistent.customerImpl;

import com.example.grostore_pos_system_backend.dto.CustomerDTO;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CustomerDataProcess implements CustomerData{

    static String SAVE_CUSTOMER = "INSERT INTO customer VALUES(?,?,?,?)";
    static String GET_ALL_CUSTOMER = "SELECT * FROM customer";

    @Override
    public List<CustomerDTO> getAllCustomer(Connection connection) throws SQLException {

        List<CustomerDTO> customers = new ArrayList<>();
        ResultSet resultSet = null;
        try(var preparedStatement = connection.prepareStatement(GET_ALL_CUSTOMER)){
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()){
                var customerDTO = new CustomerDTO(
                     resultSet.getString(1),
                     resultSet.getString(2),
                     resultSet.getString(3),
                     resultSet.getString(4)
                );
                customers.add(customerDTO);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            resultSet.close();
        }
        return customers;
    }

    @Override
    public boolean saveCustomer(CustomerDTO customerDTO, Connection connection) throws SQLException {
        var preparedStatement = connection.prepareStatement(SAVE_CUSTOMER);

        try{
            preparedStatement.setString(1, customerDTO.getId());
            preparedStatement.setString(2, customerDTO.getName());
            preparedStatement.setString(3, customerDTO.getCity());
            preparedStatement.setString(4, customerDTO.getTel());
        }catch (SQLException e) {
            e.printStackTrace();
        }finally {
            preparedStatement.close();
        }
        return preparedStatement.executeUpdate() > 0;
    }

    @Override
    public boolean updateCustomer(String id, Connection connection) {
        return false;
    }

    @Override
    public boolean deleteCustomer(CustomerDTO customerDTO, Connection connection) {
        return false;
    }
}
