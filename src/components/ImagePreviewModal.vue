<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="close">
        <div class="modal-container">
          <!-- <canvas id="canvas" width="550" height="750"></canvas> -->
          <img src="" alt="Canvas Image" id="canvas2img" />

          <button class="save" @click="saveImg">保存图片</button>

        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref, defineProps, onBeforeMount, reactive } from 'vue';
import axios from 'axios';

//close
const emit = defineEmits(['close']);

const close = () => {
  console.log("close");
  emit('close');
};

const props = defineProps({
  firstProp: Number,
  secondProp: String
});

//saveImg
const saveImg = () => {

  const imageUrl = document.getElementById("canvas2img").src;
  const imageFileName = 'punchIn.jpg';

  const link = document.createElement('a');

  link.href = imageUrl;
  link.download = imageFileName;

  link.click();

  link.remove();

}

//generateImg
const imgSrcs = reactive(['./images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
  './images/5.jpg',
  './images/6.jpg'
]);

const generateImg = async (props) => {
  var canvas = document.createElement('canvas');
  canvas.width = 550;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');

  var img = document.getElementById("canvas2img")

  var bgImage = new Image();
  let m = await import(/* @vite-ignore */imgSrcs[props.firstProp % imgSrcs.length]);
  bgImage.src = m.default;

  bgImage.onload = () => {
    console.log("-1");
    const margin = 20;
    const imgWidth = 500;
    const imgHeight = 500;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("1");

    ctx.drawImage(bgImage, (canvas.width - imgWidth) / 2, margin, imgWidth, imgHeight);
    console.log("2");

    ctx.fillStyle = 'black';
    ctx.font = "16px serif";
    ctx.fillText("坚持打卡" + props.firstProp + "天", 30, 600);

    const text = props.secondProp;
    ctx.fillText(text, 30, 650);

    console.log("坚持打卡" + props.firstProp + "天");
    console.log(props.secondProp);

    img.src = canvas.toDataURL('image/png');
  };

}

onMounted(() => {
  console.log("0");
  generateImg(props);
})

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 83vh;

}

.preview-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.save {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  background-color: #0366d6;
  color: white;
  border-radius: 5px;
  margin: 50px 50px;
  cursor: pointer;
  border: none;
  transition: background-color 0.1s ease;
}
</style>