package com.google.sps.data;

import java.util.Date;

/** Class containing the data for comments. */
public final class Comment {

  private final long id;
  private final String author;
  private final String comment;
  private final String timeStamp;

  /**
   * @param {!id} id The unique identifier for each comment.
   * @param {String} author Identifies the author of the comment.
   * @param {!String} comment The comment.
   * @param {!String} timeStamp The time at the instant of initiation.
   */
  public Comment(long id, String author, String comment, String timeStamp) {
    this.id = id;
    this.author = author;
    this.comment = comment;
    this.timeStamp = timeStamp;
}

  /** Getter method for id. */
  public long getId() {
    return id;
  }

  /** Getter method for author. */
  public String getAuthor() {
    return author;
  }

  /** Getter method for comment. */
  public String getComment() {
    return comment;
  }

  /** Getter method for timeStamp. */
  public String getTimeStamp() {
    return timeStamp;
  }
}