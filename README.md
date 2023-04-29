
# Project Name

Guess The Missing Lyrics

## Description

Duration: 2 Week Sprint (~150hrs)

Guess The Missing Lyrics is a word guessing game application to be played with friends and family. As a registered user, you are able to search the MusixMatch API using a search form within the app to pick songs and add them to your collection. Once the song has been added to your collection, you can remove a word and replace it with a bundle of characters: <strong>n!&x</strong> which will be translated into blanks on the Play Page. In addition, registered users can pass out their unique game ID to unregistered users, allowing the guest users to guess missing lyrics of songs in the registered user's song collection. Guess The Missing Lyrics will be sure to entertain whether played in a group or on your own.

## Prerequisites
<ul>
    <li>React</li>
    <li>Redux</li>
    <li>Redux Sagas</li>
    <li>Node.js</li>
    <li>Express</li>
    <li>Postgres</li>
    <li>Postico</li>
    <li>MusixMatch API Key</li>
</ul>

## Screenshots

Landing Page               |  Register Page            |  GameID Page              |
:-------------------------:|:-------------------------:|:-------------------------:|
![](public/screenshots/Landing%20Page.png)  |  ![](public/screenshots/Register%20Page.png)  |  ![](public/screenshots/GameID%20Page.png)


Guest Dashboard            |  Cont.                    |  Registered User Profile Page |
:-------------------------:|:-------------------------:|:-------------------------:|
![](public/screenshots/Guest%20Dashboard.png)  |  ![](public/screenshots/Guest%20Dashboard%202.png)  |  ![](public/screenshots/Profile%20Page.png)


Registered User Dashboard  |  Cont.                    |  Cont.                    |
:-------------------------:|:-------------------------:|:-------------------------:|
![](public/screenshots/Registered%20User%20Dashboard.png)  |  ![](public/screenshots/Registered%20User%20Dashboard%202.png)  |  ![](public/screenshots/Registered%20User%20Dashboard%203.png)

Song Search                |  Play Page                |  Edit Page                |
:-------------------------:|:-------------------------:|:-------------------------:|
![](public/screenshots/Song%20Search%20Powered%20by%20MusixMatch%20API.png)  |  ![](public/screenshots/Play%20Page.png)  |  ![](public/screenshots/Edit%20Page.png)

## Installation
<ol>
    <li>Go to: https://github.com/FCLee12/Guess-The-Missing-Lyrics</li>
    <li>Look at the top right of the webpage for the 'fork' button</li>
    <li>Create a fork under your own GitHub account ***** Verify you are in your own fork of the project ***** -At the top left of the webpage, you should see the path to the repo -Your GitHub account name should appear before the first '/'</li>
    <li>Open your terminal</li>
    <li>Navigate to the desired location you want to place the project files using the terminal</li>
    <li>On the webpage of your forked copy, look for the 'code' button</li>
    <li>Assuming you've set up your SSH, click on the SSH tab and copy the file path</li>
    <li>Back on your terminal, enter the following into your terminal: git clone PASTE-COPIED-FILE-PATH-HERE</li>
    <li>Hit enter, the repo will be downloaded into your current working directory</li>
    <li>The repo should now exist in your local machine</li>
    <li>cd into the repo</li>
    <li>Run the following commands in your terminal, waiting each time for installation to complete before running the next command:
        <ol>npm install</ol>
    </li>
    <li>Make sure Postgres is running, and open up Postico</li>
    <li>Create a new database with the name: guess_missing_lyrics</li>
    <li>Search for the database.sql file, within the file you will find the code to generate the table required to run the web app, in addition to some mock data</li>
      <ol>Note: in order to use the mock data, you must register at least 1 user using the registration form in the app</ol>
    <li>Upon executing the provided code in Postico, hit refresh and you should now see the genres table, the movies table, and the movies_genres table, this indicates the database is now ready</li>
    <li>In the outermost file, create a .env file to hold your personal MusixMatch API key</li>
    <li>Within your .env file set: MUSIXMATCH_API_KEY equal to your MusixMatch API key</li>
    <ol>
        <li>If you skip this step, the Song Search will not function</li>
        <li>If you receive a SERVER_SESSION_SECRET error, generate a random string of numbers and letters and set SERVER_SESSION_SECRET equal to it</li>
    </ol>
    <li>Upon completion of those installs, you have to start the server with the following command: npm run server</li>
    <li>Next you have to start the client server with the following command: npm run client, which will result in the web app being opened in your default browser, ready for use</li>
</ol>

## Usage

### Landing Page 
<ol>
    <li>Users can log in on this page or navigate to the Register Page or to the Play as Guest Page</li>
</ol>

### Register Page
<ol>
    <li>Users can register on this page by entering their information in the respective input fields</li>
</ol>

### GameId Page
<ol>
    <li>Users can enter in a Game ID received from an already registered user to view the registered user's song collection and guess missing lyrics of any songs the registered user has posted as active</li>
</ol>

### Guest Dashboard
<ol>
    <li>This dashboard will show any posted/active songs tied to the registered user's account whose Game ID was entered</li>
    <li>The guest user can click on the play button to enter the Play Page, where they are able to guess missing lyrics</li>
    <li>There is a hamburger button at the top left, allowing the guest user to navigate back to the Landing Page, the Dashboard Page, the GameID Page, or the Registration Page</li>
</ol>

### User Dashboard (Registered User Only)
<ol>
    <li>This dashboard will show all songs tied to the registered user's account who logged in</li>
    <li>The registered user can click on the "Play" button to enter the Play Page, where they are able to guess missing lyrics</li>
    <ol>Note: The Play Page will function identically for a registered user and a guest user</ol>
    <li>The registered user can click on the "Edit" button to enter the Edit Page, where they can remove words and replace them with the <strong>n!&x</strong> character bundle denoting blanks when viewed on the Play Page</li>
    <li>The registered user can click on the "Delete" button to remove a song from their collection</li>
    <li>The user can click a song card to set it as active, denoted by a green border or deactivate it by clicking it again, denoted by the grey border</li>
    <ol>Note: as a reminder, if a song is active, that means guest users can see it and play it when they use your Game ID</ol>
    <li>There is a hamburger button at the top left, allowing the registered user to navigate back to the Dashboard Page, or the GameID Page</li>
    <li>There is also an avatar icon at the top right, this allows the registered user to navigate to their profile page (profile information edit hasn't been implemented yet) where they can view their profile information, such as: username, or Game ID</li>
</ol>

### Song Search (Registered User Only)
#### Powered by MusixMatch API
<ol>
    <li>Opens as a modal from the User Dashboard page by clicking the Add A New Song button</li>
    <li>Enter in a song title, a song artist, or both and click the Search button</li>
    <li>The search results will display in the results section</li>
    <li>The user can scroll through the search results and add a song to their collection by clicking its associated Add Song button</li>
</ol>

### Play Page
<ol>
    <li>The blanks will be denoted by **** 1 **** with an associated input field for you to enter in your guess</li>
    <li>There will be up to 8 total words to guess, the number of words will be indicated by the number of interactable input fields</li>
    <li>Once guesses are entered, click the Submit Your Guesses button to see your results</li>
</ol>

### Edit Page (Registered User Only)
<ol>
    <li>The modal popup will provide users with instructions on how to go about editing the lyrics</li>
    <li>Should the user want to see the instructions again, there is an Instructions button conveniently placed above the song editor</li>
    <li>Once the <strong>n!&x</strong> have been inserted in place of the removed words, the user can then click the Submit button to update the lyics</li>
    <li>If the user accidentally removes too many words or wants a set of fresh lyrics, there is a Reset Lyrics button below the Submit button, which will replace the current lyrics with a fresh set of lyrics</li>
</ol>

### Profile Page (Registered User Only)
<ol>
    <li>This page display's a registered user's account information such as:</li>
    <ol>
        <li>Game ID</li>
        <li>Username</li>
        <li>Email Address</li>
    </ol>
    <li>Developer Notes:</li>
    <ol>
        <li>The registered user's password cannot be displayed at this time due to salting and hashing for security purposes</li>
        <li>The user's information cannot be edited at this time
    </ol>
</ol>


## Built With
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>React</li>
    <li>Redux</li>
    <li>Redux Sagas</li>
    <li>Node.js</li>
    <li>Express</li>
    <li>Postgres</li>
    <li>Postico</li>
    <li>Musix Match API</li>
    <li>Material UI</li>
</ul>

## Acknowledgement
<p>Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.</p>
<p>Thanks to [MusixMatch API](https://developer.musixmatch.com/) for supplying the lyrics to power my application.</p>

## Support
If you have suggestions or issues, please email me at [fueclee.12@gmail.com]
