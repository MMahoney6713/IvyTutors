# [Ivy Tutors](https://ivy-tutors.herokuapp.com/)

Ivy Tutors is the beginning of a web application for a fully-functional, international English tutoring service. By providing an online tool that facilitates pain-free connecting between students with tutors and (in the soon-to-come future) easily managed payments, students and tutors are freed up to do more of the learning and teaching. 

This is the complete repository containing all code pertaining to the React front-end for the Ivy Tutors website, built as a Capstone project for Springboard. To access the website, [please visit here](https://ivy-tutors.herokuapp.com/). 

For details on the Backend of the application, please visit the [Ivy Tutors Backend Repository](https://github.com/MMahoney6713/IvyTutorsBackend)

For your convenience, a tutor and student account has been made for the purposes of testing the application. The account information for each is as follows:

Email: tutor1@gmail.com
Password: password

Email: student1@gmail.com
Password: password

Both the frontend and backend are hosted separately using Heroku.

## Built with

- React / Node / Express / PostgreSQL
- Page layout and design/template created by Maccarian at https://mui.com/store/items/the-front-landing-page/, and significantly adapted for use in this single-page application. 
- Material UI components

## User Flow Considerations

#### Common User Flow:
All users will start on the landing page. Further updates to the public front end of the site will be added in the future, including Pricing, About, and other common website pages. 

Users are able to sign in or sign up, using the navigation bar. For now, students can create an account and immediately access the Student Dashboard, but tutors will need to have their account created by an admin first following review and acceptance to be a tutor. All user authentication requests are sent to the server and validated against a hashed password (using bcrypt) saved in the database. If authenticated, a token is returned to the browser containing user email and whether they are a tutor or a student, and must be included with all http requests to the server.

#### Student User Flow:
After signup/signin, students will be redirected to the student dashboard. This section contains a list of upcoming scheduled lessons and the tutors that they will be meeting with, as well as an area for scheduling a new lesson. 

Future updates will allow the student to manage their upcoming scheduled lessons (request changes, cancel, etc.) as well as access links to a video conference tool which will enable the tutoring session. 

For scheduling new lessons, a student will select a date and a time (given in 30 minute increments) for which to find available tutors. The application will list all tutors available at that time and the student can 'book' that tutor, removing the tutor from that time-slot and adding the lesson to both the student's and the tutor's pages. Future iterations will allow tutors to be able to first approve this booking. 

#### Tutor User Flow:
Much the same as the student, the tutor is redirected to the tutor dashboard where they see their upcoming lessons (future updates will include the information of the student rather than the lessons list showing only tutor information) as well as a weekly calendar showing their availabilities.

For a tutor, once an availability is set by clicking on the weekly calendar, this makes them available for a student to book a lesson with them from the student dashboard. 

## Feature Highlights

#### The Dashboard
Depending on if the user has a 'true' isTutor property (contained in the token received from the server), the dashboard will load either a date-time picker and booking section (for the student) or a weekly calendar and availability setting section (for the tutor). This is accomplished by using React components and React's useContext hook, allowing the user object to be passed throughout the logged in portions of the website and allowing for user-specific options to be loaded, such as the dashboard. Here, the card used to display tutor information on the lessons list is reused also to display the list of available tutors for lesson-booking. 

#### The Weekly Calendar / Availability Selection
One of the core functionalities for this application is a tutor's ability to set their availability with ease, and for this date-time object to be properly stored in a database so that a student can accurately select the tutor based on this. By using the MaterialUI DataGrid component, a lot of the functionality that I needed was available through the DataGrid API - being able to set 'onClick' callbacks for when a cell is clicked, for example, is an out-of-the-box feature with DataGrid. 

In order to manage the data transfer between the backend and the frontend, I developed a 'rows' object which defines all 48 rows of the DataGrid (24 hours in a day, each split into 30 minute increments => 24*2=48). The 'time' string (in the format of 'hhmm') is the key for the row, and each weekday represents an index in the array stored as this time key's value. The server sends requested data in this format based on the week of interest, and the DataGrid is populated by finding the corresponding key in the 'rows' object matching the time string. For example: For a given week, at 1:30pm, tutor B has availability on Tuesday and Wednesday. The resulting object from the server is {'1330': [f, t, t, f, f, f, f]}, indicating that we can add this array into the 'rows' object for the datagrid at row of '1330'. 





