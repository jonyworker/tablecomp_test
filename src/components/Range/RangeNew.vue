<script setup>
import { ref, computed  } from 'vue';

// 定義 slider 最大與最小值
const sliderMinVal = ref(0)
const sliderMaxVal = ref(5000)

// 定義選取範圍最大與最小值
const selectedMinValue  = ref(114);
const selectedMaxValue  = ref(514);


// 計算選取範圍中的最大值與最小值
const rangeMinValue  = computed(() => Math.min(selectedMinValue .value, selectedMaxValue .value));
const rangeMaxValue  = computed(() => Math.max(selectedMinValue .value, selectedMaxValue .value));

// 計算選取範圍左右兩側空間
const leftSpaceRatio = computed(() => {
  return (rangeMinValue .value / sliderMaxVal.value) * 100 + .2 + "%"
})
const rightSpaceRatio = computed(() => {
  return 100 - (rangeMaxValue .value / sliderMaxVal.value) * 100 + .2 + "%"
})


</script>

<template>
  <div class="multi-range">
    <div class="slide-track" :style="{'left': leftSpaceRatio, 'right': rightSpaceRatio }">
      <div class="tooltip">{{ `${rangeMinValue} - ${rangeMaxValue}` }}</div>
    </div>
    <input
        type="range"
        :min="sliderMinVal"
        :max="sliderMaxVal"
        v-model="selectedMinValue"
    />
    <input
        type="range"
        :min="sliderMinVal"
        :max="sliderMaxVal"
        v-model="selectedMaxValue "
    />
<!--    <div class="tooltip min-tooltip" :style="{'left': leftSpaceRatio}">{{ rangeMinValue }}</div>-->
<!--    <div class="tooltip max-tooltip" :style="{'right': rightSpaceRatio}">{{ rangeMaxValue }}</div>-->
  </div>
  <div>{{ rangeMinValue }}-{{ rangeMaxValue }}</div>

  <!-- Input Boxes -->
  <div class="input-box">
    <div class="min-box">
      <div class="input-wrap">
        <span class="input-addon">$</span>
        <input
            type="text"
            class="input-field min-input"
            v-model="rangeMinValue"
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
            v-model="rangeMaxValue"
            readonly
        />
      </div>
    </div>
  </div>
</template>



<style scoped>

/*-- slider - 進度條底色 ---*/
.multi-range {
  position: relative;
  width: 100%;
  height: 10px;
  margin: 30px 0;
  background-color: pink;
  border-radius: 30px;
}

/*-- slider - 選取範圍樣式 ---*/
.multi-range .slide-track {
  height: 100%;
  position: absolute;
  background-color: #fe696a;
}
.multi-range .slide-track::before {
  position: relative;
}

/*-- slider - 改寫原生進度條樣式 ---*/
.multi-range input[type="range"] {
  position: absolute;
  height: 100%;
  width: 100%;
  background: none;
  pointer-events: none;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  appearance: none;
  margin: 0;
}

input[type="range"]::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 3px solid #F00;
  background: rgba(255,255,255,.80);
  pointer-events: auto;
  appearance: none;
  cursor: pointer;
  box-shadow: 0 .125rem .5625rem -0.125rem rgba(0, 0, 0, .25);
}

/*-- slider - 提示標籤樣式 ---*/
.tooltip {
  padding: .25rem .5rem;
  border: 1px solid #ddd;
  background-color: black;
  color: #fff;
  font-size: .75rem;
  line-height: 1.2;
  border-radius: .25rem;
  bottom: 120%;
  display: block;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 5;
}
/*.min-tooltip {*/
/*  !*left: 50%;*!*/
/*  left: 0;*/
/*  */
/*}*/
/*.max-tooltip {*/
/*  !*right: 50%;*!*/
/*  transform: translateX(50%) translateY(-100%);*/
/*  z-index: 5;*/
/*}*/


/*-- slider - input 輸入框 ---*/
.input-box {
  display: flex;
  gap: 1rem;
}
.min-box,
.max-box{
  width: 100%;
}
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
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  color: #4b566b;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ddd;
  border-radius: .25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-field:focus {
  outline: none;
}



</style>
