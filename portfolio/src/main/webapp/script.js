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

var projectCounter = 0;
var projectList = [
    ["Gitlet (Private)", "This project was my favorite and final project for my CS61B class at Berkeley. The gist of the project was to recreate the popular version-control system: Git, but a bit more simplified."],
    ["Link! (Deprecated)", "My first team-developed project, developed during Google's 2019 CSSI program. We developed a web application that determined mutual availaibilites among friends and found events for everyone to hang out using differnt API's.", "https://linkwithfriends.appspot.com"],
    ["Simon (Play now!)", "My final project in my first coding class. Developed a web application that mimicked the color-sequence memorization game: Simon. High score: 52.", "https://codepen.io/erinlimbo/full/qzJdwj"]
    ];


/** 
 * Displays/hides portrait picture.
 * @param {!String} picture string id that specifies which picture to apply function to.
 * @param {!String} picture button id that specifies which button to update.
 */
function showPicture(picture, button) {
    const portrait = document.getElementById(picture);
    const pictureButton = document.getElementById(button);
    if (portrait.style.display === "block") {
        portrait.style.display = "none";
        pictureButton.innerHTML = "See me!";

    } else {
        portrait.style.display = "block";
        pictureButton.innerHTML = "Unsee me :(" 
    }
}


/**
 * Displays the projects and their descriptions one at a time.
 */
function showProjects() {
    const projectContainer = document.getElementById("project-list");
    if (projectCounter < 3) {
        let li = document.createElement('li');
        let anchor = document.createElement('a');
        let desc = document.createElement('p');
        anchor.textContent = projectList[projectCounter][0];
        if (projectCounter > 0) {
            anchor.href = projectList[projectCounter][2];
        }
        anchor.classList.add("project-links");
        anchor.target = "_blank";
        li.appendChild(anchor);
        desc.textContent = projectList[projectCounter][1];
        li.appendChild(desc);
        projectContainer.appendChild(li)
    }
    projectCounter++;
    if (projectCounter >= 3) {
        let projectButton = document.getElementById("project-button");
        projectButton.style.display = "none";
    }
}


/** Initiate the home page */
async function loadHomePage() {
    const inputForm = document.getElementById("input-form");
    const log = document.getElementById("logging");
    const link = document.getElementById("log-link");

    await getComments();
    const logStatus = await getLogStatus();
    const isLoggedIn = logStatus.loggedIn;

    if (isLoggedIn) {
        link.innerHTML = "logout";
        log.style.display = "block";
        inputForm.style.display = "block";
    } else {
        link.innerHTML = "login"
        log.style.display = "block";
    }
    link.href = logStatus.url
}

/** Return the contents of the `/log` server. */
async function getLogStatus() {
    const response = await fetch('/log');
    const logStatus = await response.json();
    return logStatus;
}

/** Display the comments acquired from the datastore */
function loadComments(comments) {
    const commentContainer = document.getElementById("comments");
    comments.forEach(commentObject => {
        const childDiv = document.createElement("div");
        const icon = document.createElement("button");

        icon.innerHTML = '<i class="fa fa-trash-o"></i>';
        icon.classList.add("trash");
        icon.setAttribute( "onClick", 
            'deleteThis("Comment", ' + commentObject.id + ')');

        childDiv.textContent = "[" + commentObject.timeStamp + "] " 
            + commentObject.author + ": " + commentObject.comment;
        childDiv.appendChild(icon);     
   
        commentContainer.appendChild(childDiv);
    })
}

/** Acquire a comment from /data and display it. */
async function getComments() {
    let response = await fetch('/data');
    let data = await response.json();
    loadComments(data);
}


/** Initiates the meme page */
async function loadMemePage() {
    await fetchBlobstoreUrlAndShowForm();
    await loadMemes();
}

/** Loads the memes from the page. */
async function loadMemes() {
    const memeContainer = document.getElementById("meme-container");
    
    const response = await fetch('/meme-handler');
    const data = await response.json();
    data.forEach(memeObject => {

        const memeDiv = document.createElement("div");
        const memeImg = document.createElement("img");
        const icon = document.createElement("button");
        const memeDesc = document.createElement("p");

        memeImg.src = "/blob-serve-url?blob-key=" + memeObject.url; 
        memeImg.classList.add("meme-image");
        memeDesc.innerHTML = memeObject.desc

        icon.innerHTML = '<i class="fa fa-trash-o"></i>';
        icon.classList.add("trash");
        icon.setAttribute( "onClick", 
            'deleteThis("Meme", ' + memeObject.id + ')');
        memeDiv.innerHTML = "[" + memeObject.timeStamp + "] " 
            + memeObject.author + ":";
        memeDiv.appendChild(memeImg);
        memeDiv.appendChild(memeDesc);
        memeDesc.appendChild(icon);

        memeDiv.classList.add("meme-div");
        memeContainer.appendChild(memeDiv);

    })
}

/** Delete this element. */
async function deleteThis(elementType, elementId) {
    await fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-type': "application/json",
        },
        body: JSON.stringify({
            type: elementType, 
            id: elementId
        }),
    });
}

/** Delete all comments from the page and datastore. */
async function deleteComments() {
    await fetch('/delete-data', {
        method: 'POST',
    });
    getComments();
}

/** Delete all memes from the page and datastore. */
async function deleteMemes() {
    let response = await fetch('/delete-memes', {
        method: 'POST',
    });
    loadMemes();
}

/** Fetches the blob at the url. */
function fetchBlobstoreUrlAndShowForm() {
    fetch('/blobstore-upload-url')
        .then(response => {
            return response.text();
        })
        .then(imageUploadUrl => {
            const uploadBox = document.getElementById('upload-box');
            const memeForm = document.getElementById('meme-form');
            memeForm.action = imageUploadUrl;
            uploadBox.style.display = "block";
        });
}
