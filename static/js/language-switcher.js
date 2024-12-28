import translations from './translations.js';

class LanguageSwitcher {
  constructor() {
    this.STORAGE_KEY = 'preferred-language';
    this.DEFAULT_LANG = 'ru';
    this.translations = translations;
    this.initializeLanguageToggle();
    this.setupEventListeners();
    this.initializeLanguage();
  }

  initializeLanguageToggle() {
    // Create language toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'lang-toggle position-fixed';
    toggleBtn.style.cssText = `
      top: 20px;
      right: 80px;
      z-index: 1000;
      background: transparent;
      color: white;
      border: 1px solid #e0e0e0;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.3s ease;
      font-weight: bold;
      font-size: 14px;
    `;
    toggleBtn.innerHTML = this.getCurrentLanguage() === 'ru' ? 'EN' : 'RU';
    document.body.appendChild(toggleBtn);
  }

  setupEventListeners() {
    document.querySelector('.lang-toggle').addEventListener('click', () => this.toggleLanguage());
  }

  initializeLanguage() {
    const savedLang = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;
    this.setLanguage(savedLang);
  }

  getCurrentLanguage() {
    return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;
  }

  toggleLanguage() {
    const currentLang = this.getCurrentLanguage();
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    this.setLanguage(newLang);
    
    const toggleBtn = document.querySelector('.lang-toggle');
    toggleBtn.innerHTML = newLang === 'ru' ? 'EN' : 'RU';
  }

  setLanguage(lang) {
    localStorage.setItem(this.STORAGE_KEY, lang);
    
    this.updateContent(lang);
    this.updateToggleButton(lang);
    
    document.documentElement.lang = lang;
  }

  updateToggleButton(lang) {
    const toggleBtn = document.querySelector('.lang-toggle');
    toggleBtn.innerHTML = lang === 'ru' ? 'EN' : 'RU';
  }

  updateContent(lang) {
    const content = this.translations[lang];
    
    const logoTitle = document.querySelector('.logo-title');
    const logoSubtitle = document.querySelector('.logo-subtitle');
    if (logoTitle) logoTitle.textContent = content.logo.name;
    if (logoSubtitle) logoSubtitle.textContent = content.logo.subtitle;
    
    document.querySelector('[href="#story"]').textContent = content.nav.about;
    document.querySelector('[href="#projects"]').textContent = content.nav.experience;
    
    document.querySelectorAll('[href="#contact"]').forEach(el => {
      if (el.classList.contains('btn')) {
        el.textContent = content.nav.writeMe;
      } else {
        el.textContent = content.nav.collaboration;
      }
    });

    const greetingButton = document.querySelector('.promo .btn');
    if (greetingButton) {
      greetingButton.textContent = content.nav.writeMe;
    }

    document.querySelector('.greeting-text').textContent = content.greeting.hello;
    document.querySelector('.promo-text').innerHTML = content.greeting.description.replace('\n', '<br>');

    document.querySelector('#story h2').textContent = content.about.title;
    document.querySelector('#story p').textContent = content.about.content;

    document.querySelector('#projects h2').textContent = content.experience.title;
    document.querySelector('.work-experience h3').textContent = content.experience.hse.name;
    
    const positions = document.querySelectorAll('.position');
    const positionData = [
      content.experience.hse.positions.student,
      content.experience.hse.positions.pupil1,
      content.experience.hse.positions.pupil2
    ];
    
    positions.forEach((position, index) => {
      const data = positionData[index];
      if (data && position) {
        const titleEl = position.querySelector('h4');
        const periodEl = position.querySelector('p.text-white');
        const descEl = position.querySelector('p:last-child');
        
        if (titleEl) titleEl.textContent = data.title;
        if (periodEl) periodEl.textContent = data.period;
        if (descEl) descEl.textContent = data.description;
      }
    });

    const goalsSection = document.querySelector('.goals');
    if (goalsSection) {
      const titleEl = goalsSection.querySelector('h2');
      const contentEl = goalsSection.querySelector('p');
      
      if (titleEl) titleEl.textContent = content.goals.title;
      if (contentEl) {
        contentEl.innerHTML = content.goals.content + '<br><br>' + content.goals.poem.replace(/\n/g, '<br>');
      }
    }

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const titleEl = contactSection.querySelector('h2');
      const introEl = contactSection.querySelector('p.pb-1');
      const telegramButton = contactSection.querySelector('a[href*="telegram"]');
      const emailButton = contactSection.querySelector('a[href*="mailto"]');
      
      if (titleEl) titleEl.textContent = content.contact.title;
      if (introEl) introEl.textContent = content.contact.intro;
      if (telegramButton) telegramButton.textContent = content.contact.telegram;
      if (emailButton) emailButton.textContent = content.contact.email;
    }

    const footerText = document.querySelector('.footer .nav-item');
    if (footerText) {
      footerText.textContent = content.footer.copyright;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();
});