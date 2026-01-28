import { pages } from '../pages/index.js';

export class NavigationHandler {
    static pages = ['resume', 'projects', 'stack', 'about', 'system', 'software', 'ai', 'communication'];
    static currentIndex = -1;
    static currentPage = null;
  
    static init() {
      this.pages = [...document.querySelectorAll('.site-navigation button')];
      if (!this.pages.length) return;
      this.currentPage = document.querySelector('.chat-messages');
  
      this.pages.forEach((btn, i) =>
        btn.addEventListener('click', () => this.setActive(i))
      );
  
    }
  
    static setActive(index) {
      if (index === this.currentIndex) return;
  
      this.pages[this.currentIndex]?.classList.remove('active');
      this.pages[index]?.classList.add('active');

      this.currentIndex = index;
      this.loadPage(this.currentIndex);
    }

    static loadPage(index) {
      const page = this.pages[index];
      this.clearContainer();
      const element = document.createElement('div');
      element.classList.add('message');
      element.innerHTML = pages[page.textContent];
      this.currentPage.insertAdjacentElement('afterbegin', element);
    }
    
    static clearContainer() {
        const messages = this.currentPage.querySelectorAll('.message:not(.message-loading)');
        messages.forEach(message => message.remove());
    }
  }
  