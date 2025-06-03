// Funções para abrir e fechar o menu lateral
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Lógica para o slider
const sliders = document.querySelectorAll('.slider');
let currentSlide = 0;

function showSlide(index) {
    sliders.forEach((slider, i) => {
        if (i === index) {
            slider.classList.add('active');
        } else {
            slider.classList.remove('active');
        }
    });
}

function esquerda() {
    currentSlide = (currentSlide === 0) ? sliders.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
}

function direita() {
    currentSlide = (currentSlide === sliders.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
}


async function buscar() {
  try {
    let input = document.getElementById('pesquisa').value;
    input= input.toLowerCase();
    const response = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&pithumbsize=500&titles=${input}&format=json&origin=*`);
    const data = await response.json();
    
    const pagina = Object.values(data.query.pages)[0]; // Obtém a página correta

    // Verifica se a página atual é a página de artigo ou a página inicial
    const isArtigoPage = window.location.pathname.includes('artigoPage.html');
    const isIndexPage = window.location.pathname === "/" || window.location.pathname.includes('index.html');


    if (isArtigoPage || isIndexPage) {
        localStorage.setItem('titulo', pagina.title);
        localStorage.setItem('imagem', pagina.thumbnail ? pagina.thumbnail.source : '');
        localStorage.setItem('texto', pagina.extract);
        
        window.location.href = 'artigoPage.html'; // Redireciona sempre para artigoPage.html após a busca
    } else {
        // Se já estiver na página de artigo (e não foi redirecionado), atualiza o conteúdo
        // Isso é mais relevante se você quiser que a busca na página de perfil, por exemplo, não redirecione
        // mas atualize o conteúdo da própria página de perfil (que não é o comportamento atual de "ir para artigoPage.html")
        // No seu caso, o if (isArtigoPage || isIndexPage) já trata o redirecionamento.
        // Este else é mais um fallback, mas o redirecionamento acima é mais direto.
        const titleElement = document.getElementById('title');
        const imageElement = document.getElementById('image');
        const textElement = document.getElementById('text');

        if (titleElement) titleElement.innerText = pagina.title;
        if (imageElement) imageElement.src = pagina.thumbnail ? pagina.thumbnail.source : 'Imagem não disponível';
        if (textElement) textElement.innerHTML = pagina.extract;
    }

  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}


async function gerarArtigos(){
  const titulos = ["Telescópio Espacial James Webb", "Tecnologia", "Brasil"]; // Artigos para o slider
  const idsImagens = ['imageDes', 'imageSlider2', 'imageSlider3'];
  const idsTitulos = ['titleDes', 'titleSlider2', 'titleSlider3'];
  const idsTextos = ['textDes', 'textSlider2', 'textSlider3'];

  // Essa função só deve ser chamada se a página atual for index.html para o slider
  if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
      return; // Sai da função se não estiver na página inicial
  }

  let artigos = [];
  for(let titulo of titulos){
    try {
      const response = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&pithumbsize=500&titles=${titulo}&format=json&origin=*`);
      const data = await response.json();
      const pagina = Object.values(data.query.pages)[0];

      artigos.push({
        title: pagina.title,
        image: pagina.thumbnail ? pagina.thumbnail.source: 'Imagem não disponível',
        text: pagina.extract
      });
    } catch (error){
      console.error(`Erro ao buscar o artigo ${titulo}:`, error);
    }
  }

  // Preenche os sliders com os artigos obtidos
  for(let i = 0; i < artigos.length && i < sliders.length; i++){
      const imagemElement = document.getElementById(idsImagens[i]);
      const titleElement = document.getElementById(idsTitulos[i]);
      const textElement = document.getElementById(idsTextos[i]);

      if (imagemElement) imagemElement.src = artigos[i].image;
      if (titleElement) titleElement.innerText = artigos[i].title;
      if (textElement) textElement.innerHTML = artigos[i].text;
  }
}


// Chama gerarArtigos quando a página index.html é carregada
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        gerarArtigos();
        showSlide(currentSlide); // Mostra o primeiro slide ao carregar
    }
});


window.onload = function () {
  if (window.location.pathname.includes('artigoPage.html')) {
    document.getElementById('title').innerText = localStorage.getItem('titulo');
    document.getElementById('image').src = localStorage.getItem('imagem') || 'Imagem não disponível';
    document.getElementById('text').innerHTML = localStorage.getItem('texto');
  }
};