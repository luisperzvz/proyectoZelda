'use strict';

const results = await fetch('./zelda-timeline.json');
const zeldaTimeline = await results.json();

const ulElement = document.getElementById('zeldaGames')

async function getTimeline() {
	try {
		let response = await zeldaTimeline;
		//Ordenación de los juegos 
		response = response.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));

		return response;
	} catch (error) {
		console.log('Error:', error.message);
	} finally {
		console.log('Petición finalizada 🥳');
	}
}

async function createUlContent () {
    let fragment = document.createDocumentFragment();
    let results = await getTimeline();
    for(let game of results){
		console.log(game);
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="game">
                <h2>${game.date}</h2>
                <h3>${game.title}</h3>
                <img src="${game.image}" alt="Image ${game.title}" />
                <p>${game.text}</p>
            </div>
        `;

    fragment.append(li)
    }

    ulElement.append(fragment);
}

createUlContent();