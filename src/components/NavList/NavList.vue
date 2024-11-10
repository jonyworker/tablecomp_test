<template>
    <nav class="nav-content">
        <div v-for="item in navItems" :key="item.path" class="nav-item-wrapper">
            <button
                class="nav-item"
                :class="{
                    centered: !isExpanded,
                    active: activePath === item.path,
                }"
                @click.stop="handleItemClick(item)"
            >
                <div class="item-content">
                    <i class="icon" v-html="item.icon"></i>
                    <Transition name="fade-delay">
                        <span v-if="isExpanded" class="label">{{
                            item.label
                        }}</span>
                    </Transition>
                </div>
                <i
                    v-if="isExpanded && item.children"
                    class="icon submenu-icon"
                    v-html="
                        expandedItems[item.path]
                            ? chevronDownIcon
                            : chevronRightIcon
                    "
                ></i>
            </button>

            <!-- Submenu Items -->
            <div
                v-if="isExpanded && item.children && expandedItems[item.path]"
                class="submenu"
            >
                <button
                    v-for="child in item.children"
                    :key="child.path"
                    class="submenu-item"
                    :class="{ active: activePath === child.path }"
                    @click.stop="handleItemClick(child)"
                >
                    <span class="submenu-label">{{ child.label }}</span>
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const chevronRightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const chevronDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

const props = defineProps({
    // 導航項目列表
    navItems: {
        type: Array,
        required: true,
        default: () => [],
    },
    // 是否展開導航
    isExpanded: {
        type: Boolean,
        default: true,
    },
    // 當前激活的路徑
    activePath: {
        type: String,
        default: "",
    },
    // 向下箭頭圖標
    chevronDownIcon: {
        type: String,
        default: "<svg>...</svg>", // 這裡填入您的SVG圖標
    },
    // 向右箭頭圖標
    chevronRightIcon: {
        type: String,
        default: "<svg>...</svg>", // 這裡填入您的SVG圖標
    },
});

const emit = defineEmits(["update:activePath", "itemClick"]);

// 追踪展開的子菜單
const expandedItems = ref({});

// 處理項目點擊
const handleItemClick = (item) => {
    if (item.children) {
        // 切換子菜單的展開狀態
        expandedItems.value[item.path] = !expandedItems.value[item.path];
    } else {
        // 更新活動路徑並發出事件
        emit("update:activePath", item.path);
        emit("itemClick", item);
    }
};
</script>

<style scoped>
.nav-content {
    padding: 8px;
}

.nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    margin: 4px 0;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background: transparent;
}

.nav-item:hover {
    background-color: #f3f4f6;
}

.nav-item.active {
    background-color: #e5e7eb;
}

.nav-item.centered {
    justify-content: center;
}

.item-content {
    display: flex;
    align-items: center;
}

.icon {
    color: #4b5563;
}

.label {
    margin-left: 12px;
}

.submenu-icon {
    color: #9ca3af;
    width: 16px;
    height: 16px;
}

.submenu {
    margin-left: 24px;
    margin-top: 4px;
}

.submenu-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: 0.875rem;
    color: #4b5563;
    border-radius: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
}

.submenu-item:hover {
    background-color: #f3f4f6;
}

.submenu-item.active {
    background-color: #e5e7eb;
}

.submenu-label {
    margin-left: 8px;
}

.fade-delay-enter-active {
    transition: all 0.1s ease 0.1s; /* 前面是動畫時間，後面的是延遲時間 */
}

.fade-delay-leave-active {
    transition: all 0.1s ease;
}

.fade-delay-enter-from,
.fade-delay-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
