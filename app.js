const startGame = document.querySelectorAll('.btn')
const cards = document.querySelectorAll('.card')

class MixnMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards
        this.totalTime = totalTime
        this.timeLeft = this.totalTime
        this.timer = document.getElementById('timer')
        console.log(this.timeLeft)
    }
    startGame() {
        this.busy = true
        this.cardToCheck = null
        this.matchedArray = []
        this.timeLeft = this.totalTime
        setTimeout(() => {
            this.randomize()
            this.busy = false
            this.countdown = this.startCountdown()
        }, 500);
        this.hideCards()
        this.timer.innerText = this.timeLeft
    }

    startCountdown() {
        return setInterval(() => {
            this.timeLeft--
            this.timer.innerText = this.timeLeft
            if (this.timeLeft === 0) {
                this.gameOver()
            }
        }, 1000);
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('show')
            card.classList.remove('match')
        })
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            card.classList.add('show')

            if (this.cardToCheck) {
                this.checkCardForMatch(card)
            } else {
                this.cardToCheck = card
            }   
        }
    }

    checkCardForMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.match(card, this.cardToCheck)
        } else {
            this.misMatch(card, this.cardToCheck)
        }
        this.cardToCheck = null
    }

    match(card1, card2) {
        this.matchedArray.push(card1)
        this.matchedArray.push(card2)
        card1.classList.add('match')
        card2.classList.add('match')
        if (this.matchedArray.length === this.cardsArray.length) {
            this.victory()
        }
    }

    gameOver() {
        clearInterval(this.countdown)
          document.getElementById('game-over').classList.add('show')  
    }

    victory() {
        clearInterval(this.countdown)
        setTimeout(() => {
            document.getElementById('victory').classList.add('show')  
        }, 500);
    }

    misMatch(card1, card2) {
        this.busy = true
        setTimeout(() => {
            card1.classList.remove('show')
            card2.classList.remove('show')
            this.busy = false
        }, 1000);
    }

    getCardType(card) {
        return card.querySelector('.image').src
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedArray.includes(card) && card !== this.cardToCheck
    }

    randomize() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let random = Math.floor(Math.random() * i)
            this.cardsArray[random].style.order = i 
            this.cardsArray[i].style.order = random
        }
        for (let i = 0; i < this.cardsArray.length; i++) {
            let random = Math.floor(Math.random() * i)
            this.cardsArray[random].style.order = i
            this.cardsArray[i].style.order = random
        }
    }
}

const game = new MixnMatch(40, cards)

// events
    startGame.forEach(start => {
        start.addEventListener('click', () => {
            document.getElementById('start').classList.remove('show')
            document.getElementById('victory').classList.remove('show')
            document.getElementById('game-over').classList.remove('show')
            game.startGame()
        })
    })

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card)
        })
    })


