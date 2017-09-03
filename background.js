var currentTabId = undefined;
var currentWindowTitle = undefined;

chrome.tabs.onActivated.addListener(function(activeInfo) {
  currentTabId = activeInfo.tabId;
  var currentWindowId = activeInfo.windowId;
  console.log("currentTabId: " + currentTabId);
  console.log("currentWindowId: " + currentWindowId);
  updateTabList();
});

chrome.tabs.onCreated.addListener(function(tab) {
  console.log("tab was created");
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
  console.log("Tab was updated");

  if (tabId == currentTabId) {
    currentWindowTitle = changeInfo.title;
  }
  
  updateTabList();
  
});

function updateTabList() {

  var queryInfo = { currentWindow: true };

  chrome.tabs.query(queryInfo, function(tabs) {

    var customTabList = [];

    for(var i = 0; i < tabs.length; i++) {

      var tab = tabs[i];
      var isCurrent = currentTabId == tab.id;

      console.log("index:" + i);
      console.log("id:" + tab.id);
      console.log("url: " + tab.url);
      console.log("title: " + tab.title);
      console.log("isCurrent: " + isCurrent);
      console.log("currentTabId: " + currentTabId);
      console.log("windowId: " + tab.windowId);

      // Moeglicherweise stimmt der neue Tabtitel nicht. Falls er nicht stimmt muss man 
      // den Wert aus onUpdated param changeInfo.title verwenden
      customTabList.push({
        index: i,
        id: tab.id,
        title: tab.title,
        isCurrent: isCurrent,
        windowId: tab.windowId
      });

    }
    
    console.log(customTabList);


    $.post(
      SPRUNG_REST_API + "/chrome", 
      JSON.stringify(customTabList), 
      function(response) { console.log(response) }, 
      "json"
    );

  });
}