const pageVisited = (event) => {
  event.preventDefault();
  console.log(event.target.getAttribute('href'));
};

document.querySelectorAll('.nav-link').forEach((element) => {
  if(window.location.pathname === element.getAttribute('href'))
  {
    element.classList.add('active');
    element.classList.add('text-white')
    return undefined;
  }
});
