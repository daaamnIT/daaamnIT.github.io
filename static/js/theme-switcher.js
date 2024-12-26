class ThemeSwitcher {
    constructor() {
      this.STORAGE_KEY = 'preferred-theme';
      this.DARK_THEME_CLASS = 'dark-theme';
      this.initializeThemeToggle();
      this.setupEventListeners();
    }
  
    initializeThemeToggle() {
      // Create theme toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'theme-toggle position-fixed text-white';
      toggleBtn.style.top = '20px';
      toggleBtn.style.right = '20px';
      toggleBtn.style.zIndex = '1000';
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      document.body.appendChild(toggleBtn);
    }
  
    setupEventListeners() {
      // Theme toggle click handler
      document.querySelector('.theme-toggle').addEventListener('click', () => this.toggleTheme());
  
      // Listen for system theme changes
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (this.shouldFollowSystemTheme()) {
            this.setTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
  
      // Initial theme setup
      this.initializeTheme();
    }
  
    initializeTheme() {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else if (this.shouldFollowSystemTheme()) {
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(systemPrefersDark ? 'dark' : 'light');
      } else {
        this.setThemeByTime();
      }
    }
  
    shouldFollowSystemTheme() {
      return !localStorage.getItem(this.STORAGE_KEY);
    }
  
    setThemeByTime() {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour < 20;
      this.setTheme(isDayTime ? 'light' : 'dark');
    }
  
    toggleTheme() {
      const isDark = document.body.classList.contains(this.DARK_THEME_CLASS);
      this.setTheme(isDark ? 'light' : 'dark');
    }
  
    setTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add(this.DARK_THEME_CLASS);
      } else {
        document.body.classList.remove(this.DARK_THEME_CLASS);
      }
      localStorage.setItem(this.STORAGE_KEY, theme);
      this.updateToggleButton(theme);
    }
  
    updateToggleButton(theme) {
      const toggleBtn = document.querySelector('.theme-toggle');
      const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      
      toggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
  }
  
  // Initialize theme switcher
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
  });