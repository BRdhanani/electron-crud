const electron = require('electron');
const {ipcRenderer} = electron;
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e){
	e.preventDefault();
	const title = document.getElementById('post-title').value
	const description = document.getElementById('post-description').value
	const data = {
		title,
		description
	}
	ipcRenderer.send('add:post', data);
}