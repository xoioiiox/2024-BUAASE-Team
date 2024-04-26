<template>
  <div>
    <el-row class="saved-word-page">
      <el-col :span="4">
        <div class="saved-words-list">Saved words list</div>
      </el-col>
      <el-col :span="20">
        <div class="single-word">
          <div class="single-word-title">
            <h1>saved word {{ wordID }}</h1>
            <div class="single-word-icon">
              <IconSpeaker />
            </div>
            <div class="single-word-icon">
              <IconStar />
            </div>
          </div>
          <div class="single-word-content">
            <div class="single-word-phonetic">phonetic</div>
            <div v-for="o in 2">
              <h4>noun</h4>
              <div>翻译a, 翻译b</div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum eius saepe id molestiae perferendis incidunt
                reiciendis quod voluptatem perspiciatis laboriosam repellat,
                inventore quam obcaecati tempore maiores explicabo minima
                possimus ipsa.
              </p>
              <hr />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import IconStar from "@/components/icons/IconStar.vue";
import IconSpeaker from "@/components/icons/IconSpeaker.vue";
defineProps({ wordID: String });
</script>

<style scoped>
.saved-word-page {
  margin: 0;
  border: 1px solid red;
  background-color: pink;
  height: 100vh;
  /* needs height adjusting later */
  overflow-y: auto;
}

.saved-words-list {
  border: 1px solid green;
  background-color: yellow;
  height: 100%;
}

.single-word {
  border: 1px solid black;
  height: 100%;
  padding: 16px;
}

.single-word-title {
  border: 1px solid red;
  display: flex;
  align-items: center;
  gap: 8px;
}

.single-word-icon {
  border: 2px solid darkblue;
  border-radius: 12rem;
  /* padding: 5px 0px 5px 5px; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.single-word-phonetic {
  margin: 4px 20px;
}
</style>
