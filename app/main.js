/*var SC = require('soundcloud');

SC.initialize({
  client_id: 'f911752b0d31492eca3ea086fbc9e8fd',
});

SC.get('/user/2921143/tracks').then(function(tracks){
  alert('Latest track: ' + tracks[0].title);
});*/

/*
user ids:
Chispazzo: 5574362
T&N: 2921143

*/

document.getElementById("go").addEventListener("click", searchTracks);

function searchTracks() {
  document.getElementById('results').innerHTML = ''
  document.getElementById('info').innerText = 'Searching...';


  let username = document.getElementById('usersearch').value.split("/").pop()
  fetch('http://api.soundcloud.com/resolve?url=http://soundcloud.com/'+username+'&client_id=f911752b0d31492eca3ea086fbc9e8fd', {})
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
        //console.log(response.avatar_url)
        document.getElementById('avatar').getElementsByTagName('img')[0].src = response.avatar_url
        getTracksByUser(response)
    })
    .catch(err => {
        console.log(err)
        alert("sorry, there are no results for your search")
    });
}

function getTracksByUser(user) {
  fetch('https://api.soundcloud.com/users/'+user.id+'/tracks?client_id=f911752b0d31492eca3ea086fbc9e8fd', { headers: { "Content-Type": "application/json; charset=utf-8" }})
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
        //console.log("Writing response")
        console.log(response)

        let downloadables = []
        response.forEach(function (track) {
          if (track.downloadable) { downloadables.push({permalink_url: track.permalink_url, title: track.title, download_url: track.download_url}) }
        });
        
        if (downloadables.length == 0) {
          document.getElementById('info').innerHTML = 'No downloadables from <strong>'+user.username+'</strong>';
        } else {
          document.getElementById('info').innerHTML = downloadables.length + ' Downloadables from <strong>'+user.username+'</strong>';
          downloadables.forEach(function (track) {
            document.getElementById('results').innerHTML += "<li><strong>"+track.title+"</strong><br><a target='_blank' href='"+track.permalink_url+"'>Preview &raquo;</a> | <a target='_blank' href='"+track.download_url+"'>Download &#x25BC;</a></li>";
          });
        }
    })
    .catch(err => {
        console.log(err)
        alert("sorry, there are no results for your search")
    });
}
