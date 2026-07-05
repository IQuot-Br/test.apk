let pontos = 0;
const alvo = document.getElementById('alvo');
const placar = document.getElementById('pontos');

function moverAlvo() {
    // Sorteia uma posição na tela do celular
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 150) + 100;
    
    alvo.style.left = `${x}px`;
    alvo.style.top = `${y}px`;
}

alvo.addEventListener('click', () => {
    pontos++;
    placar.innerText = pontos;
    moverAlvo();
});

// Inicia o alvo na tela
moverAlvo();
