<script setup>
import { ref, onMounted, watch, onBeforeUnmount, reactive } from "vue";
import Chart from "chart.js/auto";

// Create a reactive data object
const dataObj = reactive({
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "鋼鐵人",
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
});

// Chart options
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "超級英雄出勤次數",
        },
    },
};

let chart; // Declare a variable for the chart instance

const initChart = () => {
    const ctx = document.getElementById("fuck");

    // If chart already exists, destroy it
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: dataObj,
        options,
    });
};

// Watch for changes in the dataObj
watch(dataObj, (newData) => {
    if (chart) {
        chart.data = newData; // Update the chart's data
        chart.update(); // Re-render the chart
    }
});

onMounted(() => {
    initChart();
});

// Clean up the chart on unmount
onBeforeUnmount(() => {
    if (chart) {
        chart.destroy();
    }
});

// Function to update data dynamically (for demonstration)
const updateData = () => {
    dataObj.datasets[0].data = dataObj.datasets[0].data.map((d) => d + 5);
};
</script>

<template>
    <div class="card-content-image">
        <canvas id="fuck"></canvas>
        <button @click="updateData">Update Data</button>
        <!-- Button to trigger data update -->
    </div>
</template>

<style scoped>
.card-content-image {
    position: relative;
    width: 100%;
    height: 400px; /* Adjust as needed */
}

canvas {
    max-width: 100%;
    max-height: 100%;
}
</style>
