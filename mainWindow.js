const electron = require('electron');
const {ipcRenderer} = electron;
const ul = document.querySelector('ul');

ipcRenderer.on('add:post', function(e, data){
	ul.className = 'collection';
	const li = document.createElement('li');
	const h2 = document.createElement('h2');
	const button = document.createElement('button');
	const p = document.createElement('p');
	const title = document.createTextNode(data.title);
	const description = document.createTextNode(data.description);
	const btn = document.createTextNode('Delete');
	h2.appendChild(title);
    p.appendChild(description);
    button.appendChild(btn);
	li.appendChild(h2);
	li.appendChild(p);
	li.appendChild(button);
	li.className = 'collection-item';
	button.id = data.title;
	button.className = 'btn waves-effect waves-light';
	ul.appendChild(li);

	const btnRef = document.getElementById(data.title);

	btnRef.addEventListener('click', function(e){
		e.path[1].remove();
	})
});

ipcRenderer.on('clear:post', function(){
	ul.innerHTML = '';
	ul.className = '';
});



// ul.addEventListener('dblclick', function(e){
// 	e.target.remove();
// 	if(ul.children.length == 0){
// 		ul.className = '';
// 	}
// })