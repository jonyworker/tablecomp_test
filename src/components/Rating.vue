<script setup>
import { ref } from "vue";

const props = defineProps({
    ratingLimit: {
        type: Number,
        default: 5,
    },
});

// 處理 input 雙向綁定
// const emits = defineEmits(["update:modelValue"]);
// const handleClick = (event) => {
//     emits("update:modelValue", event.target.value);
// };

// 雙向綁定
const modelValue = defineModel();

const ratingModel = ref(modelValue);

// 給滑鼠滑入滑出事件，加入 Temp Rating
ratingModel.value.forEach((movie) => (movie.tempRating = movie.rating));

// 更新 Rating
const setNewRating = (index, rating) => {
    ratingModel.value[index].rating = rating;
    ratingModel.value[index].tempRating = rating; // 確保 tempRating 更新為新的 rating
};

// 滑鼠滑入事件
const onMouseOver = (rating, movie) => {
    movie.tempRating = rating;
};
// 滑鼠滑出事件
const onMouseOut = (movie) => {
    movie.tempRating = movie.rating;
};
</script>

<template>
    <div v-for="(movie, index) in ratingModel" :key="movie.id">
        <!-- 評分部分 -->
        <div class="rating-icons-wrapper">
            <div
                v-for="n in 5"
                :key="n"
                class="rating-icon-button"
                :class="
                    movie.tempRating >= n ? 'color-checked' : 'color-unchecked'
                "
                @mouseover="onMouseOver(n, movie)"
                @mouseout="onMouseOut(movie)"
                @click="setNewRating(index, n)"
            >
                <div class="rating-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.rating-icons-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    /* gap: 0.25rem;  */
}

.rating-icon-button {
    /* border-radius: 0.375rem; */
    cursor: pointer;
}

.rating-icon {
    height: 20px;
    width: 20px;
}
.color-checked {
    color: rgb(234 179 8);
}
.color-unchecked {
    color: rgb(100 116 139);
}
</style>
