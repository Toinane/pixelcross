async function createLevel(level) {
   let game = '<thead><td></td>';

   await level.clues.vertical.map(async (line, i) => {
      game += '<td>';
      await line.map(number => game += `<span>${number}</span>`);
      game += '</td>';
   });

   game += '</thead><tbody>';

   console.log(game)

   await level.map.map(async (line, h) => {
      game += `<tr><th>`;
      level.clues.horizontal[h].map(number => game += `<span>${number}</span>`);
      game += '</th>'
      line.map((pixel, w) => {
         const td = document.createElement('td');
         if(h % 5 === 0 && h !== 0 && h !== level.map.length) td.classList.add('h-separator');
         if(w % 5 === 0 && w !== 0 && w !== line.length) td.classList.add('w-separator');
         if(pixel) td.classList.add('black');
         td.id = `pos-${h}-${w}`;

         game += td.outerHTML;
      });
      game += '</tr>';
   });

   document.getElementById('game').innerHTML = game + '</tbody>';
}

function randomizerMap(width, height) {
   let map = [];
   for(let h = 0; h < height; h++) {
      map[h] = [];
      for(let w = 0; w < width; w++) {
         const input = Math.round(Math.random());
         map[h].push(input); 
      }
   }

   return map;
}

function generateClues(map) {
   let horizontal = [];
   let vertical = [];

   map.map((line, i) => {
      horizontal[i] = [];
      let serie = 0;
      line.map(pixel => {
         if(pixel) serie++;
         else {
            if(serie) horizontal[i].push(serie);
            serie = 0;
         }
      });
      if(serie) horizontal[i].push(serie);
   });

   for(let w = 0; w < map[0].length; w++) {
      vertical[w] = [];
      let serie = 0;
      for(let h = 0; h < map.length; h++) {
         if(map[h][w]) serie++;
         else {
            if(serie) vertical[w].push(serie);
            serie = 0;
         }
      }
      if(serie) vertical[w].push(serie);
   }

   return {
      map: map,
      clues: {
         horizontal: horizontal,
         vertical: vertical
      }
   }
}

function main() {
   const map = randomizerMap(4, 4);
   const level = generateClues(map);

   createLevel(level);
   console.log(level)
}

main();