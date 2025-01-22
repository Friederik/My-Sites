fetch('src/data.json')
  .then(response => response.json())
  .then(data => { 
    const button = document.getElementById("start-btn");

    button.addEventListener('click', function() {
      document.getElementById('start-btn').remove();  
      
      const container = document.getElementById('workshop');
      let songs = data['albums'][0]['songs'];
      let div = document.createElement('div');

      div.className = "content";
      for (let i = 0; i<songs.length; i++) {
        let btn = document.createElement('button');
        btn.className = "btn";
        btn.innerText = songs[i];
        div.appendChild(btn);
      }
      container.appendChild(div);
    });
});