package com.google.sps.servlets;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
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
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.gson.Gson;
import com.google.sps.data.Meme;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/meme-handler")
public class MemeHandler extends HttpServlet {

  /** Java object converter. */
  private static final Gson gson = new Gson();

  /** The max amount of memes that will be displayed. */
  private int maxMemes = 40;

  /** User service that contains the information of the current user. */
  private final UserService userService = UserServiceFactory.getUserService();

  /** Date formatter. */
  private final SimpleDateFormat timeFormat = new SimpleDateFormat("EEE, MMM d, yyy", Locale.US);

  /** The Blobstore Service. */
  private final BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

  /** Get the datastore. */
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  /** Read the data from the datastore and write it into /meme-handler as json. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    Query query = new Query("Meme").addSort("timeStamp", SortDirection.DESCENDING);

    PreparedQuery results = datastore.prepare(query);
    List<Entity> resultsList = results.asList(FetchOptions.Builder.withLimit(maxMemes));

    List<Meme> memes = new ArrayList<>();
    for (Entity entity : resultsList) {
      long id = entity.getKey().getId();
      String author = (String) entity.getProperty("author");
      String url = (String) entity.getProperty("url");
      String description = (String) entity.getProperty("desc");
      String timestamp = (String) timeFormat.format(entity.getProperty("timeStamp"));

      Meme memeObject = new Meme(id, author, url, description, timestamp);
      memes.add(memeObject);
    }

    response.setContentType("application/json;");
    String json = gson.toJson(memes);
    response.getWriter().println(json);

    }


  /** Receive a meme and upload its data to the datastore. */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    User currentUser = userService.getCurrentUser();

    String author = currentUser.getEmail().split("@", 2)[0];
    String description = request.getParameter("message");
    String blobKeyString;
    // Gives current time
    Date timeStamp = new Date();

    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get("file");

    if (blobKeys == null || blobKeys.isEmpty()) {
        response.sendRedirect("/meme.html");
        return;
    } else {
        blobKeyString = blobKeys.get(0).getKeyString();
    }

    Entity memeEntity = new Entity("Meme");
    memeEntity.setProperty("author", author);
    memeEntity.setProperty("url", blobKeyString);
    memeEntity.setProperty("desc", description);
    memeEntity.setProperty("timeStamp", timeStamp);

    datastore.put(memeEntity);
    response.sendRedirect("/meme.html");
  }
}
