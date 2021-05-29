<template>
	<div id="app">
		<EventCalendar
			:datainfo="calendar.datainfo"
			:current="calendar.current"
			:min="calendar.min"
			:max="calendar.max"
			v-on:calendar:change="updateMonth"
			v-on:calendar:day="updateDay"
		/>

		<pre>{{ calendar }}</pre>
	</div>
</template>

<script>
import EventCalendar from "./components/EventCalendar.vue";

export default {
	name: "App",

	data() {
		return {
			calendar: {
				datainfo: {},
				current: "",
				min: "",
				max: "",
			},
		};
	},

	components: {
		EventCalendar,
	},

	methods: {
		updateMonth(payload) {
			console.log("updateMonth", payload);
		},

		updateDay(payload) {
			console.log("updateDay", payload);
		},
	},

	created() {
		this.calendar = {
			min: '2021-06-02',
			max: '2021-06-20',
			current: '2021-06-10',
			datainfo: {
				'2021-06-03': 2,
				'2021-06-04': 4,
				'2021-06-06': 9
			}
		}
	},
};
</script>

<style>
#app {
	max-width: 520px;
	margin: 60px auto;
	font-family: Arial, Helvetica, sans-serif;
}
</style>
