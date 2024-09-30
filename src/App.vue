<script setup>
import { ref, reactive } from "vue";
import JTable from "./components/Table/Table.vue";
// import RTable from "./components/TableNew.vue";
import ChartJs from "./components/ChartJs/ChartJs.vue";
import Fuck from "./components/ChartJs/Fuck.vue";
// import Accordion from "./components/Accordion/Accordion.vue";
import Datepicker from "./components/Datepicker/Datepicker.vue";
import AccordionTest from "./components/Accordion/AccordionTest.vue";

const columnHeadData = [
    { key: "id", label: "ID", sort: true },
    { key: "name", label: "NAME", sort: true },
    { key: "email", label: "EMAIL", sort: false },
    { key: "sex", label: "SEX", sort: true },
];
const columnCellData = [
    {
        id: 1,
        name: "John",
        email: "sdkfjslkjflsjlfkasjfk,sfjsfks , , s, sfoasfdlalksflkaskdflsadlks, s, fdksakfdlasljdf ",
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

const iscmData = ref([
    {
        deliveryid: "202301030001EK006",
        invoice330no: null,
        invoicey30no: null,
        shippingaddress: "三民廠",
        shippingtime: null,
        deliverytime: 1672725282517,
        createdtime: 1672725282517,
        createduser: "EK006",
        status: 1,
        taxno: null,
        taxnopre: null,
        taxnoafter: null,
        totalprice: 13680,
        originalprice: 13680,
        invoiceno: "TB04042156",
        invoicedate: 1672963200000,
        exrate: "1",
        newexrate: "1.0",
        tax: null,
        taxrate: null,
        nontd: null,
        expectedtime: null,
        remark: null,
        statusday: null,
        deliveryids: null,
        currency: "NTD",
        order: null,
        sort: null,
        field: null,
        value: null,
        action: null,
    },
    {
        deliveryid: "202206220001EK006",
        invoice330no: null,
        invoicey30no: null,
        shippingaddress: "三民廠",
        shippingtime: null,
        deliverytime: 1655881082890,
        createdtime: 1655881082890,
        createduser: "EK006",
        status: 1,
        taxno: null,
        taxnopre: null,
        taxnoafter: null,
        totalprice: 13920,
        originalprice: 13920,
        invoiceno: "",
        invoicedate: 1655856000000,
        exrate: "1",
        newexrate: "1.0",
        tax: null,
        taxrate: null,
        nontd: null,
        expectedtime: null,
        remark: null,
        statusday: null,
        deliveryids: null,
        currency: "NTD",
        order: null,
        sort: null,
        field: null,
        value: null,
        action: null,
    },
    {
        deliveryid: "202111040002EK006",
        invoice330no: null,
        invoicey30no: null,
        shippingaddress: "三民廠",
        shippingtime: null,
        deliverytime: 1635992658740,
        createdtime: 1635992658740,
        createduser: "EK006",
        status: 1,
        taxno: null,
        taxnopre: null,
        taxnoafter: null,
        totalprice: 12600,
        originalprice: 12600,
        invoiceno: "TB04042156",
        invoicedate: 1635984000000,
        exrate: "1",
        newexrate: "1.0",
        tax: null,
        taxrate: null,
        nontd: null,
        expectedtime: 1635955200000,
        remark: null,
        statusday: null,
        deliveryids: null,
        currency: "NTD",
        order: null,
        sort: null,
        field: null,
        value: null,
        action: null,
    },
]);
const iscmFields = [
    { key: "deliveryid", label: "Delivery ID" },
    { key: "invoiceno", label: "發票號碼" },
    { key: "invoicedate", label: "發票日期" },
    { key: "currency", label: "幣別" },
    { key: "newexrate", label: "匯率" },
    { key: "originalprice", label: "總價" },
    { key: "expectedtime", label: "預計出貨日" },
    { key: "detail", label: "明細" },
    { key: "edit", label: "編輯" },
    { key: "renew", label: "更新" },
    { key: "print", label: "列印" },
    { key: "delivery", label: "出貨" },
    { key: "cancel", label: "廢除" },
    { key: "select", label: "選擇" },
];
const tableHeader = {
    title: "表格標題",
    description: "表格描述表格描述表格描述表格描述表格描述",
};

function rowSelected(item) {
    if (item.selected == null) {
        console.log("parent>>>", item);

        item.selected = true;
    } else {
        item.selected = !item.selected;
    }
}
function selectFiledAll(e, itemKey) {
    const checked = e.target.checked;
    iscmData.value.forEach((item) => {
        item[`${itemKey}Check`] = checked;
    });
}
function timestampToDate(timestamp) {
    // Create a new Date object with the timestamp
    const date = new Date(timestamp);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0
    const day = String(date.getDate()).padStart(2, "0");

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

const ratingData = ref([
    {
        id: 1,
        rating: 4,
    },
]);
const radioList = [
    {
        inputId: "dessert01",
        name: "dessert",
        value: "bread",
        label: "麵包",
    },
    {
        inputId: "dessert02",
        name: "dessert",
        value: "pudding",
        label: "布丁",
    },
];
const isRadioPicked = ref("");
// const { add, toasts } = useToast();

// const showSuccess = () => {
//     add({
//         message: "Success Message",
//         themeColor: "success",
//         life: 3000,
//     });
// };
// const showfuck = () => {
//     add({
//         message: "fuck",
//         themeColor: "error",
//         life: 3000,
//     });
// };

const accordionItems = ref([
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
</script>

<template>
    <j-table
        :columnHeadData="columnHeadData"
        :columnCellData="columnCellData"
        :row-selector="false"
        :rowSelector="true"
    >
        <!-- <template #name="{ item }">
            <span :style="{ color: item.name === 'John' ? 'red' : '' }">
                {{ item.name }}
                <button>典籍</button>
            </span>
        </template> -->
    </j-table>

    <r-table
        :fields="iscmFields"
        :tableData="columnCellData"
        :row-selector="false"
        :header="tableHeader"
        :rowSelector="true"
        @rowSelected="rowSelected"
        zebra
    >
        <!-- Table Header - [設定具名 Slot] -  更新 -->
        <template #filed-renew="{ item }">
            <div
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                "
            >
                <button
                    style="
                        width: 42px;
                        border-radius: 0.3rem;
                        letter-spacing: -0.01rem;
                        padding: 2px 6px;
                        font-size: 12px;
                    "
                >
                    {{ item.label }}
                </button>
                <input
                    id="contact-selectAll"
                    type="checkbox"
                    value=""
                    @change="(e) => selectFiledAll(e, item.key)"
                    style="margin: 0"
                />
            </div>
        </template>

        <!-- Table Header - [設定具名 Slot] -  列印 -->
        <template #filed-print="{ item }">
            <div
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                "
            >
                <button
                    style="
                        width: 42px;
                        border-radius: 0.3rem;
                        letter-spacing: -0.01rem;
                        padding: 2px 6px;
                        font-size: 12px;
                    "
                >
                    {{ item.label }}
                </button>
                <input
                    id="contact-selectAll"
                    type="checkbox"
                    value=""
                    @change="(e) => selectFiledAll(e, item.key)"
                    style="margin: 0"
                />
            </div>
        </template>

        <!-- Table Header - [設定具名 Slot] -  出貨 -->
        <template #filed-delivery="{ item }">
            <div
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                "
            >
                <button
                    style="
                        width: 42px;
                        border-radius: 0.3rem;
                        letter-spacing: -0.01rem;
                        padding: 2px 6px;
                        font-size: 12px;
                    "
                >
                    {{ item.label }}
                </button>
                <input
                    id="contact-selectAll"
                    type="checkbox"
                    value=""
                    @change="(e) => selectFiledAll(e, item.key)"
                    style="margin: 0"
                />
            </div>
        </template>

        <!-- Table Header - [設定具名 Slot] -  出貨 -->
        <template #filed-cancel="{ item }">
            <div
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                "
            >
                <button
                    style="
                        width: 42px;
                        border-radius: 0.3rem;
                        letter-spacing: -0.01rem;
                        padding: 2px 6px;
                        font-size: 12px;
                    "
                >
                    {{ item.label }}
                </button>
                <input
                    id="contact-selectAll"
                    type="checkbox"
                    value=""
                    @change="(e) => selectFiledAll(e, item.key)"
                    style="margin: 0"
                />
            </div>
        </template>

        <!-- Table Body - [設定具名 Slot] - 發票號碼 -->
        <template #invoiceno="{ item }">
            <input
                type="text"
                maxlength="25"
                placeholder="尚無號碼"
                :value="item.invoiceno"
                class="input_filed"
            />
        </template>

        <!-- Table Body - [設定具名 Slot] - 發票日期 -->
        <template #invoicedate="{ item }">
            <input
                type="date"
                :value="timestampToDate(item.invoicedate)"
                class="input_filed"
            />
        </template>

        <!-- Table Body - [設定具名 Slot] - 匯率 -->
        <template #newexrate="{ item }">
            <input type="text" :value="item.newexrate" class="input_filed" />
        </template>

        <!-- Table Body - [設定具名 Slot] - 預計出貨日 -->
        <template #expectedtime="{ item }">
            {{
                item.expectedtime
                    ? new Date(item.expectedtime).toLocaleDateString()
                    : "-"
            }}
        </template>

        <!-- Table Body - [設定具名 Slot] - 明細按鈕 -->
        <template #detail="{ item }">
            <button style="margin-inline: auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                >
                    <path
                        d="M200-800v241-1 400-640 200-200Zm80 400h140q9-23 22-43t30-37H280v80Zm0 160h127q-5-20-6.5-40t.5-40H280v80ZM200-80q-33 0-56.5-23.5T120-160v-640q0-33 23.5-56.5T200-880h320l240 240v100q-19-8-39-12.5t-41-6.5v-41H480v-200H200v640h241q16 24 36 44.5T521-80H200Zm460-120q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM864-40 756-148q-21 14-45.5 21t-50.5 7q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50.5T812-204L920-96l-56 56Z"
                    />
                </svg>
            </button>
        </template>

        <!-- Table Body - [設定具名 Slot] - 明細按鈕 -->
        <template #edit="{ item }">
            <button style="margin-inline: auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                >
                    <path
                        d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z"
                    />
                </svg>
            </button>
        </template>

        <!-- Table Body - [設定具名 Slot] - 更新 -->
        <template #renew="{ item }">
            <input
                :id="`${item.deliveryid}${item.deliverytime}`"
                v-model="item.renewCheck"
                type="checkbox"
                style="margin: 0"
            />
        </template>

        <!-- Table Body - [設定具名 Slot] - 列印 -->
        <template #print="{ item }">
            <input
                :id="`${item.deliveryid}${item.deliverytime}`"
                v-model="item.printCheck"
                type="checkbox"
                style="text-align: center"
            />
        </template>

        <!-- Table Body - [設定具名 Slot] - 出貨 -->
        <template #delivery="{ item }">
            <input
                :id="`${item.deliveryid}${item.deliverytime}`"
                v-model="item.deliveryCheck"
                type="checkbox"
                style="margin: 0"
            />
        </template>

        <!-- Table Body - [設定具名 Slot] - 廢除 -->
        <template #cancel="{ item }">
            <input
                :id="`${item.deliveryid}${item.deliverytime}`"
                v-model="item.cancelCheck"
                type="checkbox"
                style="margin: 0"
            />
        </template>
    </r-table>

    <!-- <Rating v-model="ratingData"></Rating>
    {{ ratingData }}
    <Accordion></Accordion>
    isRadioPicked>>> {{ isRadioPicked }}
    <div></div>
    <RadioButton
        v-for="item in radioList"
        :value="item.value"
        :label="item.label"
        v-model="isRadioPicked"
    ></RadioButton> -->

    <!-- ChartJs -->
    <div style="width: 50%">
<!--        <ChartJs></ChartJs>-->
    </div>

<!--    <Fuck></Fuck>-->

<!--    <Accordion></Accordion>-->
<!--    <Accordion></Accordion>-->

<!--    <Datepicker range></Datepicker>-->

<!--    <Datepicker></Datepicker>-->
<!--    <Datepicker range></Datepicker>-->
    <!-- <Datepicker range></Datepicker> -->
    <!-- <Datepicker></Datepicker> -->

  <AccordionTest :data="accordionItems"></AccordionTest>
</template>

<style scoped>
* {
    box-sizing: border-box;
}
/* {{ new Date(value).toLocaleDateString() }} */
.input_filed {
    font-size: 14px;
    height: 30px;
    line-height: 1.5;
    border-radius: 4px;
    box-shadow: none;
    border-color: #e7e7e7;
    font-family: "Roboto", "微軟正黑體";
    padding: 4px;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    width: 100%;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
}
/* .text--ellipsis {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
} */
:root {
    --thumbWidth: 20px;
    --thumbhright: 20px;
}
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

</style>
