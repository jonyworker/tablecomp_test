<script setup>
import { ref, computed, useSlots } from "vue";

// Define props
const props = defineProps({
    // 資料接口
    fields: {
        // 標題列資料
        type: Array,
        required: true,
        default: () => [],
    },
    tableData: {
        // 標題列資料
        type: Array,
        required: true,
        default: () => [],
    },
    // 資料接口
    header: {
        type: Object,
        required: false,
        default: () => null,
    },

    rowSelector: {
        type: Boolean,
        required: false,
        default: false,
    },
    zebra: {
        type: Boolean,
    },
});

// Define emits
const emit = defineEmits(["rowSelected", "selectFiledAll"]);

// Reactive tableData
const tableData = ref([...props.tableData]);

// row 被點擊時該做的事
function rowSelected(item) {
    console.log("item", item);
    emit("rowSelected", item);
}

// row 被點擊時該做的事
function selectFiledAll(item) {
    console.log("item", item);
    emit("selectFiledAll", item);
}
// 全選
function selectAll(e) {
    const checked = e.target.checked;
    tableData.value.forEach((item) => {
        item.selected = checked;
    });
}

// 檢查父層有沒有具名 slot
function hasNamedSlot(slotName) {
    return !!slots[slotName];
}

// 取用父層template slot
const slots = useSlots();
</script>

<template>
    <div v-if="header">
        <!-- header id passed as a prop -->
        <h2>{{ header.title }}</h2>
        <p>{{ header.description }}</p>
    </div>
    <div class="table-container">
        <div style="min-width: 100%">
            <table
                style="border-collapse: collapse"
                class="table table--fixed-layout"
            >
                <!-- 設定欄位寬度 -->
                <colgroup>
                    <!-- 到時可寫一支渲染程式 -->
                    <!-- Checkbox -->
                    <col />
                    <!-- Delivery ID -->
                    <col style="min-width: 150px" />
                    <!-- 發票號碼 -->
                    <col style="min-width: 150px" />
                    <!-- 發票日期 -->
                    <col style="min-width: 100px" />
                    <!-- 幣別 -->
                    <col />
                    <!-- 匯率 -->
                    <col style="min-width: 65px; width: 100px" />
                    <!-- 總價 -->
                    <col />
                    <!-- 預計出貨日 -->
                    <col style="min-width: 90px" />
                    <!-- 明細 -->
                    <col />
                    <!-- 編輯 -->
                    <col />
                    <!-- 更新 -->
                    <col />
                    <!-- 列印 -->
                    <col />
                    <!-- 出貨 -->
                    <col />
                    <!-- 廢除 -->
                    <col />
                    <!-- 選擇 -->
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <!-- 選取框 rowSelector 為 true 可選取 -->
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

                        <!-- 渲染 filed -->
                        <th
                            class="table__header text--left"
                            v-for="(filed, filedIdx) in fields"
                            :key="filedIdx"
                        >
                            <span
                                v-if="!hasNamedSlot(`filed-${filed.key}`)"
                                :item="filed"
                            >
                                {{ filed.label }}
                            </span>
                            <slot
                                v-else
                                :name="`filed-${filed.key}`"
                                :item="filed"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(dataItem, dataIdx) in tableData" :key="dataIdx">
                        <td
                            v-if="rowSelector"
                            class="table__cell text--left"
                            :style="
                                props.zebra == true && dataIdx % 2 === 0
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
                                    :id="`${dataIdx}`"
                                    v-model="dataItem.selected"
                                    type="checkbox"
                                    style="margin: 0"
                                />
                            </div>
                        </td>
                        <!-- style="min-width: none; max-width: 200px" -->
                        <!-- @click="rowSelected(dataItem)" -->
                        <td
                            v-for="(field, filedIdx) in fields"
                            :key="filedIdx"
                            class="table__cell text--left"
                            :style="
                                props.zebra == true && dataIdx % 2 === 0
                                    ? 'background-color: #f2f2f2;'
                                    : 'background-color: #fff'
                            "
                        >
                            <span
                                v-if="!hasNamedSlot(field.key)"
                                :item="dataItem"
                            >
                                {{ dataItem[field.key] }}
                            </span>
                            <slot v-else :name="field.key" :item="dataItem" />
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
    /* border-radius: 4px; */
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
    border: 1px solid #e7e7e7;
    vertical-align: middle;
    background-color: #fff;
}

.table__header {
    border-color: #f2f2f2;
    background-color: #212529;
    border-top: none;
    font-size: 12px;
    padding: 8px;
    color: #fff;
}
.table__cell {
    padding: 16px 8px;
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
