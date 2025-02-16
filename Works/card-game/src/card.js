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
      border.className = "border"
      div.append(h1, img, p, border)
      return div
    }
  }

export default Card