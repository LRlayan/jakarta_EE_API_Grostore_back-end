package com.example.grostore_pos_system_backend.controller;

import com.example.grostore_pos_system_backend.bo.BOFactory;
import com.example.grostore_pos_system_backend.bo.custom.OrderBO;
import com.example.grostore_pos_system_backend.dto.CustomerDTO;
import com.example.grostore_pos_system_backend.dto.OrderDTO;
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
import java.util.List;

@WebServlet(urlPatterns = "/order")
public class OrderController extends HttpServlet {

    private Connection connection;
    OrderBO orderBO = (OrderBO) BOFactory.getBOFactory().BOTypes(BOFactory.BOTypes.ORDER);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try(var writer = resp.getWriter()){
            List<OrderDTO> orderDTOList = orderBO.getAllOrder(connection);
            if (orderDTOList != null){
                resp.setContentType("application/json");
                Jsonb jsonb = JsonbBuilder.create();
                jsonb.toJson(orderDTOList,resp.getWriter());
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
        OrderDTO orderDTO = jsonb.fromJson(req.getReader(), OrderDTO.class);
        try(var writer = resp.getWriter()){
            boolean isSaved = orderBO.saveOrder(orderDTO , connection);
            if (isSaved){
                writer.write("Successfully Order");
            }else {
                writer.write("Please try again");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        OrderDTO orderDTO = JsonbBuilder.create().fromJson(req.getReader(), OrderDTO.class);
        try(var writer = resp.getWriter()){
            boolean isUpdated = orderBO.updateOrder(orderDTO,connection);
            if (isUpdated){
                writer.write("update successfully");
            }else {
                writer.write("Please Try Again.");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        OrderDTO orderDTO = JsonbBuilder.create().fromJson(req.getReader(), OrderDTO.class);
        try(var writer = resp.getWriter()){
            boolean isDelete = orderBO.deleteOrder(orderDTO.getOrderID(), connection);
            if (isDelete){
                writer.write("Delete Successfully");
            }else {
                writer.write("Please Try again!");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
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
