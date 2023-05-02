'use strict';

const results = await fetch('./zelda-timeline.json');
const zeldaTimeline = await results.json();

const formElement = document.forms.addGame;

const ulElement = document.getElementById('zeldaGames')

async function getTimeline() {
	try {
		let response = localStorage.getItem('timeline') ? JSON.parse(localStorage.getItem('timeline')) : await zeldaTimeline;
        
        localStorage.setItem('timeline', JSON.stringify(response));

		return response;
	} catch (error) {
		console.log('Error:', error.message);
	} finally {
		console.log('Petición finalizada 🥳');
	}
}

async function createUlContent () {
    ulElement.innerHTML = '';
    let fragment = document.createDocumentFragment();
    let results = await getTimeline();

    results = results.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));

    for(let game of results){
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="game">
                <h2>${game.date}</h2>
                <p>${game.title}</p>
                <img src="${game.image}" alt="Image ${game.title}" />
                <p>${game.text}</p>
            </div>
        `;

    fragment.append(li)
    }

    ulElement.append(fragment);
}

createUlContent();

async function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(formElement);
    let title = formData.get('title');
    let date = parseInt(formData.get('date'));
    let text = formData.get('text');
    let image = formData.get('image');

    console.log(title, date, text, image);

    let newGame = {
        title,
        date,
        text,
        image
    }

    console.log(newGame);

    let results = await getTimeline();

    results.push(newGame);

    localStorage.setItem('timeline', JSON.stringify(results));

    formElement.reset();

    createUlContent();

}

formElement.addEventListener('submit', handleSubmit);