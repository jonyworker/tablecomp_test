<script setup>
import { ref, computed, watch  } from 'vue';

const props = defineProps({
  //樣式接口
  themeColor: {
    type: String,
    default: "#f00",
  },
  // 數據接口
  sliderMinVal:{
    type: Number,
    default: 0
  },
  sliderMaxVal: {
    type: Number,
    default: 5000
  },
  thumbSize: {
    type: [Number, String],
    default: '20',
  }
})

// 單輸入範圍選取 - 定義選取值
const selectedCurrentValue  = ref(114);

// 單輸入範圍選取 - 計算選取範圍右側空間
const unSelectSpaceRatio = computed(() => {
  return 100 - (selectedCurrentValue .value / props.sliderMaxVal) * 100 + "%"
})

// 雙輸入範圍選取 - 定義選取範圍最大與最小值
const selectedMinValue  = ref(114);
const selectedMaxValue  = ref(514);

// 雙輸入範圍選取 - 計算選取範圍中的最大值與最小值
const rangeMinValue  = computed(() => Math.min(selectedMinValue .value, selectedMaxValue .value));
const rangeMaxValue  = computed(() => Math.max(selectedMinValue .value, selectedMaxValue .value));

// 雙輸入範圍選取 - 計算選取範圍左右兩側空間
const leftSpaceRatio = computed(() => {
  return (rangeMinValue .value / (props.sliderMaxVal)) * 100 + "%"
})
const rightSpaceRatio = computed(() => {
  return 100 - (rangeMaxValue .value / props.sliderMaxVal) * 100 + "%"
})

// 監視 props.thumbSize 屬性變更 thumb 大小的 CSS 原生變數的值
watch(() => props.thumbSize, (newThumbSize) => {
  document.documentElement.style.setProperty('--thumbDiameter', `${newThumbSize}px`);
  const thumbWidth = getComputedStyle(document.documentElement).getPropertyValue('--thumbDiameter');
  console.log(thumbWidth);
}, { immediate: true });

</script>

<template>
    <!-- Input - single-slider -->
    <div class="single-slider">
        <div class="slide-track-container">
          <div class="slide-track" :style="{'left': 0, 'right': unSelectSpaceRatio }"></div>
        </div>
        <input
            type="range"
            :min="props.sliderMinVal"
            :max="props.sliderMaxVal"
            v-model="selectedCurrentValue"
        />
    </div>
    <p> single: {{selectedCurrentValue}}</p>


    <!-- Input - double-slider -->
    <div class="double-slider">
      <div class="slide-track-container">
        <div class="slide-track" :style="{'left': leftSpaceRatio, 'right': rightSpaceRatio }"></div>
      </div>
      <input
          type="range"
          :min="props.sliderMinVal"
          :max="props.sliderMaxVal"
          v-model="selectedMinValue"
      />
      <input
          type="range"
          :min="props.sliderMinVal"
          :max="props.sliderMaxVal"
          v-model="selectedMaxValue "
      />
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



<style>
:root {
  --thumbDiameter: 20px;
}
/*-- slider - 進度條底色 ---*/
.single-slider,
.double-slider {
  position: relative;
  width: 100%;
  height: 10px;
  margin: 30px 0;
  background-color: pink;
  border-radius: 30px;
}

.single-slider .slide-track-container,
.double-slider .slide-track-container {
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

/*-- slider - 選取範圍樣式 ---*/
.single-slider .slide-track,
.double-slider .slide-track {
  height: 100%;
  position: absolute;
  background-color: #F00;
  transform: translateX(0%);
}

/*-- slider - 隱藏原生進度條樣式 ---*/
.single-slider input[type="range"],
.double-slider input[type="range"] {
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

/*-- slider - 改寫原生進度 thumb 條樣式 ---*/
input[type="range"]::-webkit-slider-thumb {
  height: var(--thumbDiameter);
  width: var(--thumbDiameter);
  border-radius: 999px;
  border: 1px solid #F00;
  background: rgba(255,255,255);
  pointer-events: auto;
  appearance: none;
  cursor: pointer;
  box-shadow: 0 .125rem .5625rem -0.125rem rgba(0, 0, 0, .25);
  transition: border-width 0.08s;
}
input[type="range"]::-webkit-slider-thumb:hover {
  border-width: 4px;
}

/*-- slider - 自訂 thumb ---*/
/*.slider-thumb{*/
/*  height: var(--thumbDiameter);*/
/*  width: var(--thumbDiameter);*/
/*  border: 1px solid #F00;*/
/*  background: rgba(255,255,255);*/
/*  pointer-events: none;*/
/*  appearance: none;*/
/*  cursor: pointer;*/
/*  box-shadow: 0 .125rem .5625rem -0.125rem rgba(0, 0, 0, .25);*/
/*  transition: border-width 0.08s;*/
/*  top:50%;*/
/*  position: absolute;*/
/*}*/
/*.slider-thumb.min-slider-thumb {*/
/*  transform: translateX(-50%) translateY(-50%);*/
/*}*/
/*.slider-thumb.max-slider-thumb {*/
/*  transform: translateX(50%);*/
/*}*/

/*-- slider - 提示標籤樣式 ---*/
/*.tooltip {*/
/*  padding: .25rem .5rem;*/
/*  border: 1px solid #ddd;*/
/*  background-color: black;*/
/*  color: #fff;*/
/*  font-size: .75rem;*/
/*  line-height: 1.2;*/
/*  border-radius: .25rem;*/
/*  bottom: 120%;*/
/*  display: block;*/
/*  position: absolute;*/
/*  text-align: center;*/
/*  white-space: nowrap;*/
/*}*/
/*.min-tooltip {*/
/*  !*left: 50%;*!*/
/*  left: 0;*/
/*  z-index: 5;*/
/*}*/
/*.max-tooltip {*/
/*  !*right: 50%;*!*/
/*  right: 0;*/
/*  !*transform: translateX(50%) translateY(-100%);*!*/
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
