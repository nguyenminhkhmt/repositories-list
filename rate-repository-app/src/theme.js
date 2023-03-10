import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    navBackground: '#24292e',
    navTextColor: '#ffffff',
    mainComponent: '#e1e4e8',
    repoItemBackground: '#ffffff',
    error: "#ff0000",
    white: "#ffffff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  buttons: {
    maxWidth: Platform.select({
      ios: 'auto',
      android: 'auto',
      default: 100,
    })
  }
};

export default theme;