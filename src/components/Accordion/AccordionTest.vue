<script setup>
import { ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
})

const accordionItems = ref([
    ...props.data
]);

const accordionToggle = (index) => {
  accordionItems.value[index].expanded = !accordionItems.value[index].expanded;
};
</script>

<template>
    <div class="accordion__container">
        <ul aria-label="Accordion" class="accordion__list">
            <li v-for="(item, index) in accordionItems" :key="index" class="accordion__item">
                <button
                    class="accordion--button"
                    @click="accordionToggle(index)"
                >
                    <span>{{item.title}}</span>
                    <!-- 箭頭 - 下 -->
                    <template v-if="item.expanded">
                        <div style="width: 24px;height: 24px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="currentColor">
                                <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
                            </svg>
                        </div>
                    </template>

                    <!-- 箭頭 - 上 -->
                    <template v-else>
                        <div style="width: 24px;height: 24px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="currentColor">
                                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                            </svg>
                        </div>
                    </template>

                </button>
                <div
                    class="accordion--body"
                    v-show="item.expanded"
                >
                    <p v-for="(content, i) in item.contents" :key="i">
                        {{ content }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
//$base-margin: 24px;
//$primary-text-color: black;
//$light-text-color: white;
//$gray: gray;

*{
  outline: 1px solid  green;
}

.accordion__container {

    .accordion__list {
        border: 1px solid #f00;
    }
    .accordion__item {
        border-bottom: 1px solid #f00;
        &:last-child {
            border-bottom: none;
        }
    }

    .accordion--button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border: none;
        background: white;
        padding: 16px;
        //outline: none;
        font-size: 16px;
        font-weight: 700;
        color: black;
    }
    .accordion--button.show {
        padding-bottom: 8px;
    }

    // 展開部分
    .accordion--body {
        padding: 0px 16px 16px 16px;
        height: 0;
        transition: height 0.1s;
    }
    .accordion--body.show {
        height: auto;
    }
}
</style>
