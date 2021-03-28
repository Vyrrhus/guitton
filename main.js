const CANVAS  = document.getElementById('canvas')
const CONTEXT = CANVAS.getContext('2d')

let WIDTH  = document.getElementById('body').offsetWidth
let HEIGHT = document.getElementById('body').offsetHeight
let DPR    = window.devicePixelRatio

// PISTES
let PISTES = {
    pistNumber: 4,
    pistObject: [],
    current: -1,
    isPaused: true,
    play: function() {
        for (let i = 0 ; i < this.pistObject.length ; i++) {
            if (this.current - 1 == i) {
                this.pistObject[i].play()
            } else {
                this.pistObject[i].pause()
                this.pistObject[i].currentTime = 0
            }
        }
        console.log('play')
    },
    pause: function() {
        this.pistObject[this.current - 1].pause()
        console.log('pause')
    },
    press: function(y) {
        number = 1 + Math.floor(y/HEIGHT*this.pistNumber)
        if(number > this.pistNumber) {
            number = this.pistNumber
        }

        // Quel bouton a été appuyé ?
        console.log('PRESS')
        console.log(this.current, number)
        if (this.current == number) {
            this.isPaused = !this.isPaused
        } else {
            this.current = number
            this.isPaused = false
        }
        // Play / pause
        if (!this.isPaused) {
            this.play()
        } else {
            this.pause()
        }
    },
    init: function() {
        audioList = []
        for (let i = 0 ; i < AUDIO_FILES.length ; i++) {
            audioList.push(new Audio(AUDIO_FILES[i]))
        }
        this.pistObject = audioList
        this.pistNumber = audioList.length
    }
}

// EVENTS
// Appui sur touche
document.ontouchend = onTouchEndHandler

function onTouchEndHandler(event) {
    let touchList = event.changedTouches
    for (let i = 0 ; i < touchList.length ; i++) {
        PISTES.press(touchList[i].clientY)
    }
}

// Redimensionne le canvas
function resize() {
    WIDTH  = document.getElementById('body').offsetWidth
    HEIGHT = document.getElementById('body').offsetHeight
    resizeCanvas(CANVAS)
    
    function resizeCanvas(canvas) {
        CANVAS.width = WIDTH * DPR
        CANVAS.height = HEIGHT * DPR
        CONTEXT.scale(DPR, DPR)
    }
}

// Lorsque la page charge, on charge playlist et on redimensionne le canvas
// On crée l''évènement pour redimensionner le canvas à chaque changement de taille de la page
window.onload = function() {
    PISTES.init()
    resize()
    window.addEventListener('resize', function() {resize()}, false)
}