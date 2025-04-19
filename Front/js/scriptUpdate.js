window.onload = () => {
    document.querySelector('#reload').addEventListener('submit', event => {event.preventDefault()});
    const URL = 'http://localhost:8080/avisos';
    getUpdate();
    const UPDATE = document.querySelector('#atualizarRecado');
    UPDATE ? UPDATE.addEventListener('click', () => {updateRecado(URL)}) : null;
}

const getUpdate = async () => {
    const tituloInput = document.querySelector('#tituloRecado');
    const descricaoInput = document.querySelector('#descricaoRecado');
    const autorInput = document.querySelector('#autorRecado');
    const data = getData();

    tituloInput.value = data.titulo;
    descricaoInput.value = data.descricao;
    autorInput.value = data.autor;
}

async function updateRecado(url) {
    const dataUpdate = getData();
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
        const response = await fetch(`${url}/${dataUpdate.idRecado}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 200) {
            window.location.href = '../index.html';
        } else {
            const erro = document.querySelector('#erro');
            erro.innerHTML = '';
            const p = document.createElement('p');
            p.classList.add('error');
            p.textContent = 'Erro ao atualizar recado, por favor tente novamente';
            erro.appendChild(p);
            setTimeout(() => {
                if(erro.lastChild) {
                    erro.removeChild(erro.lastChild);
                }
            }, 3000);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

const getData = () => {
    const dados = JSON.parse(localStorage.getItem('dados'));
    return dados;
}