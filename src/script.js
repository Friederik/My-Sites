const projects = [
    "Works/albums-collection/index.html",
    "Works/card-game/index.html",
    "Works/Portal-Site/index.html",
    "Works/verstka1/index.html"
]
const works = document.getElementById('works');

projects.forEach(element => {
    let a = document.createElement('a');

    a.href = element;
    a.innerText = element.split('/')[1];
    a.className = 'btn';

    works.append(a);
});