export default function updateGamePlayHistory(Id, guessCount) {
    fetch('http://127.0.0.1:5000/update-game-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         Id, guessCount 
      })
    })
    // .then(response => response.json())
    // .then(data => console.log('From server history',data))
    .catch(error => console.error('Server Error'));
  }
  