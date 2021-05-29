import VueAxioCalendar from "./components/VueAxioCalendar.vue";

const VueAxioCalendar = {
    install(Vue) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("vue-axio-calendar", VueAxioCalendar);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueAxioCalendar);
}

export default VueAxioCalendar;