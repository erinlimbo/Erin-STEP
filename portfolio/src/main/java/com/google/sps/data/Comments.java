package com.google.sps.data;

import java.util.Date;

/** Class containing the data for comments. */
public final class Comments {

    private final String author;
    private final String comment;
    private Date timeStamp;

    /**
     * @param {String} author Identifies the author of the comment.
     * @param {!String} comment The comment.
     */
    public Comments(String author, String comment) {
        this.author = author;
        this.comment = comment;
        this.timeStamp = new Date();
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
    public Date getTimeStamp() {
        return timeStamp;
    }

}