const executeAjaxRequest = (data, method, url) => {
  $.ajax({
    url,
    context: document.body,
    data: data,
    method: method,
    success: function () {
      $(this).addClass("done");
    }
  });
}
