<template>
    <div
        class="navigation-list w-64 bg-white shadow-lg rounded-lg overflow-hidden"
    >
        <div class="flex flex-col">
            <!-- Dashboard Item -->
            <div
                class="list-item flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                @click="navigateTo('dashboard')"
            >
                <span class="material-icons-outlined mr-3 text-gray-600"
                    >dashboard</span
                >
                <span class="text-gray-700">Dashboard</span>
            </div>

            <!-- Department Work Logs -->
            <div
                class="list-item flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                @click="navigateTo('groupWorkLogs')"
            >
                <span class="material-icons-outlined mr-3 text-gray-600"
                    >business_center</span
                >
                <span class="text-gray-700">部門工時紀錄</span>
            </div>

            <!-- Personal Work Logs -->
            <div
                class="list-item flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                @click="navigateTo('personalWorkLogs')"
            >
                <span class="material-icons-outlined mr-3 text-gray-600"
                    >assignment_ind</span
                >
                <span class="text-gray-700">工時紀錄</span>
            </div>

            <!-- Settings Group -->
            <div class="border-t border-gray-200">
                <div
                    class="list-item flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                    @click="toggleSettingsGroup"
                >
                    <span class="material-icons-outlined mr-3 text-gray-600"
                        >settings</span
                    >
                    <span class="text-gray-700 flex-grow">系統維護</span>
                    <span class="material-icons-outlined text-gray-500">
                        {{ isSettingsOpen ? "expand_more" : "chevron_right" }}
                    </span>
                </div>

                <!-- Settings Subitems -->
                <TransitionGroup>
                    <div v-if="isSettingsOpen" class="bg-gray-50">
                        <div
                            v-for="[title, path] in settingItems"
                            :key="path"
                            class="list-item flex items-center p-3 pl-11 hover:bg-gray-100 cursor-pointer"
                            @click="navigateTo(path)"
                        >
                            <span class="text-gray-700">{{ title }}</span>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// State
const isSettingsOpen = ref(false);

// Settings menu items
const settingItems = [
    ["使用者管理", "userManagement"],
    ["角色權限", "rolePermissions"],
    ["系統設定", "systemSettings"],
];

// Methods
const navigateTo = (path) => {
    console.log(`Navigating to: ${path}`);
    // 在這裡實現您的導航邏輯
    // 例如使用 router.push(path)
};

const toggleSettingsGroup = () => {
    isSettingsOpen.value = !isSettingsOpen.value;
};
</script>

<style scoped>
.list-item {
    transition: all 0.2s ease;
}

/* 進入和離開動畫 */
.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* 可選：添加漣漪效果 */
.list-item:active {
    background-color: rgb(243 244 246);
}
</style>
