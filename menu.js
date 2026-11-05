// 画面が読み込まれたら自動でメニューのHTMLを注入する
// --- ▼ BGM自動再生＆ループ処理の追加 ---
document.addEventListener('DOMContentLoaded', () => {
  let bgm = document.getElementById('commonBgm');
  if (!bgm) {
    bgm = document.createElement('audio');
    bgm.id = 'commonBgm';
    bgm.src = 'audio/bgm.mp3'; // ★あなたのBGMファイルパスに合わせて変更してください
    bgm.loop = true;
    bgm.volume = 0.5;
    document.body.appendChild(bgm);
  }

  // 画面のどこかを初めてクリックした瞬間に再生（ブラウザのブロック対策）
  const playBgm = () => {
    bgm.play().catch(e => console.log("再生待機中..."));
    document.removeEventListener('click', playBgm);
  };
  document.addEventListener('click', playBgm);
});

document.addEventListener('DOMContentLoaded', () => {
  const menuHTML = `
    <button class="menu-btn" onclick="toggleMenu()">&#9776;</button>
    <div class="menu-overlay" id="menuOverlay" onclick="toggleMenu()"></div>
    <nav class="side-menu" id="sideMenu">
      <h2>MENU</h2>
      
      <!-- メインのメニュー項目 -->
      <ul id="mainMenuContent">
        <li><a href="#" onclick="togglePhaseSubMenu(); return false;">フェーズ選択 ▾</a></li>
        <li style="margin-top: 15px; border-top: 1px solid #444; padding-top: 10px;"><a href="#" onclick="menuAction('explanation'); return false;">注意事項説明</a></li>
        <li><a href="#" onclick="menuAction('title'); return false;">タイトルへ戻る</a></li>
      </ul>

      <!-- 【隠しレイヤー】「フェーズ選択」を押したときに出てくるサブメニュー（★スクロール対応） -->
      <div id="phaseSubMenu" style="display: none; margin-top: 15px; border-top: 1px dashed #c93b3b; padding-top: 10px; max-height: calc(100vh - 180px); overflow-y: auto; padding-right: 5px;">
        <p style="font-size: 0.85rem; color: #e5eb72; margin: 0 0 10px 0; font-weight: bold;">▼ 移動するフェーズを選択</p>
        <ul style="margin: 0; padding-left: 15px;">
          <li style="margin-bottom: 8px;"><a href="index.html" onclick="return confirmJump('タイトル画面');" style="font-size: 0.95rem;">タイトル画面</a></li>
          <li style="margin-bottom: 8px;"><a href="explanation.html" onclick="return confirmJump('注意事項説明');" style="font-size: 0.95rem;">注意事項説明</a></li>
          <li style="margin-bottom: 8px;"><a href="prologue.html" onclick="return confirmJump('プロローグ');" style="font-size: 0.95rem;">1. プロローグ</a></li>
          <li style="margin-bottom: 8px;"><a href="opening.html" onclick="return confirmJump('オープニング');" style="font-size: 0.95rem;">2. オープニング</a></li>
          <li style="margin-bottom: 8px;"><a href="chara_intro.html" onclick="return confirmJump('キャラクター紹介');" style="font-size: 0.95rem;">3. キャラクター紹介</a></li>
          <li style="margin-bottom: 8px;"><a href="dice.html" onclick="return confirmJump('ダイスフェーズ');" style="font-size: 0.95rem;">4. ダイスフェーズ</a></li>
          <li style="margin-bottom: 8px;"><a href="chara_select.html" onclick="return confirmJump('キャラクター選択');" style="font-size: 0.95rem;">キャラクター選択</a></li>
          <li style="margin-bottom: 8px;"><a href="chara_pswd.html" onclick="return confirmJump('ログイン認証');" style="font-size: 0.95rem;">5. ログイン認証</a></li>
          <li style="margin-bottom: 8px;"><a href="character_sheet.html" onclick="return confirmJump('キャラクターシート');" style="font-size: 0.95rem;">6. キャラクターシート</a></li>
          <li style="margin-bottom: 8px;"><a href="main_story.html" onclick="return confirmJump('メインストーリー');" style="font-size: 0.95rem;">7. メインストーリー</a></li>
          <li style="margin-bottom: 8px;"><a href="character_HO.html" onclick="return confirmJump('キャラクターHO');" style="font-size: 0.95rem;">8. キャラクターHO</a></li>
          <li style="margin-bottom: 8px;"><a href="meeting_rule.html" onclick="return confirmJump('会議解説');" style="font-size: 0.95rem;">会議解説</a></li>
          <li style="margin-bottom: 8px;"><a href="first_meeting.html" onclick="return confirmJump('第一会議フェーズ');" style="font-size: 0.95rem;">9. 第一会議フェーズ</a></li>
          <li style="margin-bottom: 8px;"><a href="dice2.html" onclick="return confirmJump('ダイスフェーズ②');" style="font-size: 0.95rem;">10. ダイスフェーズ②</a></li>
          <li style="margin-bottom: 8px;"><a href="witness.html" onclick="return confirmJump('証人尋問');" style="font-size: 0.95rem;">11. 証人尋問</a></li>
          <li style="margin-bottom: 8px;"><a href="witness_HO.html" onclick="return confirmJump('証言確認');" style="font-size: 0.95rem;">12. 証言確認</a></li>
          <li style="margin-bottom: 8px;"><a href="second_meeting.html" onclick="return confirmJump('第二会議フェーズ');" style="font-size: 0.95rem;">13. 第二会議フェーズ</a></li>
          <li style="margin-bottom: 8px;"><a href="suiri_rule.html" onclick="return confirmJump('推理披露ルール解説');" style="font-size: 0.95rem;">推理披露ルール解説</a></li>
          <li style="margin-bottom: 8px;"><a href="suiri.html" onclick="return confirmJump('推理披露＆質疑応答');" style="font-size: 0.95rem;">14. 推理披露＆質疑応答</a></li>
          <li style="margin-bottom: 8px;"><a href="vote.html" onclick="return confirmJump('投票フェーズ');" style="font-size: 0.95rem;">15. 投票フェーズ</a></li>
          <li style="margin-bottom: 8px;"><a href="end_story.html" onclick="return confirmJump('エンドストーリー');" style="font-size: 0.95rem;">16. エンドストーリー</a></li>
          <li style="margin-bottom: 8px;"><a href="end.html" onclick="return confirmJump('終了画面');" style="font-size: 0.95rem;">終了画面</a></li>
          <li style="margin-bottom: 8px;"><a href="atogaki.html" onclick="return confirmJump('あとがき');" style="font-size: 0.95rem;">あとがき</a></li>
          <li style="margin-bottom: 8px;"><a href="tegami.html" onclick="return confirmJump('手紙');" style="font-size: 0.95rem;">手紙</a></li>
          <li style="margin-bottom: 8px;"><a href="kaisetsu.html" onclick="return confirmJump('解説・答え合わせ');" style="font-size: 0.95rem;">解説・答え合わせ</a></li>
        </ul>
        <button onclick="togglePhaseSubMenu()" style="width: 100%; margin-top: 15px; background: rgba(201, 59, 59, 0.3); border: 1px solid #c93b3b; color: #fff; padding: 5px; cursor: pointer; font-family: inherit; font-size: 0.85rem;">戻る</button>
      </div>

      <!-- メニュー内の項目の一例 -->
      <button class="menu-item-btn" onclick="toggleFullScreen()" style="margin-top: 20px;">
      ⛶ 全画面表示の切り替え
      </button>

      <button class="close-btn" onclick="toggleMenu()" style="margin-top: 15px;">閉じる</button>
    </nav>
  `;
  document.body.insertAdjacentHTML('beforeend', menuHTML);
});

// メニューの開閉処理
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  if (menu && overlay) {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // メニューを閉じるときに、サブメニューが開いていたらリセットする
    if (!menu.classList.contains('active')) {
      const subMenu = document.getElementById('phaseSubMenu');
      const mainContent = document.getElementById('mainMenuContent');
      if (subMenu && mainContent) {
        subMenu.style.display = 'none';
        mainContent.style.display = 'block';
      }
    }
  }
}

// 📂 「フェーズ選択」のレイヤー（サブメニュー）を切り替える処理
function togglePhaseSubMenu() {
  const subMenu = document.getElementById('phaseSubMenu');
  const mainContent = document.getElementById('mainMenuContent');
  
  if (subMenu && mainContent) {
    if (subMenu.style.display === 'none') {
      subMenu.style.display = 'block';
      mainContent.style.display = 'none'; // メインメニューを隠してフェーズ選択を出す
    } else {
      subMenu.style.display = 'none';
      mainContent.style.display = 'block'; // メインメニューに戻す
    }
  }
}

// 🔀 誤タップ防止の確認ダイアログを出してからジャンプする関数
function confirmJump(pageName) {
  return confirm(`「${pageName}」に移動しますか？\n（※間違えて押した場合はキャンセルできます）`);
}

// メニューの各項目が押されたときの共通分岐処理
function menuAction(action) {
  toggleMenu();

  if (action === 'explanation') {
    showSystemModal("注意事項説明", 
      "1. 本作のネタバレをSNS等で公開することは禁止です。\n" +
      "2. 誤ってページを閉じた場合や戻りたい場合は、メニューの【フェーズ選択】からいつでも該当の画面に戻ることができます。"
    );
  } 
  else if (action === 'title') {
    if (confirm("タイトル画面に戻りますか？")) {
      location.href = "index.html";
    }
  }
}

// 全画面表示を切り替える関数
function toggleFullScreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.log(`全画面化に失敗しました: ${err.message}`);
      });
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

// システムモーダル表示用関数
function showSystemModal(title, text) {
  const oldModal = document.getElementById('systemModalOverlay');
  if (oldModal) oldModal.remove();

  const overlay = document.createElement('div');
  overlay.id = 'systemModalOverlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.8); z-index: 99999;
    display: flex; justify-content: center; align-items: center;
    font-family: 'Sawarabi Mincho', serif;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background: #151518; border: 2px solid #c93b3b; padding: 30px 40px;
    border-radius: 8px; width: 80%; max-width: 500px; color: #fff;
    box-shadow: 0 0 30px rgba(201, 59, 59, 0.5); text-align: left;
  `;

  box.innerHTML = `
    <h3 style="margin-top: 0; color: #e5eb72; font-size: 1.3rem; border-bottom: 1px solid #c93b3b; padding-bottom: 10px; letter-spacing: 0.1em;">${title}</h3>
    <p style="margin: 20px 0; font-size: 1rem; line-height: 1.8; color: #e0e0e0; white-space: pre-wrap;">${text}</p>
    <div style="text-align: right; margin-top: 25px;">
      <button id="closeSystemModal" style="
        background: rgba(0,0,0,0.6); color: #fff; border: 1px solid rgba(255,255,255,0.6);
        padding: 8px 30px; font-size: 1rem; cursor: pointer; font-family: inherit; letter-spacing: 0.1em;
      ">閉じる</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  const closeFunc = () => overlay.remove();
  document.getElementById('closeSystemModal').onclick = closeFunc;
  overlay.onclick = (e) => {
    if (e.target === overlay) closeFunc();
  };
}