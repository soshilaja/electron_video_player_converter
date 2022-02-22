const loadVideo = document.getElementById('loadVideo');
const jsplayer = document.querySelector(".js-player");

window.electronAPI.loadFile((event, value) => {
  loadVideo.src = 'filePath';
  jsplayer.load();
  event.reply('videoLoad', jsplayer.load())

})