<template>
	<div class="common-layout">
		<div class="back-home-r" @click="back2home">
			<span class="font_13">乐词不疲</span>
		</div>
		<!-- 顶部区域 -->
			<div class="centered-content">
				<div class="demo-progress">
					<el-progress :text-inside="true" :stroke-width="35" :percentage="IntRatio * 100" />
				</div>
			</div>
			<!-- 展示主体区域 -->
			<el-main>
				<!-- 显示单词英语区域 -->
				<div class="word-container-above">
				<img
					class="image_13 pos_42"
					src="../assets/recite-bg.png"
				/>
				<el-card class="word-container">
					<!-- 单词 -->
					<div class="timeNewRomanCard" align="center" style="margin-top: 40px;">{{ newWord }}</div>
					<!-- 音标 -->
					<div class="black-body" align="center" style="margin-top: 10px;"></div>
					<!-- 例句 -->
					<div class="black-body" align="center" style="margin-top: 100px;"></div>
				</el-card>
				</div>
				<img
					class="image_20 pos_55"
					src="../assets/right-arrow.png"
				/>
				<!-- 下方认识程度选择区域 -->
				<!-- 选择按钮区域 -->
				<!-- 跳转到单词详细释义界面，打上不认识标签 -->
				<el-row :gutter="30">
					<el-col :span="8">
						<div class="grid-content ep-bg-purple" />
						<div class="choice-button-container">
							<el-button class="choice-button" @click="TagWord(newWord, '不认识')">不认识</el-button>
						</div>
					</el-col>
					<!-- 跳转到单词释义界面，同时打上认识标签 -->
					<el-col :span="8">
						<div class="grid-content ep-bg-purple" />
						<div class="choice-button-container">
							<el-button class="choice-button" @click="TagWord(newWord, '认识')">认识</el-button>
						</div>
					</el-col>
					<!-- 跳转到单词释义界面，同时打上模糊标签 -->
					<el-col :span="8">
						<div class="grid-content ep-bg-purple" />
						<div class="choice-button-container">
							<el-button class="choice-button" @click="TagWord(newWord, '模糊')">模糊</el-button>
						</div>
					</el-col>
				</el-row>
			</el-main>
	</div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElNotification as notify } from 'element-plus'
import axios from "axios";
import { onMounted, ref, onUnmounted, watch } from "vue";

const route1 = useRoute();
const enterTime = ref(null);

// 开始计时
const startTimer = () => {
	enterTime.value = new Date().getTime();
};

// 计算停留时间并发送到后端
const sendStayTime = () => {
	const seconds = Math.floor((new Date().getTime() - enterTime.value) / 1000);



	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	const paddedHours = hours.toString().padStart(2, '0');
	const paddedMinutes = minutes.toString().padStart(2, '0');
	const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

	const stayTime = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;

	console.log(stayTime)

	const response = axios.post('/api/word/update-word-data/today/', {
		time: stayTime
	}).then((response) => {
		console.log(response);
	})
		.catch((error) => {
			console.log(error);
		})


};

// 监听页面挂载时开始计时
onMounted(() => {
	startTimer();
});

// 监听路由变化，当路由变化时发送停留时间
watch(() => route1.path, () => {
	sendStayTime();
	startTimer();
});

// 页面卸载时发送最后一次停留时间
onUnmounted(() => {
	sendStayTime();
});


//返回主页
const back2home = () => {
	router.push('/')// 主页路由
}

const Ratio = ref(0.11111)
let IntRatio = ref(0)//只保留整数部分
const getDayRatio = () => {
	const response = axios.get('/api/word/get-daily-ratio/');
	console.log(response.data)
	response.then(function (response) {
		console.log(response.data)
		if (response.status === 200) {
			//console.log(response.data)
			Ratio.value =  response.data.ratio
			//保留前两位小数
			IntRatio.value = Math.floor(Ratio.value * 100) / 100 - Math.floor(Ratio.value)
			//不超过1
			if (IntRatio.value >= 1){
				IntRatio.value = 1;
			}
		} else {
			ElMessage({
				message: '获取日常学习数据失败',
				type: 'error'
			})
		}
	}
	)
}

const BookRatio = ref(0)
let IntBookRatio = ref(0)
const getAllBookRatio = () => {
	const response = axios.get('/api/word/now-book-ratio/');
	response.then(function (response) {
		console.log(response.data)
		//console.log(response.data)
		BookRatio.value = response.data.ratio
		//保留前两位小数
		IntBookRatio.value = Math.floor(BookRatio.value * 100) / 100
		//不超过1
		if (IntBookRatio.value >= 1){
			IntBookRatio.value = 1;
		}
	})
}



//获取到的新单词
const newWord = ref('hello')
onMounted(() => {
	getDayRatio();
	getAllBookRatio();
	toPunchIn();
	getNextWord();
})

//跳转到打卡
const toPunchIn = () => {
	/*if (Ratio.value >= 1 - 0.005 && Ratio.value <= 1 + 0.005) {
		router.push('/PunchIn' );
	} else if (BookRatio.value >= 1 - 0.00001 && BookRatio.value <= 1 + 0.00001) {
		router.push('/PunchIn' );
	}*/
	//保证背完当天单词后跳转到打卡界面 or 背完当前词书后不留在背单词界面
	if (IntRatio.value >= 1) {
		router.push('/PunchIn' );
	}  else if (IntBookRatio.value >= 1) {
		router.push('/PunchIn' );
	}
}


//获取一个新单词
const getNextWord = async () => {
	// 调用后端接口获取新单词
	const response = await axios.get('/api/word/get-next-word/');
	if (response.status === 200) {
		//console.log(response.data)
		newWord.value = response.data.word;
		console.log(newWord.value)
		/*ElMessage({
			message: '获取单词成功',
			type: 'success'
		});*/
	} else {
		ElMessage({
			message: '获取单词失败',
			type: 'error'
		});
	}
}

const TagWord = (newWord, rate) => {
	//notify('Word Detail')
	const response = axios.post('/api/word/tag-word/', {

		word: newWord,
		tag: rate  //标记为    不认识   认识   模糊

	});
	response.then(function (response) {
		if (response.status === 200) {
			/*ElMessage({
				message: '标记成功',
				type: 'success'
			});*/
		} else {
			ElMessage({
				message: '标记失败',
				type: 'error'
			});
		}
	})
	//跳转到单词释义界面
	router.push({ path: '/WordDetail', query: { word: newWord } })// 单词详细释义路由
}

//将单词加入生词本
const collectWord = (newWord) => {
	const response = axios.post('/api/word/add-favor-word/', {
		word: newWord
	});
	response.then(function (response) {
		if (response.status === 200) {
			/*ElMessage({
				message: '收藏成功',
				type: 'success'
			});*/
		} else {
			ElMessage({
				message: '收藏失败',
				type: 'error'
			});
		}
	})
}

//将单词删除
const deleteWord = (newWord) => {
	const response = axios.post('/api/word/tag-word/', {
		word: newWord,
		tag: '认识'  //标记为已删除 = 已认识
	});
	response.then(function (response) {
		if (response.status === 200) {
			/*ElMessage({
				message: '删除成功',
				type: 'success'
			});*/
			notify('Delete word success')
		} else {
			ElMessage({
				message: '删除失败',
				type: 'error'
			});
			notify('Failed to Delete word')
		}
	})
	//刷新页面，获取一个新的单词，获取新的学习进度
	getDayRatio();
	getAllBookRatio();
	toPunchIn();
	getNextWord();
}


const router = useRouter();


</script>



<style scoped>
.demo-progress {
	display: flex;
	justify-content: center;
	margin-top: 80px;
}
.el-progress {
	width: 100%;
	border-radius: 50px;
	border-left: solid 8px #fbdd6f;
	border-right: solid 8px #fbdd6f;
	border-top: solid 8px #fbdd6f;
	border-bottom: solid 8px #fbdd6f;
}
.star-icon {
	color: yellow;
	cursor: pointer;
	font-size: 24px; /* 根据需要调整大小 */
}
/*背景卡片*/
.image_13 {
	border-radius: 24px;
	filter: drop-shadow(0px 4px 2px #00000040);
	width: 700px;
	height: 400px;
}
.pos_42 {
	position: absolute;
	right: 230px;
	bottom: 210px;
}
/*右箭头*/
.image_20 {
	width: 70px;
	height: 120px;
}
.pos_55 {
	position: absolute;
	right: 112px;
	bottom: 360px;
}

.choice-button {
	width: 80%;
	height: 100%;
	padding: 14px 0;
	border-radius: 10px;
	background-color: #2c0b6c;
	/*font*/
	font-size: 16px;
	font-family: Poppins;
	line-height: 19px;
	font-weight: 700;
	color: #ffffff;
}

.choice-button-container {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
}

.el-row {
	margin-bottom: 20px;
}

.el-row:last-child {
	margin-bottom: 0;
}

.el-col {
	border-radius: 4px;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}


.demo-progress .el-progress--line {
	margin-bottom: 15px;
	max-width: 1000px;
}

.timeNewRomanCard {
	font-family: 'Time New Roman', Times, serif;
	font-size: 80px;
}
.word-container-above {
	display: flex;
	justify-content: center;  
}
.word-container {
	z-index: 1; /*使得卡片显示在上层*/
	display: flex;
	justify-content: center;
	/*height: 50vh;
	margin-top: 25px;*/
	padding: 64px 0 90px;
	background-color: #fefbf0;
	border-radius: 24px;
	box-shadow: 0px 6px 10px #00000066;
	width: 800px;
	height: 420px;
	border: solid 1px #c8b058;
}

.black-body {
	font-family: '黑体', 'Heiti SC', sans-serif;
}
</style>
