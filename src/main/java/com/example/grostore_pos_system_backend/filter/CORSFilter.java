package com.example.grostore_pos_system_backend.filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter("/*")
public class CORSFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        var origin = req.getHeader("Origin");
        var configOrigin = getServletContext().getInitParameter("origin");

        System.out.println("ori " + origin);
        System.out.println("oriConf " + configOrigin);

        if (origin != null &&origin.contains(configOrigin)){
            res.setHeader("Access-Control-Allow-Origin",origin);
            res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTION,PATCH");
            res.setHeader("Access-Control-Allow-Headers","Content-Type");
            res.setHeader("Access-Control-Expose-Headers","Content-Type");
        }
        chain.doFilter(req,res);
    }
}
