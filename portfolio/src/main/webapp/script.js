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

/**
 * Adds a random greeting to the page.
 */


var projectCounter = 0;
var projectList = [
    ["Gitlet", "This project was my favorite and final project for my CS61B class at Berkeley. The gist of the project was to recreate the popular version-control system: Git, but a bit more simplified."],
    ["Link!", "My first team-developed project, developed during Google's 2019 CSSI program. We developed a web application that determined mutual availaibilites among friends and found events for everyone to hang out using differnt API's."],
    ["Simon", "My final project in my first coding class. Developed a web application that mimicked the color-sequence memorization game: Simon."]
    ];


function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function showPicture() {
    const portrait = document.getElementById("portrait");
    const pictureButton = document.getElementById("picture-button")
    if (portrait.style.display === "block") {
        portrait.style.display = "none";
        pictureButton.innerHTML = "See me!";

    } else {
        portrait.style.display = "block";
        pictureButton.innerHTML = "Unsee me :(" 
    }
}

function showProjects() {
    const projectContainer = document.getElementById("project-list");
    
    if (projectCounter < 3) {
        console.log("hello");
        let li = document.createElement('li');
        let bold = document.createElement('b');
        let desc = document.createElement('p');
        bold.textContent = projectList[projectCounter][0];
        li.appendChild(bold);
        desc.textContent = projectList[projectCounter][1];
        li.appendChild(desc);
        projectContainer.appendChild(li)
        
    }
    projectCounter++;
    if (projectCounter >= 3) {
        let projectButton = document.getElementById("project-button");
        projectButton.style.visibility = "hidden";
    }
}









