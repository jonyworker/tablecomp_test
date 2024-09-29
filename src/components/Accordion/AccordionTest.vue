<script setup>
import { ref } from "vue";

const items = ref([
    {
        title: "Apples",
        expanded: false,
        contents: [
            "Apples are a fine fruit often associated with good health, and fewer doctor's appointments.",
            "Example: An apple a day keeps the doctor away.",
        ],
    },
    {
        title: "Lemons",
        expanded: false,
        contents: [
            "Lemons are good with almost anything, yet are often have a negative connotation when used in conversation.",
            "Example: The bread from the french bakery is normally very good, but the one we bought today was a lemon.",
        ],
    },
    {
        title: "Kiwis",
        expanded: false,
        contents: ["Kiwis are a fun, under-appreciated fruit."],
    },
]);

const accordionToggle = (index) => {
    items.value[index].expanded = !items.value[index].expanded;
};
</script>

<template>
    <div class="accordion">
        <ul aria-label="Accordion" class="accordion-controls">
            <li v-for="(item, index) in items" :key="index">
                <button
                    class="accordion--button"
                    :aria-controls="'content-' + index"
                    :aria-expanded="item.expanded.toString()"
                    @click="accordionToggle(index)"
                >
                    {{ item.title }}
                </button>
                <div
                    class="accordion--body"
                    :aria-hidden="!item.expanded"
                    v-show="item.expanded"
                >
                    <p v-for="(content, i) in item.contents" :key="i">
                        {{ content }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
$base-margin: 24px;
$primary-text-color: black;
$light-text-color: white;
$gray: gray;

$accodion-spacing: $base-margin / 2;

.accordion {
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        margin-bottom: 1px;
    }
    .accordion--button {
        position: relative;
        background: none;
        border-radius: 0;
        background: $gray;
        color: $light-text-color;
        padding: $accodion-spacing;
        margin: 0;
        display: block;
        width: 100%;
        text-align: left;
        &:focus {
            outline: 1px dashed rgba(0, 0, 0, 0.5);
        }
        &[aria-expanded="false"]:after {
            content: "+";
            display: inline-block;
            right: $accodion-spacing;
            position: absolute;
        }
        &[aria-expanded="true"]:after {
            content: "-";
            display: inline-block;
            right: $accodion-spacing;
            position: absolute;
        }
    }
    .accordion--body {
        padding: $accodion-spacing;
    }
}
</style>
