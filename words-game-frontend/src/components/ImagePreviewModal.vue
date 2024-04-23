<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="close">
        <div class="modal-container">
          <canvas id="canvas" width="500" height="750"></canvas>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import PunchIn from './PunchIn.vue';
  import imgSrc from '../assets/images/BubbleHouse.webp';

  const emit = defineEmits(['close']);
 
  const close = () => {
    console.log("close");
    emit('close');
  };

  // const consecutiveDays = PunchIn.consecutiveDays;
  // const inspiration = PunchIn.inspiration;

  const imageSrc = ref('');

  const generateImg = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    var bgImage = new Image();
    bgImage.src = imgSrc; 
    bgImage.onload = () => {
      const margin = 15; 
      const imgWidth = 500;
      const imgHeight = 500;

      ctx.drawImage(bgImage, (canvas.width - imgWidth) / 2, margin, imgWidth, imgHeight);

      ctx.font = "16px serif";
      ctx.fillText("坚持打卡20天", 10, 650);
      
      const canvasWidth = canvas.width;
      const lineHeight = 10;
      const text = "每天的努力，都是为了让未来的自己更加优秀。";

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
        ctx.fillText(line.trim(), 10, y + index * lineHeight);
      });
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
</style>