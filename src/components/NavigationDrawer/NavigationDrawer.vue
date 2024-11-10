<template>
    <div class="demo-container">
        <!-- 左側導航欄 -->
        <div class="nav-drawer" :class="{ expanded: isExpanded }">
            <!-- Drawer Header -->
            <div class="drawer-header">
                <span v-if="isExpanded" class="title">選單</span>
                <button class="toggle-btn" @click="toggleDrawer">
                    <i
                        class="icon"
                        v-html="isExpanded ? chevronLeftIcon : chevronRightIcon"
                    ></i>
                </button>
            </div>

            <!-- Navigation Items -->
            <nav class="nav-content">
                <div
                    v-for="item in navItems"
                    :key="item.path"
                    class="nav-item-wrapper"
                >
                    <button
                        class="nav-item"
                        :class="{
                            centered: !isExpanded,
                            active: activePath === item.path,
                        }"
                        @click="handleItemClick(item)"
                    >
                        <div class="item-content">
                            <i class="icon" v-html="item.icon"></i>
                            <span v-if="isExpanded" class="label">{{
                                item.label
                            }}</span>
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
                        v-if="
                            isExpanded &&
                            item.children &&
                            expandedItems[item.path]
                        "
                        class="submenu"
                    >
                        <button
                            v-for="child in item.children"
                            :key="child.path"
                            class="submenu-item"
                            :class="{ active: activePath === child.path }"
                            @click="handleItemClick(child)"
                        >
                            <span class="submenu-label">{{ child.label }}</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>

        <!-- 右側內容區域 -->
        <div class="content-area">
            <div class="demo-header">
                <h1>導航欄操作展示</h1>
            </div>

            <div class="demo-content">
                <div class="demo-section">
                    <h2>當前狀態：</h2>
                    <div class="status-info">
                        <p>導航欄狀態：{{ isExpanded ? "展開" : "收合" }}</p>
                        <p>當前路徑：{{ activePath }}</p>
                        <p>
                            展開的子選單：{{
                                Object.keys(expandedItems)
                                    .filter((key) => expandedItems[key])
                                    .join(", ") || "無"
                            }}
                        </p>
                    </div>
                </div>

                <div class="demo-section">
                    <h2>操作指南：</h2>
                    <ul class="instructions">
                        <li>點擊左上角箭頭可以展開/收合導航欄</li>
                        <li>點擊選單項目可以選中該項目</li>
                        <li>帶有子選單的項目可以點擊展開/收合子選單</li>
                        <li>收合狀態下只顯示圖標</li>
                        <li>懸停在項目上會顯示背景效果</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// Icons (與之前相同)
const homeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
const usersIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const fileIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`;
const mailIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
const chevronRightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const chevronLeftIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const chevronDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

// Navigation items (與之前相同)
const navItems = [
    {
        icon: homeIcon,
        label: "首頁",
        path: "/",
    },
    {
        icon: usersIcon,
        label: "用戶管理",
        path: "/users",
        children: [
            { label: "用戶列表", path: "/users/list" },
            { label: "用戶設置", path: "/users/settings" },
        ],
    },
    {
        icon: fileIcon,
        label: "文件管理",
        path: "/files",
        children: [
            { label: "所有文件", path: "/files/all" },
            { label: "已分享", path: "/files/shared" },
        ],
    },
    {
        icon: mailIcon,
        label: "訊息中心",
        path: "/messages",
    },
    {
        icon: settingsIcon,
        label: "系統設置",
        path: "/settings",
    },
];

// State
const isExpanded = ref(true);
const expandedItems = reactive({});
const activePath = ref("/");

// Methods
const toggleDrawer = () => {
    isExpanded.value = !isExpanded.value;
};

const toggleSubMenu = (path) => {
    expandedItems[path] = !expandedItems[path];
};

const handleItemClick = (item) => {
    if (item.children) {
        toggleSubMenu(item.path);
    }
    activePath.value = item.path;
};
</script>

<style scoped>
/* 基礎容器樣式 */
.demo-container {
    display: flex;
    min-height: 100vh;
    background-color: #f9fafb;
}

/* 導航欄樣式 (與之前相同) */
.nav-drawer {
    height: 100vh;
    background-color: white;
    border-right: 1px solid #e5e7eb;
    transition: width 0.3s ease;
    width: 64px;
}

.nav-drawer.expanded {
    width: 256px;
}

.drawer-header {
    height: 64px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
}

.title {
    font-weight: 600;
    font-size: 1.125rem;
}

.toggle-btn {
    padding: 8px;
    border-radius: 8px;
}

.toggle-btn:hover {
    background-color: #f3f4f6;
}

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

/* 內容區域樣式 */
.content-area {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
}

.demo-header {
    margin-bottom: 24px;
}

.demo-header h1 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #111827;
}

.demo-content {
    max-width: 800px;
}

.demo-section {
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 16px;
}

.status-info p {
    margin-bottom: 8px;
    color: #4b5563;
}

.instructions {
    list-style-type: disc;
    padding-left: 20px;
}

.instructions li {
    margin-bottom: 8px;
    color: #4b5563;
}
</style>
