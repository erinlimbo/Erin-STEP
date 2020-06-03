package com.google.sps.servlets;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/log")
public class Log extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    response.setContentType("text/html");

    if (userService.isUserLoggedIn()) {
      String userEmail = userService.getCurrentUser().getEmail();
      String urlToRedirectToAfterUserLogsOut = "/index.html";
      String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);

    //   response.getWriter().println("<p>Hello " + userEmail + "!</p>");
    //   response.getWriter().println("<p>Logout <a href=\"" + logoutUrl + "\">here</a>.</p>");
    //   response.getWriter().println("<p>" + logoutUrl + "</p>");
    response.getWriter().print(logoutUrl);

    } else {
      String urlToRedirectToAfterUserLogsIn = "/login.html";
      String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);

    //   response.getWriter().println("<p>Login <a href=\"" + loginUrl + "\">here</a>.</p>");
    //   response.getWriter().println("<p>" + loginUrl + "</p>");

      response.getWriter().print("false");
    }
  }


}


