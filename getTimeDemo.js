class MyDate extends Date {
    get monthValue() {
        return this.getMonth() + 1;
    }

    toInputDateType() {
        return [
            this.getFullYear(),
            this.monthValue.toString().padStart(2, "0"),
            this.getDate().toString().padStart(2, "0"),
        ].join("-");
    }
}
// const now = new Date();

const b = new MyDate("2025-01-31");

const s = new MyDate(2024, 0, 1);
const e = new MyDate(2024, 1, 0);

console.log(s.toInputDateType());
console.log(e.toInputDateType());
