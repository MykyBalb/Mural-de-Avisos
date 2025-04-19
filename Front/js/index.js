window.onload = () => {
  const URL = 'http://localhost:8080/avisos';
  getRecado(URL);
};

const getRecado = async (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showRecados(data))
    .catch((error) => console.error('Error:', error));
};

const showRecados = (data) => {
  console.log(data);
  const recados = document.querySelector('#mural');

  data.forEach((element) => {
    const article = document.createElement('article');
    article.classList.add('postItRecado');
    article.dataset.id = element.idRecado;
    article.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 80%, 90%)`;
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
  getIds();
};

const getIds = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    const updateButtons = document.querySelectorAll('.update');
    
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
        const id = e.target.closest('article').dataset.id;
        console.log(id);
        });
    });
    
    updateButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
        const id = e.target.closest('article').dataset.id;
        console.log(id);
        });
    });
};
