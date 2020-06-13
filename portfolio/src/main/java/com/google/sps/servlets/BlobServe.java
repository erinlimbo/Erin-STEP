package com.google.sps.servlets;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Serve a single blobkey.
 */
@WebServlet("/blob-serve-url")
public class BlobServe extends HttpServlet {

  /** The Blobstore Service. */
  BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

  /** Read the data from the datastore and write it into /meme-handler as json. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    BlobKey blobKey = new BlobKey(request.getParameter("blob-key"));
    blobstoreService.serve(blobKey, response);
    }
}