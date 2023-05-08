package com.ecs.api.exception.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserDetailsServiceExceptionHandler {
    public void handle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect("/exception/userdetails");
    }
}
