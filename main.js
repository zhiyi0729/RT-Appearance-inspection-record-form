/* ======================================================
   RT 外觀抽檢紀錄表 — 主程式 (main.js)
   全功能版本
====================================================== */

/* ======================================================
   初始化
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initDate();
    initBatchEvents();
    initQtyEvents();
    initSaveButton();
    initSubmitButton();
    loadSavedRecords();
});

/* ======================================================
   日期自動帶入 + C 班減一天
====================================================== */
function initDate() {
    const dateInput = document.getElementById("dateInput");
    const shiftInput = document.getElementById("shiftInput");

    let today = new Date();
    let hour = today.getHours();

    // 如果是大夜班（00:00–08:30 → C 班）
    if (hour < 8 || (hour === 8 && today.getMinutes() < 30)) {
        today.setDate(today.getDate() - 1);
        shiftInput.value = "C";
    } else if (hour < 16 || (hour === 16 && today.getMinutes() < 30)) {
        shiftInput.value = "A";
    } else {
        shiftInput.value = "B";
    }

    dateInput.value = today.toISOString().split("T")[0];
}

/* ======================================================
   料號：自動大寫
====================================================== */
document.getElementById("materialInput").addEventListener("input", (e) => {
    e.target.value = e.target.value.toUpperCase();
});

/* ======================================================
   批號區事件處理（FA / 主批 / 子批 / dash 隱藏）
====================================================== */
function initBatchEvents() {
    const main = document.getElementById("batchMain");
    const sub = document.getElementById("batchSub");
    const dash = document.getElementById("dashDisplay");

    main.addEventListener("input", () => {
        main.value = main.value.toUpperCase();
    });

    sub.addEventListener("input", () => {
        let v = sub.value.replace(/[^0-9]/g, "");
        if (v.length === 1) v = "0" + v;
        sub.value = v.slice(-2);

        dash.style.visibility = sub.value ? "visible" : "hidden";
    });

    dash.style.visibility = "hidden"; // 子批預設空 → dash 隱藏
}

/* ======================================================
   批號字串組成
====================================================== */
function getFullBatch() {
    const isFA = document.getElementById("isFA").checked;
    const main = document.getElementById("batchMain").value.trim().toUpperCase();
    const sub = document.getElementById("batchSub").value.trim();

    if (!main) return "";

    let batch = (isFA ? "FA" : "") + main;

    if (sub) batch += "-" + sub;

    return batch;
}

/* ======================================================
   批量 / 單位 / 抽驗數 自動計算
====================================================== */
function initQtyEvents() {
    const qty = document.getElementById("qtyInput");
    const unit = document.getElementById("unitDisplay");
    const sample = document.getElementById("sampleInput");

    qty.addEventListener("input", () => {
        let q = Number(qty.value);

        // 單位
        unit.value = q > 300 ? "PCS" : "PNL";

        // 抽驗數
        if (q > 20) {
            sample.value = 20;
        } else {
            sample.value = q;
        }
    });
}

/* ======================================================
   異常項目：空白自動補 0
====================================================== */
function collectDefects() {
    const fields = document.querySelectorAll(".df");
    let result = {};

    fields.forEach((el, idx) => {
        let v = Number(el.value);
        result["df" + (idx + 1)] = isNaN(v) ? 0 : v;
    });

    return result;
}

/* ======================================================
   暫存資料（localStorage）
====================================================== */
function initSaveButton() {
    document.getElementById("saveBtn").addEventListener("click", () => {
        saveRecord();
    });
}

function saveRecord() {
    const record = buildRecordObject();
    if (!record.batch || !record.material) {
        alert("批號與料號不可空白！");
        return;
    }

    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    list.push(record);
    localStorage.setItem("rt_records", JSON.stringify(list));

    loadSavedRecords();
    alert("已暫存！");
}

/* ======================================================
   建立一筆資料物件
====================================================== */
function buildRecordObject() {
    return {
        date: document.getElementById("dateInput").value,
        shift: document.getElementById("shiftInput").value,
        material: document.getElementById("materialInput").value.trim().toUpperCase(),
        batch: getFullBatch(),
        qty: Number(document.getElementById("qtyInput").value),
        unit: document.getElementById("unitDisplay").value,
        sample: Number(document.getElementById("sampleInput").value),
        defects: collectDefects(),
        inspector: document.getElementById("inspectorInput").value.trim().toUpperCase(),
    };
}

/* ======================================================
   渲染暫存列表
====================================================== */
function loadSavedRecords() {
    const tbody = document.querySelector("#recordTable tbody");
    tbody.innerHTML = "";

    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");

    list.forEach((rec, idx) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${rec.batch}</td>
            <td>${rec.material}</td>
            <td>${rec.qty}</td>
            <td>${rec.sample}</td>
            <td>
                <button class="edit-btn" onclick="editRecord(${idx})">${i18n[getLang()].edit}</button>
                <button class="delete-btn" onclick="deleteRecord(${idx})">${i18n[getLang()].delete}</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

/* ======================================================
   編輯記錄
====================================================== */
function editRecord(index) {
    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    let rec = list[index];

    document.getElementById("dateInput").value = rec.date;
    document.getElementById("shiftInput").value = rec.shift;
    document.getElementById("materialInput").value = rec.material;

    // 批號分解
    document.getElementById("isFA").checked = rec.batch.startsWith("FA");

    let raw = rec.batch.replace("FA", "");
    let main = raw.split("-")[0];
    let sub = raw.includes("-") ? raw.split("-")[1] : "";

    document.getElementById("batchMain").value = main;
    document.getElementById("batchSub").value = sub;
    document.getElementById("dashDisplay").style.visibility = sub ? "visible" : "hidden";

    document.getElementById("qtyInput").value = rec.qty;
    document.getElementById("unitDisplay").value = rec.unit;
    document.getElementById("sampleInput").value = rec.sample;

    // 異常
    Object.keys(rec.defects).forEach((k, i) => {
        document.querySelectorAll(".df")[i].value = rec.defects[k];
    });

    document.getElementById("inspectorInput").value = rec.inspector;

    // 刪除舊資料
    list.splice(index, 1);
    localStorage.setItem("rt_records", JSON.stringify(list));

    loadSavedRecords();
}

/* ======================================================
   刪除紀錄
====================================================== */
function deleteRecord(index) {
    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");
    list.splice(index, 1);
    localStorage.setItem("rt_records", JSON.stringify(list));
    loadSavedRecords();
}

/* ======================================================
   語言切換
====================================================== */
function getLang() {
    return localStorage.getItem("rt_lang") || "zh-TW";
}

/* ======================================================
   「送出全部紀錄」按鈕
====================================================== */
function initSubmitButton() {
    document.getElementById("submitBtn").addEventListener("click", () => {
        submitRecords();
    });
}

function submitRecords() {
    let list = JSON.parse(localStorage.getItem("rt_records") || "[]");

    if (list.length === 0) {
        alert("沒有可送出的資料！");
        return;
    }

    console.log("送出資料：", list);

    alert("資料已送出！（目前示範：console.log）");

    localStorage.removeItem("rt_records");
    loadSavedRecords();
}

/* ======================================================
   自動送出（依班別）
====================================================== */
setInterval(() => {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();

    // A 班結束：16:30
    if (h === 16 && m === 30) submitRecords();

    // B 班結束：00:30
    if (h === 0 && m === 30) submitRecords();

    // C 班結束：08:30
    if (h === 8 && m === 30) submitRecords();

}, 60000); // 每分鐘檢查一次
