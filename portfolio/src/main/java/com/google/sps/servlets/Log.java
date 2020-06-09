package com.google.sps.servlets;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/log")
public class Log extends HttpServlet {

  /** Write true into the server iff the user is logged in. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    /** Information to be sent about the user's log status. */
    JsonObject jsonObject = new JsonObject();

    if (userService.isUserLoggedIn()) {
      String logoutUrl = userService.createLogoutURL("/");

      jsonObject.addProperty("loggedIn", true);
      jsonObject.addProperty("url", logoutUrl);
    } else {
      String loginUrl = userService.createLoginURL("/");

      jsonObject.addProperty("loggedIn", false);
      jsonObject.addProperty("url", loginUrl);
    }

    response.setContentType("application/json;");
    response.getWriter().println(jsonObject);
  }
}