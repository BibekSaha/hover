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
  // '--track-shadow': '11px 11px 26px #0b0b0c,-11px -11px 26px #202024'
  '--track-shadow': '5px 5px 15px #0b0b0c,-5px -5px 15px #202024', // this is the main,
  '--slider-mute': '#27272a',
  '--gradient': 'linear-gradient(133deg, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2))'
};

const LightTheme = {
  '--off': '#22292F',
  '--muted': '#515152',
  '--very-muted': '#777',
  '--brand-color': '#b19402',
  '--primary': '#F1F5F8',
  '--secondary': '#3a3a3c',
  '--shadow': 'rgba(0, 0, 0, 0.2)',
  '--track-shadow': '11px 11px 26px #c7c7c7, -11px -11px 26px #ffffff',
  '--slider-mute': '#c9c9c5',
  '--gradient': 'linear-gradient(133deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))'
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
