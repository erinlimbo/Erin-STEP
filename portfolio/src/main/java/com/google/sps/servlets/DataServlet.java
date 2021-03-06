// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.sps.data.Comment;
import com.google.gson.Gson;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/data")
public class DataServlet extends HttpServlet {

  /** Java object converter. */
  private static final Gson gson = new Gson();

  /** The max amount of comments that will be displayed. */
  private int maxComments = 40;

  /** User service that contains the information of the current user. */
  private final UserService userService = UserServiceFactory.getUserService();

  /** Date formatter. */
  private final SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm", Locale.US);

  /** Read the data from the datastore and write it into /data as json. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort("timeStamp", SortDirection.ASCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    List<Entity> resultsList = results.asList(FetchOptions.Builder.withLimit(maxComments));

    List<Comment> comments = new ArrayList<>();
    for (Entity entity : resultsList) {
      long id = entity.getKey().getId();
      String author = (String) entity.getProperty("author");
      String comment = (String) entity.getProperty("comment");
      String timestamp = (String) timeFormat.format(entity.getProperty("timeStamp"));

      Comment commentObject = new Comment(id, author, comment, timestamp);
      comments.add(commentObject);
    }

    response.setContentType("application/json;");
    String json = gson.toJson(comments);
    response.getWriter().println(json);
  }

  /** Send the user created comment to the datastore. */    
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    User currentUser = userService.getCurrentUser();

    String comment = request.getParameter("comment-text");
    String author = currentUser.getEmail().split("@", 2)[0];
    // Gives current time
    Date timeStamp = new Date();

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("author", author);
    commentEntity.setProperty("comment", comment);
    commentEntity.setProperty("timeStamp", timeStamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);
    response.sendRedirect("/index.html");
  }
}