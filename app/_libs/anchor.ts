import { BodyFix } from '@/app/_libs//bodyfix';

export default class Anchor {
  private static breakpoint = 768; // 768pxのブレークポイントを設定
  private static pcHeaderHeight = 80; // PCのヘッダーの高さ
  private static spHeaderHeight = 60; // SPのヘッダーの高さ

  /* link要素を初期化 */
  static init() {
    const elements = document.querySelectorAll("a[href^='#']");
    elements.forEach((elem) => {
      elem.addEventListener('click', (event) => this.handleClick(event)); // アロー関数でthisをバインド
    });

    // ページが読み込まれたときにハッシュを処理
    const hash = location.hash;
    if (hash) {
      this.scrollTo(hash);
    }
  }

  /* クリックイベントの処理 */
  private static handleClick(event: Event) {
    // イベントをMouseEventとしてアサート
    const mouseEvent = event as MouseEvent
    const target = (mouseEvent.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (target) {
      mouseEvent.preventDefault(); // preventDefaultを呼び出す
      Anchor.scrollTo(target);
    }
  }

  /* スクロールの実行 */
  private static scrollTo(target: string) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
      const headerHeight = window.innerWidth <= this.breakpoint ? this.spHeaderHeight : this.pcHeaderHeight; // 画面幅に応じてヘッダーの高さを設定
      const position = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      // bodyにis-openクラスが付与されているかをチェック
      if (document.body.classList.contains('is-open')) {
        BodyFix.unlock() // unlockメソッドを呼び出す
        document.body.classList.remove('is-open') // メニューを閉じる
      }

      window.scrollTo({
        top: position,
        behavior: 'smooth',
      });
    }
  }
}
