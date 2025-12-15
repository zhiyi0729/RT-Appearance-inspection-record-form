document.addEventListener("DOMContentLoaded", () => {
    initDate();
    initBatchEvents();
    initQtyEvents();
    initSaveButton();
    initSubmitButton();
    loadSavedRecords();
});

/* 日期 + 班別自動判定 */
function initDate() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();

    if (h < 8 || (h === 8 && m < 30)) shiftInput.value = "C";
    else if (h < 16 || (h === 16 && m < 30)) shiftInput.value = "A";
    else shiftInput.value = "B";

    dateInput.value = now.toISOString().split("T")[0];
}

/* 料號大寫 */
materialInput.addEventListener("input", () => {
    materialInput.value = materialInput.value.toUpperCase();
});

/* 批號輸入規則 */
function initBatchEvents() {
    batchMain.addEventListener("input", () => {
        batchMain.value = batchMain.value.toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 3);
    });

    batchSub.addEventListener("input", () => {
        let v = batchSub.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (v.length === 1) v = "0" + v;
        if (v.length > 2) v = v.slice(-2);
        batchSub.value = v;
    });
}

/* 批號組合 */
function getFullBatch() {
    let fa = isFA.checked ? "FA" : "";
    let main = batchMain.value.trim();
    let sub = batchSub.value.trim();
    if (!main) return "";
    return fa + main + "-" + sub;
}

/* 抽驗規則 */
function initQtyEvents() {
    qtyInput.addEventListener("input", () => {
        let q = Number(qtyInput.value);
        unitDisplay.value = q > 300 ? "PCS" : "PNL";
        sampleInput.value = q > 20 ? 20 : q;
    });
}

/* 異常補 0 */
function getDefects() {
    let data = {};
    document.querySelectorAll(".df").forEach((el, i) => {
        data["df" + (i+1)] = Number(el.value) || 0;
    });
    return data;
}

/* 暫存 */
function initSaveButton() {
    saveBtn.addEventListener("click", saveRecord);
}

function saveRecord() {
    let rec = {
        date: dateInput.value,
        shift: shiftInput.value,
        material: materialInput.value,
        batch: getFullBatch(),
        qty: qtyInput.value,
        unit: unitDisplay.value,
        sample: sampleInput.value,
        defects: getDefects(),
        inspector: inspectorInput.value.toUpperCase(),
        note: noteInput.value
    };

    if (!rec.material || !rec.batch) {
        alert("批號與料號不可空白！");
        return;
    }

    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    list.push(rec);
    localStorage.setItem("rt_records", JSON.stringify(list));

    loadSavedRecords();
    clearForm(rec.inspector);
}

/* 清空欄位（保留上一筆檢驗員） */
function clearForm(lastInspector) {
    materialInput.value = "";
    batchMain.value = "";
    batchSub.value = "";

    qtyInput.value = "";
    unitDisplay.value = "";
    sampleInput.value = "";
    noteInput.value = "";

    document.querySelectorAll(".df").forEach(el => el.value = "");

    inspectorInput.value = lastInspector;
}

/* 暫存列表 */
function loadSavedRecords() {
    let tbody = document.querySelector("#recordTable tbody");
    tbody.innerHTML = "";

    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");

    list.forEach((rec, i) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${rec.batch}</td>
            <td>${rec.material}</td>
            <td>${rec.qty}</td>
            <td>${rec.sample}</td>
            <td>
                <button onclick="editRecord(${i})">編輯</button>
                <button onclick="deleteRecord(${i})">刪除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/* 編輯 */
function editRecord(i) {
    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    let rec = list.splice(i, 1)[0];

    dateInput.value = rec.date;
    shiftInput.value = rec.shift;
    materialInput.value = rec.material;

    isFA.checked = rec.batch.startsWith("FA");

    let raw = rec.batch.replace("FA", "").split("-");
    batchMain.value = raw[0] || "";
    batchSub.value = raw[1] || "";

    qtyInput.value = rec.qty;
    unitDisplay.value = rec.unit;
    sampleInput.value = rec.sample;

    document.querySelectorAll(".df").forEach((el, idx) => {
        el.value = rec.defects["df" + (idx + 1)];
    });

    inspectorInput.value = rec.inspector;
    noteInput.value = rec.note;

    localStorage.setItem("rt_records", JSON.stringify(list));
    loadSavedRecords();
}

/* 刪除 */
function deleteRecord(i) {
    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    list.splice(i, 1);
    localStorage.setItem("rt_records", JSON.stringify(list));
    loadSavedRecords();
}

/* 送出 */
function initSubmitButton() {
    submitBtn.addEventListener("click", submitRecords);
}

function submitRecords() {
    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    if (!list.length) return alert("沒有資料可送出");

    console.log("送出資料：", list);
    alert("資料已送出（示範模式）");

    localStorage.removeItem("rt_records");
    loadSavedRecords();
}
