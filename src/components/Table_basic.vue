<script setup>
import { ref, useSlots } from "vue";
const props = defineProps({
    tdData: {
        type: Object,
        required: true,
        default: () => [],
    },
    thData: {
        type: Object,
        required: true,
        default: () => [],
    },
    header: {
        type: Object,
        required: false,
        default: () => null,
    },
    rowSelector: {
        type: Boolean,
    },
});

const slot = useSlots();
const hasNamedSlot = (slotName) => {
    console.log(">>>>>>>>>>>>>>", slotName);
    console.log(">>>>>>>>>>>>>>", slot[slotName]);
    return !!slot[slotName];
};
console.log("slot", slot);
</script>

<template>
    <!-- {{ tdData }}

    {{ thData }} -->
    <div v-if="rowSelector">
        <h2>標題</h2>
        <p>說明文字</p>
    </div>
    <table>
        <th v-for="(item, idx) in thData" :key="idx">
            {{ item.label }}
        </th>
    </table>
    <tbody>
        <tr v-for="(td, index) in tdData" :key="index">
            <td v-for="(th, idx) in thData" :key="idx">
                {{ td[th.key] }}
                <!-- {{ !hasNamedSlot(th.key) }} -->
                <span v-if="hasNamedSlot(th.key)">{{ td.key }}</span>
                <!-- <slot :name="th.key" :td="td"></slot> -->
            </td>
        </tr>
    </tbody>
</template>

<style lang="" scoped></style>
