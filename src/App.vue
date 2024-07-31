<script setup>
import { ref } from "vue";
import JTable from "./components/Table.vue";
const data = [
    {
        id: 1,
        name: "John",
        email: "Tutorials ",
    },
    {
        id: 2,
        name: "Jane",
        email: "jane@example.com",
    },
    {
        id: 3,
        name: "Jony",
        email: "Jony@example.com",
        sex: "man",
    },
];
const fields = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "sex", label: "Sex" },
];
const tableHeader = {
    title: "表格標題",
    description: "表格描述表格描述表格描述表格描述表格描述",
};
function rowSelected(item) {
    if (item.selected == null) {
        item.selected = true;
    } else {
        // console.log("item.selected", item.selected);
        item.selected = !item.selected;
    }
}
</script>

<template>
    <j-table
        :fields="fields"
        :data="data"
        :row-selector="false"
        :header="tableHeader"
        :rowSelector="true"
        @rowSelected="rowSelected"
    >
        <!-- <template #name="{ item }" width="500px">
            <span :style="{ color: item.name === 'John' ? 'red' : '' }">
                {{ item.name }}
                <button>典籍</button>
            </span>
        </template> -->
    </j-table>
</template>

<style lang="" scoped></style>
