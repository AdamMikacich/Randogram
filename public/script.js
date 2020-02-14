document.addEventListener('DOMContentLoaded', () => {
  const images = document.getElementById('images');
  const content = document.getElementById('content');

  let imageID = 0;

  function addImage() {
    const element = document.createElement('div');
    element.classList.add('fill');
    element.innerHTML = `<img src="./img?${imageID++}">`;

    images.appendChild(element);
  }

  const count = 3;
  for (let i = 0; i < count; i++) {
    addImage();
  }

  window.addEventListener('scroll', (e) => {
    if (window.scrollY + window.innerHeight === images.offsetHeight) {
      addImage();
    }
  })
});