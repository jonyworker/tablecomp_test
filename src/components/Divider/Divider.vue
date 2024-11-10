<script setup>
import { ref } from "vue";

const props = defineProps({
    layout: {
        //線條方向
        type: String,
        default: "horizontal",
        validator: (value) => ["horizontal", "vertical"].includes(value),
    },
    width: {
        //線條粗細
        type: String,
        default: "xsmall",
        validator: (value) =>
            ["xsmall", "small", "medium", "large", "xlarge"].includes(value),
    },
    type: {
        //線條種類
        type: String,
        default: "solid",
        validator: (value) => ["solid", "dashed", "dotted"].includes(value),
    },
    themeColor: {
        //線條顏色
        type: String,
        validator: (value) =>
            [
                "primary",
                "secondary",
                "tertiary",
                "success",
                "warning",
                "error",
                "info",
            ].includes(value),
    },
    align: {
        //文字位置
        type: String,
        validator: (value) => ["start", "center", "end"].includes(value),
        default: "center",
    },
});
</script>

<template>
    <div
        :class="[
            'divider',
            `divider-${props.layout}`,
            `divider-width-${props.width}`,
            `divider-${props.type}`,
            props.themeColor ? `divider-${props.themeColor}` : '',
            $slots.default ? `divider-${props.align}` : '',
        ]"
    >
        <!-- divider - 分隔線文字 -->
        <div v-if="$slots.default?.()" class="divider-content">
            <b><slot></slot></b>
        </div>
    </div>
</template>

<style lang="css" scoped>
/*--- Divider ---*/
.divider {
    display: flex;
}

/*--- Divider 方向 ---*/
.divider-horizontal {
    align-items: center;
}
.divider-vertical {
    flex-direction: column;
    align-items: center;
    min-height: 100px; /* demo 用 */
}
/*--- Divider 方向 ---*/
.divider-horizontal.divider::before,
.divider-horizontal.divider::after {
    content: "";
    border-top: 1px solid red;
    /* border-top: 1px solid $color-gray20; */
    flex-grow: 1;
}

.divider-vertical.divider::before,
.divider-vertical.divider::after {
    content: "";
    border-left: 1px solid red;
    /* border-left: 1px solid $color-gray20; */
    flex-grow: 1;
}

/*--- Divider 線條種類 - Horizontal ---*/
.divider-solid.divider-horizontal.divider::before,
.divider-solid.divider-horizontal.divider::after {
    border-top-style: solid;
}
.divider-dotted.divider-horizontal.divider::before,
.divider-dotted.divider-horizontal.divider::after {
    border-top-style: dotted;
}
.divider-dashed.divider-horizontal.divider::before,
.divider-dashed.divider-horizontal.divider::after {
    border-top-style: dashed;
}

/*--- Divider 線條種類 - vertical ---*/
.divider-solid.divider-vertical.divider::before,
.divider-solid.divider-vertical.divider::after {
    border-left-style: solid;
}
.divider-dotted.divider-vertical.divider::before,
.divider-dotted.divider-vertical.divider::after {
    border-left-style: dotted;
}
.divider-dashed.divider-vertical.divider::before,
.divider-dashed.divider-vertical.divider::after {
    border-left-style: dashed;
}

/*--- Divider 線條粗細 - Horizontal ---*/
.divider-width-xsmall.divider-horizontal.divider::before,
.divider-width-xsmall.divider-horizontal.divider::after {
    border-top-width: 1px;
}
.divider-width-small.divider-horizontal.divider::before,
.divider-width-small.divider-horizontal.divider::after {
    border-top-width: 2px;
}
.divider-width-medium.divider-horizontal.divider::before,
.divider-width-medium.divider-horizontal.divider::after {
    border-top-width: 4px;
}
.divider-width-large.divider-horizontal.divider::before,
.divider-width-large.divider-horizonta.divider::after {
    border-top-width: 6px;
}
.divider-width-xlarge.divider-horizontal.divider::before,
.divider-width-xlarge.divider-horizontal.divider::after {
    border-top-width: 8px;
}

/*--- Divider 線條粗細 - vertical ---*/
.divider-width-xsmall.divider-vertical.divider::before,
.divider-width-xsmall.divider-vertical.divider::after {
    border-left-width: 1px;
}
.divider-width-small.divider-vertical.divider::before,
.divider-width-small.divider-vertical.divider::after {
    border-left-width: 2px;
}
.divider-width-medium.divider-vertical.divider::before,
.divider-width-medium.divider-vertical.divider::after {
    border-left-width: 4px;
}
.divider-width-large.divider-vertical.divider::before,
.divider-width-large.divider-vertical.divider::after {
    border-left-width: 6px;
}
.divider-width-xlarge.divider-vertical.divider::before,
.divider-width-xlarge.divider-vertical.divider::after {
    border-left-width: 8px;
}

/*--- Divider content ---*/
.divider-content {
    z-index: 1;
    padding: 0.5em;
}

/*--- Divider 對齊位置 - Horizontal ---*/
.divider-start.divider-horizontal.divider::before {
    flex-grow: 0;
    width: 1rem;
}
.divider-end.divider-horizontal.divider::after {
    flex-grow: 0;
    width: 1rem;
}

/*--- Divider 對齊位置 - vertical ---*/
.divider-start.divider-vertical.divider::before {
    flex-grow: 0;
    height: 1rem;
}
.divider-end.divider-vertical.divider::after {
    flex-grow: 0;
    height: 1rem;
}

/* @each $theme in $themes {
    .divider-#{$theme}.divider-vertical.divider::before {
        border-left-color: getThemeColor($mode, $theme, "default");
    }
    .divider-#{$theme}.divider-vertical.divider::after {
        border-left-color: getThemeColor($mode, $theme, "default");
    }
}
@each $theme in $themes {
    .divider-#{$theme}.divider-horizontal.divider::before {
        border-top-color: getThemeColor($mode, $theme, "default");
    }
    .divider-#{$theme}.divider-horizontal.divider::after {
        border-top-color: getThemeColor($mode, $theme, "default");
    }
} */
</style>
