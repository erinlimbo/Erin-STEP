package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.KeyRange;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;;
import java.io.IOException;
import java.util.stream.Collectors;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/delete")
public class Delete extends HttpServlet {

  /** Delete the element of the given key id */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String reader = request.getReader().lines().collect(Collectors.joining());
    JsonObject deleteObj = new JsonParser().parse(reader).getAsJsonObject();
    long id = Long.parseLong(deleteObj.get("id").getAsString());
    String type = deleteObj.get("type").getAsString();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Key deleteKey = KeyFactory.createKey(type, id);
    datastore.delete(deleteKey);
  }
}