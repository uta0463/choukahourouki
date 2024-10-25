import { useEffect } from 'react';

export class BodyFix {
  private static html: HTMLElement | null = null;
  private static body: HTMLElement | null = null;
  private static offset = 0;
  private static flag = true;

  static ready() {
    if (typeof window === 'undefined') return; // サーバーサイドレンダリング対応
    BodyFix.html = document.documentElement;
    BodyFix.body = document.body;
  }

  static lock() {
    if (BodyFix.flag && BodyFix.body && BodyFix.html) {
      BodyFix.offset = window.scrollY || window.pageYOffset;

      BodyFix.html.style.height = window.innerHeight + 'px';
      BodyFix.body.style.position = 'fixed';
      BodyFix.body.style.top = `-${BodyFix.offset}px`;
      BodyFix.body.style.left = '0px';
      BodyFix.body.style.right = '0px';
      BodyFix.body.style.zIndex = '1';

      BodyFix.body.classList.add('is-locked');

      BodyFix.flag = false;
    }
  }

  static unlock() {
    if (!BodyFix.flag && BodyFix.body && BodyFix.html) {
      BodyFix.html.style.height = 'auto';
      BodyFix.body.style.position = 'static';

      setTimeout(() => {
        BodyFix.body?.classList.remove('is-locked');
      }, 25);

      window.scrollTo(0, BodyFix.offset);

      BodyFix.flag = true;
    }
  }
}

const BodyFixComponent = () => {
  useEffect(() => {
    BodyFix.ready();
  }, []);

  return null;
};

export default BodyFixComponent;
