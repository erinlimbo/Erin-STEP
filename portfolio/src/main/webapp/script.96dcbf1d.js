// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"mpVp":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
var projectList = [["Gitlet (Private)", "This project was my favorite and final project for my CS61B class at Berkeley. The gist of the project was to recreate the popular version-control system: Git, but a bit more simplified."], ["Link! (Deprecated)", "My first team-developed project, developed during Google's 2019 CSSI program. We developed a web application that determined mutual availaibilites among friends and found events for everyone to hang out using differnt API's.", "https://linkwithfriends.appspot.com"], ["Simon (Play now!)", "My final project in my first coding class. Developed a web application that mimicked the color-sequence memorization game: Simon. High score: 52.", "https://codepen.io/erinlimbo/full/qzJdwj"]];
/** 
 * Displays/hides portrait picture.
 * @param {!String} picture string id that specifies which picture to apply function to.
 * @param {!String} picture button id that specifies which button to update.
 */

function showPicture(picture, button) {
  var portrait = document.getElementById(picture);
  var pictureButton = document.getElementById(button);

  if (portrait.style.display === "block") {
    portrait.style.display = "none";
    pictureButton.innerHTML = "See me!";
  } else {
    portrait.style.display = "block";
    pictureButton.innerHTML = "Unsee me :(";
  }
}
/**
 * Displays the projects and their descriptions one at a time.
 */


function showProjects() {
  var projectContainer = document.getElementById("project-list");

  if (projectCounter < 3) {
    var li = document.createElement('li');
    var anchor = document.createElement('a');
    var desc = document.createElement('p');
    anchor.textContent = projectList[projectCounter][0];

    if (projectCounter > 0) {
      anchor.href = projectList[projectCounter][2];
    }

    anchor.classList.add("project-links");
    anchor.target = "_blank";
    li.appendChild(anchor);
    desc.textContent = projectList[projectCounter][1];
    li.appendChild(desc);
    projectContainer.appendChild(li);
  }

  projectCounter++;

  if (projectCounter >= 3) {
    var projectButton = document.getElementById("project-button");
    projectButton.style.display = "none";
  }
}
/** Initiate the home page */


function loadHomePage() {
  return _loadHomePage.apply(this, arguments);
}
/** Return the contents of the `/log` server. */


function _loadHomePage() {
  _loadHomePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var inputForm, log, link, logStatus, isLoggedIn;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inputForm = document.getElementById("input-form");
            log = document.getElementById("logging");
            link = document.getElementById("log-link");
            _context.next = 5;
            return getComments();

          case 5:
            _context.next = 7;
            return getLogStatus();

          case 7:
            logStatus = _context.sent;
            isLoggedIn = logStatus.loggedIn;

            if (isLoggedIn) {
              link.innerHTML = "logout";
              log.style.display = "block";
              inputForm.style.display = "block";
            } else {
              link.innerHTML = "login";
              log.style.display = "block";
            }

            link.href = logStatus.url;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadHomePage.apply(this, arguments);
}

function getLogStatus() {
  return _getLogStatus.apply(this, arguments);
}
/** Display the comments acquired from the datastore */


function _getLogStatus() {
  _getLogStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var response, logStatus;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch('/log');

          case 2:
            response = _context2.sent;
            _context2.next = 5;
            return response.json();

          case 5:
            logStatus = _context2.sent;
            return _context2.abrupt("return", logStatus);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getLogStatus.apply(this, arguments);
}

function loadComments(comments) {
  var commentContainer = document.getElementById("comments");
  comments.forEach(function (commentObject) {
    var childDiv = document.createElement("div");
    var icon = document.createElement("button");
    icon.innerHTML = '<i class="fa fa-trash-o"></i>';
    icon.classList.add("trash");
    icon.setAttribute("onClick", 'deleteThis("Comment", ' + commentObject.id + ')');
    childDiv.textContent = "[" + commentObject.timeStamp + "] " + commentObject.author + ": " + commentObject.comment;
    childDiv.appendChild(icon);
    commentContainer.appendChild(childDiv);
  });
}
/** Acquire a comment from /data and display it. */


function getComments() {
  return _getComments.apply(this, arguments);
}
/** Initiates the meme page */


function _getComments() {
  _getComments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch('/data');

          case 2:
            response = _context3.sent;
            _context3.next = 5;
            return response.json();

          case 5:
            data = _context3.sent;
            loadComments(data);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getComments.apply(this, arguments);
}

function loadMemePage() {
  return _loadMemePage.apply(this, arguments);
}
/** Loads the memes from the page. */


function _loadMemePage() {
  _loadMemePage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetchBlobstoreUrlAndShowForm();

          case 2:
            _context4.next = 4;
            return loadMemes();

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadMemePage.apply(this, arguments);
}

function loadMemes() {
  return _loadMemes.apply(this, arguments);
}
/** Delete this element. */


function _loadMemes() {
  _loadMemes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var memeContainer, response, data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            memeContainer = document.getElementById("meme-container");
            _context5.next = 3;
            return fetch('/meme-handler');

          case 3:
            response = _context5.sent;
            _context5.next = 6;
            return response.json();

          case 6:
            data = _context5.sent;
            data.forEach(function (memeObject) {
              var memeDiv = document.createElement("div");
              var memeImg = document.createElement("img");
              var icon = document.createElement("button");
              var memeDesc = document.createElement("p");
              memeImg.src = "/blob-serve-url?blob-key=" + memeObject.url;
              memeImg.classList.add("meme-image");
              memeDesc.innerHTML = memeObject.desc;
              icon.innerHTML = '<i class="fa fa-trash-o"></i>';
              icon.classList.add("trash");
              icon.setAttribute("onClick", 'deleteThis("Meme", ' + memeObject.id + ')');
              memeDiv.innerHTML = "[" + memeObject.timeStamp + "] " + memeObject.author + ":";
              memeDiv.appendChild(memeImg);
              memeDiv.appendChild(memeDesc);
              memeDesc.appendChild(icon);
              memeDiv.classList.add("meme-div");
              memeContainer.appendChild(memeDiv);
            });

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _loadMemes.apply(this, arguments);
}

function deleteThis(_x, _x2) {
  return _deleteThis.apply(this, arguments);
}
/** Delete all comments from the page and datastore. */


function _deleteThis() {
  _deleteThis = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(elementType, elementId) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return fetch('/delete', {
              method: 'POST',
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify({
                type: elementType,
                id: elementId
              })
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _deleteThis.apply(this, arguments);
}

function deleteComments() {
  return _deleteComments.apply(this, arguments);
}
/** Delete all memes from the page and datastore. */


function _deleteComments() {
  _deleteComments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return fetch('/delete-data', {
              method: 'POST'
            });

          case 2:
            getComments();

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _deleteComments.apply(this, arguments);
}

function deleteMemes() {
  return _deleteMemes.apply(this, arguments);
}
/** Fetches the blob at the url. */


function _deleteMemes() {
  _deleteMemes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return fetch('/delete-memes', {
              method: 'POST'
            });

          case 2:
            response = _context8.sent;
            loadMemes();

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _deleteMemes.apply(this, arguments);
}

function fetchBlobstoreUrlAndShowForm() {
  fetch('/blobstore-upload-url').then(function (response) {
    return response.text();
  }).then(function (imageUploadUrl) {
    var uploadBox = document.getElementById('upload-box');
    var memeForm = document.getElementById('meme-form');
    memeForm.action = imageUploadUrl;
    uploadBox.style.display = "block";
  });
}
},{}]},{},["mpVp"], null)
//# sourceMappingURL=/script.96dcbf1d.js.map