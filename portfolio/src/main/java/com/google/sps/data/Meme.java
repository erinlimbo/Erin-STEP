package com.google.sps.data;

/** Class containing the data for Memes. */
public final class Meme {

  private final long id;
  private final String author;
  private final String url;
  private final String desc;
  private final String timeStamp;

  /**
   * @param {!String} id The unique identifier for each meme.
   * @param {!String} author Identifies the author of the meme.
   * @param {!String} url The url that the image is stored at.
   * @param {!String} desc The description of the meme
   * @param {!String} timeStamp The time at the instant of initiation.
   */
  public Meme(long id, String author, String url, String desc, String timeStamp) {
    this.id = id;
    this.author = author;
    this.url = url;
    this.desc = desc;
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

  /** Getter method for url. */
  public String getUrl() {
    return url;
  }

/** Getter method for description. */
  public String getDesc() {
    return desc;
  }

  /** Getter method for timeStamp. */
  public String getTimeStamp() {
    return timeStamp;
  }
}