<template lang="pug">
	div.contain
		label start
		datepicker(v-model="startDate") 
		label end
		datepicker(v-model="endDate")
		label keyword
		input(type="text" v-model="keyword")
		br
		button(@click="getData") search 
		hr
		div bull-more: {{ bull }}, bear-more: {{ bear }}
		div(v-for="kuaixun of kuaixuns")
			h3 {{ kuaixun.title }}
			div {{ kuaixun.date }}
			p {{ kuaixun.content }}
			div 看多{{ kuaixun.bull }} 看空{{ kuaixun.bear }}
			hr
</template>

<script>
	import Vue from "vue";
	import { post } from "../../tools/ajax";
	import Datepicker from "vuejs-datepicker";

	export default {
		data: function() {
			return {
				kuaixuns: [],
				startDate: "",
				endDate: "",
				keyword: "",
				bull: 0,
				bear: 0
			};
		},
		components: {
			Datepicker
		},
		methods: {
			getData: function() {
				let config = {
					startDate: this.startDate,
					endDate: this.endDate,
					keyword: this.keyword || ""
				};
				post("kuaixunData", config, (err, res) => {
					if (err || res.error) 
						return console.error(err, res.error);
					this.kuaixuns = res;
					for (let i = 0; i < res.length; i++) {
						if (res[i].bull > res[i].bear)
							this.bull++;
						else
							this.bear++;	
					}
				});		
			}
		}
	}
</script>

<style>
</style>
