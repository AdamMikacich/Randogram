document.addEventListener('DOMContentLoaded', () => {
  const images = document.getElementById('images');
  const content = document.getElementById('content');

  let imageID = 0;

  function addImage() {
    const element = document.createElement('div');
    element.classList.add('fill');
    element.innerHTML = `<img src="./img?${imageID++}">`;

    images.appendChild(element);

    element.style.width = '500px';
    element.style.height =  '500px';
    element.setAttribute('data-zoomed', 'false');

    element.addEventListener('click', () => {
      console.log('click' + element.getAttribute('data-zoomed'));
      if (element.getAttribute('data-zoomed') === 'true') {
        element.style.width = '500px';
        element.style.height =  '500px';
        element.setAttribute('data-zoomed', 'false');
      } else {
        console.log('YEAAA, zooming in... NOW!');
        element.style.width = element.childNodes[0].naturalWidth + 'px';
        element.style.height = element.childNodes[0].naturalHeight + 'px';
        element.setAttribute('data-zoomed', 'true');
      }
    });
  }

  function addImagesMultiple() {
    const count = 3;
    for (let i = 0; i < count; i++) {
      addImage();
    }
  }

  addImagesMultiple();

  window.addEventListener('scroll', (e) => {
    if (window.scrollY + window.innerHeight > images.offsetHeight - 100) {
      addImagesMultiple();
    }
  })
});