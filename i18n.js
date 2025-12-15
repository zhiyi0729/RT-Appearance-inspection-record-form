/* ======================================================
   六國語言字典（自動切換 UI 文字）
   語言：中文、英文、越南文、泰文、菲律賓文、印尼文
====================================================== */

const i18n = {
    "zh-TW": {
        title: "RT 外觀抽檢紀錄表",

        date_label: "日期",
        shift_label: "班別",

        material_label: "料號",
        batch_label: "批號",

        qty_label: "批量",
        unit_label: "單位",
        sample_label: "抽驗數",

        defect_label: "異常項目（片數）",
        inspector_label: "檢驗員",

        save_btn: "暫存單筆紀錄",
        submit_btn: "送出全部紀錄",

        list_title: "暫存列表",

        th_batch: "批號",
        th_material: "料號",
        th_qty: "批量",
        th_sample: "抽驗數",
        th_actions: "操作",

        edit: "編輯",
        delete: "刪除"
    },

    /* ========================== 英文 ========================== */
    en: {
        title: "RT Appearance Inspection Record",

        date_label: "Date",
        shift_label: "Shift",

        material_label: "Material No.",
        batch_label: "Batch No.",

        qty_label: "Quantity",
        unit_label: "Unit",
        sample_label: "Sample Qty",

        defect_label: "Defects (pcs)",
        inspector_label: "Inspector",

        save_btn: "Save Record",
        submit_btn: "Submit All Records",

        list_title: "Saved Records",

        th_batch: "Batch",
        th_material: "Material",
        th_qty: "Qty",
        th_sample: "Sample",
        th_actions: "Actions",

        edit: "Edit",
        delete: "Delete"
    },

    /* ========================== 越南文 ========================== */
    vi: {
        title: "Biểu mẫu kiểm tra ngoại quan RT",

        date_label: "Ngày",
        shift_label: "Ca làm",

        material_label: "Mã liệu",
        batch_label: "Mã lô",

        qty_label: "Số lượng",
        unit_label: "Đơn vị",
        sample_label: "Mẫu kiểm",

        defect_label: "Lỗi (miếng)",
        inspector_label: "Người kiểm tra",

        save_btn: "Lưu bản ghi",
        submit_btn: "Gửi tất cả",

        list_title: "Danh sách đã lưu",

        th_batch: "Mã lô",
        th_material: "Mã liệu",
        th_qty: "SL",
        th_sample: "Mẫu",
        th_actions: "Thao tác",

        edit: "Sửa",
        delete: "Xóa"
    },

    /* ========================== 泰文 ========================== */
    th: {
        title: "แบบฟอร์มตรวจสอบลักษณะภายนอก RT",

        date_label: "วันที่",
        shift_label: "กะงาน",

        material_label: "รหัสวัสดุ",
        batch_label: "รหัสล็อต",

        qty_label: "จำนวน",
        unit_label: "หน่วย",
        sample_label: "จำนวนสุ่มตรวจ",

        defect_label: "ข้อบกพร่อง (ชิ้น)",
        inspector_label: "ผู้ตรวจสอบ",

        save_btn: "บันทึกข้อมูล",
        submit_btn: "ส่งข้อมูลทั้งหมด",

        list_title: "ข้อมูลที่บันทึกไว้",

        th_batch: "ล็อต",
        th_material: "วัสดุ",
        th_qty: "จำนวน",
        th_sample: "สุ่มตรวจ",
        th_actions: "ดำเนินการ",

        edit: "แก้ไข",
        delete: "ลบ"
    },

    /* ========================== 菲律賓（Tagalog） ========================== */
    ph: {
        title: "RT Form para sa Appearance Inspection",

        date_label: "Petsa",
        shift_label: "Shift",

        material_label: "Material No.",
        batch_label: "Batch No.",

        qty_label: "Dami",
        unit_label: "Unit",
        sample_label: "Sample Qty",

        defect_label: "Depekto (pcs)",
        inspector_label: "Tagasuri",

        save_btn: "I-save ang record",
        submit_btn: "I-submit lahat",

        list_title: "Mga na-save na record",

        th_batch: "Batch",
        th_material: "Material",
        th_qty: "Dami",
        th_sample: "Sample",
        th_actions: "Aksyon",

        edit: "I-edit",
        delete: "Burahin"
    },

    /* ========================== 印尼文 ========================== */
    id: {
        title: "Formulir Pemeriksaan Penampakan RT",

        date_label: "Tanggal",
        shift_label: "Shift",

        material_label: "Nomor Material",
        batch_label: "Nomor Batch",

        qty_label: "Jumlah",
        unit_label: "Unit",
        sample_label: "Jumlah Sampel",

        defect_label: "Cacat (pcs)",
        inspector_label: "Pemeriksa",

        save_btn: "Simpan Data",
        submit_btn: "Kirim Semua",

        list_title: "Data Tersimpan",

        th_batch: "Batch",
        th_material: "Material",
        th_qty: "Jumlah",
        th_sample: "Sampel",
        th_actions: "Aksi",

        edit: "Edit",
        delete: "Hapus"
    }
};

/* ======================================================
   語言切換功能
====================================================== */
function switchLanguage(lang) {
    localStorage.setItem("rt_lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        let key = el.dataset.i18n;
        if (i18n[lang] && i18n[lang][key]) {
            el.textContent = i18n[lang][key];
        }
    });

    console.log("Language switched to:", lang);
}

/* 啟動時讀取語言 */
document.addEventListener("DOMContentLoaded", () => {
    let lang = localStorage.getItem("rt_lang") || "zh-TW";
    document.getElementById("languageSelector").value = lang;
    switchLanguage(lang);

    document.getElementById("languageSelector").addEventListener("change", e => {
        switchLanguage(e.target.value);
    });
});
