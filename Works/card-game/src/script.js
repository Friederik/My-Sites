class Card {
  constructor(name, portrait, attack) {
      this.name = name 
      this.portrait = portrait 
      this.attack = attack
      this.shell = this.createCard()
  }

  createCard() {
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const border = document.createElement('div')

    div.className = "card"
    h1.innerText = this.name
    img.src = this.portrait
    img.alt = "portrait"
    p.innerText = this.attack
    border.className = "card-folder"
    div.append(h1, img, p, border)
    return div
  }
}

fetch('src/data.json')
  .then((response) => response.json())
  .then((data) => {
    let section = document.getElementById('hand')
    
    cardInfo = data['cards']
    let handDeck = []

    for (let i=0; i<cardInfo.length; i++) {
      let currentCard = new Card(
        cardInfo[i]['name'], 
        cardInfo[i]['portraitPath'], 
        cardInfo[i]['attack'])
        currentCard.shell.id = i
      currentCard.shell.lastChild.id = `card-${i}`
      handDeck.push(currentCard)
      section.appendChild(currentCard.shell)
    }

    console.log(handDeck)
  });

  document.body.addEventListener('click', function(event) {
    if (event.target.className === 'card-folder'
      && event.target.parentNode.parentNode.id === 'hand'
    ) {
      let cardId = event.target.id.substring(5)
      let currentCard = document.getElementById(cardId)
      document.getElementById('table').appendChild(currentCard)
    }
  })