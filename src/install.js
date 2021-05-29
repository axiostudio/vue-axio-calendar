import AxioCalendar from "./components/AxioCalendar.vue";

const VueAxioCalendar = {
    install(Vue) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("vue-axio-calendar", AxioCalendar);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueAxioCalendar);
}

export default VueAxioCalendar;