<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const dataObj = {
    // labels 為橫軸上的分類，為一個陣列
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    // datasets資料集為一個陣列，裡面的資料類型為一個一個物件
    datasets: [
        // 物件的屬性有 label 與 data
        {
            // label 為資料分類的名稱
            label: "鋼鐵人",
            //  data 為資料內容，是一個陣列，相同 index 的數值會放在同一個橫軸的分類區間
            data: [10, 20, 30, 50, 40, 30, 10],
        },
        {
            label: "美國隊長",
            data: [20, 30, 40, 40, 30, 20, 20],
        },
        {
            label: "蜘蛛人",
            data: [30, 40, 50, 30, 20, 10, 30],
        },
    ],
};

const options = {
    // type 可以是 bar，也可以是 line
    type: "bar",
    data: dataObj,
    options: {
        responsive: true,
        aspectRatio: 1 / 1,
        // 如果不設 maintainAspectRatio,寬度會固定
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                // datasets裡每一個物件會變成圖例，出現在給定的位置
                position: "top",
            },
            title: {
                display: true,
                text: "超級英雄出勤次數",
            },
        },
    },
};

onMounted(() => {
    const ctx = document.getElementById("heroChart");
    let chart = new Chart(ctx, options);
});
</script>

<template>
    <div class="card-content-image">
        <canvas id="heroChart"></canvas>
    </div>
</template>

<style lang="" scoped></style>
