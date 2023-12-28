<script>
import axios from 'axios'

export default {
  data() {
    return {
      testPoster: '',
      testName: '',
      testDescription: '',
      name1: '',
      name2: '',
      name3: '',
      name4: '',
      name5: '',
      name6: '',
      name7: '',
      name8: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      image6: '',
      image7: '',
      image8: '',
      isButtonActive: false
    }
  },
  methods: {
    async submitData() {
      try {
        const response = await axios.post('http://hellafragilesite.com/tests.api/tests_eng.php', {
          testName: this.testName,
          testPoster: this.testPoster,
          testDescription: this.testDescription,
          name1: this.name1,
          image1: this.image1,
          name2: this.name2,
          image2: this.image2,
          name3: this.name3,
          image3: this.image3,
          name4: this.name4,
          image4: this.image4,
          name5: this.name5,
          image5: this.image5,
          name6: this.name6,
          image6: this.image6,
          name7: this.name7,
          image7: this.image7,
          name8: this.name8,
          image8: this.image8
        })

        console.log(response.data)
        this.clearInputFields()
        this.$vaToast.init({
          message: 'Test successfully added',
          color: 'success',
          position: 'bottom-left',
          icon: '✖',
          duration: '7000'
        })
      } catch (error) {
        console.error('Sending Error:', error)
      }
    },
    clearInputFields() {
      this.testName = ''
      this.testPoster = ''
      this.testDescription = ''
      this.name1 = ''
      this.image1 = ''
      this.name2 = ''
      this.image2 = ''
      this.name3 = ''
      this.image3 = ''
      this.name4 = ''
      this.image4 = ''
      this.name5 = ''
      this.image5 = ''
      this.name6 = ''
      this.image6 = ''
      this.name7 = ''
      this.image7 = ''
      this.name8 = ''
      this.image8 = ''
      this.isButtonActive = false
    },
    updateButtonState() {
      this.isButtonActive = !!(
        this.testName &&
        this.testPoster &&
        this.testDescription &&
        this.name1 &&
        this.image1 &&
        this.name2 &&
        this.image2 &&
        this.name3 &&
        this.image3 &&
        this.name4 &&
        this.image4 &&
        this.name5 &&
        this.image5 &&
        this.name6 &&
        this.image6 &&
        this.name7 &&
        this.image7 &&
        this.name8 &&
        this.image8
      )
    }
  }
}
</script>

<template>
  <div class="add-container" v-auto-animate>
    <h1 class="va-h3">Add new test</h1>
    <div class="top-box">
      <VaInput
        @input="updateButtonState"
        v-model="testName"
        placeholder="Name of the test"
        preset="solid"
        color="warning"
        class="top-box-input"
      />
      <VaInput
        @input="updateButtonState"
        v-model="testPoster"
        placeholder="Link to the test poster"
        preset="solid"
        color="warning"
        class="top-box-input"
      />
      <VaInput
        @input="updateButtonState"
        v-model="testDescription"
        placeholder="Test description"
        preset="solid"
        color="warning"
        class="top-box-input"
      />
    </div>
    <h1 class="va-h3">Test Variants</h1>
    <ol class="va-ordered" v-auto-animate>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name1"
          placeholder="Name"
          preset="bordered"
          class="input"
          color="warning"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image1"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name2"
          placeholder="Name"
          preset="bordered"
          color="warning"
          class="input"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image2"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name3"
          placeholder="Name"
          preset="bordered"
          color="warning"
          class="input"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image3"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name4"
          placeholder="Name"
          preset="bordered"
          color="warning"
          class="input"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image4"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name5"
          placeholder="Name"
          preset="bordered"
          color="warning"
          class="input"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image5"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name6"
          placeholder="Name"
          preset="bordered"
          color="warning"
          class="input"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image6"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name7"
          placeholder="Name"
          preset="bordered"
          color="warning"
          class="input"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image7"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
      <li>
        <VaInput
          @input="updateButtonState"
          v-model="name8"
          placeholder="Name"
          preset="bordered"
          color="warning"
          class="input"
        />
        <VaInput
          @input="updateButtonState"
          v-model="image8"
          placeholder="Picture link"
          preset="bordered"
          color="warning"
          class="input"
        />
      </li>
    </ol>
  </div>
  <VaButton @click="submitData" color="warning" gradient class="button" :disabled="!isButtonActive">
    Add
  </VaButton>
</template>

<style scoped>
.add-container {
  width: 100%;
  display: flex;
  justify-content: center !important;
  flex-direction: column;
  height: fit-content;
}
li {
  margin: 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input {
  margin: 0 20px;
}
.va-h3,
.button {
  margin: 0 auto;
}
.top-box {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 30px auto;
}
.top-box-input {
  margin: 10px 0px;
}
@media (max-width: 900px) {
  .va-h3 {
    font-size: 18px;
  }
  li {
    display: flex;
    flex-direction: column;
  }
  .input {
    margin-top: 20px;
    width: 100%;
  }
  .top-box {
    width: 100%;
  }
}
</style>
