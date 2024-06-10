<template>
	<div>
		<div class="back-home" @click="goBackHome()">
			<span class="font_13">乐词不疲</span>
		</div>
		<el-row :gutter="20">
			<div>
				
			</div>
			<div class="header">
				<div class="text-wrapper_10">
					<span class="font_16 text_22">排行榜</span>
				</div>
			</div>
			<div class="Personalside">
				<div class="text-wrapper_14 pos_79" @click="toChooseBook">
					<span class="font_18 text_40">选择词书</span>
				</div>
				<div class="text-wrapper_14 pos_80" @click="toStatistics">
					<span class="font_18 text_40">统计信息</span>
				</div>
				<div class="text-wrapper_14 pos_81" @click="toAchieve">
					<span class="font_18 text_40">成就展示</span>
				</div>
				<div class="section_1 pos_82" @click="toRank">
					<img
						class="image_1"
						src="../../assets/personal-center/side-4.png"
					/>
					<span class="font_19 text_2 ml-11">排行榜</span>
				</div>
				<div class="text-wrapper_14 pos_83" @click="toEditInfo">
					<span class="font_18 text_40">个人信息</span>
				</div>
			</div>
				<div class="card-container">
					<div class="inner-card-container">
						<el-scrollbar height="450px">
						<div class="scrollbar-card">
						<div v-if="this.rankList.length>=1" class="section_52">
							<div class="inner-text">
								<span class="text_54 wd_300">NO.1</span>
								<span class="text_50 wd_280">{{this.rankList[0].username}}</span>
								<span class="text_50">LV.{{this.rankList[0].level}}</span>
							</div>
						</div>
						<div v-if="this.rankList.length>=2" class="mt-22 section_53">
							<span class="text_58 ml-20 wd_300">NO.2</span>
							<span class="font_26 wd_300">{{this.rankList[1].username}}</span>
							<span class="font_26">LV.{{this.rankList[1].level}}</span>
						</div>
						<div v-if="this.rankList.length>=3" v-for="(item, index) in rankList.slice(2)" :key="index" class="mt-22 section_54">
							<span class="font_26 ml-20 wd_280">NO.{{index + 3}}</span>
							<span class="font_26 wd_280">{{item.username}}</span>
							<span class="font_26">LV.{{item.level}}</span>
						</div>
						</div>
						</el-scrollbar>
					</div>
				</div>
		</el-row>
	</div>
</template>

<script>
import axios from "axios"
import yaml from 'js-yaml'
import "../../assets/styles/center.css"

export default {
	components: {},
	async created() {
		await axios.get('/api/word/get-ranking-list-today/').then((res)=> {
			this.rankList = res.data.rank_list
		})
	},
	data() {
		return {
			rankList: [],
		}
	},
	methods: {
		goBackHome() {
			this.$router.push('/')
		},
		toChooseBook() {
			this.$router.push({ path: "/PersonalBook/" });
		},
		toEditInfo() {
			this.$router.push({ path: "/PersonalInfo/" });
		},
		toAchieve() {
			this.$router.push({ path: "/PersonalAchieve/" });
		},
		toSavedWords() {
			this.$router.push({ path: "/SavedWords/" });
		},
		toRank() {
			this.$router.push({ path: "/PersonalRank/" });
		},
		toStatistics() {
			this.$router.push({ path: "/Statistics/" });
		},
	}
}
</script>

<style scoped>
.pos_79 {
	position: absolute;
	left: 150px;
	top: 180px;
}
.pos_80 {
	position: absolute;
	left: 150px;
	top: 270px;
}
.pos_81 {
	position: absolute;
	left: 150px;
	top: 360px;
}
.pos_82 {
	position: absolute;
	left: 100px;
	top: 445px;
}
.pos_83 {
	position: absolute;
	left: 150px;
	top: 540px;
}
.font_18 {
	font-size: 26px;
	font-family: Poppins;
	line-height: 30.5px;
	font-weight: 800;
	color: #888888;
	line-height: 30.5px;
	margin-left: 30px;
}
.scrollbar-card {
	width: 96%;
}
/*排行列表*/
.ml-190 {
	margin-left: 165px;
}
.section_52 {
	width: 100%;
	height: 0;
	margin-right: 30px;
	padding: 10px 30px;
	border-top: 100px solid #FFDA53;
	border-right: 25px solid transparent;
	border-left: 25px solid transparent;
}
.inner-text {
	display: flex;/*解决块级元素不能一行显示*/
	margin-top: -85px;
}
.text-wrapper_19 {
	width: 80px;
}
.text_54 {
	color: #000000;
	font-size: 58px;
	font-family: Poppins;
	font-weight: 800;
	line-height: 47.5px;
}
.text_50 {
	color: #000000;
	font-size: 40px;
	font-family: Poppins;
	font-weight: 800;
	line-height: 47.5px;
}
.wd_280 {
	width: 280px;
}
.wd_300 {
	width: 300px;
}
.font_26 {
	font-size: 36px;
	font-family: Poppins;
	font-weight: 800;
	color: #000000;
}
/*layer2*/
.font_16 {
	font-size: 48px;
	font-family: Poppins;
	line-height: 46px;
	font-weight: 800;
	color: #2c0b6c;
}
.section_53 {
	margin-right: 40px;
	padding: 20px 10px;
	background-color: #FFE9D4;
	display: flex;
	width: 100%;
}
.text_58 {
	width: 300px;
	font-size: 48px;
	font-family: Poppins;
	line-height: 46px;
	font-weight: 800;
	color: #000000;
	line-height: 36px;
	margin-left: 10px;
	margin-right: -20px;
}
.text-wrapper_20 {
	margin-left: 180px;
}
.view_11 {
	margin-left: 200px;
	margin-right: 50px;
}
/*other layer*/
.ml-240 {
	margin-left: 180px;
}
.font_25 {
	font-size: 36px;
	font-family: Poppins;
	line-height: 20.5px;
	font-weight: 800;
	color: #000000;
}
.font_26 {
	font-size: 36px;
	font-family: Poppins;
	line-height: 27px;
	font-weight: 800;
	color: #000000;
}
.section_54 {
	width: 95%;
	display: flex;
	margin-left: 25px;
	margin-top: 20px;
	padding: 20px 10px;
	background-color: #FFE9D4;
}
.text_60 {
	margin-right: 64px;
}
.ml-20 {
	margin-left: 30px;
}
</style>