window.onload = () => {
  const URL = 'http://localhost:8080/avisos';
  getRecado(URL);
};

const getRecado = async (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showRecados(data, url))
    .catch((error) => console.error('Error:', error));
};

const showRecados = (data, url) => {
  const recados = document.querySelector('#mural');

  data
    .slice()
    .reverse()
    .forEach((element) => {
      const article = document.createElement('article');
      article.classList.add('postItRecado');
      article.dataset.id = element.idRecado;
      article.style.backgroundColor = `hsl(${Math.floor(
        Math.random() * 360
      )}, 80%, 90%)`;
      article.innerHTML = `
            <h2>${element.titulo}</h2>
            <h3>Autor:${element.autor}</h3>
            <p>${element.dataPublicacao}</p>
            <p>${element.descricao}</p>
            <div class="actions">
          <button type="button" class="update"><i class="fa fa-pencil"></i></button>
          <button type="button" class="delete"><i class="fa fa-trash"></i></button>
        </div>
        `;
      recados?.appendChild(article);
    });
  getIds(url);
};

const getIds = (url) => {
  const deleteButtons = document.querySelectorAll('.delete');
  const updateButtons = document.querySelectorAll('.update');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.closest('article').dataset.id;
      deleteRecado(id, url);
    });
  });

  updateButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const id = e.target.closest('article').dataset.id;
      getById(id, url);
    });
  });
};

const getById = async (id, url) => {
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('dados', JSON.stringify(data));
      window.location.href = 'html/edicao.html';
    })
    .catch((error) => console.error('Error:', error));
};

const deleteRecado = async (id, url) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 204) {
    window.location.reload();
  } else {
    const erro = document.querySelector('#erro');
    erro.innerHTML = '';
    const p = document.createElement('p');
    p.classList.add('error');
    p.textContent = 'Erro ao deletar recado, por favor tente novamente';
    erro.appendChild(p);
    setTimeout(() => {
      if (erro.lastChild) {
        erro.removeChild(erro.lastChild);
      }
    }, 3000);
  }
};
