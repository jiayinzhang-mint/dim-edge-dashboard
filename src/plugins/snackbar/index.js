import SnackBar from './Main.vue';

/* eslint-disable */

function Install(Vue, options) {
  const property = (options && options.property) || '$snack';
  function createDialogCmp(options) {
    return new Promise(resolve => {
      const cmp = new Vue(
        Object.assign({}, SnackBar, {
          propsData: Object.assign({}, Vue.prototype.$snack.options, options),
          destroyed: c => {
            document.body
              .getElementsByClassName('v-application--wrap')[0]
              .removeChild(cmp.$el);
            resolve(cmp.value);
          },
        })
      );
      document.body
        .getElementsByClassName('v-application--wrap')[0]
        .appendChild(cmp.$mount().$el);
    });
  }

  function show(message, options = {}) {
    options.message = message;
    return createDialogCmp(options);
  }

  Vue.prototype[property] = show;
  Vue.prototype[property].options = options || {};
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Install);
}

export default Install;
