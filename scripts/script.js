// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    },
     function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}



const title = '';
let numEnt = 1;
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = numEnt;
        numEnt++;
        newPost.addEventListener('click',() => {
          let journalEntry = {name: "journalentry", id: newPost.id};
          history.pushState(journalEntry, '', "#entry" + journalEntry.id);
          setState(journalEntry);
        });

        document.querySelector('main').appendChild(newPost);
      });

      document.querySelector('header img').addEventListener('click', () => {
        let settings = {name: "settings", id:0};
        history.pushState(settings, title, 'Settings');   //state , title, url
        setState(settings); 
      });

      document.querySelector('header h1').addEventListener('click', () => {
        if(history.state != null && history.state.name != 'home') {
          let home = {name: "home", id: -1};
          history.pushState(home, title, location.origin); 
          setState(home); 
        }

    
      });
    });
});

window.onpopstate = function(event){
  setState(event.state);
};
