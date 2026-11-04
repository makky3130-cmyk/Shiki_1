// 会議フェーズの状態管理データ例
const discussionData = {
  phase: "第一会議フェーズ",
  timerSeconds: 1200, // 20分
  
  // 各キャラクターの状態と公開データ
  characters: {
    hinagiku: {
      name: "ヒナギク",
      icon: "chara/hinagiku_icon.png",
      unreadCount: 0,
      publicInfo: [
        { type: "確定情報", title: "確定情報 1", content: "ツバキは21時以降部屋に戻ってきていない。" },
        { type: "確定情報", title: "確定情報 2", content: null }, // 未公開
      ]
    },
    himawari: {
      name: "ヒマワリ",
      icon: "chara/himawari_icon.png",
      unreadCount: 1,
      publicInfo: [ ... ]
    },
    // ... 他のキャラ
  }
};