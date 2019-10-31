"use strict";
/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios
  .get("https://api.github.com/users/thesoundfromthesky")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .finally(function() {
    // always executed
  });
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
   
   F12 in the browser -> I looked through data.
   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const [cards] = document.getElementsByClassName("cards");

async function appendCard(username) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return cards.appendChild(createCard(data));
  } catch (e) {
    console.log(e);
  }
}
appendCard("thesoundfromthesky");

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const instructors = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];
const followersArray = [];

(async _ => {
  try {
    const res = await Promise.all(
      instructors.map(async username => {
        try {
          const { data } = await axios.get(
            `https://api.github.com/users/${username}/followers`
          );
          return { [username]: data };
        } catch (e) {
          console.log(e);
        }
      })
    );

    res.forEach(users => {
      for (const user in users) {
        followersArray.push({ [user]: users[user].map(({ login }) => login) });
      }
    });
    console.log(followersArray);
  } catch (e) {
    console.log(e);
  }
})();
(async _ => {
  for await (const user of instructors) {
    appendCard(user);
  }
})();
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createCard(insert) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.setAttribute("src", insert.avatar_url);

  const info = document.createElement("div");
  info.classList.add("card-info");

  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = insert.name ? insert.name : "";

  const userName = document.createElement("p");
  userName.classList.add("username");
  userName.textContent = insert.login;

  const location = document.createElement("p");
  location.textContent = `Location: ${insert.location ? insert.location : ""}`;

  const profile = document.createElement("p");
  profile.textContent = "Profile: ";
  const url = document.createElement("a");
  url.setAttribute("href", insert.html_url);
  url.textContent = insert.html_url;
  profile.appendChild(url);

  const followers = document.createElement("p");
  followers.textContent = `Followers: ${insert.followers}`;

  const following = document.createElement("p");
  following.textContent = `Following: ${insert.following}`;

  const bio = document.createElement("p");
  bio.textContent = `Bio: ${insert.bio ? insert.bio : ""}`;

  info.append(name, userName, location, profile, followers, following, bio);
  card.append(img, info);

  return card;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
