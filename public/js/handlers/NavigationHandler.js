import { pages } from '../pages/index.js';

export class NavigationHandler {
  static buttons = [];
  static currentIndex = -1;
  static currentPage = null;

  static init() {
    this.buttons = [...document.querySelectorAll('.site-navigation button')];
    if (!this.buttons.length) return;
    this.currentPage = document.querySelector('.chat-messages');

    this.buttons.forEach((btn, i) =>
      btn.addEventListener('click', () => this.setActive(i))
    );

    window.addEventListener('hashchange', () => this.handleHashChange());

    const routePage = this.parseHash(window.location.hash);
    if (routePage) {
      const initialIndex = this.findPageIndex(routePage);
      if (initialIndex !== undefined) {
        this.setActive(initialIndex, { skipHashUpdate: true });
      }
    }
  }

  static handleHashChange() {
    const routePage = this.parseHash(window.location.hash);
    const index = this.findPageIndex(routePage);
    if (index === undefined || index === this.currentIndex) return;
    this.setActive(index, { skipHashUpdate: true });
  }

  static setActive(index, { skipHashUpdate } = {}) {
    if (index === this.currentIndex || index < 0 || index >= this.buttons.length) return;

    this.buttons[this.currentIndex]?.classList.remove('active');
    this.buttons[index]?.classList.add('active');

    this.currentIndex = index;
    this.loadPage(index);

    if (!skipHashUpdate) {
      const pageKey = this.getPageKey(index);
      if (pageKey) {
        window.history.replaceState(null, '', `#${pageKey}`);
      }
    }
  }

    static loadPage(index) {
      const pageButton = this.buttons[index];
      if (!pageButton || !this.currentPage) return;

      const pageKey = this.getPageKey(index);
      const pageContent = pages[pageKey];
      if (!pageContent) return;

    this.clearContainer();
    const element = document.createElement('div');
    element.classList.add('message', 'page-view');
    element.innerHTML = pageContent;
    this.currentPage.insertAdjacentElement('afterbegin', element);
  }

  static findPageIndex(pageKey) {
    if (!pageKey) return undefined;
    return this.buttons.findIndex((btn) => btn.textContent.trim().toLowerCase() === pageKey);
  }

  static getPageKey(index) {
    return this.buttons[index]?.textContent.trim().toLowerCase();
  }

  static parseHash(hash) {
    if (!hash) return null;
    return hash.replace(/^#/, '').split('?')[0].toLowerCase() || null;
  }

  static clearContainer() {
    if (!this.currentPage) return;
    const messages = this.currentPage.querySelectorAll('.message:not(.message-loading)');
    messages.forEach((message) => message.remove());
  }

  static clearRoute() {
    const pageContainer = this.currentPage ?? document.querySelector('.chat-messages');
    if (!pageContainer) return;

    pageContainer.querySelectorAll('.page-view').forEach((node) => node.remove());
    this.buttons?.forEach((btn) => btn.classList.remove('active'));
    this.currentIndex = -1;

    const baseUrl = window.location.pathname + window.location.search;
    if (window.location.hash) {
      window.history.replaceState(null, '', baseUrl);
    }
  }
}
  
