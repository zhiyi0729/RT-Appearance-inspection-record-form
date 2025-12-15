const i18n = {
    "zh-TW": {
        title: "RT 外觀抽檢紀錄表",
        basic_info: "基本資料",
        date_label: "日期",
        shift_label: "班別",
        material_label: "料號",
        batch_label: "批號",
        qty_label: "批量",
        unit_label: "單位",
        sample_label: "抽驗數",
        defect_label: "異常項目（空格內請填片數「零收一退」）",
        check_note: "檢驗 & 備註",
        inspector_label: "檢驗員",
        note_label: "備註",

        df1: "PIN孔損壞",
        df2: "板邊或槽粗糙",
        df3: "板邊凸點（後處理板須更改程式）",
        df4: "板面刮傷",
        df5: "露銅",
        df6: "二次孔分層錫墊脫落",
        df7: "折斷邊 / 摺痕",

        save_btn: "暫存單筆紀錄",
        submit_btn: "送出全部紀錄",
        list_title: "暫存列表",

        th_batch: "批號",
        th_material: "料號",
        th_qty: "批量",
        th_sample: "抽驗",
        th_actions: "操作",

        edit: "編輯",
        delete: "刪除"
    },

    "en": {
        title: "RT Appearance Inspection Record",
        basic_info: "Basic Info",
        date_label: "Date",
        shift_label: "Shift",
        material_label: "Material No.",
        batch_label: "Batch No.",
        qty_label: "Quantity",
        unit_label: "Unit",
        sample_label: "Sample Qty",
        defect_label: "Defects (fill pcs: accept=0 / reject=1)",
        check_note: "Inspector & Notes",
        inspector_label: "Inspector",
        note_label: "Notes",

        df1: "PIN Hole Damage",
        df2: "Edge / Slot Roughness",
        df3: "Edge Bulge (Requires reprogram for post-process)",
        df4: "Surface Scratches",
        df5: "Copper Exposure",
        df6: "Layer Separation / Pad Peeling",
        df7: "Broken Edge / Crease",

        save_btn: "Save Record",
        submit_btn: "Submit All",
        list_title: "Saved Records",

        th_batch: "Batch",
        th_material: "Material",
        th_qty: "Qty",
        th_sample: "Sample",
        th_actions: "Action",

        edit: "Edit",
        delete: "Delete"
    },

    "vi": {
        title: "Biểu mẫu kiểm tra ngoại quan RT",
        basic_info: "Thông tin cơ bản",
        date_label: "Ngày",
        shift_label: "Ca làm",
        material_label: "Mã liệu",
        batch_label: "Mã lô",
        qty_label: "Số lượng",
        unit_label: "Đơn vị",
        sample_label: "Mẫu kiểm",
        defect_label: "Lỗi (ghi số lượng ‘0 đạt / 1 hủy’)",
        check_note: "Người kiểm tra & Ghi chú",
        inspector_label: "Người kiểm tra",
        note_label: "Ghi chú",

        df1: "Hỏng lỗ PIN",
        df2: "Cạnh thô / rãnh thô",
        df3: "Gồ cạnh (cần chỉnh chương trình xử lý sau)",
        df4: "Xước bề mặt",
        df5: "Lộ đồng",
        df6: "Tách lớp / bong pad",
        df7: "Gãy cạnh / nếp gấp",

        save_btn: "Lưu bản ghi",
        submit_btn: "Gửi tất cả",
        list_title: "Đã lưu",

        th_batch: "Lô",
        th_material: "Mã liệu",
        th_qty: "SL",
        th_sample: "Mẫu",
        th_actions: "Thao tác",

        edit: "Sửa",
        delete: "Xóa"
    }
};

/* 語言切換器功能 */
function switchLanguage(lang) {
    localStorage.setItem("rt_lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
        let key = el.dataset.i18n;
        if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
    });
}

/* 初始化語言 */
document.addEventListener("DOMContentLoaded", () => {
    let lang = localStorage.getItem("rt_lang") || "zh-TW";
    document.getElementById("languageSelector").value = lang;
    switchLanguage(lang);

    document.getElementById("languageSelector").addEventListener("change", e => {
        switchLanguage(e.target.value);
    });
});
