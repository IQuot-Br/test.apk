let kills = 0;
const placarKills = document.getElementById('kills');
const botaoAtirar = document.getElementById('btn-atirar');
const cursor = document.querySelector('[cursor]');

// Função executada ao pressionar o gatilho/botão de atirar
botaoAtirar.addEventListener('touchstart', (e) => {
    e.preventDefault();
    atirar();
});

// Suporte para testar no PC também usando o clique do mouse
window.addEventListener('click', () => {
    atirar();
});

function atirar() {
    // Captura qual objeto 3D está exatamente no centro da mira verde
    const objetoMirado = cursor.components.cursor.intersectedEl;

    if (objetoMirado && objetoMirado.classList.contains('inimigo')) {
        kills++;
        placarKills.innerText = kills;

        // Efeito visual de eliminação: joga o inimigo para longe temporariamente
        // e depois ressurge (respawn) em uma nova posição aleatória do mapa
        const novoX = (Math.random() * 16) - 8; // Entre -8 e 8
        const novoZ = -(Math.random() * 10) - 5; // Entre -5 e -15

        objetoMirado.setAttribute('position', `${novoX} 1 ${novoZ}`);
        
        // Muda a cor do bot brevemente para dar feedback de acerto
        objetoMirado.setAttribute('color', '#ffffff');
        setTimeout(() => {
            objetoMirado.setAttribute('color', '#ff0000');
        }, 150);
    }
}
