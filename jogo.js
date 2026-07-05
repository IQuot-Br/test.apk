let kills = 0;
let municao = 30;
let recarregando = false;

const placarKills = document.getElementById('kills');
const placarBalas = document.getElementById('balas');
const botaoAtirar = document.getElementById('btn-atirar');
const cursor = document.querySelector('[cursor]');
const arma = document.getElementById('arma');
const flash = document.getElementById('muzzle-flash');

// Detecção de comandos para celular e PC
botaoAtirar.addEventListener('touchstart', (e) => { { e.preventDefault(); atirar(); } });
window.addEventListener('mousedown', (e) => { if (e.target !== botaoAtirar) atirar(); });

function atirar() {
    if (recarregando || municao <= 0) {
        recargarArma();
        return;
    }

    municao--;
    placarBalas.innerText = municao;

    // 1. Efeito Visual de Coice/Recuo da Arma
    arma.setAttribute('position', '0.3 -0.35 -0.5'); // Joga a arma para trás
    flash.setAttribute('visible', 'true'); // Mostra o fogo do cano
    
    setTimeout(() => {
        arma.setAttribute('position', '0.3 -0.35 -0.6'); // Coloca a arma na posição normal
        flash.setAttribute('visible', 'false'); // Desliga o fogo do cano
    }, 80);

    // 2. Sistema de Dano e Detecção de Alvos
    const objetoMirado = cursor.components.cursor.intersectedEl;

    if (objetoMirado && objetoMirado.classList.contains('inimigo')) {
        kills++;
        placarKills.innerText = kills;

        // Animação de eliminação: Envia para uma nova posição randômica no mapa
        const novoX = (Math.random() * 24) - 12; // Entre -12 e 12
        const novoZ = -(Math.random() * 15) - 6; // Entre -6 e -21

        objetoMirado.setAttribute('position', `${novoX} 1 ${novoZ}`);
        
        // Efeito de acerto (pisca em branco)
        objetoMirado.setAttribute('color', '#ffffff');
        setTimeout(() => { objetoMirado.setAttribute('color', '#d32f2f'); }, 100);
    }
}

function recargarArma() {
    if (recarregando) return;
    recarregando = true;
    placarBalas.innerText = "RECARGANDO...";
    
    // Animação simples de recarga (abaixa a arma)
    arma.setAttribute('position', '0.3 -0.8 -0.6');
    
    setTimeout(() => {
        municao = 30;
        placarBalas.innerText = municao;
        arma.setAttribute('position', '0.3 -0.35 -0.6'); // Sobe a arma de volta
        recarregando = false;
    }, 1500); // Tempo de recarga de 1.5 segundos
}

