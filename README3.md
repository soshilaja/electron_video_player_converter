APPD 5015                                                             ASSIGNMENT 1 – PHASE 3     
CROSS-PLATFORM DEVELOPMENT
			   
Prerequisites
All NodeJS Labs & In-class activities
Completion of Assignment 1 – Phases 1 & 2
Summary
During phases 1 & 2 of this assignment, you began to implement the provided video player into an Electron application. The video player can now play a video file of your choosing. By establishing IPC communication between the main and renderer processes, actions taken in the main process menu can now be sent to the renderer for fulfillment.

In Phase 3, you’ll add new functionality that will allow the app user to convert a video file to another format. To accomplish this, you’ll introduce ffmpeg binaries into the application. ffmpeg “is the leading multimedia framework, able to decode, encode, transcode, mux, demux, stream, filter and play pretty much anything that humans and machines have created.” You’ll use the encoding capabilities of ffmpeg to convert the loaded video file into another video format. 

To do this you’ll implement the following pieces of functionality into the application:

-	File encoding using ffmpeg (using fluent-ffmpeg, ffmpeg-static-electron and ffprobe-static-electron npm packages)
-	Electron Save File dialog
-	Electron Progress Bar

Application Requirements

REQ-001	    ADD ENCODING ACTIONS TO THE APPLICATION MENU
In phases 1 & 2, you worked with a custom menu. You’ll add additional items to the custom menu under the Video portion of the menu. These menu items should be initially disabled until a video file has been selected and loaded into the application.

Helpful documentation references:
Enabling and disabling menu items - https://www.electronjs.org/docs/latest/api/menu-item

At the end of this requirement you should be able to do the following:
1.	View the submenu file conversion items initially in a disabled state.
2.	View the submenu file conversion items in an enabled state after video has been loaded.


REQ-002	CONVERT SELECTED FILE TO SELECTED FORMAT
When a video file has been loaded and the ‘Convert to X…’ menu items have been enabled, the user should be able to click on any of the file conversion items to initiate a file conversion using ffmpeg.

To prepare to implement this, install the following NPM packages into the application project:
•	fluent-ffmpeg (https://www.npmjs.com/package/fluent-ffmpeg)
•	ffmpeg-static-electron (https://www.npmjs.com/package/ffmpeg-static-electron)
•	ffprobe-static-electron (https://www.npmjs.com/package/ffprobe-static-electron)

fluent-ffmpeg provides an programmatic API to allow you to invoke ffmpeg actions from code.
ffmpeg-static-electron and ffprobe-static-electron are executable binaries that you can embed directly into your project so that you can run ffmpeg without installing it separately on your computer.

Be sure to link fluent-ffmpeg to the static binary packages for ffmpeg and ffprobe. Your instructor will demonstrate this in class.

Selecting a conversion action from the menu should:
•	Trigger a save file dialog to allow the user to name the newly converted file and select a save location.

Example of Save File dialog (on mac):
 
•	Choosing a file name and location from the dialog will trigger ffmpeg to begin converting the file. Reference the code examples provided in class to accomplish this.
•	Use the demonstrated progress event to log the progress of the file conversion to the console so that you can monitor the conversion happening. It should tell you the percentage completion of the conversion.

Example of progress output to the console:

Helpful documentation references:
Save Dialog: https://www.electronjs.org/docs/latest/api/dialog#dialogshowsavedialogbrowserwindow-options


At the end of this requirement you should be able to do the following:
1.	Respond to clicking a Convert menu item by showing a Save File dialog.
2.	Executing a file conversion using ffmpeg.
3.	Displaying the ffmpeg conversion progress in the console.

REQ-003	SHOW PROGRESS WITH PROGRESS BAR
Converting a video file can take a while. Therefore it would be good to provide a progress bar so that the user can view the file conversion progress as it is happening.

To do this, you’ll install a new NPM package in the project called electron-progressbar (https://www.npmjs.com/package/electron-progressbar). This package will provide functionality to show a progress bar while our conversion is occurring.

When the file conversion is occurring, fluent-ffmpeg can report progress through the progress event. You can extract this progress value and plug it into a progress bar. Refer to the in-class examples for guidance with this.

Things to remember about the progress bar.
1.	It should be determinate
2.	Its parent window should be the main app window.
Example of progress bar in action:

At the end of this requirement you should be able to do the following:
1.	Display a progress bar which accurately shows the progress of the file conversion as it is happening.

Instructions 

1.	Don’t forget that a code review is a necessary part of this assignment. You will need to show your code to the instructor in class on the due date while going through an evaluation of the site’s functionality. You will need to explain how the code works and complete the code review part of the rubric. You will need to do this to at least a developing level (see the Note in the rubric below).
2.	Late submissions will be subject to the late penalties laid out in the course outline. 
