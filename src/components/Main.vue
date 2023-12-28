<template>
  <h1 class="va-h3">Available tests</h1>

  <div v-for="(test, index) in testsData" :key="index" class="card-full">
    <router-link :to="'/quiz/' + test.id">
      <VaCard stripe stripe-color="warning" :bordered="false">
        <VaImage :src="test.testPoster" class="card-image" />
        <VaCardTitle class="card-title">{{ test.testName }}</VaCardTitle>
        <VaCardContent class="card-content">{{ test.testDescription }}</VaCardContent>
      </VaCard>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Main',
  data() {
    return {
      testsData: []
    }
  },
  mounted() {
    axios
      .get('http://hellafragilesite.com/tests.api/tests_eng.php')
      .then((response) => {
        this.testsData = response.data
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
  }
}
</script>

<style scoped>
.card-image {
  height: auto;
  max-height: 300px;
}
.card-content {
  /* color: #8c8c8c; */
  color: #ccc;
  font-size: 14px !important;
}
.card-title {
  font-size: 18px !important;
  color: #ffd842;
}
.card-full {
  margin: 80px 40px;
  cursor: pointer;
  width: 380px;
  height: 300px;
}
.card-full:hover .card-image {
  filter: grayscale(0.5);
}
.va-h3 {
  display: flex;
  width: 100%;
  margin: 0px auto;
  justify-content: center;
  height: fit-content;
}
@media (max-width: 1250px) {
  .card-full {
    width: 100%;
    height: fit-content;
    margin: 20px auto;
  }
  .va-h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .card-image {
    max-height: 250px;
  }
  .card-title {
    font-size: 14px !important;
  }
}
</style>
