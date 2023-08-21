const pageVisited = (event) => {
  event.preventDefault();
  console.log(event.target.getAttribute('href'));
};

document.querySelectorAll('.nav-link').forEach((element) => {
  if (window.location.pathname === element.getAttribute('href')) {
    element.classList.add('active');
    element.classList.add('text-white')
    return undefined;
  }
});

function uploadImage(event) {
  console.log(event);
  const fileReader = new FileReader();
  const fileContainer = event.parentElement.previousElementSibling;
  fileReader.addEventListener('load', () => {
    const file = event.files[0];
    if (file !== null && file instanceof Blob && fileContainer !== undefined) {
      fileContainer.innerHTML = file.type.indexOf('video') > -1 ? `<video controls src="${fileReader.result}"></video>` : `<img src="${fileReader.result}" class="img-fluid" alt="fileUploaded" />`;
    }
  });
  fileReader.readAsDataURL(event.files[0]);
}
