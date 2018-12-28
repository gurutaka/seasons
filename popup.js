window.addEventListener("load", function() {
  $(".iconImg").on("click", function() {
    const id = $(this).attr("id");
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        id: id
      });
    });
  });
});
