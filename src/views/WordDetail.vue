<template>
			<div class="back-home-r" @click="back2home">
				<span class="font_13">乐词不疲</span>
			</div>
		<div>
			<!-- 顶部区域 -->
				<div>
					<div class="demo-progress">
						<el-progress  color="#FBDD6F" :text-inside="true" :stroke-width="35" :percentage="Ratio * 100" />
					</div>
				</div>
				<!-- 展示主体区域 -->
				<el-main>
					<!-- 显示单词英语区域 -->
					<div class="word-container-above">
					<div class="card-below-l"></div>
					<div class="card-below-r"></div>
					<el-card class="word-container">
						<div class="detail-inner">
							<!--收藏-->
							<div class="star-it" v-if="!disabled"  @click="addToVocab">
								<el-icon class="star-init"><Star /></el-icon>
							</div>
							<div class="star-it" v-if="disabled">
								<el-icon class="star-true"><StarFilled /></el-icon>
							</div>
							<!-- 单词 -->
							<div class="timeNewRomanCard" style="margin-top: 10px;">
								<span>{{ word }}</span>
								<div  @click="playtts" style="cursor: pointer; margin-left: 20px;">
									<svg width="36" height="36" viewBox="0 0 43 40" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M17.9503 0L10.7487 10H0V30H10.7487L17.9503 40H21.4974V0H17.9503ZM26.8718 5V10C27.7854 10 28.699 10.1 29.5589 10.3C34.1809 11.4 37.6205 15.3 37.6205 20C37.6205 24.7 34.2346 28.6 29.5589 29.7C28.699 29.9 27.7854 30 26.8718 30V35C28.2153 35 29.4514 34.8 30.7413 34.55H30.9025C37.8892 32.9 42.9948 27 42.9948 20C42.9948 13 37.8892 7.1 30.9025 5.45C29.6664 5.15 28.2691 5 26.8718 5ZM26.8718 15V25C27.3554 25 27.8391 24.95 28.2153 24.85C30.5263 24.3 32.2461 22.3 32.2461 20C32.2461 17.7 30.5801 15.7 28.2153 15.15C27.7854 15.05 27.3017 15 26.8718 15Z" fill="black"/>
									</svg>
								</div>					
							</div>
							<div class="word-pronunciation">
								<span>{{ pronunciation }}</span>
							</div>
							<div class="word-examples">
								<h2>释义：</h2>
								<ul>
									<li v-for="example in examples" :key="example">
										{{ example.part + ' ' + example.means }}
									</li>
								</ul>
							</div>	
						</div>
					</el-card>
					</div>
					<img
						class="image_20 pos_55"
						src="../assets/right-arrow.png"
					/>
					<!-- 下方认识程度选择区域 -->
					<el-row :gutter="30">
						<el-col :span="8">
							<div class="grid-content ep-bg-purple" />
							<div class="choice-button-container">
								<el-button class="choice-button" @click="deleteWord">删除</el-button>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content ep-bg-purple" />
							<div class="choice-button-container">
								<el-button class="choice-button" @click="correctWord">记错了</el-button>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content ep-bg-purple" />
							<div class="choice-button-container">
								<el-button class="choice-button" @click="recognizeWord">认识</el-button>
							</div>
						</el-col>
					</el-row>
					<div style="height: 100px;"></div>
				</el-main>
		</div>
	</template>
	
<script setup>
	import { onBeforeMount, onMounted, ref } from 'vue';
	import axios from 'axios';
	import { useRouter } from "vue-router";
	
	const router = useRouter();
	
	//word
	const word = ref('');//router.query.word
	const dict = ref('');
	const pronunciation = ref('');
	const theSrc = 'https://fanyi-api.baidu.com/api/trans/api/tts?query=hello&appid=20210101000000001&lang=en&sign=169aa0398cfb86ace951aa8a96ec44fd'.replace(/^https:\/\/fanyi-api\.baidu\.com/, '/fanyi');
	const pronunciationSrc = ref(theSrc);
	const testWord = ref("");
	
	const examples = ref([
		{
			part: '',
			means: ''
		}
	]);

		//返回主页
	const back2home = () => {
		router.push('/')// 主页路由
	}
	
	const Ratio = ref(0)
	const getDayRatio = () => {
		const response = axios.get('/api/word/get-daily-ratio/');
		console.log(response.data)
		response.then(function (response) {
			console.log(response.data)
			Ratio.value = response.data.ratio
		})
	}
	
	const deleteWord = () => {
		// 删除单词的逻辑
		axios.post('/api/word/tag-word/', {
	
			word: word.value,
			tag: '完全掌握'
	
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
			if(Ratio.value >= 1-0.005 && Ratio.value <= 1 + 0.005){
				router.push('/PunchIn');
			}
			else{
				router.push('/recite');
			}
	};
	
	const correctWord = () => {
		// 记错了单词的逻辑
		axios.post('/api/word/tag-word/', {
	
			word: word.value,
			tag: '记错了'
	
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
			if(Ratio.value >= 1-0.005 && Ratio.value <= 1 + 0.005){
				router.push('/PunchIn');
			}
			else{
				router.push('/recite');
			}
	};
	
	const recognizeWord = () => {
		// 认识单词的逻辑
		axios.post('/api/word/tag-word/', {
	
			word: word.value,
			tag: '认识'
	
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
			if(Ratio.value >= 1-0.005 && Ratio.value <= 1 + 0.005){
				router.push('/PunchIn' );
			}
			else{
				router.push('/recite');
			}
	};
	
	const disabled = ref(false);
	const atvText = ref('加收藏');
	const addToVocab = () => {
		disabled.value = true;
		atvText.value = '已添加';
		axios.post('/api/word/add-favor-word/', {
	
			word: word.value
	
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	
	};
	
	const queryWord = () => {
		axios.get('/api/word/query-word-ch-dict/', {
			params: {
				q: word.value
			}
		})
			.then((response) => {
				console.log(response);
	
				dict.value = response.data.result.trans_result[0].dict;
				//console.log("dict:" + response.data.result.trans_result[0].dict);
				pronunciation.value = JSON.parse(dict.value).word_result.simple_means.symbols[0].ph_am;
				console.log(JSON.parse(dict.value).word_result.simple_means);
	
				const ttsSrc = response.data.result.trans_result[0].src_tts;
				pronunciationSrc.value = ttsSrc;
				/*pronunciationSrc.value = ttsSrc.replace(/^https:\/\/fanyi-api\.baidu\.com/, '/fanyi');*/
	
				examples.value = JSON.parse(dict.value).word_result.simple_means.symbols[0].parts;
				console.log(examples.value);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	
	const playtts = () => {
		/*const audio = document.getElementById('audio');
		audio.src = pronunciationSrc.value;
		audio.play();*/
		if (!window.speechSynthesis) {
			alert('当前浏览器不支持TTS！');
			return;
		}
	
		const utterance = new SpeechSynthesisUtterance(word.value);
	
		const voices = speechSynthesis.getVoices();
		if (voices.length !== 0) {
			utterance.voice = voices[0]; // 选择第一个语音
		}
	
		utterance.pitch = 1;
		utterance.rate = 1;
	
		window.speechSynthesis.speak(utterance);
	}
	
	
	onBeforeMount(() => {
	
	})
	
	onMounted(() => {
		//word.value = router.currentRoute.value.query.word;
		getDayRatio();
		word.value = router.currentRoute.value.query.word == '' ? 'dog' : router.currentRoute.value.query.word;
		console.log("word:" + router.currentRoute.value.query.word);
		queryWord();
	})
	
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
		border: solid 8px #fbdd6f;
	}
	.star-icon {
		color: yellow;
		cursor: pointer;
		font-size: 24px;
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
		display: flex;
		font-family: 'Time New Roman', Times, serif;
		font-size: 48px;
	}
	.word-container-above {
		display: flex;
		justify-content: center;  
	}
	.word-container {
		z-index: 1; /*使得卡片显示在上层*/
		display: flex;
		justify-content: center;
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
	/*收藏*/
	.star-it {
		width: 600px;
		display: flex;
		justify-content: end;
	}
	.star-init {
		position: absolute;
		font-size: 44px;
		color:#fbdd6f;
		cursor: pointer;
	}
	.star-true {
		position: absolute;
		font-size: 44px;
		color:#fbdd6f;
		cursor: pointer;
	}
	.word-examples {
		width: 600px;
	}
	.card-below-r {
		position: absolute;
		right: 280px;
		top: 200px;
		padding: 64px 0 90px;
		background-color: #fefbf0;
		border-radius: 24px;
		box-shadow: 0px 6px 10px #00000066;
		width: 400px;
		height: 370px;
		border: solid 1px #c8b058;
		transform: rotate(3deg);
	}
	.card-below-l {
		position: absolute;
		left: 280px;
		top: 200px;
		padding: 64px 0 90px;
		background-color: #fefbf0;
		border-radius: 24px;
		box-shadow: 0px 6px 10px #00000066;
		width: 400px;
		height: 370px;
		border: solid 1px #c8b058;
		transform: rotate(-3deg);
	}
	::v-deep .el-progress-bar__innerText {
		color: #2c0b6c;
		font-size: 18px;
	}
	</style>
	