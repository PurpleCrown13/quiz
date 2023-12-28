<template>
  <div v-if="!winnerVariant" class="quiz-box" v-auto-animate>
    <h1 class="quiz-name">{{ testName }}</h1>
    <h1 class="quiz-stage" v-auto-animate>
      {{
        stageText === 'Final'
          ? stageText
          : stageText + (this.iteration + 1) + '/' + stageIterations + ' round'
      }}
    </h1>
    <div class="quiz-variants-box">
      <div v-if="currentVariants.length > 0" class="color-block-container">
        <div class="color-block left-block" v-auto-animate>
          <label
            v-for="(variant, index) in currentVariants.slice(0, currentVariants.length / 2)"
            :key="index"
            class="labla"
          >
            <div
              class="blured-image-left"
              :style="{ 'background-image': 'url(' + currentVariants[0].image + ')' }"
            ></div>
            <VaRadio
              v-model="selectedVariant"
              :option="variant"
              color="warning"
              name="color-radio-group"
              class="radio-btn"
            />
            <img v-bind:src="variant.image" alt="вариант" class="variant-image" />
          </label>
        </div>
        <div class="color-block left-block" v-auto-animate>
          <label
            v-for="(variant, index) in currentVariants.slice(currentVariants.length / 2)"
            :key="index"
            class="labla"
          >
            <div
              class="blured-image-right"
              :style="{ 'background-image': 'url(' + currentVariants[1].image + ')' }"
            ></div>
            <VaRadio
              v-model="selectedVariant"
              :option="variant"
              color="warning"
              name="color-radio-group"
              class="radio-btn"
            />
            <img v-bind:src="variant.image" alt="вариант" class="variant-image" />
          </label>
        </div>
      </div>
      <VaButton @click="nextStage" class="next-btn" color="warning" gradient>Choose</VaButton>
    </div>
  </div>
  <div v-if="winnerVariant" v-auto-animate class="winner-box">
    <div class="alert">
      <img src="/public/success.svg" alt="success" />
      <p>You have completed the test "{{ testName }}"</p>
    </div>
    <div class="alert-winner">
      <img src="/public/winner.svg" alt="winner" />
      <p>Winner "{{ this.winnerVariant.text }}"</p>
    </div>
    <img :src="winnerVariant.image" alt="WinnerImage" class="winner-image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      stages: [
        { text: '1 stage ', iterations: 4 },
        { text: '2 stage ', iterations: 2 },
        { text: 'Final', iterations: 1 }
      ],
      currentStage: 0,
      currentVariants: [],
      selectedVariant: null,
      selectedVariants1: [],
      selectedVariants2: [],
      winnerVariant: null,
      iteration: 0,
      iteration2: 0,
      testName: ''
    }
  },
  computed: {
    stageText() {
      return this.stages[this.currentStage].text
    },
    stageIterations() {
      return this.stages[this.currentStage].iterations
    }
  },
  methods: {
    startStage() {
      this.currentVariants = this.getVariantsForCurrentStage()
      this.selectedVariant = null
      this.iteration = 0
    },
    nextStage() {
      this.iteration2 = 0

      if (this.selectedVariant) {
        if (this.currentStage === 0) {
          this.selectedVariants1.push(this.selectedVariant)
        } else if (this.currentStage === 1) {
          this.selectedVariants2.push(this.selectedVariant)
          this.iteration2++
        }

        this.iteration++

        if (this.iteration < this.stages[this.currentStage].iterations) {
          this.currentVariants = this.getVariantsForCurrentStage()
          this.selectedVariant = null
        } else if (this.currentStage < this.stages.length - 1) {
          this.currentStage++
          this.startStage()
        } else {
          this.winnerVariant = this.selectedVariant
        }
      }
    },
    getVariantsForCurrentStage() {
      let variants
      if (this.currentStage === 0) {
        const startIndex = this.iteration * 2
        variants = this.allVariants.slice(startIndex, startIndex + 2)
      } else if (this.currentStage === 1) {
        const startIndex = this.iteration2 * 2
        console.log(startIndex)
        variants = this.selectedVariants1.slice(startIndex, startIndex + 2)
        console.log(variants)
      } else {
        variants = this.selectedVariants2
      }
      return variants
    },
    shuffleVariants() {
      this.allVariants = this.shuffleArray(this.allVariants)
    },
    shuffleArray(array) {
      let currentIndex = array.length,
        randomIndex

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
      }

      return array
    }
  },

  mounted() {
    const idFromRoute = this.$route.params.id

    const apiUrl = `http://hellafragilesite.com/tests.api/tests_eng.php`

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const selectedTest = data.find((test) => test.id === idFromRoute)
          if (selectedTest) {
            this.testName = selectedTest.testName
            const allVariants = []
            for (let i = 1; i <= 8; i++) {
              const variant = {
                image: selectedTest[`image${i}`],
                text: selectedTest[`name${i}`]
              }
              allVariants.push(variant)
            }
            this.allVariants = allVariants
            this.shuffleVariants()
            this.startStage()
          } else {
            console.error('Test with id', idFromRoute, 'not found')
          }
        } else {
          console.error('Wrong API:', data)
        }
      })
      .catch((error) => {
        console.error('API fetch error:', error)
      })
  }
}
</script>

<style>
.color-block-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.color-block {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quiz-box {
  width: 100%;
  height: 89vh;
}

.quiz-name {
  background-color: #050a10;
  font-size: 24px;
  padding: 10px;
  display: flex;
  justify-content: center;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
}
.quiz-stage {
  background-color: #1d1c21;
  font-size: 24px;
  padding: 10px;
  display: flex;
  justify-content: center;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
}
.quiz-variants-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
}

.color-block:hover {
  cursor: pointer !important;
  opacity: 0.8;
}

.variant-image {
  height: 400px;
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 0px 60px 5px rgba(255, 212, 58, 0.52);
}

.labla {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.blured-image-left {
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  background-color: #1d1c21;
  background-size: cover;
}

.blured-image-right {
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  background-color: #1d1c21;
  background-size: cover;
}

.radio-btn {
  display: flex;
  justify-content: center;
  z-index: 999;
  position: relative;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 18px;
  background: rgba(29, 28, 33, 0.6);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  width: 100%;
  padding: 3px 0px;
}
.next-btn {
  margin-top: 20px;
}

.winner-box {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.alert {
  display: flex;
  flex-direction: row;
  background-color: #ffd43a;
  padding: 10px;
  color: #222;
  justify-content: space-between;
  width: fit-content;
  margin: 20px auto;
  align-items: center;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid #ffd43a;
}

.alert-winner {
  display: flex;
  flex-direction: row;
  background-color: #050a10;
  padding: 10px;
  color: #fff;
  justify-content: space-between;
  width: fit-content;
  margin: 20px auto;
  align-items: center;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid #ffd43a;
}
.alert p,
.alert-winner p {
  font-size: 16px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
}
.alert img,
.alert-winner img {
  margin-right: 10px;
}
.winner-image {
  max-height: 500px;
  max-width: 30%;
  margin: 20px auto;
  border-radius: 10px;
}
@media (max-width: 1000px) {
  .quiz-name,
  .quiz-stage,
  .radio-btn {
    font-size: 14px;
  }

  .quiz-box {
    height: fit-content;
  }
  .color-block-container {
    display: flex;
    flex-direction: column;
  }
  .color-block {
    width: 100%;
    height: 500px;
  }
  .radio-btn {
    justify-content: flex-start;
  }
  .quiz-variants-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: auto;
  }
  .winner-image {
    max-height: 500px;
    max-width: 80%;
    margin: 20px auto;
    border-radius: 10px;
  }
  .variant-image {
    height: 300px;
    max-width: 600px;
  }
}
</style>
