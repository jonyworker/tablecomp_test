<script setup>
import { ref, onMounted, onUnmounted, defineProps, watch } from "vue";

const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        default: 3000,
    },
    type: {
        type: String,
        default: "info",
        validator: (value) =>
            ["info", "success", "warning", "error"].includes(value),
    },
    themeColor: {
        type: String,
        default: "primary",
        validator: (value) =>
            [
                "primary",
                "secondary",
                "tertiary",
                "success",
                "warning",
                "error",
                "info",
            ].includes(value),
    },
    show: {
        type: Boolean,
        default: false,
    },
});

const isVisible = ref(props.show);
let timer = ref(null);

const show = () => {
    clearTimeout(timer.value); // Clear any existing timer before starting a new one
    isVisible.value = true;
    timer.value = setTimeout(() => {
        isVisible.value = false;
    }, props.duration);
};

watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            show();
        } else {
            clearTimeout(timer.value); // Clear timer if show prop becomes false
        }
    }
);

onMounted(() => {
    if (props.show) show();
});

onUnmounted(() => {
    clearTimeout(timer.value); // Ensure timer is cleared on component unmount
});
</script>

<template>
    <teleport to="body">
        <transition name="toast">
            <div
                v-if="isVisible"
                class="toast"
                :class="{ `toast-${props.themeColor}` }"
            >
                {{ message }}
            </div>
        </transition>
    </teleport>
</template>

<style scoped>
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    z-index: 9999;
}

/* Add class-based styles for different theme colors */
.toast-primary {
    background-color: #007bff;
    color: #fff;
}

.toast-secondary {
    background-color: #868e96;
    color: #fff;
}

.toast-tertiary {
    background-color: #20c997;
    color: #fff;
}

.toast-success {
    background-color: #28a745;
    color: #fff;
}

.toast-warning {
    background-color: #ffc107;
    color: #000;
}

.toast-error {
    background-color: #dc3545;
    color: #fff;
}

.toast-info {
    background-color: #007bff;
    color: #fff;
    opacity: 0.9;
}

/* Animate toast entrance and exit (optional) */
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease-in-out;
}
.toast-enter,
.toast-leave-to /* .toast-leave-from in Vue 3 */ {
    opacity: 0;
}
</style>
