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
    const dateInput = document.getElementById("dateInput");
    const shiftInput = document.getElementById("shiftInput");
    let now = new Date();
    let h = now.getHours(), m = now.getMinutes();

    if (h < 8 || (h === 8 && m < 30)) shiftInput.value = "C";
    else if (h < 16 || (h === 16 && m < 30)) shiftInput.value = "A";
    else shiftInput.value = "B";

    dateInput.value = now.toISOString().split("T")[0];
}

/* 料號大寫 */
document.getElementById("materialInput").addEventListener("input", e => {
    e.target.value = e.target.value.toUpperCase();
});

/* 批號格式處理 */
function initBatchEvents() {
    let main = document.getElementById("batchMain");
    let sub = document.getElementById("batchSub");

    main.addEventListener("input", () => {
        main.value = main.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
    });

    sub.addEventListener("input", () => {
        let v = sub.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (v.length === 1) v = "0" + v;
        if (v.length > 2) v = v.slice(-2);
        sub.value = v;
    });
}

function getFullBatch() {
    let fa = document.getElementById("isFA").checked ? "FA" : "";
    let main = document.getElementById("batchMain").value.trim();
    let sub = document.getElementById("batchSub").value.trim();
    if (!main) return "";
    return fa + main + "-" + sub;
}

/* 批量 + 單位 + 抽驗 */
function initQtyEvents() {
    const qty = document.getElementById("qtyInput");
    const unit = document.getElementById("unitDisplay");
    const sample = document.getElementById("sampleInput");

    qty.addEventListener("input", () => {
        let q = Number(qty.value);
        unit.value = q > 300 ? "PCS" : "PNL";
        sample.value = q > 20 ? 20 : q;
    });
}

/* 異常補 0 */
function collectDefects() {
    let d = {};
    document.querySelectorAll(".df").forEach((el, i) => {
        d["df" + (i+1)] = Number(el.value) || 0;
    });
    return d;
}

/* 暫存 */
function initSaveButton() {
    document.getElementById("saveBtn").addEventListener("click", saveRecord);
}

function saveRecord() {
    let rec = buildRecord();

    if (!rec.batch || !rec.material) {
        alert("批號與料號不可空白！");
        return;
    }

    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    list.push(rec);
    localStorage.setItem("rt_records", JSON.stringify(list));

    loadSavedRecords();
    clearForm(rec.inspector);
    alert("已暫存！");
}

function buildRecord() {
    return {
        date: document.getElementById("dateInput").value,
        shift: document.getElementById("shiftInput").value,
        material: document.getElementById("materialInput").value,
        batch: getFullBatch(),
        qty: Number(document.getElementById("qtyInput").value),
        unit: document.getElementById("unitDisplay").value,
        sample: Number(document.getElementById("sampleInput").value),
        defects: collectDefects(),
        inspector: document.getElementById("inspectorInput").value.toUpperCase(),
        note: document.getElementById("noteInput").value
    };
}

function clearForm(inspector) {
    document.getElementById("materialInput").value = "";
    document.getElementById("batchMain").value = "";
    document.getElementById("batchSub").value = "";
    document.getElementById("qtyInput").value = "";
    document.getElementById("unitDisplay").value = "";
    document.getElementById("sampleInput").value = "";
    document.getElementById("noteInput").value = "";

    document.querySelectorAll(".df").forEach(el => el.value = "");

    document.getElementById("inspectorInput").value = inspector;
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
            </td>`;
        tbody.appendChild(tr);
    });
}

/* 編輯 */
function editRecord(i) {
    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    let rec = list[i];

    document.getElementById("dateInput").value = rec.date;
    document.getElementById("shiftInput").value = rec.shift;
    document.getElementById("materialInput").value = rec.material;

    document.getElementById("isFA").checked = rec.batch.startsWith("FA");

    let raw = rec.batch.replace("FA", "").split("-");
    document.getElementById("batchMain").value = raw[0] || "";
    document.getElementById("batchSub").value = raw[1] || "";

    document.getElementById("qtyInput").value = rec.qty;
    document.getElementById("unitDisplay").value = rec.unit;
    document.getElementById("sampleInput").value = rec.sample;

    document.querySelectorAll(".df").forEach((el, idx) => {
        el.value = rec.defects["df"+(idx+1)];
    });

    document.getElementById("inspectorInput").value = rec.inspector;
    document.getElementById("noteInput").value = rec.note;

    list.splice(i, 1);
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
    document.getElementById("submitBtn").addEventListener("click", submitRecords);
}

function submitRecords() {
    let data = JSON.parse(localStorage.getItem("rt_records") || "[]");
    if (!data.length) return alert("沒有資料可送出");
    console.log("送出資料：", data);
    alert("資料已送出（示範模式）");
    localStorage.removeItem("rt_records");
    loadSavedRecords();
}
