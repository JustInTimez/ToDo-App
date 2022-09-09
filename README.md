# ToDo SPA

Vanilla JavaScript app that lets the user create To-Do tasks and track completion.
Mobile friendly.

## Description

* Allows the user to create a list of tasks (for the day, week, month or year!) and to check them off as they are completed. 
* Filtering has been included, so that the user is able to have an overview of ALL tasks (regardless of completion status), as well as additional filtering for tasks that are PENDING, or are marked as COMPLETED. 
* User is able to edit existing tasks.
* User is able to delete tasks.
* The application has access to localStorage (JSON), and will update the localStorage after actions are performed.
* The application has validation included to check that inputs are not empty, and that a valid date has been selected. You cannot add a task to the past, only for the same day and beyond. You will not be able to add a task unless those validations pass.
* When the date for a task has passed, task due date will be highlited in red to alert the user.

## Using the SPA

* Open index.html
* Page renders, and the user is presented with the app in the center of the viewport.
* User needs to enter task info into first text field, and then select the date which the user wants to be completed by.
* User adds the current task to the app, by clicking on the yellow button right after selecting the due date.
* Should the user pass validation (no empty selections, and not selecting a date in the past) their task will be outputted into the tasks list to be viewable.
* Filtering can be used to track/see All tasks, Pending tasks and Completed tasks.
* User has the option to edit/delete task details by clicking on the three dots to the right of the entry. 
* Closing the browser or the tab will not destroy your tasks - localStorage has been used to store and retrieve data (JSON).
* Should the user need to remove all added tasks, regardless of count, all tasks may be removed (and from localStorage) by clicking on the CTA button "Clear All".

### Dependencies

* Windows/MacOS
* A broswer of your choice (tested in Chrome and Firefox - latest versions). Should work fine for other browsers such as Opera, Edge, Safari etc.
* Please ensure your broswer does not have JavaScript disabled within its settings, if you are facing issues.