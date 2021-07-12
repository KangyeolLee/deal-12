import './css/index.scss';

function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello asdf!';

  fetch('/', {
    method: 'get',
  }).then((r) => {
    console.log(r);
  });

  return element;
}

document.body.appendChild(component());
