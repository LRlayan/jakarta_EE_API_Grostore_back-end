package com.example.grostore_pos_system_backend.controller;

import com.example.grostore_pos_system_backend.bo.BOFactory;
import com.example.grostore_pos_system_backend.bo.custom.OrderBO;
import com.example.grostore_pos_system_backend.dto.OrderDTO;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;

@WebServlet(urlPatterns = "/order")
public class OrderController extends HttpServlet {

    private Connection connection;
    OrderBO orderBO = (OrderBO) BOFactory.getBOFactory().BOTypes(BOFactory.BOTypes.ORDER);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType().toLowerCase().contains("application/json") || req.getContentType() == null){
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }

        Jsonb jsonb = JsonbBuilder.create();
        OrderDTO orderDTO = jsonb.fromJson(req.getReader(), OrderDTO.class);
        try(var writer = resp.getWriter()){
            boolean isSaved = orderBO.saveOrder(orderDTO , connection);
            if (isSaved){
                writer.write("saved order");
            }else {
                writer.write("Please try again");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPut(req, resp);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doDelete(req, resp);
    }

    @Override
    public void init() throws ServletException {
        super.init();
    }
}
