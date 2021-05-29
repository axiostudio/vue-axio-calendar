import EventCalendar from "./components/EventCalendar.vue";

const VueEventCalendar = {
    install(Vue) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("vue-event-calendar", EventCalendar);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueEventCalendar);
}

export default VueEventCalendar;