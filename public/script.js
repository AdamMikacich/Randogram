document.addEventListener('DOMContentLoaded', () => {
  const images = document.getElementById('images');

  function addImage() {
    const element = document.createElement('div');
    element.classList.add('fill');
    element.innerHTML = '<img src="./img">';

    images.appendChild(element);
  }

  const count = 10;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      addImage();
    }, 4000 * i);
  }
});