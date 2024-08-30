<script setup>
import { ref, onMounted } from "vue";

// Reactive references for the slider values and tooltips
const minVal = ref(2000);
const maxVal = ref(7000);
const minTooltip = ref("$2000");
const maxTooltip = ref("$7000");
const minGap = 0;
const minInput = ref(minVal.value);
const maxInput = ref(maxVal.value);

// Update the slider values and tooltips
function updateMin() {
  if (maxVal.value - minVal.value <= minGap) {
    minVal.value = maxVal.value - minGap;
  }
  minTooltip.value = `$${minVal.value}`;
  minInput.value = minVal.value;
}

function updateMax() {
  if (maxVal.value - minVal.value <= minGap) {
    maxVal.value = minVal.value + minGap;
  }
  maxTooltip.value = `$${maxVal.value}`;
  maxInput.value = maxVal.value;
}

// Run these functions when the component is mounted
onMounted(() => {
  updateMin();
  updateMax();
});
</script>

<template>
  <div class="double-slider-box">
    ran
    <h3 class="range-title">Price Range Slider</h3>

    <!-- Input Range Slider -->
    <div class="range-slider">
      <span class="slider-track"></span>
      <input
          type="range"
          class="min-val"
          :min="1000"
          :max="12000"
          v-model="minVal"
          @input="updateMin"
      />
      <input
          type="range"
          class="max-val"
          :min="1000"
          :max="12000"
          v-model="maxVal"
          @input="updateMax"
      />
      <div class="tooltip min-tooltip">{{ minTooltip }}</div>
      <div class="tooltip max-tooltip">{{ maxTooltip }}</div>
    </div>

    <!-- Number Input Boxes -->
    <div class="input-box">
      <div class="min-box">
        <div class="input-wrap">
          <span class="input-addon">$</span>
          <input
              type="text"
              class="input-field min-input"
              v-model="minInput"
              readonly
          />
        </div>
      </div>

      <div class="max-box">
        <div class="input-wrap">
          <span class="input-addon">$</span>
          <input
              type="text"
              class="input-field max-input"
              v-model="maxInput"
              readonly
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
*{
  box-sizing: border-box;
  /*outline: 1px solid green;*/
}

.double-slider-box {
  background-color: #fff;
  padding: 20px 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 20rem;
}

h3.range-title {
  margin-bottom: 4rem;
}

/* Range 總範圍 */
.range-slider {
  position: relative;
  width: 100%;
  height: 5px;
  margin: 30px 0;
  background-color: pink;
}

/* Range 選取範圍 */
.slider-track {
  height: 100%;
  position: absolute;
  background-color: #fe696a;

}

.range-slider input {
  position: absolute;
  width: 100%;
  background: none;
  pointer-events: none;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  appearance: none;

}

input[type="range"]::-webkit-slider-thumb {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 3px solid #F00;
  background: #FFF;
  pointer-events: auto;
  appearance: none;
  cursor: pointer;
  box-shadow: 0 .125rem .5625rem -0.125rem rgba(0, 0, 0, .25);
}

input[type="range"]::-moz-range-thumb {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 3px solid #FFF;
  background: #FFF;
  pointer-events: auto;
  -moz-appearance: none;
  cursor: pointer;
  box-shadow: 0 .125rem .5625rem -0.125rem rgba(0, 0, 0, .25);
}

/* slider 選取範圍顏色 */
.tooltip {
  padding: .25rem .5rem;
  border: 1px solid #ddd;
  background-color: yellow;
  color: #fff;
  font-size: .75rem;
  line-height: 1.2;
  border-radius: .25rem;
  bottom: 120%;
  display: block;
  position: absolute;
  text-align: center;
  white-space: nowrap;
}
.min-tooltip {
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  z-index: 5;
}
.max-tooltip {
  right: 50%;
  transform: translateX(50%) translateY(-100%);
  z-index: 5;
}
.input-box {
  display: flex;
  gap: 1rem;
}
.min-box,
.max-box{
  width: 50%;
}


/*=== 數字輸入框 ===*/
.input-wrap {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}
.input-addon {
  display: flex;
  align-items: center;
  padding: .625rem 1rem;
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: #4b566b;
  text-align: center;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: .25rem 0 0 .25rem;
}
.input-field {
  margin-left: -1px;
  padding: .425rem .75rem;
  font-size: .8125rem;
  border-radius: .25rem;
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  color: #4b566b;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ddd;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-field:focus {
  outline: none;
}
</style>
