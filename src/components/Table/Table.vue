<script setup>
import { ref, computed, useSlots } from "vue";

// 定義 props
const props = defineProps({
    // 資料接口
    columnHeadData: {
        type: Array,
        required: true,
        default: () => [],
    },
    columnCellData: {
        type: Array,
        required: true,
        default: () => [],
    },

    header: {
        //TABLE HEAD
        type: Object,
        required: false,
        default: () => null,
    },
    // 樣式接口
    zebra: {
        //斑馬條紋顯示
        type: Boolean,
    },

    // 動作接口
    rowSelector: {
        //開啟 checkbox
        type: Boolean,
        required: false,
        default: false,
    },
});

// 定義 emits
const emits = defineEmits(["rowSelected"]);

// 複製一份傳入的 columnCellData
const copyColumnCellData = ref([...props.columnCellData]);

// 功能 - row 被點擊時該做的事
function rowSelected(item) {
    console.log("child>>>", item);
    emits("rowSelected", item);
}

// 功能 - 全選
function selectAll(e) {
    const checked = e.target.checked;
    copyColumnCellData.value.forEach((item) => {
        item.selected = checked;
    });
}

// 爲每個 columnHead 初始默認排序狀態
const sortStates = ref(
    props.columnHeadData.reduce((acc, col) => {
        acc[col.key] = "default";
        return acc;
    }, {})
);

// 功能 - 排序
function sort(columnKey) {
    const currentSortState = sortStates.value[columnKey];

    // 切換排序狀態
    if (currentSortState === "default") {
        sortStates.value[columnKey] = "asc";
    } else if (currentSortState === "asc") {
        sortStates.value[columnKey] = "desc";
    } else {
        sortStates.value[columnKey] = "default";
    }

    // 根據排序狀態進行排序
    if (sortStates.value[columnKey] === "asc") {
        copyColumnCellData.value.sort((a, b) =>
            a[columnKey] > b[columnKey] ? 1 : -1
        );
    } else if (sortStates.value[columnKey] === "desc") {
        copyColumnCellData.value.sort((a, b) =>
            a[columnKey] < b[columnKey] ? 1 : -1
        );
    } else {
        // 默認排序，恢復原始順序
        copyColumnCellData.value = [...props.columnCellData];
    }
}

// 取得所有設定的 slot
const slots = useSlots();
// 功能 - 檢查父層有沒有設定具名 slot
function hasNamedSlot(slotName) {
    return !!slots[slotName];
}
</script>

<template>
    <div v-if="header">
        <!-- header id passed as a prop -->
        <h2>{{ header.title }}</h2>
        <p>{{ header.description }}</p>
    </div>
    <div class="table-container">
        <div style="min-width: 100%">
            <table style="border-collapse: collapse" class="table">
                <!-- Table - 控制 column 寬度(對應) -->
                <colgroup>
                    <col style="width: 70px" />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <!-- Table - 標題列 -->
                <thead>
                    <tr>
                        <!-- Table - 標題列 - 根據 props.rowSelector 渲染 checkbox -->
                        <th
                            class="table__header text--left"
                            v-if="rowSelector"
                            scope="col"
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
                            >
                                <input
                                    id="contact-selectAll"
                                    type="checkbox"
                                    value=""
                                    @change="selectAll"
                                    style="margin: 0"
                                />
                            </div>
                        </th>
                        <!-- Table - 標題列 - 根據 fieldData 渲染標題列或透過 slot 客製化 -->
                        <th
                            class="table__header text--left"
                            v-for="(
                                columnHeadItem, columnHeadIdx
                            ) in props.columnHeadData"
                            :key="columnHeadIdx"
                        >
                            <div
                                v-if="
                                    !hasNamedSlot(
                                        `columnHead-${columnHeadItem.key}`
                                    )
                                "
                                :item="columnHeadItem"
                            >
                                {{ columnHeadItem.label }}
                                <button
                                    v-if="columnHeadItem.sort"
                                    @click="sort(columnHeadItem.key)"
                                    style="cursor: pointer"
                                >
                                    {{
                                        sortStates[columnHeadItem.key] === "asc"
                                            ? "升冪"
                                            : sortStates[columnHeadItem.key] ===
                                              "desc"
                                            ? "降冪"
                                            : "默認"
                                    }}
                                </button>
                            </div>
                            <slot
                                v-else
                                :name="`columnHead-${columnHeadItem.key}`"
                                :item="columnHeadItem"
                            />
                        </th>
                    </tr>
                </thead>

                <!-- Table - 單元格 -->
                <tbody>
                    <tr
                        v-for="(
                            columnCellItem, columnCellIdx
                        ) in copyColumnCellData"
                        :key="columnCellIdx"
                    >
                        <!-- Table - 單元格 - 根據 props.rowSelector 渲染 checkbox -->
                        <td
                            v-if="rowSelector"
                            class="table__cell text--left"
                            :style="
                                props.zebra == true && columnCellIdx % 2 === 0
                                    ? 'background-color: #f2f2f2;'
                                    : 'background-color: #fff'
                            "
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
                            >
                                <input
                                    :id="`row-${columnCellIdx}`"
                                    v-model="columnCellItem.selected"
                                    type="checkbox"
                                    style="margin: 0"
                                />
                            </div>
                        </td>
                        <!-- style="min-width: none; max-width: 200px" -->

                        <!-- Table - 單元格 - 根據 fieldData 渲染單元格或透過 slot 客製化 -->
                        <td
                            v-for="(
                                columnHeadItem, columnHeadIdx
                            ) in props.columnHeadData"
                            :key="columnHeadIdx"
                            @click="rowSelected(columnCellItem)"
                            class="table__cell text--left text--ellipsis"
                            style="min-width: none; max-width: 200px"
                            :style="
                                props.zebra == true && dataIdx % 2 === 0
                                    ? 'background-color: #f2f2f2;'
                                    : 'background-color: #fff'
                            "
                        >
                            <span
                                v-if="!hasNamedSlot(columnHeadItem.key)"
                                :item="columnCellItem"
                            >
                                {{ columnCellItem[columnHeadItem.key] }}
                            </span>
                            <slot
                                v-else
                                :name="columnHeadItem.key"
                                :item="columnCellItem"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}
.table-container {
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    overflow-x: auto;
}
.table {
    /* border: 1px solid #f00; */
    min-width: 100%;
}
.table--fixed-layout {
    table-layout: fixed;
    /* text-overflow: ellipsis; */
}
.table__header,
.table__cell {
    border-bottom: 1px solid #f5f5f5;
    vertical-align: middle;
    background-color: #fff;
}

.table__header {
    background-color: #f2f2f2;
    font-size: 12px;
    padding: 12px 24px;
    /* min-width: 100px; */
}
.table__cell {
    padding: 16px 24px;
}

/* 控制 FROZEN CELL */
.table__header:first-child,
.table__cell:first-child {
    position: sticky;
    left: -1px;
    z-index: 1;
}

.cell--break-all {
    word-break: break-all;
}
.cell--break-normal {
    word-break: normal;
}
.cell--break-word {
    word-break: break-word;
}

/*--- th, td 字體對齊 ---*/
.text--left {
    text-align: left;
}
.text--center {
    text-align: center;
}
.text--right {
    text-align: right;
}

/*--- th, td 字體對齊 ---*/
.text--ellipsis {
    /* max-width: 100px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.text--ellipsis:hover {
    overflow: visible;
    white-space: normal;
}

.text--clip {
    /* max-width: 100px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
}
.text--clip:hover {
    overflow: visible;
    white-space: normal;
}

.text--string {
    /* max-width: 100px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: string;
}
.text--string:hover {
    overflow: visible;
    white-space: normal;
}

/*
    table-layout: auto;（預設值）
    行為： 表格的列寬由內容決定。即，列的寬度會根據單元格內容自動調整。如果內容很長，列寬會變大以適應內容，這可能會導致表格渲染變慢，尤其是對於大型表格。
    應用： 這是 table-layout 的默認值，適合需要根據內容自動調整列寬的情境。


    table-layout: fixed;
    行為： 表格的列寬由第一行的單元格寬度決定。即，列的寬度根據表格的總寬度和列數來計算，而不依賴於內容的實際寬度。這使得表格渲染速度更快，因為瀏覽器可以立即計算列的寬度，而不必等待所有內容加載完畢。
    應用： 適合需要一致列寬且不依賴於內容寬度的情境，特別是當表格有大量數據時，可以提高性能和穩定性。
    */
</style>
