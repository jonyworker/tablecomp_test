<script setup>
import { ref } from "vue";
import JTable from "./components/Table.vue";
const data = [
    {
        id: 1,
        name: "John",
        email: "Tutorials Point originated from the idea that there exists a class of readers who respond better to online content and prefer to learn new skills at their own pace from the comforts of their drawing rooms.",
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
        :row-selector="true"
        @rowSelected="rowSelected"
    >
        <template #name="{ item }" width="500px">
            <span :style="{ color: item.name === 'John' ? 'red' : '' }">
                {{ item.name }}
                <button>典籍</button>
            </span>
        </template>
    </j-table>
</template>

<style lang="" scoped></style>
