<script setup>
import { ref, computed, useSlots } from "vue";

// Define props
const props = defineProps({
    data: {
        type: Array,
        required: true,
        default: () => [],
    },
    header: {
        type: Object,
        required: false,
        default: () => null,
    },
    fields: {
        type: Array,
        required: true,
        default: () => [],
    },
    rowSelector: {
        type: Boolean,
        required: false,
        default: false,
    },
});

// Define emits
const emit = defineEmits(["rowSelected"]);

// Reactive data
const data = ref([...props.data]);

// row 被點擊時該做的事
function rowSelected(item) {
    console.log("item", item);
    emit("rowSelected", item);
}
// 全選
function selectAll(e) {
    const checked = e.target.checked;
    data.value.forEach((item) => {
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
    <table style="border-collapse: collapse" class="mytable">
        <thead>
            <tr>
                <th class="table__header" v-if="rowSelector" scope="col">
                    <div>
                        <input
                            id="contact-selectAll"
                            type="checkbox"
                            value=""
                            @change="selectAll"
                        />
                    </div>
                </th>
                <th
                    class="table__header"
                    v-for="(item, idx) in fields"
                    :key="idx"
                    width="20000px"
                >
                    {{ item.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data" :key="index">
                <td class="table__cell" v-if="rowSelector">
                    <div>
                        <input
                            :id="`contact-${index}`"
                            v-model="item.selected"
                            type="checkbox"
                        />
                    </div>
                </td>
                <td
                    v-for="(field, idx) in fields"
                    :key="idx"
                    @click="rowSelected(item)"
                    class="table__cell text--ellipsis"
                >
                    <span v-if="!hasNamedSlot(field.key)" :item="item">
                        {{ item[field.key] }}
                    </span>
                    <slot v-else :name="field.key" :item="item" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
* {
    box-sizing: border-box;
}
.table__header,
.table__cell {
    border: 1px solid #000;
    padding: 20px;
}
.table--fixed-layout {
    table-layout: fixed;
    /* text-overflow: ellipsis; */
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
.text--ellipsis {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.text--ellipsis:hover {
    overflow: visible;
    white-space: normal;
}

.text--clip {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
}
.text--clip:hover {
    overflow: visible;
    white-space: normal;
}

.text--string {
    max-width: 100px;
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
