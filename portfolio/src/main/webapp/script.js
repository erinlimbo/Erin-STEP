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
 */
function showPicture(picture) {
    const portrait = document.getElementById(picture);
    const pictureButton = document.getElementById("picture-button")
    if (portrait.style.display === "block") {
        portrait.style.display = "none";
        pictureButton.innerHTML = "See me!";

    } else {
        portrait.style.display = "block";
        pictureButton.innerHTML = "Unsee me :(" 
    }
}

/** 
 * Displays/hides podmates picture.
 */
function showPodmatePicture() {
    const portrait = document.getElementById("ruchiportrait");
    const pictureButton = document.getElementById("ruchi-button")
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

/**
 * Acquire a random name from server and say hello.
 */
async function getName() {
  const response = await fetch('/data');
  const name = await response.text();
  document.getElementById('name-container').innerText = name;
}