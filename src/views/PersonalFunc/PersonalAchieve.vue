<template>
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
						src="../../assets/personal-center/side-4.png"
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
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import axios from "axios"
import yaml from 'js-yaml'
import "../../assets/styles/center.css"

export default {
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
.setting {
	margin-left: 800px;
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