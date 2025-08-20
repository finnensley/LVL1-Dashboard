# Create A Personal Dashboard

## Goals: 

### Dynamic welcome message based on the time of day
### Weather widget (Fetch API - OpenWeather)
### To-do list (Local Storage)
### Notes section (Local Storage); localStorage.setItems("key", "value")  console.log(localStorage.getItem("key"))
### Navigation between sections (home, weather, tasks, notes)
### Responsive design
### Contact form



# Challenges List:
# empty - finished project

## Challenges Completed:

## Add an ease to the font being larger as scroll over nav buttons

## Work on making grey Mode look better for the About page, tie in features to about, add more content to buttons ?? spacing ?

## Play with adjusting the My Dashboard heading and nav bar to be at the top but sticky and the content in the center to scroll up/down. 

## Fix the Type Your Name box to clear the name after Save Name button is clicked

## Add light/dark theme to the top of each page to take the background out to white with black text ??

## Add a contact me form on greetings page ? - created a feedback page instead

## nav bar doesn't align perfectly with the image mode, change "image" to "dark" 

## Add a footer with a link to a contact form? 

## Create a contact form, is this just a link to email in the footer or a full form? Look at doing both - researched google sheets and appscript, linked form to sheet.

## Make greetings page look better in light mode, add footer or aside  

## Created a feedback form

## Work on button shapes in the header? in light mode 

## Add @media for different devices

## Fix Notecards: trashcan/light is infront of text. Use CSS positioning? 

## Link appscript to html, where a url link back to the dashboard can be added in the success statement

## Add dynamic time/date to greetings screen

## Don't like Dark Mode button shape/shadow - review and update

## Put a catch and alert for an empty string in nameInput: "Please enter a name to personalize"

## Add media to change background label, input, and button

## Add localStorage to background image change

## For image URL add an alert to only use url that end in .jpg or .png and return if anything else (tried google.com and page went white and blank)

## Notes - localStorage for notecard sizing and/or when toggle light or dark sizing changes to default. See if I can keep the size the same just toggle light/dark.

## Feedback Form - create server and store and/or fix appscript, add automatic clearing of all fields when submit is clicked or window reload. Add a date entry or do it automatically

## Feedback Form - added the date to the spreadsheet automatically. Need to create a label and input, insert date using same as new Date(). Either do it once submit is hit (hidden from the user) or have the Date populate on page load.

## Add an email validator on feedback form - changed input="email"

## Figure out how to not have text run into toggle and trash on noteCards -- already tried, putting below or beside and note background color extends past border looking bad, worked with contentEditable for div but not much better. - Solution: removed additional div (notesDiv) and updated script that was causing second background.

## Try div with a border ht/wd/margin and then a textarea inside for note text  

## Rework height vh for each page in responsiveness (got messed up working on notes resizing)

## Refactor code - use forEach and build an array of objects

## Add the ability to place a picture from your local computer and save as the background using the Image URL input - not able to figure out, instead created an error if not https: at the beginning.

## Remove or adjust text shadow on footer and see how it looks

## For Weather it allows you to add Countries, not just city. Could change Enter City or make an if to only allow cities - not a clear way to only allow cities without adding autoComplete with GoogleMaps or upgrading openWeather API; 

## Add media query for 13" iPad, or max-width: 1040px, saveBtn and toggleModeBtn need a space from the input and each other. - just adjusted buttons to margin = 15px from 10px; solved the issue without adding another @media for that size.













