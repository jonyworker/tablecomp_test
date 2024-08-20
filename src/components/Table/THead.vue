<script setup>
import { ref } from "vue";
const props = defineProps({
  
})
</script>

<template>
    <thead>
        <tr>
            <th class="table__header text--left" v-if="rowSelector" scope="col">
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
            <th
                class="table__header text--left"
                v-for="(filed, filedIdx) in fields"
                :key="filedIdx"
            >
                <span v-if="!hasNamedSlot(`filed-${filed.key}`)" :item="filed">
                    {{ filed.label }}
                </span>
                <slot v-else :name="`filed-${filed.key}`" :item="filed" />
            </th>
        </tr>
    </thead>
</template>

<style lang="" scoped></style>
