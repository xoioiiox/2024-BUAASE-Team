<template>
    <div class="back-home-r">
        <span class="font_13">乐词不疲</span>
    </div>
<div>
        <!-- 展示主体区域 -->
        <el-main>
            <!-- 显示道具卡描述区域 -->
            <div class="word-container-above">
            <img
                class="image_13 pos_42"
                src="../assets/recite-bg.png"
            />
            <el-card class="word-container">
                <div class="word-examples">
                    <h2>道具描述：</h2>
                    <p class="black-body">{{ event_description }}</p>
                </div>
                <div class = "choice-button" @click="goBack">点击返回</div>
            </el-card>
            </div>
        </el-main>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const event_description = ref('');

const goBack = () => {
  router.push('/DrawView' );
}

onMounted(() => {
event_description.value = router.currentRoute.value.query.event_description;
console.log("event_description:" + router.currentRoute.value.query.event_description);
})

</script>


<style scoped>
.star-icon {
color: yellow;
cursor: pointer;
font-size: 24px;
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

.choice-button {
width: 80%;
height: 20%;
padding: 14px 0;
border-radius: 10px;
background-color: #2db0c1;
display: flex;  
align-items: center; 
justify-content: center;
/*font*/
margin: auto;
font-size: 16px;
font-family: Poppins;
line-height: 19px;
font-weight: 700;
color: #ffffff;
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
font-size: 36px;
color: #d76e19;
}
</style>
