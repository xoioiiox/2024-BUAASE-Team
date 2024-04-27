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
const imgSrcs = reactive(['test.jpg',
  'BubbleHouse.webp'
]);

const generateImg = async () => {
  var canvas = document.createElement('canvas');
  canvas.width = 550;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');

  var img = document.getElementById("canvas2img")

  var bgImage = new Image();
  var bgimageSrc = '../assets/images/' + imgSrcs[props.firstProp % imgSrcs.length];//修改bgimg路径
  let m = await import(/* @vite-ignore */bgimageSrc);
  bgImage.src = m.default;
  bgImage.onload = () => {
    const margin = 20;
    const imgWidth = 500;
    const imgHeight = 500;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bgImage, (canvas.width - imgWidth) / 2, margin, imgWidth, imgHeight);

    ctx.fillStyle = 'black';
    ctx.font = "16px serif";
    ctx.fillText("坚持打卡" + props.firstProp + "天", 30, 650);

    const canvasWidth = canvas.width;
    const lineHeight = 10;
    const text = props.secondProp;

    console.log("坚持打卡" + props.firstProp + "天");
    console.log(props.secondProp);

    const words = text.split(/\s+/);
    let line = '', lines = [];
    for (const word of words) {
      const tempLine = line + word + ' ';
      if (ctx.measureText(tempLine).width > canvasWidth) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = tempLine;
      }
    }
    lines.push(line);

    const y = 600;
    lines.forEach((line, index) => {
      ctx.fillText(line.trim(), 30, y + index * lineHeight);
    });

    img.src = canvas.toDataURL('image/png');
  };

}

onMounted(() => {
  generateImg();
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
  height: 50vh;

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