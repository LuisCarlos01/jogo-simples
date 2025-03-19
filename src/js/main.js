const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.game-over');
const pointsElement = document.getElementById('points');

let points = 0;
let isGameOver = false;
let pipesPassed = 0;

const jump = () => {
    if (isGameOver) return;
    
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

function restartGame() {
    isGameOver = false;
    points = 0;
    pipesPassed = 0;
    pointsElement.textContent = points;
    gameOver.classList.add('hidden');
    
    // Remove o cano da tela
    pipe.style.right = '-80px';
    pipe.style.left = 'auto';
    
    // Reinicia a animação do cano
    pipe.style.animation = 'none';
    // Força um reflow para reiniciar a animação
    pipe.offsetHeight;
    pipe.style.animation = 'pipe-animation 2s infinite linear';
    
    // Reinicia o Mario
    mario.style.bottom = '0';
    mario.style.width = '150px';
    mario.src = 'img/mario.gif';
}

const checkCollision = setInterval(() => {
    if (isGameOver) return;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom);

    // Colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.bottom = `${marioPosition}px`;
        mario.src = 'img/game-over.png';
        mario.style.width = '75px';

        isGameOver = true;
        gameOver.classList.remove('hidden');
    }
    
    // Incrementa pontos quando passar pelo cano
    if (pipePosition <= 0 && !isGameOver) {
        if (pipesPassed === 0) {
            points++;
            pointsElement.textContent = points;
            pipesPassed = 1;
        }
    } else {
        pipesPassed = 0;
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});

document.addEventListener('touchstart', jump);

document.addEventListener('DOMContentLoaded', () => {
    // Exemplo de inicialização do jogo
    console.log('Jogo Mario Jump iniciado!');
});
