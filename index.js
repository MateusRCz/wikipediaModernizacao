// const slider = document.querySelectorAll('.slider');
// const btnPrev = document.getElementById('buttonLeft');
// const btnNext = document.getElementById('buttonRight');

// let currentSlide = 0;

// function hideSlider(){
//   slider.forEach(item => item.classList.remove('on'))
// }

// function showSlider(){
//   slider[currentSlide].classList.add('on')
// }

// btnNext.addEventListener('click', )

async function buscar() {
  try {

    let input = document.getElementById('pesquisa').value;
    input= input.toLowerCase()
    const response = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&pithumbsize=500&titles=${input}&format=json&origin=*`);
    const data = await response.json();
    
    const pagina = Object.values(data.query.pages)[0]; // Obtém a página correta

    document.getElementById('title').innerText = pagina.title;
    document.getElementById('image').src = pagina.thumbnail ? pagina.thumbnail.source : 'Imagem não disponível';
    document.getElementById('text').innerHTML = pagina.extract;

    
    if(window.location.pathname === "/" || window.location.pathname === "") {
      localStorage.setItem('titulo', pagina.title);
      localStorage.setItem('imagem', pagina.thumbnail ? pagina.thumbnail.source : '');
      localStorage.setItem('texto', pagina.extract);
      
      window.location.href = 'artigoPage.html';
      console.log('mudou para outra página')
    }
     

  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}


function esquerda(){
  console.log('esquerda')
}


async function gerarArtigos(){
  const titulos = ["Telescópio Espacial James Webb", "Tecnologia", "Brasil"];

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
  console.log('Caiu gerarArtigos')
  completarConteiner(artigos)
  


}


gerarArtigos()



function completarConteiner(artigos){


  let imagem = document.getElementById('imageDes')
  let title = document.getElementById('titleDes')
  let texto = document.getElementById('textDes')

  
  imagem.src = artigos[0].image
  title.innerText = artigos[0].title
  texto.innerHTML = artigos[0].text

}

window.onload = function () {
  if (window.location.pathname.includes('artigoPage.html')) {
    console.log('deu boa')
    document.getElementById('title').innerText = localStorage.getItem('titulo');
    document.getElementById('image').src = localStorage.getItem('imagem') || 'Imagem não disponível';
    document.getElementById('text').innerHTML = localStorage.getItem('texto');
  }
};


// function buscar() {
//     let input = document.getElementById('pesquisa').value
//     console.log(input)
// }





