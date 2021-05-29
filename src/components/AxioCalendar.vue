<template>
    <div class="calendar">

        <div class="calendar-header">
            <div class="calendar-header-month">
                <span class="calendar-header-month-name">{{ monthName }}</span>
                <span class="calendar-header-month-year">{{ year }}</span>
            </div>
            <div class="calendar-header-nav">
                <button type="button" class="calendar-header-nav-prev" @click="prevMonth()">&lt;</button>
                <button type="button" class="calendar-header-nav-next" @click="nextMonth()">&gt;</button>
            </div>
        </div>

        <div class="calendar-body">
            <table>
                <thead>
                    <tr>
                        <th v-for="name, k in daysName" :key="k">
                            <div>{{ name }}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="week, w in monthDays" :key="w">
                        <td v-for="day, d in week" :key="d">

                            <button
                                v-if="day"
                                :class="{
                                    'current': day.dateFormat == current,
                                    'active': datainfo[ day.dateFormat ]
                                }"
                                @click="selectDay(day)"
                                :disabled="disableDay(day)"
                            >
                                <span>
                                    {{ day.number }}
                                </span>
                                <small v-if="datainfo[ day.dateFormat ]">
                                    {{ datainfo[ day.dateFormat ] }}
                                </small>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'VueAxioCalendar',

    props: {
        current: String,
        min: String,
        max: String,
        datainfo: {
            type: Object,
            default: () => { return {} }
        }
    },

    data(){
        return {
            currentdate: false
        }
    },

    computed: {
        mindate(){
            if(this.min){
                var min = new Date(this.min);
                min.setHours(0, 0, 0);
                return min;
            }else{
                return false;
            }
        },

        maxdate(){
            if(this.max){
                var max = new Date(this.max);
                max.setHours(0, 0, 0);
                return max;
            }else{
                return false;
            }
        },

        monthName(){
            return (this.currentdate) ? this.currentdate.toLocaleString('default', { month: 'long' }) : false;
        },

        daysName(){
            var days = [];
            var start = new Date();

            for (let index = 0; index < 7; index++) {
                // var pos = start.getDay() == 0 ? 6 : start.getDay() - 1;
                var pos = start.getDay();
                days[ pos ] = start.toLocaleString('default', { weekday: 'short' });
                start.setDate(start.getDate() + 1);
            }

            return days;
        },

        month(){
            return (this.currentdate) ? this.currentdate.getMonth() : false;
        },

        year(){
            return (this.currentdate) ? this.currentdate.getFullYear() : false;
        },

        startOfMonth(){
            return new Date(this.year, this.month, 1);
        },

        endOfMonth(){
            return new Date(this.year, this.month + 1, 0);
        },

        monthDays(){
            var days = [];
            var week = [];

            var dayStartOfWeek = this.startOfMonth.getDay();
            if(dayStartOfWeek > 0){
                for (let index = 0; index < dayStartOfWeek; index++) {
                    week.push(false);
                }
            }

            var current = new Date(this.startOfMonth);
            while (current <= this.endOfMonth) {
                // create a new date
                var newDay = new Date(current);

                // add a day to week
                week.push({
                    date: newDay,
                    dateFormat: this.dateFormat(newDay),
                    number: newDay.getDate()
                });

                if( newDay.getDay() == 6){
                    days.push(week);
                    week = [];
                }

                current.setDate(current.getDate() + 1);
            }

            for (let index = week.length; index < 7; index++) {
                week.push(false);
            }

            days.push(week);

            return days;
        }
    },

    methods: {
        nextMonth(){
            console.log('nextMonth');
            this.currentdate = new Date(this.currentdate.setMonth(this.currentdate.getMonth() + 1));

            this.$emit('calendar:change', {
                month: this.month,
                year: this.year
            });
        },

        prevMonth(){
            console.log('prevMonth');
            this.currentdate = new Date(this.currentdate.setMonth(this.currentdate.getMonth() - 1));

            this.$emit('calendar:change', {
                month: this.month,
                year: this.year
            })
        },

        selectDay(day){
            this.$emit('calendar:day', day.dateFormat);
        },

        disableDay(day){
            return (this.mindate && day.date < this.mindate) || (this.maxdate && day.date > this.maxdate);
        },

        dateFormat(date){
            var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    },

    mounted(){
        this.currentdate = (this.current) ? new Date(this.current) : new Date();
    }

}
</script>

<style lang="scss" scoped>

$gray: #d9e3ea;
$active: #ffd300;
$holiday: #F8EFBA;
$spacer: .4rem;

.calendar{
    .calendar-header{
        border-top: 1px solid $gray;
        border-bottom: 1px solid $gray;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        > div{
            text-align: center;
            padding: $spacer;
        }

        .calendar-header-month{
            text-align: left;
            text-transform: capitalize;

            .calendar-header-month-name{
                margin-right: $spacer;
            }

            // .calendar-header-month-year{}
        }

        .calendar-header-nav{
            flex: 0 0 auto;
            width: auto;

            .calendar-header-nav-prev,
            .calendar-header-nav-next{
                margin: 0;
                padding: 0;
                border: 0;
                background: none;
            }

            // .calendar-header-nav-prev{}
            // .calendar-header-nav-next{}
        }
    }

    .calendar-body{
        border-bottom: 1px solid $gray;

        table{
            table-layout: fixed;
            width: 100%;

            th, td{
                text-align: center;
                padding: $spacer;
                margin: 0;
            }

            thead{
                tr{
                    th{
                        text-transform: uppercase;
                        font-size: small;

                        &:first-child{
                            background: $holiday;
                        }

                        div{
                            padding: $spacer;
                        }
                    }
                }
            }

            tbody{
                tr{
                    td{
                        &:first-child{
                            background: $holiday;
                        }

                        button{
                            display: block;
                            padding: $spacer;
                            margin: 0;
                            border: 0;
                            background-color: transparent;
                            border-radius: $spacer;
                            width: 100%;
                            position: relative;

                            span{
                                position: relative;
                            }

                            small{
                                position: absolute;
                                top: $spacer * -1;
                                right: $spacer * -1;
                                background: $gray;
                                padding: ($spacer / 4) ($spacer / 2);
                                border-radius: $spacer / 2;
                            }

                            &.active{
                                background: $active;
                            }

                            &.current{
                                border: 1px solid $active;
                                font-weight: bold;
                            }

                            &:hover{
                                background: $gray;
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>
