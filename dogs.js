//images
fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById('dogImages');

    data.message.forEach(img => {
      let slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${img}" width="300">`;
      container.appendChild(slide);
    });

    new Swiper('.swiper');
  });

//breeds
let breedsData = [];

fetch('https://api.thedogapi.com/v1/breeds')
  .then(res => res.json())
  .then(data => {
    breedsData = data;

    let container = document.getElementById('breedButtons');

    data.forEach(breed => {
      let btn = document.createElement('button');
      btn.innerText = breed.name;

      btn.onclick = () => showBreed(breed);

      container.appendChild(btn);
    });
  });

function showBreed(breed) {
  let div = document.getElementById('breedInfo');

  div.innerHTML = `
    <h2>${breed.name}</h2>
    <p>${breed.temperament || 'No description'}</p>
    <p>Life: ${breed.life_span}</p>
  `;
}

//support
window.loadBreedFromVoice = function(name) {
  let found = breedsData.find(b => b.name.toLowerCase().includes(name.toLowerCase()));
  if (found) showBreed(found);
};