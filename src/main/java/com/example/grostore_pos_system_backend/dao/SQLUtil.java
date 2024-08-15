package com.example.grostore_pos_system_backend.dao;

import java.sql.Connection;
import java.sql.SQLException;

public class SQLUtil {
    public static <T> T executeQuery(String sql, Connection connection, Object... ar) throws SQLException {
        var preparedStatement = connection.prepareStatement(sql);
        for (int i = 0; i < ar.length; i++) {
            preparedStatement.setObject((i+1),ar[i]);
        }

        if (sql.startsWith("SELECT")){
           return (T) preparedStatement.executeQuery();
        }else {
            return (T) (Boolean) (preparedStatement.executeUpdate()>0);
        }
    }
}
