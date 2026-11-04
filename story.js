// オープニングや会話イベントで使う共通テキスト・背景・立ち絵（複数対応）制御JS

let currentLine = 0;

// 画面のテキスト・背景画像・立ち絵・エフェクトを更新する共通関数
function updateStoryDisplay() {
  if (typeof storyLines === 'undefined' || storyLines.length === 0) return;

  const currentData = storyLines[currentLine];
  const gameScreen = document.getElementById('gameScreen');
  const storyText = document.getElementById('storyText');

  // 4つのキャラ画像要素を取得
  const charaImgs = [
    document.getElementById('charaImage1'),
    document.getElementById('charaImage2'),
    document.getElementById('charaImage3'),
    document.getElementById('charaImage4')
  ];

  if (typeof currentData === 'object' && currentData !== null) {
    // 1. テキスト更新
    storyText.innerText = currentData.text || "";

    // 2. 背景画像の更新
    if (currentData.bg) {
      gameScreen.style.backgroundImage = `url('background/${currentData.bg}')`;
    }

    // 3. 白黒（モノクロ）アニメーションの切り替え
    if (currentData.grayscale) {
      gameScreen.classList.remove('grayscale-anim');
      void gameScreen.offsetWidth; // リフロー（再描画）のトリガー
      gameScreen.classList.add('grayscale-anim');
    } else {
      gameScreen.classList.remove('grayscale-anim');
    }

    // 4. キャラ立ち絵の更新（複数対応 ＋ 特殊落下演出）
    let charaList = [];
    if (typeof currentData.chara === 'string') {
      charaList = [currentData.chara];
    } else if (Array.isArray(currentData.chara)) {
      charaList = currentData.chara;
    }

    // データ内に dropIn: true があるかチェック
    const isDropIn = !!currentData.dropIn;

    // 4つの画像スロットにそれぞれ割り当て
    charaImgs.forEach((img, index) => {
      if (img) {
        if (charaList[index]) {
          img.src = `chara/${charaList[index]}`;
          img.style.display = 'block';

          // アニメーションを再発火させるために一度クラスを削除
          img.classList.remove('drop-anim');
          void img.offsetWidth; // リフロー（再描画）

          if (isDropIn) {
            img.style.animationDelay = `${1.0 + index * 0.6}s`;
            img.classList.add('drop-anim');
          } else {
            // 通常時は遅延なし
            img.style.animationDelay = '0s';
          }
        } else {
          img.style.display = 'none'; // 画像指定が無いスロットは非表示
          img.classList.remove('drop-anim');
          img.style.animationDelay = '0s';
        }
      }
    });

  } else {
    // 文字列データのみの場合
    storyText.innerText = currentData;
    gameScreen.classList.remove('grayscale-anim');
    charaImgs.forEach(img => {
      if (img) {
        img.style.display = 'none';
        img.classList.remove('drop-anim');
      }
    });
  }

  // ボタン状態の更新
  const prevBtn = document.getElementById('prevStoryBtn');
  if (prevBtn) prevBtn.disabled = (currentLine === 0);

  const nextBtn = document.getElementById('nextStoryBtn');
  if (nextBtn) {
    if (currentLine === storyLines.length - 1) {
      nextBtn.innerText = "次へ進む";
    } else {
      nextBtn.innerText = "次へ";
    }
  }
}

// 次のセリフへ進む
function nextText() {
  if (typeof storyLines === 'undefined') return;

  if (currentLine < storyLines.length - 1) {
    currentLine++;
    updateStoryDisplay();
  } else {
    if (typeof nextPageUrl !== 'undefined' && nextPageUrl) {
      location.href = nextPageUrl;
    } else {
      alert("終了しました。");
    }
  }
}

// 前のセリフへ戻る
function prevText() {
  if (typeof storyLines === 'undefined') return;

  if (currentLine > 0) {
    currentLine--;
    updateStoryDisplay();
  }
}

// キーボード操作（Enter / Space / → で進む、← / Backspace で戻る）
document.addEventListener('keydown', (e) => {
  const sideMenu = document.getElementById('sideMenu');
  if (sideMenu && sideMenu.classList.contains('active')) return;

  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
    e.preventDefault();
    nextText();
  } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
    e.preventDefault();
    prevText();
  }
});

// 画面クリック（進行）
document.addEventListener('DOMContentLoaded', () => {
  const screen = document.getElementById('gameScreen');
  if (screen) {
    screen.addEventListener('click', (e) => {
      // メニューやボタン（前へ・次へなど）をクリックした場合は画面クリック処理を行わない
      if (e.target.closest('.menu-btn') || e.target.closest('.side-menu') || e.target.closest('.action-btn')) {
        return;
      }
      nextText();
    });
  }
  updateStoryDisplay();
});