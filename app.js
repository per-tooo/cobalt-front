const download = document.querySelector("#downloadButton");
const urlInput = document.querySelector("#urlInput");
const options = {
  videoQuality: document.querySelector("#videoQuality"),
  downloadMode: document.querySelector("#downloadMode"),
  audioFormat: document.querySelector("#audioFormat"),
  audioBitrate: document.querySelector("#audioBitrate"),
  filenameStyle: document.querySelector("#filenameStyle"),
  disableMetadata: document.querySelector("#disableMetadataToggle"),
};

async function request(options) {
  let config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  };
  let response = await fetch("http://toooserv:9000/?=", config).then(
    (response) => response.json()
  );

  return { filename: response.filename, url: response.url };
}

function _download(filename, url) {
  let link = document.createElement("a");

  link.setAttribute("download", filename);
  link.setAttribute("href", url);

  link.click();
}

download.addEventListener("click", async () => {
  const url = urlInput.value;
  if (!url) {
    alert("Gib zuerst eine URL ein");
    urlInput.focus();
    return;
  }

  const downloadOptions = {
    url: url,
    videoQuality: options.videoQuality.value,
    downloadMode: options.downloadMode.value,
    audioFormat: options.audioFormat.value,
    audioBitrate: options.audioBitrate.value,
    filenameStyle: options.filenameStyle.value,
    disableMetadata: options.disableMetadata.checked,
  };

  const response = await request(downloadOptions);
  _download(response.filename, response.url);
});
