document.addEventListener('DOMContentLoaded', function() {
    fetch('src/data.json')
    .then(response => response.json())
    .then(data => { 
        const albums = data["albums"];
        console.log(albums);

        const imageGrid = document.getElementById('imageGrid');
        const dialog = document.getElementById('details');
        const nextPage = document.getElementById('next-page');
        const previousPage = document.getElementById('previous-page');
        const closePage = document.getElementById('close');
        let numberOfPage = 1;

        for (let i = numberOfPage; i < numberOfPage+6; i++) {
            const imgElement = document.createElement('img');

            imgElement.id = `show-details-${i}`;
            imgElement.className = "imgElement";
            imgElement.src = albums[i]["coverPath"];
            imgElement.alt = albums[i]["name"];
    
            imgAddEvent(imgElement, dialog, albums[i]);
            imageGrid.appendChild(imgElement);
        }

        nextPage.addEventListener('click', function() {
            if (numberOfPage < albums.length-6) {
                for (let i = numberOfPage; i < numberOfPage+6; i++) {
                    if (i >= albums.length) 
                        document.getElementById(`filler-${i}`).remove();
                    else document.getElementById(`show-details-${i}`).remove();
                }
    
                numberOfPage += 6;
                renderImg(imageGrid, dialog, albums, numberOfPage);
                document.getElementById('page-number').innerText = (numberOfPage-1)/6+1;
            }
            console.log(numberOfPage);
        });
        previousPage.addEventListener('click', function() {
            if (numberOfPage > 1) {
                for (let i = numberOfPage; i < numberOfPage+6; i++) {
                    if (i >= albums.length) 
                        document.getElementById(`filler-${i}`).remove();
                    else document.getElementById(`show-details-${i}`).remove();
                }

                numberOfPage -= 6;
                renderImg(imageGrid, dialog, albums, numberOfPage);
                document.getElementById('page-number').innerText = (numberOfPage-1)/6+1;
            }
            console.log(numberOfPage);
        });

        closePage.addEventListener('click', function() {
            dialog.close();
            document.getElementById('album-info').remove();
        });
  });
});

function renderImg(imageGrid, dialog, albums, numberOfPage) {
    for (let i = numberOfPage; i < numberOfPage+6; i++) {
        let imgElement = document.createElement('img');
        if (i >= albums.length) {
            imgElement.id = `filler-${i}`;
            imgElement.className = "fillerElement";
            imgElement.src = albums[0]["coverPath"];
            imgElement.alt = albums[0]["name"];
        }
        else {
            imgElement.id = `show-details-${i}`;
            imgElement.className = "imgElement";
            imgElement.src = albums[i]["coverPath"];
            imgElement.alt = albums[i]["name"];
    
            imgAddEvent(imgElement, dialog, albums[i]);
        }
        imageGrid.appendChild(imgElement);
    }
}

function imgAddEvent(imgElement, dialog, album) {
    imgElement.addEventListener('click', function() {
        let div = document.createElement('div');
        let header = document.createElement('header');
        let sectionBase = document.createElement('section');
        let albumCover = imgElement.cloneNode(true);
        let songsList = document.createElement('table');
        let releaseDate = document.createElement('footer');

        let nameH1 =  document.createElement('h1');
        let authorH1 =  document.createElement('h1');
        let about = document.createElement('p'); 
        let date = document.createElement('p');
        
        div.id = "album-info";
        header.className = "album-info-header";
        albumCover.className = "album-info-img";
        sectionBase.className = "album-info-base";
        releaseDate.className = "album-release-date";
        songsList.className = "songs-table";

        nameH1.innerText = album["name"];
        authorH1.innerText = album["author"];
        about.innerText = album["about"];
        date.innerText = "2000";
        
        let line = document.createElement('hr');

        sectionBase.append(nameH1, line, authorH1, about)
        header.append(albumCover, sectionBase);
        releaseDate.appendChild(date);

        div.appendChild(header);
        
        let songs = album["songs"];
        for (let i = 0; i < songs.length; i++) {
            let row = songsList.insertRow();
            let name = row.insertCell();

            name.className = "name";
            name.innerText = songs[i];
        }
        div.appendChild(songsList);
        div.appendChild(releaseDate);

        dialog.appendChild(div);
        dialog.showModal();
    });
}