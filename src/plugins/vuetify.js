import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      dark: {
        primary: colors.teal.lighten2,
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: colors.green.darken2,
        warning: colors.yellow.darken1,
      },
      light: {
        primary: colors.teal.lighten2,
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: colors.green.darken2,
        warning: colors.yellow.darken1,
      },
    },
  },
});
