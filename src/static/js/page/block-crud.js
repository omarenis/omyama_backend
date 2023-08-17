const loadBlock = (element, urlOfFormBlock) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange =  () => {
    if (xhttp.readyState === 4 && xhttp.status == 200) {
      element.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", urlOfFormBlock, true);
  xhttp.send();
}
