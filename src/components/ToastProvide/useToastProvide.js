import { inject } from "vue";

export function useToast() {
    const toast = inject("useToast");

    if (!toast) {
        throw new Error("useToast() must be used within a ToastProvider");
    }

    return toast;
}
