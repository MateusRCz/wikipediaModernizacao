const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('buttonLeft');
const btnNext = document.getElementById('buttonRight');

let currentSlide = 0;

function hideSlider(){
  slider.forEach(item => item.classList.remove('on'))
}

function showSlider(){
  slider[currentSlide].classList.add('on')
}

function nextSlider(){
  hideSlider()
  if(currentSlide === slider.length - 1){
    currentSlide = 0
    console.log(currentSlide)
  }else {
    currentSlide++
    console.log(currentSlide)
  }
  console.log('chama showl')
  showSlider()
}

function prevSlider(){
  hideSlider()
  if(currentSlide === 0){
    currentSlide = slider.length -1
  }else {
    currentSlide--
  }
  showSlider()
}

console.log(slider)

btnNext.addEventListener('click', () => nextSlider())
btnPrev.addEventListener('click', () => prevSlider())

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
  const titulos = ["Telescópio Espacial James Webb", "ENIAC", "Alan Turing"];

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


  let imagem = document.getElementById('image1')
  let title = document.getElementById('title1')
  let texto = document.getElementById('text1')
  
  let imagem2 = document.getElementById('image2')
  let title2 = document.getElementById('title2')
  let texto2 = document.getElementById('text2')

  let imagem3 = document.getElementById('image3')
  let title3 = document.getElementById('title3')
  let texto3 = document.getElementById('text3')
  
  imagem.src = artigos[0].image
  title.innerText = artigos[0].title
  texto.innerHTML = artigos[0].text

  // console.log(artigos[2].text)

  imagem2.src = artigos[1].image
  title2.innerText = artigos[1].title
  texto2.innerHTML = artigos[1].text

  imagem3.src = artigos[2].image
  title3.innerText = artigos[2].title
  texto3.innerHTML = artigos[2].text

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





