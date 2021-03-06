# Hooked

Hooked is a multi page website where users can post links and content of their choice for other people to see and interact with.

## User Stories
- Someone who wants to share links they find on the internet.
- A bored internet user that wants to see content other people share.
- A critique who wants to give their opinions on a user's content.


## Setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Express 4.17
- cookie-session 1.4
- bcrypt 2.0
- Node 10.x or above
- NPM 5.x or above
- PG 6.x

## User Page

![User Page](https://github.com/smalboeuf/hooked/blob/master/docs/UserPage.png)

## Normal Post

![Normal Post](https://github.com/smalboeuf/hooked/blob/master/docs/NormalPost.png)

## Edit Profile 

![Edit Profile](https://github.com/smalboeuf/hooked/blob/master/docs/EditProfile.png)