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
			<div class="header">
				<div class="text-wrapper_10">
					<span class="font_16 text_22">成就展示</span>
				</div>
			</div>
			<div class="Personalside">
				<div class="text-wrapper_14 pos_79" @click="toChooseBook">
					<span class="font_18 text_40">选择词书</span>
				</div>
				<div class="text-wrapper_14 pos_80" @click="toStatistics">
					<span class="font_18 text_40">统计信息</span>
				</div>
				<div class="section_1 pos_81" @click="toAchieve">
					<img
						class="image_1"
						src="https://ide.code.fun/api/image?token=665d8464a16e9e001251394b&name=c3ecd12054e7bd3b61b232611bff59d9.png"
					/>
					<span class="font_19 text_2 ml-11">成就展示</span>
				</div>
				<div class="text-wrapper_14 pos_82" @click="toRank">
					<span class="font_18 text_40">排行榜</span>
				</div>
				<div class="text-wrapper_14 pos_83" @click="toEditInfo">
					<span class="font_18 text_40">个人信息</span>
				</div>
			</div>
				<!--div class="setting">
					<el-button type="primary" @click="studySetting()">学习设置</el-button>
					<el-button color="#626aef" type="primary" @click="wordBookSetting()">上传词书</el-button>
				</div-->
				<div class="card-container">
					<div class="inner-card-container">
						<el-row :gutter="20">
							<el-col v-for="(item, index) in achieveCards" :key="index" :span="6">
								<el-card shadow="hover" :class="item.owned == true? 'achieveCard-y': 'achieveCard-g'">
									<p class="achieve-title">{{item.name}}</p>
									<p>{{item.description}}</p>
								</el-card>
							</el-col>
						</el-row>
					</div>
				</div>
		</el-row>
	</div>
	</div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import axios from "axios"
import yaml from 'js-yaml'

export default {
	components: {PersonalSide},
	async created() {
		await axios.get('').then((res)=> {
			this.achieveCards = res.data.achieve_list
		})
	},
	data() {
		return {
			achieveCards: [
				{name:'小试牛刀', description: 'a this is ...', owned: true, datetime: '2023-10-21'},
				{name:'b', description: 'b this is ...', owned: true, datetime: '2024-10-21'},
				{name:'a', description: 'a this is ...', owned: true, datetime: '2023-10-21'},
				{name:'b', description: 'b this is ...', owned: false, datetime: '2024-10-21'},
				{name:'a', description: 'a this is ...', owned: false, datetime: '2023-10-21'},
				{name:'b', description: 'b this is ...', owned: false, datetime: '2024-10-21'},
			],
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
			this.$router.push({ path: "/SavedWords" });
		},
		toRank() {
			this.$router.push({ path: "/PersonalRank" });
		},
		toStatistics() {
			this.$router.push({ path: "/Statistics" });
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
	left: 100px;
	top: 355px;
}
.pos_82 {
	position: absolute;
	left: 150px;
	top: 450px;
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
	display: flex; /*解决块级元素不能一行显示*/
}
/*成就卡片*/
.achieveCard-y {
	background-color: #fcdd64;
  border-radius: 20px;
  width: 180px;
  height: 200px;
}
.achieveCard-g {
	background-color: #00000040;
  border-radius: 20px;
  width: 180px;
  height: 200px;
}
.achieve-title {
  font-size: 28px;
  font-family: Poppins;
  font-weight: 800;
}
</style>