<script setup>
import { ref } from "vue";

const props = defineProps({
    layout: {
        //線條方向
        type: String,
    },
    type: {
        //線條種類
        type: String,
    },
    themeColor: {
        //線條顏色
        type: String,
    },

    width: {
        //線條粗細
        type: String,
    },
    align: {
        //文字位置
        type: String,
    },
});
</script>

<template>
    <!--Divider(H) - line only - solid -->
    <div
        class="divider component divider-horizontal divider-width-1 divider-solid"
        role="separator"
    ></div>

    <!--Divider(H) - line only - sashed -->
    <div
        class="divider component divider-horizontal divider-width-1 divider-dashed"
        role="separator"
    ></div>

    <!--Divider(V) - line only - solid -->
    <div
        class="divider component divider-vertical divider-width-1 divider-solid"
        role="separator"
    ></div>

    <!--Divider(H) - with content left - solid -->
    <div
        class="divider component divider-horizontal divider-width-1 divider-solid divider-left"
        role="separator"
    >
        <div class="divider-content" data-pc-section="content">
            <b>Left</b>
        </div>
    </div>

    <!--Divider(H) - with content center - solid -->
    <div
        class="divider component divider-vertical divider-width-1 divider-solid divider-bottom"
        role="separator"
    >
        <div class="divider-content" data-pc-section="content">
            <b>bottom</b>
        </div>
    </div>
</template>

<style lang="css" scoped>
/*--- Divider layout ---*/
.divider-horizontal {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
}

.divider-horizontal:before {
    position: absolute;
    display: block;
    top: 50%;
    left: 0;
    width: 100%;
    content: "";
}

.divider-vertical {
    min-height: 100%;
    margin: 0 1rem;
    display: flex;
    position: relative;
    justify-content: center;
}

.divider-vertical:before {
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    height: 100%;
    content: "";
}

/*--- Divider content ---*/
.divider-content {
    z-index: 1;
}
.divider .divider-content {
    background-color: #ffffff;
}
.divider.divider-horizontal .divider-content {
    padding: 0 0.5rem;
}
.divider.divider-vertical .divider-content {
    padding: 0.5rem 0;
}

/*--- Divider border type ---*/
.divider.divider-solid.divider-horizontal:before {
    border-top-style: solid;
}
.divider.divider-solid.divider-vertical:before {
    border-left-style: solid;
}
.divider.divider-dashed.divider-horizontal:before {
    border-top-style: dashed;
}
.divider.divider-dashed.divider-vertical:before {
    border-left-style: dashed;
}
.divider.divider-dotted.divider-horizontal:before {
    border-top-style: dotted;
}
.divider.divider-dotted.divider-vertical:before {
    border-left-style: dotted;
}

/*--- Divider horizontal border width ---*/
.divider.divider-horizontal {
    margin: 1rem 0;
    padding: 0 1rem;
}
.divider.divider-horizontal:before {
    border-top-width: 1px;
    border-top-color: #f00;
}
.divider.divider-horizontal:before.divider-width-2 {
    border-top-width: 2px;
}
.divider.divider-horizontal:before.divider-width-4 {
    border-top-width: 4px;
}

/*--- Divider vertical border width ---*/
.divider.divider-vertical {
    margin: 0 1rem;
    padding: 1rem 0;
}
.divider.divider-vertical:before {
    border-left-width: 1px;
    border-left-color: #f00;
}
.divider.divider-vertical:before.divider-width-2 {
    border-left-width: 2px;
}
.divider.divider-vertical:before.divider-width-4 {
    border-left-width: 4px;
}

/*--- Divider horizontal align ---*/
.divider-left.divider-horizontal {
    justify-content: flex-start;
}
.divider-center.divider-horizontal {
    justify-content: center;
}
.divider-right.divider-horizontal {
    justify-content: flex-end;
}

/*--- Divider vertical align ---*/
.divider-top.divider-vertical {
    align-items: flex-start;
}
.divider-center.divider-vertical {
    align-items: center;
}
.divider-bottom.divider-vertical {
    align-items: flex-end;
}
</style>
