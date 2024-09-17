chrome.webNavigation.onCompleted.addListener(
  (details) => {
    const targetUrl = "https://app.masterschool.com/campus/live-zoom-session/";

    console.log(details.url);
    if (details.url.startsWith(targetUrl)) {
      const currentURL = details.url;
      const sessionId = currentURL.replace(targetUrl, "");

      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        function: performAction,
        args: [sessionId],
      });
    }
  },
  { url: [{ hostContains: "app.masterschool.com" }] }
);

function performAction(sessionId) {
  const zoomUrl = `zoommtg://zoom.us/join?confno=${sessionId}`;
  window.location.href = zoomUrl;
}
