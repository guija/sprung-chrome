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

      // TODO Moeglicherweise stimmt der neue Tabtitel nicht. Falls er nicht stimmt muss man 
      // den Wert aus onUpdated param changeInfo.title verwenden
      customTabList.push({
        index: i,
        id: tab.id,
        title: tab.title,
        isCurrent: isCurrent
      });

      // TODO Sprung API request here to inform sprung about current tabs
      // to identify which chrome window is the current one match the currentWindowTitle

    }
  });
}