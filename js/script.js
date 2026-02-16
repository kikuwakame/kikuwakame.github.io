/*　ローディングから画面遷移 */
// HTML要素を取得
const loadingAreaGrey = document.querySelector("#loading");
const loadingAreaGreen = document.querySelector("#loading-screen");
const loadingText = document.querySelector("#loading p");

// 画面が読み込まれたら発火
window.addEventListener("load", () => {
  // ローディング中（グレースクリーン）
  loadingAreaGrey.animate(
    {
      opacity: [1, 0], //不透明度　100%　→　0%
      visibility: "hidden", //可視性　非表示
    },
    {
      duration: 2000, //時間　2秒
      delay: 1200, //遅延　1.2秒
      easing: "ease", //進行速度
      fill: "forwards", //終了後の状態　最終フレーム維持
    }
  );

  // ローディング中（薄緑スクリーン）
  loadingAreaGreen.animate(
    {
      translate: ["0 100vh", "0 0", "0 -100vh"], //移動　y 100%　→　0%　→　‐100%
    },
    {
      duration: 2000, //時間　2秒
      delay: 800, //遅延　0.8秒
      easing: "ease", //進行速度
      fill: "forwards", //終了後の状態　最終フレーム維持
    }
  );

  // ローディング中テキスト
  loadingText.animate(
    [
      {
        opacity: 1, //不透明度　100%
        offset: 0.8, //アニメーション総時間の80%
      },
      {
        opacity: 0, //不透明度　0%
        offset: 1, //アニメーション総時間の100%
      },
    ],
    {
      duration: 1200, //時間　1.2秒
      easing: "ease", //進行速度
      fill: "forwards", //終了後の状態　最終フレーム維持
    }
  );
});

/*　画像ギャラリー */
// HTML要素の取得
const mainImage = document.querySelector(".gallery-image img");
const thumbImages = document.querySelectorAll(".gallery-thumbnails img");

// for(let i = 0; i < thumbImages.length; i++) {
//   thumbImages[i].addEventListener('mouseover', (event) => {
//       mainImage.src = event.target.src;
//       mainImage.animate({opacity: [0, 1]}, 500);
//   });
// }

thumbImages.forEach((thumbImage) => {
  thumbImage.addEventListener("mouseover", (event) => {
    mainImage.src = event.target.src;
    mainImage.animate(
      { opacity: [0, 1] }, //不透明度　0%　→　100％
      500 //時間　0.5秒
    );
  });
});

/*　スライドメニュー　*/
const menuOpen = document.querySelector("#menu-open");
const menuClose = document.querySelector("#menu-close");
const menuPanel = document.querySelector("#menu-panel");
const menuItems = document.querySelectorAll("#menu-panel li");
// メニュー全体で使いまわすtimingOptions
const menuOptions = {
  duration: 1400, //時間 1.4秒
  easing: "ease", //進行速度
  fill: "forwards", //終了後の状態　最終フレーム
};

// メニューを開く
menuOpen.addEventListener("click", () => {
  menuPanel.animate(
    { translate: ["100vw", 0] }, //移動　x100%⇒0%
    menuOptions
  );
  // リンクをひとつずつ順に表示
  menuItems.forEach((menuItem, index) => {
    menuItem.animate(
      {
        opacity: [0, 1], //不透明度　0％　→　100%
        translate: ["2rem", 0], //移動　xフォントサイズの２倍距離⇒0%
      },
      {
        duration: 2400, //時間　2.4秒
        delay: 300 * index, //遅延　0.3秒 indexをかけて上から順に表示
        easing: "ease", //進行速度
        fill: "forwards", //終了後の状態　最終フレーム
      }
    );
  });
});

// メニューを閉じる
menuClose.addEventListener("click", () => {
  menuPanel.animate(
    { translate: [0, "100vw"] }, //移動　x 0から100％
    menuOptions
  );
  menuItems.forEach((menuItem) => {
    menuItem.animate(
      { opacity: [1, 0] }, //不透明度　100%　⇒　0%
      menuOptions
    );
  });
});

/*　スクロールで要素を表示 */
// 監視対象が範囲内に現れたら実行する動作
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ["blur(.4rem)", "blur(0)"],
          translate: ["0 4rem", 0],
        },
        {
          duration: 2000,
          easing: "ease",
          fill: "forwards",
        }
      );
      // 一度ふわっと表示されたら監視をやめる
      obs.unobserve(entry.target);
    }
  });
};

// 監視設定
const fadeObserver = new IntersectionObserver(animateFade);

// .fadeinを監視するよう指示
const fadeElements = document.querySelectorAll(".fadein");
  fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});
