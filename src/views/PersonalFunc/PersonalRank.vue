<template>
	<div class="bg">
		<img
			class="shrink-0 image_2 pos_74"
			src="https://ide.code.fun/api/image?token=665d8464a16e9e001251394b&name=ab4179d6056f986189aeff77097e5805.png"
		/>
		<img
			class="shrink-0 image_2 pos_68"
			src="https://ide.code.fun/api/image?token=665d8464a16e9e001251394b&name=ab4179d6056f986189aeff77097e5805.png"
		/>
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
						src="https://ide.code.fun/api/image?token=665d8464a16e9e001251394b&name=c3ecd12054e7bd3b61b232611bff59d9.png"
					/>
					<span class="font_19 text_2 ml-11">排行榜</span>
				</div>
				<div class="text-wrapper_14 pos_83" @click="toEditInfo">
					<span class="font_18 text_40">个人信息</span>
				</div>
			</div>
				<div class="card-container">
					<div class="inner-card-container">
						<div class="section_52">
							<div class="inner-text">
								<div class="text-wrapper_19"><span class="text_54">NO.1</span></div>
								<div class="ml-190"><span class="font_25">username</span></div>
								<div class="text-wrapper_19 ml-190"><span class="font_26">LV.97</span></div>
							</div>
						</div>
						<div class="mt-22 section_53">
							<div class="text-wrapper_19"><span class="font_16 text_58">NO.2</span></div>
							<div class="text-wrapper_20"><span class="font_25">username</span></div>
							<div class="text-wrapper_19 view_11"><span class="font_26">LV.95</span></div>
						</div>
						<!--div class="mt-22 flex-row section_54">
							<span class="font_26">NO.3</span>
							<span class="font_25 ml-240">username</span>
							<span class="font_26 text_60 ml-240">LV.92</span>
						</div-->
					</div>
				</div>
		</el-row>
	</div>
	</div>
</template>

<script>
import axios from "axios"
import yaml from 'js-yaml'

export default {
	components: {},
	async created() {
		
	},
	data() {
		return {

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
.bg {
	height: 100vh;
	background-size: cover;
	background-position: center;
	background-image: linear-gradient(180deg, #2c0b6c 30.1%, #974fc7 100%);
}
.image_2 {
	width: 876px;
	height: 546px;
}
.pos_74 {
	position: absolute;
	left: 90px;
	top: 100px;
}
.pos_68 {
	position: absolute;
	right: 90px;
	top: 100px;
}
.setting {
	margin-left: 800px;
}
/*home*/
.back-home {
	position: absolute;
	margin-top: 20px;
	margin-left: 50px;
	cursor: pointer;
	z-index: 99; /*绝对定位下，需要设置高优先级*/
}
.font_13 {
	font-size: 38px;
	font-family: Poppins;
	line-height: 44.5px;
	color: #ffffff;
	text-shadow: 0px 4px 10px #fbdd6f;
}
/*header*/
.header {
	display: flex;
	justify-content: center;
	width: 100%;
}
.text-wrapper_10 {
	position: absolute;
	display: flex;
	justify-content: center;
	margin-top: 40px;
	margin-left: 100px;
	padding: 16px 0;
	background-image: linear-gradient(180deg, #fbdd6f 0%, #ffd217 100%);
	border-radius: 12px;
	width: 280px;
}
.font_16 {
	font-size: 40px;
	font-family: Poppins;
	line-height: 46px;
	font-weight: 800;
	color: #2c0b6c;
}
.text_22 {
	line-height: 45.5px;
}
/*高亮标签*/
.section_1 {
	padding: 20px 0;
	background-color: #fffefe;
	border-radius: 10px 0px 0px 10px;
	box-shadow: 0px 4px 4px #ffd217;
	width: 200px;
	border: solid 2px #fbdd6f;
	position: absolute;
	cursor: pointer;
	z-index: 99;
}
.image_1 {
	margin-left: 20px;
	width: 30px;
	height: 30px;
}
.text_2 {
	line-height: 34px;
	font-size: 30px;
	font-family: Poppins;
	line-height: 34px;
	font-weight: 800;
	color: #ffd033;
	margin-left: 10px;
}
/*灰色标签*/
.text-wrapper_14 {
	padding: 20px 0;
	background-color: #f5f0f8;
	border-radius: 10px 0px 0px 10px;
	width: 150px;
	cursor: pointer;
	z-index: 99;
}
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
/*收藏生词本*/
.section_34 {
	background-color: #ddf0ff;
	border-radius: 36px;
	width: 160px;
	height: 160px;
	border: solid 2px #5c7fac96;
}
.image_27 {
	border-radius: 50%;
	width: 80px;
	height: 80px;
	margin: 10px 0 10px 40px;
}
.text-wrapper_15 {
	display: flex;
	justify-content: center;
	margin: 0 10px;
	padding: 8px 0;
	background-color: #ffffff;
	border-radius: 20px;
	border: solid 1px #5c7fac;
	cursor: pointer;
	z-index: 99;
}
.font_21 {
	font-size: 20px;
	font-family: Poppins;
	color: #150437;
}
/*选择容器*/
.card-container {
	margin-top: 80px;
	margin-left: 300px;
	margin-right: 120px;
	padding: 28px 0;
	background-color: #fce6c6;
	border-radius: 80px;
	width: 1000px;
	height: 560px;
}
.inner-card-container {
	padding: 60px 50px;
	background-color: #fff9ed;
	border-radius: 80px;
	width: 820px;
	height: 440px;
	margin: 0 40px;
}
/*排行列表*/
.ml-190 {
  margin-left: 150px;
}
.section_52 {
	width: 90%;
	height: 0;
  margin-right: 30px;
  padding: 10px 30px;
	border-top: 100px solid #e9a522;
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
.font_25 {
  font-size: 36px;
  font-family: Poppins;
  font-weight: 800;
  color: #000000;
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
  background-color: #d9d9d9;
	display: flex;
	width: 100%;
}
.text_58 {
  color: #000000;
  line-height: 36px;
}
.text-wrapper_20 {
  margin-left: 180px;
}
.view_11 {
  margin-left: 230px;
  margin-right: 50px;
}
/*other layer*/
.ml-240 {
  margin-left: 240px;
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
  margin-left: 56px;
  margin-right: 64px;
  padding: 24px 24px 34px;
  background-color: #d9d9d9;
}
.text_60 {
  margin-right: 64px;
}
</style>