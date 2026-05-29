let casillas = document.querySelectorAll(".card");
let tittle = document.querySelector('.tittle')
let h2 = document.createElement('h2')
let reinicio = document.querySelector('.reset')
let turno = document.querySelector('.turno')
let contadorClicks = 0;
let jugadasDeX = []
let jugadasDeO = []
let aciertosX = 0
let aciertosO = 0
let ganador = false
let marcadas = 0
let combinacionGanadora;
const combinaciones = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
turno.textContent = 'Turno del Jugador X'
let jugadas = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const buscarGanador = (jugadasDeO, jugadasDeX) => {
    if (jugadasDeO.length >= 3) {
        for (let i = 0; i < combinaciones.length; i++) {

            for (let j = 0; j < combinaciones.length; j++) {

                if (jugadasDeO.some(num => num == combinaciones[i][j])) {
                    aciertosO++
                }
                if (aciertosO == 3) {
                    h2.textContent = 'Gano La Cpu'
                    combinacionGanadora = combinaciones[i]
                    tittle.append(h2)
                    ganador = true
                    break;
                }
            }
            aciertosO = 0
        }
    }
    if (jugadasDeX.length >= 3) {
        for (let i = 0; i < combinaciones.length; i++) {
            for (let j = 0; j < combinaciones.length; j++) {
                if (jugadasDeX.some(num => num == combinaciones[i][j])) {
                    aciertosX++
                }
                if (aciertosX == 3) {
                    h2.textContent = 'Gano X'
                    tittle.append(h2)
                    combinacionGanadora = combinaciones[i]
                    ganador = true
                    break;
                }
            }
            aciertosX = 0
        }
    }
    return ganador
}

const pintarGanador = (combinacionGanadora) => {
    casillas.forEach(casilla => {
        combinacionGanadora.forEach(num => {
            if (num == casilla.id) {
                casilla.classList.remove('bg-info')
                casilla.classList.add('bg-success')
            }
        })
    }
    )
}
const numeroRandom = (largo) => {
    return Math.floor(Math.random() * largo)
}



casillas.forEach(casilla => {
    casilla.addEventListener('click', (event) => {
        if (!event.target.classList.contains('marcada') && ganador == false) {
            if (contadorClicks <= 5 && jugadasDeX.length <= 4) {
                turno.textContent = 'Turno del Jugador O'
                casilla.textContent = 'X'
                jugadasDeX.push(parseInt(event.target.id))
                contadorClicks++
                marcadas++
                casilla.classList.add('marcada')
                jugadas.splice(jugadas.indexOf(parseInt(event.target.id)), 1)
                if (buscarGanador(jugadasDeO, jugadasDeX)) {
                    pintarGanador(combinacionGanadora)
                    turno.remove()
                } else  if (marcadas == 9 && ganador == false) {
            casillas.forEach(num => {
                num.classList.remove('bg-info')
                num.classList.add('bg-danger')
            })
            h2.textContent = "Empate!!!!"
            tittle.append(h2)
            turno.remove()
        }else {
                    let Cpu = numeroRandom(jugadas.length)
                    while (casillas[jugadas[Cpu]].classList.contains('marcada')) {
                        Cpu = numeroRandom(jugadas.length)
                        console.log('hola')
                    }
                    casillas[jugadas[Cpu]].classList.add('marcada')
                    marcadas++
                    jugadasDeO.push(jugadas[Cpu])
                    casillas[jugadas[Cpu]].textContent = 'O'
                    jugadas.splice(Cpu, 1)
                }
            }
                   
            if (buscarGanador(jugadasDeO, jugadasDeX)) {
                pintarGanador(combinacionGanadora)
                turno.remove()
            }
        }

    })
})

reinicio.addEventListener('click', (event) => {
    casillas.forEach(num => {
        turno.textContent = 'Turno del Jugador X'
        tittle.append(turno)
        num.className = 'card col bg-info'
        h2.remove()
        num.textContent = ''
        ganador = false
        marcadas = 0
        contadorClicks = 0
        jugadasDeO = []
        jugadasDeX = []
        combinacionGanadora = []
        jugadas = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
    )
})