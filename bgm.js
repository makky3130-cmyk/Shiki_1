// bgm.js
document.addEventListener('DOMContentLoaded', () => {
  // すでにBGM用のaudio要素がなければ作る
  let bgm = document.getElementById('commonBgm');
  if (!bgm) {
    bgm = document.createElement('audio');
    bgm.id = 'commonBgm';
    bgm.src = 'audio/bgm_main.mp3'; // ★ここにあなたのBGMファイルのパスを入れる
    bgm.loop = true;
    bgm.volume = 0.5; // 音量（0.0 〜 1.0）
    document.body.appendChild(bgm);
  }

  // ユーザーがどこかをクリックした瞬間に再生を許可（ブラウザの自動再生ブロック対策）
  const playBgm = () => {
    bgm.play().catch(e => console.log("再生待機中..."));
    document.removeEventListener('click', playBgm);
  };
  document.addEventListener('click', playBgm);
});