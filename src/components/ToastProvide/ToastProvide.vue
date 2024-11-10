<template>
    <div class="toast-container">
        <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="['toast', `toast-${toast.type}`]"
            @click="removeToast(toast.id)"
        >
            {{ toast.message }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { ref, provide } from "vue";

export default {
    name: "ToastProvider",
    setup() {
        const toasts = ref([]);
        let nextId = 0;

        const addToast = (message, type = "info", duration = 3000) => {
            const id = nextId++;
            const toast = {
                id,
                message,
                type,
            };

            toasts.value.push(toast);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        };

        const removeToast = (id) => {
            const index = toasts.value.findIndex((toast) => toast.id === id);
            if (index > -1) {
                toasts.value.splice(index, 1);
            }
        };

        // 提供 toast 方法給子組件
        provide("useToast", {
            addToast,
            removeToast,
            success: (msg, duration) => addToast(msg, "success", duration),
            error: (msg, duration) => addToast(msg, "error", duration),
            info: (msg, duration) => addToast(msg, "info", duration),
            warning: (msg, duration) => addToast(msg, "warning", duration),
        });

        return {
            toasts,
            removeToast,
        };
    },
};
</script>

<style scoped>
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
}

.toast {
    padding: 12px 24px;
    margin-bottom: 8px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    min-width: 250px;
    animation: fadeIn 0.3s ease;
}

.toast-success {
    background-color: #4caf50;
}

.toast-error {
    background-color: #f44336;
}

.toast-info {
    background-color: #2196f3;
}

.toast-warning {
    background-color: #ff9800;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
