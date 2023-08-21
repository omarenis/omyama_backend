const executeAjaxRequest = (data, dataType, method, url, callback) => {
  $.ajax({
    url: url,
    type: method,
    data: data,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: callback});
}
