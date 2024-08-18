package com.example.grostore_pos_system_backend.controller;

import com.example.grostore_pos_system_backend.bo.BOFactory;
import com.example.grostore_pos_system_backend.bo.custom.ItemBO;
import com.example.grostore_pos_system_backend.dto.ItemDTO;
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

@WebServlet(urlPatterns = "/item")
public class ItemController extends HttpServlet {
    private Connection connection;
    ItemBO itemBO = (ItemBO) BOFactory.getBOFactory().BOTypes(BOFactory.BOTypes.ITEM);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try(var writer = resp.getWriter()){
            List<ItemDTO> itemDTOList = itemBO.getAllItem(connection);
            if (itemDTOList != null){
                resp.setContentType("application/json");
                Jsonb jsonb = JsonbBuilder.create();
                jsonb.toJson(itemDTOList,resp.getWriter());
            }else {
                writer.write("Not Available");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
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
        try{
            var ctx = new InitialContext();
            DataSource pool = (DataSource) ctx.lookup("java:comp/env/jdbc/groStorePosSystem");
            this.connection = pool.getConnection();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
