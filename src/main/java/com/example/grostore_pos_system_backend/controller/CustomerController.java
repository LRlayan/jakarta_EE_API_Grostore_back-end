package com.example.grostore_pos_system_backend.controller;

import com.example.grostore_pos_system_backend.bo.BOFactory;
import com.example.grostore_pos_system_backend.bo.custom.CustomerBO;
import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.persistent.customerImpl.CustomerDataProcess;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet(urlPatterns = "/customer")
public class CustomerController extends HttpServlet {

    private Connection connection;
    CustomerBO customerBO = (CustomerBO) BOFactory.getBOFactory().BOTypes(BOFactory.BOTypes.CUSTOMER);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try(var writer = resp.getWriter()){
            List<CustomerDTO> customerDTOList = customerBO.getAllCustomer(connection);
            if (customerDTOList != null){
                resp.setContentType("application/json");
                Jsonb jsonb = JsonbBuilder.create();
                jsonb.toJson(customerDTOList,resp.getWriter());
            }else {
                writer.write("Not Available");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (!req.getContentType().toLowerCase().contains("application/json") || req.getContentType() == null){
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }

        Jsonb jsonb = JsonbBuilder.create();
        CustomerDTO customerDTO = jsonb.fromJson(req.getReader(), CustomerDTO.class);

        try(var writer = resp.getWriter()){
//           boolean isSaved = customerDataProcess.saveCustomer(customerDTO , connection);
            boolean isSaved = customerBO.saveCustomer(customerDTO,connection);
           if (isSaved){
               writer.write("successfully");
           }else {
               writer.write("Try Again");
           }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }

    @Override
    public void init() throws ServletException {
        try{
            var ctx = new InitialContext();
            DataSource pool = (DataSource) ctx.lookup("java:comp/env/jdbc/groStorePosSystem");
            this.connection = pool.getConnection();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
