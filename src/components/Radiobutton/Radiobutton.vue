<script setup>
import { ref, computed } from "vue";
const props = defineProps({
    modelValue: {
        type: String,
    },
    value: {
        type: String,
    },
    label: {
        type: String,
    },
});
const emits = defineEmits(["update:modelValue"]);
const handleChange = (event) => {
    emits("update:modelValue", event.target.value);
};
// 處理 checked 狀態顯示
const isChecked = computed(() => props.modelValue === props.value);
</script>

<template>
    <input
        type="radio"
        :id="props.value"
        :value="props.value"
        :checked="isChecked"
        @change="handleChange"
    />
    <label :for="props.value">{{ props.label }}</label>
</template>

<style lang="" scoped></style>
