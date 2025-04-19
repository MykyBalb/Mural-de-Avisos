window.onload = () => {
    document.querySelector('#reload').addEventListener('submit', event => {event.preventDefault()});
    const URL = 'http://localhost:8080/avisos';
    const POST = document.querySelector('#cadastrarRecado');
    const UPDATE = document.querySelector('#atualizarRecado');

    POST ? POST.addEventListener('click', () => {postRecado(URL)}) : null;
    UPDATE ? UPDATE.addEventListener('click', updateRecado) : null;
}

const postRecado = async url => {
    const tituloInput = document.querySelector('#tituloRecado');
    const descricaoInput = document.querySelector('#descricaoRecado');
    const autorInput = document.querySelector('#autorRecado');
    if (tituloInput.value === '' || descricaoInput.value === '' || autorInput.value === '') {
        const erro = document.querySelector('#erro');
        erro.innerHTML = '';
        const p = document.createElement('p');
        p.classList.add('error');
        p.textContent = 'preencha todos os campos';
        erro.appendChild(p);
        setTimeout(() => {
            if(erro.lastChild) {
                erro.removeChild(erro.lastChild);
            }
        }, 3000);
        return;
    }

    const titulo = tituloInput.value;
    const descricao = descricaoInput.value;
    const autor = autorInput.value;

    const data = {titulo: titulo, descricao: descricao, autor: autor}

    try {
        console.log('try');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 201) {
            window.location.href = '../index.html';
        } else {
            const erro = document.querySelector('#erro');
            erro.innerHTML = '';
            const p = document.createElement('p');
            p.classList.add('error');
            p.textContent = 'Erro ao cadastrar recado, por favor tente novamente';
            erro.appendChild(p);
            setTimeout(() => {
                if(erro.lastChild) {
                    erro.removeChild(erro.lastChild);
                }
            }, 3000);
        }
    } catch {
        console.error('Erro:', error);
    }



}