const extractSessionId = (url) => {
  const pathParts = url.pathname.split("/");
  const lastPartIndex = pathParts.length - 1;

  return pathParts[lastPartIndex];
};

const openZoom = (sessionId) => {
  const zoomUrl = `zoommtg://zoom.us/join?confno=${sessionId}`;
  window.location.href = zoomUrl;
};

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    const targetUrl = "https://app.masterschool.com/campus/live-zoom-session/";

    if (details.url.startsWith(targetUrl)) {
      const currentUrl = new URL(details.url);
      const sessionId = extractSessionId(currentUrl);

      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        function: openZoom,
        args: [sessionId],
      });
    }
  },
  { url: [{ hostContains: "app.masterschool.com" }] }
);
