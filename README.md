# Vue Axio Calendar

The Vue Axio Calendar is a simple and powerful table calendar component for Vue.

You can:

- navigate trought months (next and prev)
- pick a date
- set a range of pickable dates (from min to max)
- add a count of items per date

## Installation

```shell
# npm
$ npm install vue-axio-calendar

# yarn
$ yarn add vue-axio-calendar
```

## Implementation

You can add the component into your component in Vue:

```html
<template>
    <VueAxioCalendar 
        :min="minDate" 
        :max="maxDate" 
        :current="currentDate" 
        :datainfo="datainfo"
        v-on:calendar:change="updateMonth"
        v-on:calendar:day="updateDay"
    >
</template>

<script>
import Vue from 'vue'
import VueAxioCalendar from 'vue-axio-calendar'

export default {
    name: 'MyComponent',

    components: {
        VueAxioCalendar
    },

    data(){
        return {
            minDate: '2021-01-01',
            maxDate: '2021-12-31',
            currentDate: '2021-05-31',
            datainfo: {
                '2021-05-01': 3,
                '2021-05-06': 5,
                '2021-05-07': 1,
                '2021-05-15': 3
            }

        }
    },

    methods: {
        updateMonth(payload){
            console.log('updateMonth', payload);
        },

        updateDay(payload){
            console.log('updateDay', payload);
        }
    }
}
</script>
```

## Issues report

If you report a bug, please write us a line on https://github.com/axiostudio/vue-axio-calendar/issues
