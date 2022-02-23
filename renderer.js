const videoElement = document.getElementById('player')
const videoSource = document.createElement('source');


window.electronAPI.onFileDataRetrieved(path => {
  console.log(path);
  videoSource.setAttribute('src', path);
  videoElement.appendChild(videoSource);
  videoElement.load();
})



