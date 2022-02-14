<img width="150px" src="https://w0244079.github.io/nscc/nscc-jpeg.jpg" >

# APPD 5015 - Assignment - Electron application

Refer to the accompanying documents for the various phased requirements for this assignment.

APPD 5015                                                             ASSIGNMENT 1 – PHASE 1     
CROSS-PLATFORM DEVELOPMENT
			   
Prerequisites
All NodeJS Labs & In-class activities
Summary
You’ll be building a basic video player and converter using the Electron framework. This application will cover the basics of creating a functional cross-platform desktop application using web technologies (HTML, CSS, and JavaScript)

The player app will also contain a customized menu to perform additional functionality available with the application, namely the ability to select an applicable video file to load into the player as well as the ability to convert a video to another video format. (For example, mp4 to webm)

To begin the assignment, be sure to clone the starter Git repository from GitHub classroom using the provided link in Brightspace. The starter repository will contain a few starter files from which you will build your application.
Application Requirements

REQ-001	    PACKAGE THE STARTING INDEX.HTML FILE INTO AN ELECTRON APPLICATION
Your cloned repository contains a starting index.html file. This file already contains a video player which can play a video. (The video player uses a JavaScript library called plyr to enhance the functionality of the basic html <video> element. If you wish, you can learn more about it at https://plyr.io/)

Create an application with Electron which will render the index.html page in a main window. The window should have a starting height of 605 and a starting width of 1000. The window should not be resizable. 

Helpful documentation references:
https://www.electronjs.org/docs/latest/api/browser-window

At the end of this requirement you should be able to do the following:
1.	Start your electron application using npm start
2.	Display a window showing the video player.
3.	Play the (for now) hard-coded video in the video player.
4.	Close the window to end the program.

REQ-002	CREATE A CUSTOM MENU FOR THE MAIN WINDOW
A newly created Electron window comes preloaded with a default menu containing a number of actions. This menu is somewhat overkill for what we’d like the video player to do, so you’ll need to instead override the default menu with a customized menu.

The beginnings of the custom menu should contain the following:

•	File
    o	Video
        	Load…
    o	[Separator Line]
    o	Quit
•	Developer
    o	Toggle Developer Tools

Logic should also be added to accommodate whether the app is running on a Mac versus other operating systems. If running on a Mac, the menu should be modified to accommodate the uniqueness of Macos’ menu structure. 

Remember that some menu actions are formally defined in Electron as roles. Refer to the documentation to determine if you can make use of these roles in your custom menu (Hint: you can!)

Helpful documentation references:
Menus - https://www.electronjs.org/docs/latest/api/menu
Menu Items - https://www.electronjs.org/docs/latest/api/menu-item

At the end of this requirement you should be able to do the following:
1.	See the custom menu loaded in the window with all menu items when the app starts.
2.	Click on the Quit menu item to quit the application.
3.	Click on the Toggle Developer Tools menu item to toggle the dev tools on and off

Upon review of this assignment, you may be instructed to add or modify your initial document model before proceeding with further work on your application.
Instructions 

1.	Don’t forget that a code review is a necessary part of this assignment. You will need to show your code to the instructor in class on the due date while going through an evaluation of the site’s functionality. You will need to explain how the code works and complete the code review part of the rubric. You will need to do this to at least a developing level (see the Note in the rubric below).
2.	Late submissions will be subject to the late penalties laid out in the course outline. 

