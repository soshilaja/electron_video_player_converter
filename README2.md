APPD 5015                                                             ASSIGNMENT 1 – PHASE 2     
CROSS-PLATFORM DEVELOPMENT
			   
Prerequisites
All NodeJS Labs & In-class activities
Completion of Assignment 1 – Phase 1
Summary
During phase 1 of this assignment, you began to implement the provided video player into an Electron application. You also began to create a basic menu for the application.

Phase 2 of the assignment will require you to add functionality to the application in the following ways:
-	Enable the user to select a video file from their file system when they click on the File -> Video -> Load… menu item.
-	Send the path of the selected file from the main.js process to the window’s renderer process.
-	Load the selected video’s path into the html Video player’s source element, thus enabling the user to play the video.

Application Requirements

REQ-001	    IMPLEMENT FUNCTIONALITY TO SELECT A VIDEO FILE FROM FILE SYSTEM
As of phase 1 completion, the video player can only play one video that is hard-coded into the html of the window. You’ll change this so that now a user will be able to choose the file to play, send it to the window and load the file into the player.

When the user clicks the Load… menu item, the a dialog box should appear which will allow the user to select video files. The type of files should be restricted to video file types only.

Helpful documentation references:
Dialog - https://www.electronjs.org/docs/latest/api/dialog
Media Types - https://www.w3schools.com/html/html_media.asp

At the end of this requirement you should be able to do the following:
1.	Click the Load… menu item and cause a dialog to open.
2.	Select a file from the file system.

REQ-002	SEND SELECTED FILE PATH TO THE RENDERER(WINDOW) PROCESS.

Because the selection of the file path originates from the menu, it must be handled by the main process of the Electron application. The path however must ultimately be played by the renderer process. (ie, the window). Therefore the path information will need to be communicated to from the main process to the renderer process.

As these processes are inherently isolated from each other, you’ll need to implement Inter Process Communication (IPC) in order to communicate the file path from the main process to the renderer process. Use the window’s preload.js file to define the functions that will be exposed to the window. The initial function to be defined will define when a file path has been chosen in the main process and should act like an event handler. Be sure to name the function appropriately given this fact.

Helpful documentation references:
webContents - https://www.electronjs.org/docs/latest/api/web-contents
ipcRenderer - https://www.electronjs.org/docs/latest/api/ipc-renderer

At the end of this requirement you should be able to do the following:
1.	console.log the file path selected in the dialog in the console of the window.

REQ-003	LOAD AND PLAY THE SELECTED VIDEO FILE IN THE WINDOW’S VIDEO PLAYER
Once the file path has been communicated from the main process, the window should assign the path to the video player’s source tag. This should be done using DOM scripting. Remember that before a video can be played, it must first be loaded into the player.

Once the video has been loaded, you should be able to demonstrate playback of the video.

Helpful documentation references:
Load - https://www.w3schools.com/tags/av_met_load.asp

At the end of this requirement you should be able to do the following:
1.	Demonstrate the playback of the selected video in the application window.

Upon review of this assignment, you may be instructed to add or modify your initial document model before proceeding with further work on your application.
Instructions 

1.	Don’t forget that a code review is a necessary part of this assignment. You will need to show your code to the instructor in class on the due date while going through an evaluation of the site’s functionality. You will need to explain how the code works and complete the code review part of the rubric. You will need to do this to at least a developing level (see the Note in the rubric below).
2.	Late submissions will be subject to the late penalties laid out in the course outline. 
