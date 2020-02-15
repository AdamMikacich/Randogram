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
      if (element.getAttribute('data-zoomed') === 'true') {
        element.style.width = '500px';
        element.style.height =  '500px';
        element.setAttribute('data-zoomed', 'false');
      } else {
        naturalWidth = element.childNodes[0].naturalWidth;
        naturalHeight = element.childNodes[0].naturalHeight;

        /// ensuring min and max width for zooming image
        restraints = [700, window.innerWidth * 0.9];
        scale = clamp(naturalWidth, ...restraints) / naturalWidth;
        element.style.width = naturalWidth * scale + 'px';
        element.style.height = naturalHeight * scale + 'px';
        element.setAttribute('data-zoomed', 'true');
      }
    });
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(min, value), max)
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