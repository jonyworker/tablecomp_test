<script setup>
import { ref } from "vue";
const props = defineProps({});

const menuData = {
    name: "好書推薦",
    childNodes: [
        {
            name: "Git",
            url: null,
            childNodes: [
                {
                    name: "為你自己學 Git",
                    url: "https://www.tenlong.com.tw/products/9789864342662",
                },
            ],
        },
        {
            name: "前端開發",
            url: null,
            childNodes: [
                {
                    name: "金魚都能懂的 CSS 選取器",
                    url: "https://www.tenlong.com.tw/products/9789864344994",
                },
                {
                    name: "0 陷阱！0 誤解！8 天重新認識 JavaScript！",
                    url: "https://www.tenlong.com.tw/products/9789864344130",
                },
                {
                    name: "讓 TypeScript 成為你全端開發的 ACE！",
                    url: "https://www.tenlong.com.tw/products/9789864344895",
                },
            ],
        },
        {
            name: "IoT",
            url: null,
            childNodes: [
                {
                    name: "IoT沒那麼難！新手用 JavaScript 入門做自己的玩具！",
                    url: "https://www.tenlong.com.tw/products/9789864345328",
                },
            ],
        },
        {
            name: "Chatbot",
            url: null,
            childNodes: [
                {
                    name: "人人可作卡米狗：從零打造自己的 LINE 聊天機器人",
                    url: "https://www.tenlong.com.tw/products/9789864342938",
                },
            ],
        },
    ],
};
const isOpen = ref(false);
const handleClick = () => {
    isOpen.value = !isOpen.value;
};
// 過渡鉤子函數
const beforeEnter = (el) => {
    el.style.maxHeight = "0";
    el.style.opacity = "0";
};

const enter = (el, done) => {
    el.offsetHeight; // trigger reflow
    el.style.transition = "max-height 0.3s ease-out, opacity 0.3s ease-out";
    el.style.maxHeight = "500px";
    el.style.opacity = "1";
    done();
};

const leave = (el, done) => {
    el.style.transition = "max-height 0.3s ease-out, opacity 0.3s ease-out";
    el.style.maxHeight = "0";
    el.style.opacity = "0";
    done();
};
</script>

<template>
    isOpen >>>{{ isOpen }}
    <div class="panel">
        <div class="panel__header">
            <button type="button" class="panel__button" @click="handleClick">
                <span class="panel__button-text">header</span>
                <svg
                    class="panel__button-icon"
                    data-accordion-icon=""
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    ></path>
                </svg>
            </button>
        </div>
        <transition
            name="panel__content"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
        >
            <div v-if="isOpen" class="panel__content">
                <div class="panel__text">
                    <p class="panel__description">
                        Flowbite is an open-source library of interactive
                        components built on top of Tailwind CSS including
                        buttons, dropdowns, modals, navbars, and more.
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Block: panel */
.panel {
    /* Styles for the panel block */
}

.panel__header {
    /* Optional: styles specific to the header section */
}
.panel__header:hover {
}

.panel__button {
    display: flex;
    align-items: center;
    padding: 1.25rem; /* p-5 */
    width: 100%;
    font-weight: 500; /* font-medium */
    text-align: left;
    border: 1px solid #e5e7eb; /* border-gray-200 */
    color: #111827; /* text-gray-900 */
    background-color: rgb(249 250 251); /* bg-gray-0 */
    /* border-radius: 0.75rem 0.75rem 0rem 0rem;  */
    border-bottom: 0; /* border-b-0 */
    position: relative;
    transition: background-color 0.3s, border-color 0.3s;
}

.panel__button:hover {
    background-color: rgb(229 231 235);
}

.panel__button-text {
    width: 100%;
}

.panel__button-icon {
    width: 1.5rem; /* w-6 */
    height: 1.5rem; /* h-6 */
    flex-shrink: 0;
    transform: rotate(180deg); /* rotate-180 */
    fill: currentColor;
}

.panel__content {
    padding: 0 1.25rem; /* p-5 for the sides */
    border: 1px solid #e5e7eb; /* border-gray-200 */
    background-color: #fff; /* bg-gray-100 */
    max-height: 0; /* Initial height is 0 */
    overflow: hidden;
    opacity: 0; /* Initial opacity is 0 */
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out; /* Smooth transitions */
}

.panel__content.panel__content-open {
    max-height: 10px; /* Set a large enough height to accommodate content */
    opacity: 1; /* Full opacity when open */
}

.panel__text {
    /* Styles for the text content within the panel */
}

.panel__description {
    margin-bottom: 0.5rem; /* mb-2 */
    color: #6b7280; /* text-gray-500 */
}

.panel__description-dark {
    color: #9ca3af; /* dark:text-gray-400 */
}

.panel__link-text {
    /* Styles for the link text paragraph */
}

.panel__link {
    color: #2563eb; /* text-blue-600 */
}

.panel__link-dark {
    color: #3b82f6; /* dark:text-blue-500 */
}

.panel__link:hover {
    text-decoration: underline; /* hover:underline */
}
</style>
