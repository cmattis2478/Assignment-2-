if (annyang) {

  const commands = {
    'hello': () => alert('Hello World'),

    'change the color to *color': (color) => {
      document.body.style.backgroundColor = color;
    },

    'navigate to *page': (page) => {
      page = page.toLowerCase();

      if (page.includes('home')) window.location.href = 'index.html';
      if (page.includes('stocks')) window.location.href = 'stocks.html';
      if (page.includes('dogs')) window.location.href = 'dogs.html';
    },

    'lookup *stock': (stock) => {
      if (document.getElementById('ticker')) {
        document.getElementById('ticker').value = stock;
        lookupStock();
      }
    },

    'load dog breed *name': (name) => {
      if (window.loadBreedFromVoice) {
        window.loadBreedFromVoice(name);
      }
    }
  };

  annyang.addCommands(commands);
}

function startAudio() {
  if (annyang) annyang.start();
}

function stopAudio() {
  if (annyang) annyang.abort();
}