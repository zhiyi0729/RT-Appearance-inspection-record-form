/* ======================================================
   i18n.js — FINAL 多語言翻譯檔
   語言：中文、英文、越南文、泰文、菲律賓文、印尼文
====================================================== */

const i18n = {
    /* ========================== 中文 ========================== */
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

    /* ========================== 英文 ========================== */
    "en": {
        title: "RT Appearance Inspection Record",
        basic_info: "Basic Information",
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
        df2: "Edge or Slot Roughness",
        df3: "Edge Bulge (Post-process requires program change)",
        df4: "Surface Scratches",
        df5: "Exposed Copper",
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

    /* ========================== 越南文 ========================== */
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
        defect_label: "Lỗi (ghi số lượng “0 đạt / 1 hủy”)",
        check_note: "Người kiểm tra & Ghi chú",
        inspector_label: "Người kiểm tra",
        note_label: "Ghi chú",

        df1: "Hỏng lỗ PIN",
        df2: "Cạnh hoặc rãnh thô",
        df3: "Gồ cạnh (cần chỉnh lại chương trình xử lý sau)",
        df4: "Xước bề mặt",
        df5: "Lộ đồng",
        df6: "Tách lớp / bong pad",
        df7: "Gãy cạnh / nếp gấp",

        save_btn: "Lưu bản ghi",
        submit_btn: "Gửi tất cả",
        list_title: "Danh sách đã lưu",

        th_batch: "Lô",
        th_material: "Mã liệu",
        th_qty: "SL",
        th_sample: "Mẫu",
        th_actions: "Thao tác",

        edit: "Sửa",
        delete: "Xóa"
    },

    /* ========================== 泰文 ========================== */
    "th": {
        title: "แบบฟอร์มตรวจสอบลักษณะภายนอก RT",
        basic_info: "ข้อมูลพื้นฐาน",
        date_label: "วันที่",
        shift_label: "กะงาน",
        material_label: "รหัสวัสดุ",
        batch_label: "รหัสล็อต",
        qty_label: "ปริมาณ",
        unit_label: "หน่วย",
        sample_label: "จำนวนสุ่มตรวจ",
        defect_label: "รายการของเสีย (กรุณากรอกจำนวนชิ้น “ผ่าน=0 / ตีกลับ=1”)",
        check_note: "ผู้ตรวจสอบ & หมายเหตุ",
        inspector_label: "ผู้ตรวจสอบ",
        note_label: "หมายเหตุ",

        df1: "รู PIN เสียหาย",
        df2: "ขอบหรือร่องหยาบ",
        df3: "ปุ่มนูนบริเวณขอบ (ต้องปรับโปรแกรมในขั้นตอนหลังการผลิต)",
        df4: "รอยขีดข่วนบนแผ่น",
        df5: "ผิวทองแดงโผล่",
        df6: "แยกชั้น / แผ่นรองลอก",
        df7: "ขอบแตก / รอยพับ",

        save_btn: "บันทึกข้อมูล",
        submit_btn: "ส่งข้อมูลทั้งหมด",
        list_title: "รายการที่บันทึกไว้",

        th_batch: "ล็อต",
        th_material: "วัสดุ",
        th_qty: "จำนวน",
        th_sample: "สุ่มตรวจ",
        th_actions: "การทำงาน",

        edit: "แก้ไข",
        delete: "ลบ"
    },

    /* ========================== 菲律賓（塔加洛語） ========================== */
    "ph": {
        title: "RT Appearance Inspection Record Form",
        basic_info: "Pangunahing Impormasyon",
        date_label: "Petsa",
        shift_label: "Shift",
        material_label: "Material No.",
        batch_label: "Batch No.",
        qty_label: "Dami",
        unit_label: "Yunit",
        sample_label: "Sample Qty",
        defect_label: "Mga Depekto (ilagay ang dami: pasado=0 / reject=1)",
        check_note: "Tagasuri & Tala",
        inspector_label: "Tagasuri",
        note_label: "Tala",

        df1: "Sira ang PIN hole",
        df2: "Magaspang na gilid o uka",
        df3: "Bukol sa gilid (kailangang baguhin ang programa sa post-process)",
        df4: "Gasgas sa ibabaw",
        df5: "Lantad ang copper",
        df6: "Pagkakahiwalay ng layer / pagkatuklap ng pad",
        df7: "Putol na gilid / tiklop",

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
    "id": {
        title: "Formulir Pemeriksaan Tampilan RT",
        basic_info: "Informasi Dasar",
        date_label: "Tanggal",
        shift_label: "Shift",
        material_label: "No. Material",
        batch_label: "No. Batch",
        qty_label: "Jumlah",
        unit_label: "Unit",
        sample_label: "Jumlah Sampel",
        defect_label: "Cacat (isi jumlah: lolos=0 / tolak=1)",
        check_note: "Pemeriksa & Catatan",
        inspector_label: "Pemeriksa",
        note_label: "Catatan",

        df1: "Kerusakan lubang PIN",
        df2: "Tepi atau alur kasar",
        df3: "Tonjolan tepi (proses lanjutan perlu ubah program)",
        df4: "Goresan permukaan",
        df5: "Tembaga terbuka",
        df6: "Delaminasi / bantalan terkelupas",
        df7: "Tepi patah / lipatan",

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
   語言切換邏輯
====================================================== */
function switchLanguage(lang) {
    localStorage.setItem("rt_lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        let key = el.dataset.i18n;
        if (i18n[lang] && i18n[lang][key]) {
            el.textContent = i18n[lang][key];
        }
    });
}

/* ======================================================
   初始化語言
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
    let lang = localStorage.getItem("rt_lang") || "zh-TW";
    document.getElementById("languageSelector").value = lang;
    switchLanguage(lang);

    document.getElementById("languageSelector").addEventListener("change", e => {
        switchLanguage(e.target.value);
    });
});
