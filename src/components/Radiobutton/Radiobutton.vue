<script setup>
import { ref, computed } from "vue";
const props = defineProps({
    modelValue: {
        type: String,
    },
    inputId: {
        type: String, //
    },
    name: {
        type: String, //同名同群組
    },
    value: {
        type: String,
    },
    label: {
        type: String,
    },
});
// 處理雙向綁定
const emits = defineEmits(["update:modelValue"]);
const handleChange = (event) => {
    emits("update:modelValue", event.target.value);
};
// 處理 checked 狀態顯示
const isChecked = computed(() => props.modelValue === props.value);
</script>

<template>
    {{ isChecked }}
    <label :for="props.inputId" class="radio">
        <input
            class="radio-input"
            type="radio"
            :inputId="props.inputId"
            :name="props.name"
            :value="props.value"
            :checked="isChecked"
            @change="handleChange"
        />
        <!-- <div class="radio-icon radio-unchecked-primary">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                viewBox="0 -960 960 960"
                width="100%"
                fill="currentColor"
            >
                <path
                    d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                ></path>
            </svg>
        </div> -->
        <span class="radio-text">{{ props.label }}</span>
    </label>
</template>

<style lang="" scoped></style>
