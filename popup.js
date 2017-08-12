chrome.tabs.onCreated.addListener(function(tab) {
  alert("new tab was opened!")
});

/*
function getCurrentTabUrl(callback) {
  var queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    for(var i = 0; i < tabs.length; i++) {
      console.log("TAB URL:" + tabs)
    }
  });

}
*/