const projects = [
    "Works/albums-collection/index.html",
    "Works/card-game/index.html",
    "Works/calculator/index.html",
     "Works/CreditCalc/index.html",
    "Works/ToDoList/index.html"
]
const works = document.getElementById('works');

projects.forEach(element => {
    let a = document.createElement('a');

    a.href = element;
    a.innerText = element.split('/')[1];
    a.className = 'btn';

    works.append(a);
});
