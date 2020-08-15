import cookieCreator from './createCookie';

const DarkTheme = {
  '--off': '#f3f3f3',
  '--muted': '#e0e0e0',
  '--very-muted': '#787878',
  '--brand-color': '#fddb27ff',
  '--primary': '#010203',
  '--secondary': '#f2f2f2',
  '--shadow': 'rgba(255, 255, 255, 0.2)',
  '--brand-color-slider-alpha': 'rgba(253,219,39)',
  // '--track-shadow': '-7px 7px 14px #0b0b0c,7px -7px 14px #202024'
  '--track-shadow': '5px 5px 15px #0b0b0c,-5px -5px 15px #202024'
  // '--track-shadow': '10px 10px 20px #1f1f23, -10px -10px 20px #292b2f'
  // '--track-shadow': '20px 20px 60px #1f1f23,-20px -20px 60px #292b2f'
  // '--track-shadow': '11px 11px 26px #242529, -11px -11px 26px #151518'
  // '--track-shadow': '0'
};

const LightTheme = {
  '--off': '#22292F',
  '--muted': '#515152',
  '--very-muted': '#777',
  '--brand-color': '#b19402',
  // '--primary': '#f2f2f2',
  '--primary': '#F1F5F8',
  '--secondary': '#3a3a3c',
  '--shadow': 'rgba(0, 0, 0, 0.2)',
  '--track-shadow': '11px 11px 26px #c7c7c7, -11px -11px 26px #ffffff'
};

const metaThemeColor = document.querySelector("meta[name=theme-color]");

function applyTheme(theme) {
  const themeStyleObject = theme === 'lightTheme' ? LightTheme : DarkTheme;
  Object.keys(themeStyleObject).map(key => (
    document.documentElement.style.setProperty(key, themeStyleObject[key])
  ));
  metaThemeColor.setAttribute("content", themeStyleObject['--primary']);
  cookieCreator('theme', theme);
}

export default applyTheme;

// 10px 10px 10px rgb(0, 0, 0),