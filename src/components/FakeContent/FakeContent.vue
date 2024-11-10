<script setup>
import { ref } from "vue";
</script>

<template>
    <div class="fakeContent" role="presentation" aria-hidden="true">
        <b class="fakeContent--text">
            <slot></slot>
        </b>
    </div>
</template>

<style lang="scss" scoped>
.fakeContent {
    flex-grow: 1;
    border: 2px solid #999;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background-color: #e5e5f7;
    opacity: 0.2;
    background-size: 10px 10px;
    background-image: repeating-linear-gradient(
        45deg,
        #ababab 0,
        #ababab 1px,
        #e5e5f7 0,
        #e5e5f7 50%
    );
}
.fakeContent--text::before {
    padding: 8px 16px;
    background-color: #e5e5f7;
}
</style>
