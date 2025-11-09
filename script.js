/* ====== LOGIN / LOGOUT REVISED (FINAL + DASHBOARD ACTIVE + USER PHOTO) ====== */
const users = {
  "vino@dispatcher1.com": "vino123",
  "derihanggara86@gmail.com": "Embun2017",
  "rahmat@dispatcher.com": "rahmat123",
  "syahrul@dispatcher.com": "syahrul123",
  "anugrah@pertamina.com": "anugrah2025",
  "suharso@pertamina.com": "acok2025",
  "imamsakroni@pertamina.com": "imam2025",
  "sarnubi@pertamina.com": "sarnubi2025",
  "syodri@devimandiri.com": "syodri2025",
  "dian@devimandiri.com": "Dian2025"
};

// foto user per email
const userPhotos = {
  "vino@dispatcher1.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "derihanggara86@gmail.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "rahmat@dispatcher.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "syahrul@dispatcher.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "anugrah@pertamina.com": "https://i.postimg.cc/cCynBx79/FAFA.jpg",
  "suharso@pertamina.com": "https://i.postimg.cc/MK0X4cQ7/acok.jpg",
  "imamsakroni@pertamina.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "sarnubi@pertamina.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "syodri@devimandiri.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "dian@devimandiri.com": "https://i.postimg.cc/Fzryv9tm/call-center.png"
};

let currentUserEmail = null;

/* === FUNGSI: TAMPILKAN DASHBOARD / APLIKASI SESUAI USER === */
function showAppForUser(email) {
  const loginPage = document.getElementById("loginPage");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main");

  if (loginPage) loginPage.style.display = "none";
  if (sidebar) {
    sidebar.style.display = "block";
    sidebar.style.opacity = "0";
    setTimeout(() => (sidebar.style.opacity = "1"), 300);
  }
  if (main) {
    main.style.display = "block";
    main.style.opacity = "0";
    setTimeout(() => (main.style.opacity = "1"), 300);
  }

  const name = email.split("@")[0];
  const cr = document.getElementById("createReservation");
  if (cr) cr.value = name;

  const userLabel = document.getElementById("loggedInUser");
  if (userLabel)
    userLabel.textContent = name.charAt(0).toUpperCase() + name.slice(1);

  const userImg = document.querySelector(".user-info img");
  if (userImg && userPhotos[email]) userImg.src = userPhotos[email];

  currentUserEmail = email;
  localStorage.setItem("loggedUser", email);
  localStorage.setItem("currentEditor", name);
}

/* === FUNGSI LOGIN DENGAN ANIMASI LOADER === */
function login() {
  const emailEl = document.getElementById("loginEmail");
  const passEl = document.getElementById("loginPassword");
  const errorEl = document.getElementById("loginError");
  const loaderEl = document.getElementById("loader");

  const email = emailEl ? emailEl.value.trim() : "";
  const pass = passEl ? passEl.value.trim() : "";

  if (!email || !pass) {
    if (errorEl) errorEl.textContent = "Isi email dan password.";
    return;
  }

  if (loaderEl) loaderEl.style.display = "block";
  if (errorEl) errorEl.textContent = "";

  setTimeout(() => {
    if (users[email] && users[email] === pass) {
      if (loaderEl) loaderEl.style.display = "none";
      showAppForUser(email);
    } else {
      if (loaderEl) loaderEl.style.display = "none";
      if (errorEl) errorEl.textContent = "Email atau password salah!";
    }
  }, 1500);
}

/* === FUNGSI LOGOUT (DENGAN LOADER) === */
function logout() {
  // buat elemen loader jika belum ada
  let loader = document.getElementById("logoutLoader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "logoutLoader";
    loader.innerHTML = `
      <div class="loader-overlay">
        <div class="spinner"></div>
        <p>Logging out...</p>
      </div>
    `;
    document.body.appendChild(loader);
  }

  // tampilkan loader
  loader.style.display = "flex";

  // sembunyikan sidebar dan main lebih dulu
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main");
  if (sidebar) sidebar.style.opacity = "0.5";
  if (main) main.style.opacity = "0.5";

  // proses logout dengan delay simulasi (1.5 detik)
  setTimeout(() => {
    // hapus data login dari localStorage
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("currentEditor");
    currentUserEmail = null;

    const cr = document.getElementById("createReservation");
    if (cr) cr.value = "";

    // kosongkan label user di header
    const userLabel = document.getElementById("loggedInUser");
    if (userLabel) userLabel.textContent = "Guest";

    // reset foto user ke default
    const userImg = document.querySelector(".user-info img");
    if (userImg)
      userImg.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    // tampilkan kembali halaman login
    const loginPage = document.getElementById("loginPage");
    if (loginPage) loginPage.style.display = "flex";
    if (sidebar) sidebar.style.display = "none";
    if (main) main.style.display = "none";

    // bersihkan input login
    const emailEl = document.getElementById("loginEmail");
    const passEl = document.getElementById("loginPassword");
    const errorEl = document.getElementById("loginError");
    if (emailEl) emailEl.value = "";
    if (passEl) passEl.value = "";
    if (errorEl) errorEl.textContent = "";

    // sembunyikan loader setelah logout selesai
    loader.style.display = "none";
  }, 1500);
}

/* === AUTO LOGIN (PADA RELOAD) === */
window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) loginBtn.addEventListener("click", login);

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  const saved = localStorage.getItem("loggedUser");
  const savedEditor = localStorage.getItem("currentEditor");

  if (saved) {
    currentUserEmail = saved;
    showAppForUser(saved); // otomatis tampil dashboard jika sebelumnya login
  } else {
    const loginPage = document.getElementById("loginPage");
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");
    if (loginPage) loginPage.style.display = "flex";
    if (sidebar) sidebar.style.display = "none";
    if (main) main.style.display = "none";
  }

  const cr = document.getElementById("createReservation");
  if (cr && savedEditor) cr.value = savedEditor;
});
/* ====== FIX: saat EDIT, nama lama selalu diganti dengan user login ====== */
function onEditReservation(recordId) {
  // Ambil user yang sedang login sekarang
  const currentEditor =
    localStorage.getItem("currentEditor") ||
    (currentUserEmail ? currentUserEmail.split("@")[0] : "Unknown");

  // Ganti kolom nama pembuat reservation (overwrite nama lama)
  const cr = document.getElementById("createReservation");
  if (cr) {
    cr.value = currentEditor;
    cr.setAttribute("data-locked", "true"); // opsional: tandai bahwa ini dari user login
  }

  console.log(`✏️ Data ID ${recordId} diedit oleh: ${currentEditor}`);

  // Contoh logika jika kamu kirim ke server
  // updateReservation(recordId, { editedBy: currentEditor });
}

/* contoh fungsi update (opsional) */
function updateReservation(recordId, data) {
  console.log(`Data ${recordId} diperbarui oleh ${data.editedBy}`);
  // fetch(scriptURL, {
  //   method: "POST",
  //   body: JSON.stringify({ id: recordId, ...data })
  // });
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const icon = document.getElementById("toggleIcon");

  sidebar.classList.toggle("collapsed");

  if (sidebar.classList.contains("collapsed")) {
    icon.style.transform = "rotate(180deg)";
  } else {
    icon.style.transform = "rotate(0deg)";
  }
}
function toggleMessagePanel() {
  document.getElementById("messagePanel").classList.toggle("hidden");
}
function showSection(sectionId) {
  alert("Tampilkan: " + sectionId);
}

document.querySelectorAll(".header-whatsapp a").forEach((link) => {
  const number = link.href.replace("https://wa.me/", "");
  link.href = `whatsapp://send?phone=${number}`; // langsung ke aplikasi WA
  link.target = "_blank"; // buka di tab baru (opsional)
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyznca636NiRGhJWSPorFGX4JGpDYkuvbUsQFne7q3ptGQU5FTPgmlc-IeHyA5EApMYFQ/exec";

// === FUNGSI UTAMA NAVIGASI ===
function showSection(id, autoLoad = false) {
  // Tampilkan loading
  document.getElementById("loading").style.display = "flex";

  // Sembunyikan semua section
  document.querySelectorAll(".main-content").forEach((section) => {
    section.classList.add("hidden");
  });

  // Menampilkan section yang dipilih
  const selected = document.getElementById(id);
  if (selected) {
    selected.classList.remove("hidden");
  }

  // Memuat data sesuai section yang dipilih
  if (autoLoad) {
    setTimeout(() => {
      switch (id) {
        case "reportSection":
          loadReport();
          break;
        case "vehicleReportSection":
          loadVehicleReport();
          break;
        case "driverReportSection":
          loadDriverReport();
          break;
        case "bbmTrendSection":
          loadBBMTrend();
          break;
        case "bbmAbnormalSection": // ✅ Tambahkan ini
          loadBBMAbnormal();
          break;
        case "dashboardBBMSection":
          loadDashboardBBM();
          break;
      }

      // Sembunyikan loading setelah data dimuat
      document.getElementById("loading").style.display = "none";
    }, 2000); // Ganti 2000 dengan waktu loading yang diinginkan (dalam milidetik)
  } else {
    // Sembunyikan loading jika tidak ada autoLoad
    document.getElementById("loading").style.display = "none";
  }
}

function showLoading(duration = 5000) {
  const loading = document.getElementById("loading");
  loading.style.display = "flex"; // tampilkan

  // otomatis hilang setelah duration milidetik
  setTimeout(() => {
    loading.style.display = "none";
  }, duration);
}

// Contoh pemanggilan
showLoading(5000);

// === CEK DATA BELUM UPDATE (berdasarkan kolom 'Jam update data') ===
function checkUnupdatedData() {
  fetch(scriptURL + "?action=getAllData")
    .then((res) => res.json())
    .then((data) => {
      unupdatedDataList = [];

      data.forEach((row) => {
        const jamUpdate = row["Jam update data"];
        const driver = row["Driver"];
        const kendaraan = row["KRP-Nopol"];
        const tanggal = row["Date"];

        // Jika jam update kosong → tambahkan ke daftar notif
        if (!jamUpdate || jamUpdate.trim() === "") {
          unupdatedDataList.push({
            driver: driver || "Tidak diketahui",
            kendaraan: kendaraan || "-",
            tanggal: tanggal || "-"
          });
        }
      });

      updateNotifUI();
    })
    .catch((err) => console.error("Gagal memuat data:", err));
}

// === PERBARUI TAMPILAN NOTIFIKASI ===
function updateNotifUI() {
  const badge = document.getElementById("notifBadge");
  const messageList = document.getElementById("messageList");

  if (unupdatedDataList.length > 0) {
    badge.style.display = "inline-block";
    badge.textContent = unupdatedDataList.length; // tampilkan jumlah data
    messageList.innerHTML = unupdatedDataList
      .map(
        (item) =>
          `<li>🚨 <b>${item.driver}</b> (${item.kendaraan}) - ${item.tanggal}</li>`
      )
      .join("");
  } else {
    badge.style.display = "none";
    messageList.innerHTML = "<li>✅ Semua data sudah diperbarui.</li>";
  }
}

// === TAMPIL / SEMBUNYIKAN PANEL NOTIF ===
function toggleMessagePanel() {
  const panel = document.getElementById("messagePanel");
  panel.classList.toggle("hidden");
}

// === FORMAT TANGGAL & JAM (UTILITY) ===
function formatDateForInput(dt) {
  if (!dt) return "";
  let d = new Date(dt);
  if (isNaN(d)) return "";
  let month = (d.getMonth() + 1).toString().padStart(2, "0");
  let day = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function formatTime(dt) {
  if (!dt) return "";
  let d = new Date(dt);
  if (isNaN(d)) return "";
  return d.toLocaleTimeString("id-ID", { hour12: false });
}

// === JALANKAN OTOMATIS SAAT HALAMAN DIBUKA ===
document.addEventListener("DOMContentLoaded", () => {
  checkUnupdatedData(); // pertama kali dijalankan
  setInterval(checkUnupdatedData, 15000); // cek ulang setiap 15 detik (bisa ubah ke 60000 untuk 1 menit)
});

// === ✅ Hitung Real perjalanan, Rasio BBM (L), dan Rasio BBM terinput ===
function hitungPerjalanan() {
  let kmAwal = parseFloat(document.getElementById("kmAwal").value) || 0;
  let kmAkhir = parseFloat(document.getElementById("kmAkhir").value) || 0;
  let qty =
    parseFloat(document.querySelector('input[name="QTY (L)"]').value) || 0;
  let real = kmAkhir - kmAwal;
  real = real >= 0 ? real : 0;

  let rasioBBM = real / 10;
  let rasioTerinput = qty > 0 ? real / qty : 0;
  rasioTerinput = Math.round(rasioTerinput);

  document.getElementById("realPerjalanan").value = real.toFixed(2);
  document.getElementById("rasioBBM").value = rasioBBM.toFixed(2);
  document.querySelector(
    'input[name="Rasio BBM terinput"]'
  ).value = rasioTerinput;
}

document.getElementById("kmAwal").addEventListener("input", hitungPerjalanan);
document.getElementById("kmAkhir").addEventListener("input", hitungPerjalanan);
document
  .querySelector('input[name="QTY (L)"]')
  .addEventListener("input", hitungPerjalanan);

let editRowIndex = null;

const kmAwalInput = document.getElementById("kmAwal");
const kmAkhirInput = document.getElementById("kmAkhir");
const qtyInput = document.querySelector('input[name="QTY (L)"]');
const realPerjalananInput = document.getElementById("realPerjalanan");
const rasioDisplay = document.getElementById("rasioDisplay");

function updateRasioAktual() {
  const kmAwal = parseFloat(kmAwalInput.value) || 0;
  const kmAkhir = parseFloat(kmAkhirInput.value) || 0;
  const qty = parseFloat(qtyInput.value) || 0;
  const jarak = kmAkhir - kmAwal;
  realPerjalananInput.value = jarak > 0 ? jarak : 0;

  if (jarak > 0 && qty > 0) {
    const rasio = jarak / qty;
    rasioDisplay.textContent = `1:${rasio.toFixed(1)}`;
  } else {
    rasioDisplay.textContent = "1:0";
  }
}

kmAwalInput.addEventListener("input", updateRasioAktual);
kmAkhirInput.addEventListener("input", updateRasioAktual);
qtyInput.addEventListener("input", updateRasioAktual);

// === Submit Data Baru ===
document.getElementById("myForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  formData.set("action", "submit");
  const now = new Date();
  formData.set("Date", formData.get("Date") || now.toISOString().split("T")[0]);
  formData.set("Jam submit", now.toLocaleString("id-ID", { hour12: false }));
  formData.set("Jam update", "");

  fetch(scriptURL, { method: "POST", body: formData })
    .then((res) => res.text())
    .then((msg) => {
      document.getElementById("status").innerHTML = msg;
      e.target.reset();
      editRowIndex = null;
      loadReport();
      loadVehicleReport();
    })
    .catch(
      (err) =>
        (document.getElementById("status").innerHTML =
          "❌ Gagal: " + err.message)
    );
});

// === Edit Data Terakhir Berdasarkan KRP-Nopol ===
document.getElementById("editBtn").addEventListener("click", () => {
  const nopol = document.querySelector('select[name="KRP-Nopol"]').value;
  if (!nopol) {
    alert("Pilih KRP-Nopol dulu!");
    return;
  }

  fetch(`${scriptURL}?KRP-Nopol=${encodeURIComponent(nopol)}`)
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) return alert("❌ " + res.message);
      const data = res.data;
      editRowIndex = data.rowIndex;

      const form = document.getElementById("myForm").elements;
      const currentEditor = localStorage.getItem("currentEditor") || "Unknown";

      for (const key in data) {
        if (form[key]) {
          if (key === "CreateReservation" || key === "createReservation")
            continue;
          form[key].value =
            key === "Date" ? formatDateForInput(data[key]) : data[key];
        }
      }

      if (form["CreateReservation"])
        form["CreateReservation"].value = currentEditor;
      if (form["createReservation"])
        form["createReservation"].value = currentEditor;

      alert(`✅ Data terakhir KRP ${nopol} dimuat (baris ${editRowIndex})`);
      if (typeof hitungPerjalanan === "function") hitungPerjalanan();
    })
    .catch((err) => alert("❌ Gagal ambil data: " + err.message));
});

// === 🆕 Upload / Paste Foto Saat UPDATE Data ===
let updatedPhotoBase64 = "";
let updatedPhotoLink = "";

document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById("updatePhoto");
  if (!photoInput) return;

  const linkInput = document.createElement("input");
  linkInput.type = "url";
  linkInput.name = "Foto Bukti";
  linkInput.placeholder = "Link foto (Drive atau lainnya)";
  linkInput.id = "updatePhotoLink";
  linkInput.style.marginTop = "5px";
  photoInput.insertAdjacentElement("afterend", linkInput);

  photoInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      updatedPhotoBase64 = ev.target.result;
      const preview = document.getElementById("updatePhotoPreview");
      preview.src = updatedPhotoBase64;
      document.getElementById("updatePhotoPreviewContainer").style.display =
        "block";
    };
    reader.readAsDataURL(file);
  });

  document.addEventListener("paste", function (event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (const item of items) {
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = function (e) {
          updatedPhotoBase64 = e.target.result;
          const preview = document.getElementById("updatePhotoPreview");
          preview.src = updatedPhotoBase64;
          document.getElementById("updatePhotoPreviewContainer").style.display =
            "block";
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  });
});

// === Update Data Berdasarkan Row Index ===
document.getElementById("updateBtn").addEventListener("click", () => {
  if (!editRowIndex) {
    alert("Silakan tekan tombol Edit dulu!");
    return;
  }

  const formData = new FormData(document.getElementById("myForm"));
  formData.set("action", "update");
  formData.set("rowIndex", editRowIndex);
  formData.set(
    "Jam update",
    new Date().toLocaleString("id-ID", { hour12: false })
  );

  const linkInput = document.getElementById("updatePhotoLink");
  if (linkInput && linkInput.value.trim() !== "") {
    formData.set("Foto Bukti", linkInput.value.trim());
  } else if (updatedPhotoBase64) {
    formData.set("Foto Bukti", updatedPhotoBase64);
  } else {
    formData.set("Foto Bukti", "");
  }

  fetch(scriptURL, { method: "POST", body: formData })
    .then((res) => res.text())
    .then((msg) => {
      document.getElementById("status").innerHTML = msg;
      document.getElementById("myForm").reset();
      updatedPhotoBase64 = "";
      editRowIndex = null;
      loadReport();
      loadVehicleReport();

      const previewContainer = document.getElementById(
        "updatePhotoPreviewContainer"
      );
      const previewImage = document.getElementById("updatePhotoPreview");
      const fileInput = document.getElementById("updatePhoto");
      const linkInput = document.getElementById("updatePhotoLink");

      if (previewContainer) previewContainer.style.display = "none";
      if (previewImage) previewImage.src = "";
      if (fileInput) fileInput.value = "";
      if (linkInput) linkInput.value = "";
    })
    .catch(
      (err) =>
        (document.getElementById("status").innerHTML =
          "❌ Gagal update: " + err.message)
    );
});

// === 🔹 Load Report Utama (termasuk Foto Bukti) ===
let reportData = [];

function loadReport() {
  const url = `${scriptURL}?action=getalldata`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.querySelector("#reportTable tbody");
      if (!tbody) return;
      tbody.innerHTML = "";

      if (!Array.isArray(data)) {
        tbody.innerHTML = `<tr><td colspan='17'>${
          data?.message || "Gagal memuat data"
        }</td></tr>`;
        return;
      }

      if (data.length === 0) {
        tbody.innerHTML = "<tr><td colspan='17'>Tidak ada data</td></tr>";
        return;
      }

      reportData = data;
      renderFilteredReport(data);
    })
    .catch((err) => console.error("❌ [loadReport] Gagal load report:", err));
}

// === 🔹 Render Table dengan Kolom Foto Bukti ===
function renderFilteredReport(data) {
  const tbody = document.querySelector("#reportTable tbody");
  tbody.innerHTML = "";

  const keys = [
    "Date",
    "Fungsi",
    "WKP",
    "Discription",
    "Driver",
    "KRP-Nopol",
    "KM awal",
    "KM akhir",
    "Real perjalanan",
    "Rasio BBM (L)",
    "QTY (L)",
    "Create reservation",
    "Rasio BBM terinput",
    "Jam submit data",
    "Jam update data",
    "Tempat Pengisian",
    "Foto Bukti"
  ];

  if (!data || data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='17'>Tidak ada data ditemukan</td></tr>";
    return;
  }

  data.forEach((row) => {
    const tr = document.createElement("tr");

    keys.forEach((key) => {
      const td = document.createElement("td");
      let value = row[key] ?? "";

      // === Format tanggal dan jam ===
      if (key === "Date" && value)
        value = new Date(value).toLocaleDateString("id-ID");
      if ((key === "Jam submit data" || key === "Jam update data") && value)
        value = new Date(value).toLocaleString("id-ID", { hour12: false });

      // === FOTO BUKTI ===
      if (key === "Foto Bukti") {
        if (value && typeof value === "string") {
          let fileId = "";

          // Tangkap semua variasi link Google Drive
          const patterns = [
            /\/d\/([a-zA-Z0-9_-]{25,})/,
            /id=([a-zA-Z0-9_-]{25,})/,
            /open\?id=([a-zA-Z0-9_-]{25,})/,
            /file\/d\/([a-zA-Z0-9_-]{25,})/,
            /uc\?export=view&id=([a-zA-Z0-9_-]{25,})/,
            /([a-zA-Z0-9_-]{25,})/ // fallback
          ];

          for (const pattern of patterns) {
            const match = value.match(pattern);
            if (match && match[1]) {
              fileId = match[1];
              break;
            }
          }

          // Buat direct image URL jika ID ditemukan
          const photoURL = fileId
            ? `https://lh3.googleusercontent.com/d/${fileId}=s220`
            : value;

          td.innerHTML = `
            <a href="https://drive.google.com/file/d/${fileId}/view" target="_blank" title="Klik untuk lihat foto">
              <img src="${photoURL}"
                   alt="Foto Bukti"
                   onerror="this.onerror=null;this.src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png';"
                   style="width:70px;height:70px;border-radius:10px;object-fit:cover;box-shadow:0 0 3px rgba(0,0,0,0.3);cursor:pointer;">
            </a>
          `;
        } else {
          td.innerHTML = "<span style='color:#aaa;'>📷 Tidak ada foto</span>";
        }
      } else {
        td.textContent = value;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

// === Fungsi Filter Data ===
function applyFilter() {
  const date = document.getElementById("filterDate")?.value.trim();
  const nopol = document
    .getElementById("filterNopol")
    ?.value.trim()
    .toLowerCase();
  const driver = document
    .getElementById("filterDriver")
    ?.value.trim()
    .toLowerCase();

  if (!reportData || reportData.length === 0) {
    alert("⚠️ Data belum dimuat. Silakan klik Refresh Data terlebih dahulu.");
    return;
  }

  const filtered = reportData.filter((row) => {
    const matchDate =
      !date ||
      (row["Date"] &&
        new Date(row["Date"]).toLocaleDateString("id-ID") ===
          new Date(date).toLocaleDateString("id-ID"));
    const matchNopol =
      !nopol ||
      (row["KRP-Nopol"] && row["KRP-Nopol"].toLowerCase().includes(nopol));
    const matchDriver =
      !driver ||
      (row["Driver"] && row["Driver"].toLowerCase().includes(driver));
    return matchDate && matchNopol && matchDriver;
  });

  renderFilteredReport(filtered);
}

// === Fungsi Reset Filter ===
function resetFilter() {
  document.getElementById("filterDate").value = "";
  document.getElementById("filterNopol").value = "";
  document.getElementById("filterDriver").value = "";
  renderFilteredReport(reportData);
}

function loadVehicleReport() {
  const startDateInput = document.getElementById("vehicleStartDate")?.value;
  const endDateInput = document.getElementById("vehicleEndDate")?.value;
  const startDate = startDateInput ? new Date(startDateInput) : null;
  const endDate = endDateInput ? new Date(endDateInput) : null;

  const url = `${scriptURL}?action=getalldata`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("📊 [loadVehicleReport] Data diterima:", data);

      const headerRow = document.getElementById("vehicleReportHeader");
      const body = document.getElementById("vehicleReportBody");

      if (!headerRow || !body) {
        console.error("❌ Elemen tabel kendaraan tidak ditemukan di HTML.");
        return;
      }

      if (!Array.isArray(data)) {
        body.innerHTML = `<tr><td colspan='100%'>${
          data?.message || "Gagal memuat data"
        }</td></tr>`;
        return;
      }

      if (data.length === 0) {
        body.innerHTML = "<tr><td colspan='100%'>Tidak ada data</td></tr>";
        return;
      }

      // === Ambil tanggal unik ===
      let uniqueDates = [
        ...new Set(data.map((item) => item["Date"]).filter(Boolean))
      ]
        .map((d) => new Date(d))
        .sort((a, b) => a - b);

      // === Jika user belum isi filter tanggal, tampilkan 10 hari terakhir ===
      if (!startDate && !endDate && uniqueDates.length > 10) {
        uniqueDates = uniqueDates.slice(-10);
      }

      // === Filter berdasarkan tanggal input (jika ada) ===
      if (startDate) uniqueDates = uniqueDates.filter((d) => d >= startDate);
      if (endDate) uniqueDates = uniqueDates.filter((d) => d <= endDate);

      const vehicles = [
        ...new Set(data.map((item) => item["KRP-Nopol"]).filter(Boolean))
      ];

      // === Pivot Data ===
      const pivot = {};
      vehicles.forEach((v) => {
        pivot[v] = {};
        uniqueDates.forEach((d) => (pivot[v][d.toISOString()] = 0));
      });

      data.forEach((item) => {
        const kendaraan = item["KRP-Nopol"];
        const tanggal = new Date(item["Date"]).toISOString();
        const qty = parseFloat(item["QTY (L)"]) || 0;
        if (kendaraan && pivot[kendaraan]?.hasOwnProperty(tanggal)) {
          pivot[kendaraan][tanggal] += qty;
        }
      });

      // === Header Tabel ===
      headerRow.innerHTML =
        "<th>Kendaraan</th>" +
        uniqueDates
          .map((d) => `<th>${d.toLocaleDateString("id-ID")}</th>`)
          .join("") +
        "<th>Total</th>";

      // === Isi Body Tabel ===
      body.innerHTML = "";
      vehicles.forEach((v) => {
        let total = 0;
        const cells = uniqueDates
          .map((d) => {
            const val = pivot[v][d.toISOString()] || 0;
            total += val;
            return `<td>${val ? val.toFixed(2) : ""}</td>`;
          })
          .join("");
        body.innerHTML += `<tr><td><b>${v}</b></td>${cells}<td><b>${total.toFixed(
          2
        )}</b></td></tr>`;
      });

      // === Grand Total ===
      let grandRow = "<tr><td><b>Grand Total</b></td>";
      let grandTotal = 0;
      uniqueDates.forEach((d) => {
        let sum = 0;
        vehicles.forEach((v) => (sum += pivot[v][d.toISOString()] || 0));
        grandRow += `<td><b>${sum.toFixed(2)}</b></td>`;
        grandTotal += sum;
      });
      grandRow += `<td><b>${grandTotal.toFixed(2)}</b></td></tr>`;
      body.innerHTML += grandRow;
    })
    .catch((err) =>
      console.error("❌ [loadVehicleReport] Gagal memuat Vehicle report:", err)
    );
}
async function downloadTableAsExcel(bodyTableId, filename) {
  // Ambil tbody
  const bodyTable = document.getElementById(bodyTableId);
  if (!bodyTable) {
    alert("Tabel body tidak ditemukan!");
    return;
  }

  // Cari header terdekat
  const headerDiv = bodyTable
    .closest(".card")
    .querySelector(".table-header table thead");
  if (!headerDiv) {
    alert("Header tabel tidak ditemukan!");
    return;
  }

  // Ambil header dan data
  const headers = Array.from(headerDiv.querySelectorAll("th")).map((th) =>
    th.innerText.trim()
  );
  const rows = Array.from(bodyTable.querySelectorAll("tr"));

  // Buat workbook dan sheet
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Report");

  // Tambahkan header
  sheet.addRow(headers);

  // 🎨 === Styling Header ===
  const headerRow = sheet.getRow(1);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF007ACC" } // biru elegan
    };
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" }, // teks putih
      size: 12
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center"
    };
    cell.border = {
      top: { style: "thin", color: { argb: "FFCCCCCC" } },
      left: { style: "thin", color: { argb: "FFCCCCCC" } },
      bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
      right: { style: "thin", color: { argb: "FFCCCCCC" } }
    };
  });

  // Loop setiap baris data
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");
    const rowValues = [];

    for (let j = 0; j < cells.length; j++) {
      const img = cells[j].querySelector("img");
      if (img) {
        rowValues.push(""); // placeholder untuk gambar
      } else {
        rowValues.push(cells[j].innerText.trim());
      }
    }

    const addedRow = sheet.addRow(rowValues);

    // Setelah tambah baris, tempelkan gambar (jika ada)
    for (let j = 0; j < cells.length; j++) {
      const img = cells[j].querySelector("img");
      if (img) {
        try {
          const imgResponse = await fetch(img.src);
          const imgBlob = await imgResponse.blob();
          const arrayBuffer = await imgBlob.arrayBuffer();

          const imageId = workbook.addImage({
            buffer: arrayBuffer,
            extension: "jpeg"
          });

          // Tambahkan gambar di sel
          sheet.addImage(imageId, {
            tl: { col: j, row: i + 1 },
            ext: { width: 80, height: 60 }
          });
        } catch (err) {
          console.error("⚠️ Gagal menambahkan gambar:", err);
        }
      }
    }
  }

  // === Styling isi tabel ===
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: "middle",
          horizontal: "left",
          wrapText: true
        };
        cell.border = {
          top: { style: "thin", color: { argb: "FFEEEEEE" } },
          left: { style: "thin", color: { argb: "FFEEEEEE" } },
          bottom: { style: "thin", color: { argb: "FFEEEEEE" } },
          right: { style: "thin", color: { argb: "FFEEEEEE" } }
        };
      });
    }
  });

  // === Lebar kolom otomatis ===
  sheet.columns.forEach((col) => (col.width = 25));

  // === Download hasil ===
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer]),
    `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
  );
}

// === Report BBM Per Driver (Tabel per tanggal & kendaraan) ===
function loadDriverReport() {
  fetch(scriptURL + "?action=getAllData")
    .then((response) => {
      if (!response.ok) throw new Error("Gagal ambil data dari server");
      return response.json();
    })
    .then((data) => {
      console.log("📊 [Driver Report] Data diterima:", data);
      console.log("🔎 Contoh kolom:", Object.keys(data[0] || {}));

      const body = document.getElementById("driverReportBody");
      body.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        body.innerHTML = "<tr><td colspan='4'>Tidak ada data</td></tr>";
        return;
      }

      // 🔹 Ambil semua tanggal unik (urut naik)
      const tanggalSet = new Set();
      data.forEach((row) => {
        if (row["Date"]) {
          const tgl = new Date(row["Date"]).toLocaleDateString("id-ID");
          tanggalSet.add(tgl);
        }
      });
      const tanggalList = Array.from(tanggalSet).sort(
        (a, b) =>
          new Date(a.split("/").reverse().join("-")) -
          new Date(b.split("/").reverse().join("-"))
      );

      // 🔹 Kelompokkan data per driver -> tanggal -> kendaraan
      const driverMap = {};
      data.forEach((row) => {
        const driver = row["Driver"] || "-";
        const tanggal = row["Date"]
          ? new Date(row["Date"]).toLocaleDateString("id-ID")
          : "-";

        // ✅ Baca nama kolom sesuai Sheet (KRP-Nopol di kolom F)
        const nopol =
          row["KRP-Nopol"] || // ← ini sesuai dengan Google Sheet kamu
          row["KRP Nopol"] ||
          row["Nopol"] ||
          row["No Polisi"] ||
          row["Inisial Kendaraan"] ||
          "-";

        const liter = parseFloat(row["QTY (L)"] || 0);

        if (!driverMap[driver]) driverMap[driver] = {};
        if (!driverMap[driver][tanggal]) driverMap[driver][tanggal] = {};
        if (!driverMap[driver][tanggal][nopol])
          driverMap[driver][tanggal][nopol] = 0;

        driverMap[driver][tanggal][nopol] += liter;
      });

      // 🔹 Tampilkan data per driver (per tanggal dan kendaraan)
      Object.keys(driverMap).forEach((driver) => {
        let total = 0;
        let tanggalHTML = "";
        let kendaraanHTML = "";

        tanggalList.forEach((tgl) => {
          if (driverMap[driver][tgl]) {
            Object.keys(driverMap[driver][tgl]).forEach((nopol) => {
              const liter = driverMap[driver][tgl][nopol];
              if (liter > 0) {
                tanggalHTML += `<div>${tgl}</div>`;
                kendaraanHTML += `<div>${nopol}: ${liter.toFixed(2)} L</div>`;
                total += liter;
              }
            });
          }
        });

        const rowHTML = `
          <tr>
            <td>${driver}</td>
            <td style="text-align:left">${tanggalHTML || "-"}</td>
            <td style="text-align:left">${kendaraanHTML || "-"}</td>
            <td><b>${total.toFixed(2)}</b></td>
          </tr>`;
        body.insertAdjacentHTML("beforeend", rowHTML);
      });
    })
    .catch((err) => {
      console.error("⚠️ [Driver Report] Error:", err);
      document.getElementById("driverReportBody").innerHTML =
        "<tr><td colspan='4'>Terjadi kesalahan memuat data</td></tr>";
    });
}

// === LOAD REPORT TREN BBM (DENGAN PERSENTASE, EFISIENSI & DETEKSI ANOMALI) ===
function loadBBMTrend() {
  fetch(scriptURL + "?action=getAllData")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        alert("⚠️ Tidak ada data BBM ditemukan.");
        return;
      }

      // === Deteksi otomatis nama kolom ===
      const firstRow = data[0];
      const bbmKey =
        Object.keys(firstRow).find(
          (key) =>
            key.toLowerCase().includes("bbm") &&
            !key.toLowerCase().includes("laporan")
        ) || "Jumlah BBM";

      const nopolKey =
        Object.keys(firstRow).find(
          (key) =>
            key.toLowerCase().includes("nopol") ||
            key.toLowerCase().includes("krp")
        ) || "KRP-Nopol";

      const driverKey =
        Object.keys(firstRow).find((key) =>
          key.toLowerCase().includes("driver")
        ) || "Nama Driver";

      const kmAwalKey =
        Object.keys(firstRow).find((key) =>
          key.toLowerCase().includes("km awal")
        ) || null;

      const kmAkhirKey =
        Object.keys(firstRow).find((key) =>
          key.toLowerCase().includes("km akhir")
        ) || null;

      const sorted = data.sort((a, b) => {
        if (a[nopolKey] === b[nopolKey]) {
          return new Date(a.Date) - new Date(b.Date);
        }
        return a[nopolKey].localeCompare(b[nopolKey]);
      });

      const trendRows = [];
      let lastData = {};
      let counter = 1;

      for (const row of sorted) {
        const krp = row[nopolKey] || "-";
        const driver = row[driverKey] || "-";
        const tanggal = row["Date"]
          ? new Date(row["Date"]).toLocaleDateString("id-ID")
          : "-";
        const jumlah = parseFloat(row[bbmKey]) || 0;
        const kmAwal = parseFloat(row[kmAwalKey]) || 0;
        const kmAkhir = parseFloat(row[kmAkhirKey]) || 0;
        const jarak = kmAkhir - kmAwal;

        // === Efisiensi per KM ===
        const efisiensiLiterPerKM =
          jarak > 0 ? (jumlah / jarak).toFixed(3) : "-";

        // === Analisis perubahan BBM ===
        let status = "📍 Data Awal";
        let percentChange = "-";
        let catatan = "-";

        if (lastData[krp] !== undefined) {
          const prev = lastData[krp].jumlah;
          const diff = jumlah - prev;
          percentChange =
            prev !== 0 ? ((diff / prev) * 100).toFixed(2) : "0.00";

          if (diff > 0) {
            if (percentChange > 100) {
              status = "🚨 Naik Tidak Normal";
              catatan = "⚠️ Anomali BBM (kenaikan >100%)";
            } else {
              status = "🔺 Naik";
            }
          } else if (diff < 0) {
            status = "🔻 Turun";
          } else {
            status = "⚖️ Stabil";
          }
        }

        trendRows.push({
          no: counter++,
          krp,
          driver,
          tanggal,
          jumlah: jumlah.toFixed(2),
          kmAwal: kmAwal > 0 ? kmAwal.toString() : "-",
          kmAkhir: kmAkhir > 0 ? kmAkhir.toString() : "-",
          persen: percentChange + "%",
          status,
          literPerKM: efisiensiLiterPerKM,
          catatan
        });

        // Simpan data terakhir
        lastData[krp] = { jumlah };
      }

      // === Isi tabel ===
      const tbody = document.querySelector("#bbmTrendTable tbody");
      tbody.innerHTML = "";

      if (trendRows.length === 0) {
        tbody.innerHTML = "<tr><td colspan='11'>Belum ada data BBM</td></tr>";
        return;
      }

      for (const r of trendRows) {
        const anomalyClass = r.catatan.includes("Anomali")
          ? "style='background:#ffe0e0;'"
          : "";
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <tr ${anomalyClass}>
            <td>${r.no}</td>
            <td>${r.krp}</td>
            <td>${r.driver}</td>
            <td>${r.tanggal}</td>
            <td>${r.jumlah}</td>
            <td>${r.kmAwal}</td>
            <td>${r.kmAkhir}</td>
            <td>${r.persen}</td>
            <td>${r.status}</td>
            <td>${r.literPerKM}</td>
            <td>${r.catatan}</td>
          </tr>
        `;
        tbody.appendChild(tr);
      }
    })
    .catch((err) => {
      console.error("❌ Gagal ambil data:", err);
      alert("Gagal memuat tren BBM: " + err.message);
    });
}

// === INISIALISASI DROPDOWN OTOMATIS UNTUK KENDARAAN ===
function initVehicleDropdown() {
  fetch(scriptURL + "?action=getAllData")
    .then((res) => res.json())
    .then((data) => {
      const dropdown = document.getElementById("vehicleSelect");
      dropdown.innerHTML = "<option value=''>-- Pilih KRP / Nopol --</option>";

      if (!Array.isArray(data) || data.length === 0) {
        dropdown.innerHTML +=
          "<option disabled>Tidak ada data kendaraan</option>";
        return;
      }

      // Ambil daftar kendaraan unik dari kolom "KRP-Nopol"
      const kendaraanSet = new Set();
      data.forEach((item) => {
        const kendaraan = item["KRP-Nopol"];
        if (kendaraan) kendaraanSet.add(kendaraan);
      });

      // Isi dropdown
      kendaraanSet.forEach((k) => {
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = k;
        dropdown.appendChild(opt);
      });

      console.log("✅ Dropdown kendaraan berhasil dimuat:", [...kendaraanSet]);
    })
    .catch((err) => console.error("❌ Gagal memuat dropdown kendaraan:", err));
}

// === LOAD GRAFIK SESUAI KENDARAAN DIPILIH ===
function loadVehicleChart() {
  const kendaraanDipilih = document.getElementById("vehicleSelect").value;
  if (!kendaraanDipilih) {
    alert("Pilih kendaraan terlebih dahulu!");
    return;
  }

  fetch(scriptURL + "?action=getAllData")
    .then((res) => res.json())
    .then((data) => {
      const filterData = data.filter(
        (d) => d["KRP-Nopol"] === kendaraanDipilih
      );
      if (filterData.length === 0) {
        alert("Tidak ada data untuk kendaraan ini.");
        return;
      }

      // === Format tanggal tanpa jam ===
      const tanggal = filterData.map((d) => {
        const raw = d["Date"];
        if (!raw) return "";
        const t = new Date(raw);
        if (isNaN(t)) return raw;
        return t.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      });

      // === Ambil Qty BBM dari kolom "QTY (L)" ===
      const qty = filterData.map((d) => {
        const val = d["QTY (L)"]; // ambil langsung kolom QTY (L)
        const num = parseFloat(
          String(val)
            .replace(/[^\d.,-]/g, "")
            .replace(",", ".")
        );
        return isNaN(num) ? 0 : num;
      });

      // === EMA ===
      const EMA = (data, period) => {
        const k = 2 / (period + 1);
        const emaArray = [];
        data.forEach((v, i) => {
          if (i === 0) emaArray.push(v);
          else emaArray.push(v * k + emaArray[i - 1] * (1 - k));
        });
        return emaArray;
      };

      // === ATR (fix tampil & auto-scale) ===
      const ATR = (data, period = 14) => {
        const result = [];
        for (let i = 1; i < data.length; i++) {
          const diff = Math.abs(data[i] - data[i - 1]);
          result.push(diff);
        }
        // Isi kekurangan awal dengan 0 biar panjang sama
        while (result.length < data.length) result.unshift(0);
        return result;
      };

      const ema20 = EMA(qty, 20);
      const ema50 = EMA(qty, 50);
      const ema100 = EMA(qty, 100);
      const ema200 = EMA(qty, 200);
      const atr14 = ATR(qty, 14);

      // === Hapus chart lama jika ada ===
      if (window.vehicleChartInstance) window.vehicleChartInstance.destroy();

      const ctx = document
        .getElementById("vehicleChartCanvas")
        .getContext("2d");
      window.vehicleChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: tanggal,
          datasets: [
            {
              label: "Qty BBM",
              data: qty,
              borderColor: "orange",
              borderWidth: 2,
              fill: false,
              yAxisID: "y"
            },
            {
              label: "EMA20",
              data: ema20,
              borderColor: "blue",
              borderWidth: 1,
              yAxisID: "y"
            },
            {
              label: "EMA50",
              data: ema50,
              borderColor: "green",
              borderWidth: 1,
              yAxisID: "y"
            },
            {
              label: "EMA100",
              data: ema100,
              borderColor: "gold",
              borderWidth: 1,
              yAxisID: "y"
            },
            {
              label: "EMA200",
              data: ema200,
              borderColor: "purple",
              borderWidth: 1,
              yAxisID: "y"
            },
            {
              label: "ATR14",
              data: atr14,
              borderColor: "red",
              borderDash: [4, 4],
              borderWidth: 2,
              yAxisID: "y1" // pakai sumbu kanan biar kelihatan
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Grafik Qty BBM - ${kendaraanDipilih}`
            },
            legend: { position: "bottom" }
          },
          scales: {
            y: {
              title: { display: true, text: "Jumlah BBM (L)" },
              position: "left"
            },
            y1: {
              title: { display: true, text: "ATR (Volatilitas)" },
              position: "right",
              grid: { drawOnChartArea: false }
            },
            x: { title: { display: true, text: "Tanggal Pengisian BBM" } }
          }
        }
      });
    })
    .catch((err) => console.error("❌ Gagal memuat data grafik:", err));
}

// === DOWNLOAD GRAFIK SEBAGAI GAMBAR PNG ===
function downloadVehicleChart() {
  const canvas = document.getElementById("vehicleChartCanvas");
  const link = document.createElement("a");
  link.download = "Grafik_BBM_per_Kendaraan.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// === DOWNLOAD DATA GRAFIK KE EXCEL ===
function downloadVehicleChartExcel() {
  const kendaraanDipilih = document.getElementById("vehicleSelect").value;
  if (!kendaraanDipilih || !window.vehicleChartInstance) {
    alert("Tampilkan grafik terlebih dahulu sebelum download Excel!");
    return;
  }

  const chart = window.vehicleChartInstance;
  const labels = chart.data.labels;
  const datasets = chart.data.datasets;

  let rows = [["Tanggal", ...datasets.map((ds) => ds.label)]];
  labels.forEach((label, i) => {
    const row = [label];
    datasets.forEach((ds) => row.push(ds.data[i] ?? ""));
    rows.push(row);
  });

  // Konversi ke Excel
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Grafik_BBM");
  XLSX.writeFile(wb, `Grafik_BBM_${kendaraanDipilih}.xlsx`);
}

// === LOAD DROPDOWN SAAT AWAL ===
document.addEventListener("DOMContentLoaded", initVehicleDropdown);

// === INISIALISASI DROPDOWN OTOMATIS UNTUK DRIVER ===
function initDriverDropdown() {
  fetch(scriptURL + "?action=getAllData")
    .then((res) => res.json())
    .then((data) => {
      const dropdown = document.getElementById("driverSelect");
      dropdown.innerHTML = "<option value=''>-- Pilih Nama Driver --</option>";

      if (!Array.isArray(data) || data.length === 0) {
        dropdown.innerHTML += "<option disabled>Tidak ada data driver</option>";
        return;
      }

      const driverSet = new Set();
      data.forEach((item) => {
        const driver = (
          item["Nama Driver"] ||
          item["Driver"] ||
          item["Nama"] ||
          ""
        ).trim();
        if (driver) driverSet.add(driver);
      });

      driverSet.forEach((d) => {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        dropdown.appendChild(opt);
      });

      console.log("✅ Dropdown driver berhasil dimuat:", [...driverSet]);
    })
    .catch((err) => console.error("❌ Gagal memuat dropdown driver:", err));
}

// === INISIALISASI DROPDOWN ===
document.addEventListener("DOMContentLoaded", () => {
  initVehicleDropdown();
  initDriverDropdown();
});

// === LOAD GRAFIK SESUAI DRIVER DIPILIH ===
function loadDriverChart() {
  const driverDipilih = document.getElementById("driverSelect").value.trim();
  if (!driverDipilih) {
    alert("Pilih driver terlebih dahulu!");
    return;
  }

  fetch(scriptURL + "?action=getAllData")
    .then((res) => res.json())
    .then((data) => {
      // Filter data driver
      const filterData = data.filter((d) => {
        const driverName = (
          d["Nama Driver"] ||
          d["Driver"] ||
          d["Nama"] ||
          ""
        ).trim();
        return driverName.toLowerCase() === driverDipilih.toLowerCase();
      });

      if (filterData.length === 0) {
        alert("Tidak ada data untuk driver ini.");
        return;
      }

      // Simpan data driver terakhir untuk download
      window.lastDriverData = filterData;

      // Format tanggal
      const tanggal = filterData.map((d) => {
        const t = new Date(d["Date"]);
        return isNaN(t)
          ? d["Date"]
          : t.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            });
      });

      // Ambil nilai dari kolom "Qty (L)"
      const qty = filterData.map((d) => {
        const key = Object.keys(d).find((k) => k.toLowerCase() === "qty (l)");
        const val = key
          ? parseFloat(
              String(d[key])
                .replace(/[^\d.,-]/g, "")
                .replace(",", ".")
            )
          : 0;
        return isNaN(val) ? 0 : val;
      });

      console.log("✅ Qty array:", qty); // Debug: pastikan data terambil

      // Hitung EMA & ATR
      const EMA = (data, period) => {
        const k = 2 / (period + 1);
        return data.map((v, i) =>
          i === 0 ? v : v * k + data[i - 1] * (1 - k)
        );
      };
      const ATR = (data, period = 14) => {
        const result = [];
        for (let i = 0; i < data.length; i++) {
          if (i < period) result.push(null);
          else {
            const slice = data.slice(i - period, i);
            const avg =
              slice.reduce((a, b) => a + Math.abs(b - slice[0]), 0) / period;
            result.push(avg);
          }
        }
        return result;
      };

      const ema20 = EMA(qty, 20);
      const ema50 = EMA(qty, 50);
      const ema100 = EMA(qty, 100);
      const ema200 = EMA(qty, 200);
      const atr14 = ATR(qty, 14);

      // Render Chart.js
      if (window.driverChartInstance) window.driverChartInstance.destroy();
      const ctx = document.getElementById("driverChartCanvas").getContext("2d");
      window.driverChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: tanggal,
          datasets: [
            {
              label: "Qty BBM",
              data: qty,
              borderColor: "orange",
              borderWidth: 2,
              fill: false
            },
            {
              label: "EMA20",
              data: ema20,
              borderColor: "blue",
              borderWidth: 1
            },
            {
              label: "EMA50",
              data: ema50,
              borderColor: "green",
              borderWidth: 1
            },
            {
              label: "EMA100",
              data: ema100,
              borderColor: "gold",
              borderWidth: 1
            },
            {
              label: "EMA200",
              data: ema200,
              borderColor: "purple",
              borderWidth: 1
            },
            {
              label: "ATR14",
              data: atr14,
              borderColor: "red",
              borderDash: [4, 4],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: `Grafik Qty BBM - ${driverDipilih}` },
            legend: { position: "bottom" }
          },
          scales: {
            y: { title: { display: true, text: "Jumlah (L)" } },
            x: { title: { display: true, text: "Tanggal Pengisian BBM" } }
          }
        }
      });
    })
    .catch((err) => console.error("❌ Gagal load grafik driver:", err));
}

// === DOWNLOAD DATA DRIVER SEBAGAI EXCEL ===
function downloadDriverChartExcel() {
  if (!window.lastDriverData || window.lastDriverData.length === 0) {
    alert("Data driver belum tersedia. Refresh grafik terlebih dahulu.");
    return;
  }

  const filterData = window.lastDriverData;
  const driverDipilih = document.getElementById("driverSelect").value.trim();

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headers = Object.keys(filterData[0]);
  const trHead = document.createElement("tr");
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  filterData.forEach((row) => {
    const tr = document.createElement("tr");
    headers.forEach((h) => {
      const td = document.createElement("td");
      td.textContent = row[h] ?? "";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "DriverData");
  XLSX.writeFile(
    wb,
    `Data_${driverDipilih}_${new Date().toISOString().split("T")[0]}.xlsx`
  );
}

let allBBMData = []; // simpan semua data global

// === LOAD DASHBOARD BBM UTAMA ===
async function loadDashboardBBM() {
  try {
    const res = await fetch(`${scriptURL}?action=getalldata`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log("📊 [Dashboard BBM] Data diterima:", data);

    if (!Array.isArray(data) || data.length === 0) {
      alert("Tidak ada data BBM ditemukan.");
      return;
    }

    allBBMData = data;
    populateMonthSelector(data);
    updateDashboardByMonth();
    loadTempatPengisian(data); // 🔹 Tambahkan agar card tempat pengisian otomatis muncul
  } catch (err) {
    console.error("❌ [Dashboard BBM] Gagal memuat data:", err);
    alert("Gagal memuat data Dashboard BBM.\nDetail: " + err.message);
  }
}

/* === DROPDOWN BULAN === */
function populateMonthSelector(data) {
  const monthSelector = document.getElementById("monthSelector");
  if (!monthSelector) return;

  const months = new Set();
  data.forEach((item) => {
    if (item["Date"]) {
      const tgl = new Date(item["Date"]);
      const bulanKey = `${tgl.getFullYear()}-${String(
        tgl.getMonth() + 1
      ).padStart(2, "0")}`;
      months.add(bulanKey);
    }
  });

  const sortedMonths = Array.from(months).sort();
  sortedMonths.forEach((key) => {
    const [year, month] = key.split("-");
    const label = `${tglToNamaBulan(parseInt(month))} ${year}`;
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = label;
    monthSelector.appendChild(opt);
  });
}

/* === FILTER BERDASARKAN BULAN === */
function updateDashboardByMonth() {
  const selectedMonth = document.getElementById("monthSelector").value;
  let filteredData = allBBMData;

  if (selectedMonth !== "all") {
    filteredData = allBBMData.filter((item) => {
      if (!item["Date"]) return false;
      const tgl = new Date(item["Date"]);
      const key = `${tgl.getFullYear()}-${String(tgl.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      return key === selectedMonth;
    });
  }

  renderDashboard(filteredData);
  loadTempatPengisian(filteredData); // 🔹 update juga berdasarkan bulan terpilih
}

/* === RENDER DASHBOARD === */
function renderDashboard(data) {
  const perFungsi = {};
  const detailPerFungsi = {};
  const perTanggal = {};
  const perMinggu = {};
  const perBulan = {};

  data.forEach((item) => {
    const qty = parseFloat(item["QTY (L)"]) || 0;
    const fungsi = item["Fungsi"] || "Lainnya";
    const rawDate = item["Date"];
    if (!rawDate) return;
    const tgl = new Date(rawDate);

    perFungsi[fungsi] = (perFungsi[fungsi] || 0) + qty;

    const tempat =
      item["Tempat Pengisian"] ||
      item["Lokasi Pengisian"] ||
      item["Tempat"] ||
      "-";

    if (!detailPerFungsi[fungsi]) detailPerFungsi[fungsi] = [];
    detailPerFungsi[fungsi].push({
      Tanggal: tgl.toLocaleDateString("id-ID"),
      Nopol: item["KRP-Nopol"] || "-",
      Driver: item["Driver"] || "-",
      Deskripsi: item["Discription"] || "-",
      Tempat: tempat,
      Qty: qty.toFixed(1)
    });

    const tanggalKey = tgl.toISOString().split("T")[0];
    perTanggal[tanggalKey] = (perTanggal[tanggalKey] || 0) + qty;

    const weekLabel = getWeekLabel(tgl);
    perMinggu[weekLabel] = (perMinggu[weekLabel] || 0) + qty;

    const bulanKey = `${tgl.toLocaleString("id-ID", {
      month: "long"
    })} ${tgl.getFullYear()}`;
    perBulan[bulanKey] = (perBulan[bulanKey] || 0) + qty;
  });

  const container = document.getElementById("fungsiSummary");
  if (container) {
    container.innerHTML = "";
    Object.entries(perFungsi).forEach(([fungsi, total]) => {
      const card = document.createElement("div");
      card.className = "summary-card";
      card.style.cursor = "pointer";
      card.innerHTML = `<strong>${fungsi}</strong><br><span>${total.toFixed(
        1
      )} L</span>`;
      card.onclick = () => showDetailTable(fungsi, detailPerFungsi[fungsi]);
      container.appendChild(card);
    });
  }

  createChart(
    "chartBBMTrend",
    "line",
    "Grafik Tren Harian BBM (L)",
    perTanggal
  );
  createChart("chartBBMWeekly", "bar", "Total BBM per Minggu", perMinggu);
  createChart("chartBBMMonthly", "bar", "Total BBM per Bulan", perBulan);
}

/* === 🔹 LOAD CARD PER TEMPAT PENGISIAN (DENGAN DETAIL) === */
function loadTempatPengisian(data) {
  if (!data || data.length === 0) return;
  const tempatMap = {};
  const detailPerTempat = {};

  data.forEach((d) => {
    const tempat = d["Tempat Pengisian"] || d["WKP"] || "Lainnya";
    const val = parseFloat(
      String(d["QTY (L)"])
        .replace(/[^\d.,-]/g, "")
        .replace(",", ".")
    );
    const qty = isNaN(val) ? 0 : val;
    if (!tempatMap[tempat]) tempatMap[tempat] = 0;
    tempatMap[tempat] += qty;

    if (!detailPerTempat[tempat]) detailPerTempat[tempat] = [];
    const tgl = new Date(d["Date"]);
    detailPerTempat[tempat].push({
      Tanggal: tgl.toLocaleDateString("id-ID"),
      Nopol: d["KRP-Nopol"] || "-",
      Driver: d["Driver"] || "-",
      Deskripsi: d["Discription"] || "-",
      Tempat: tempat, // Menambahkan tempat ke detail
      Qty: qty.toFixed(1)
    });
  });

  const container = document.getElementById("tempatPengisianContainer");
  if (!container) return;
  container.innerHTML = "";

  Object.entries(tempatMap).forEach(([tempat, total]) => {
    const card = document.createElement("div");
    card.className = "tempat-card";
    card.style.cursor = "pointer";
    card.innerHTML = `
      <h3>${tempat}</h3>
      <p><strong>${total.toFixed(1)} L</strong></p>
    `;
    card.onclick = () => showDetailTableTempat(tempat, detailPerTempat[tempat]);
    container.appendChild(card);
  });
}

/* === 🔹 MODAL DETAIL TEMPAT PENGISIAN === */
function showDetailTableTempat(tempat, data) {
  let modal = document.getElementById("fungsiModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "fungsiModal";
    modal.innerHTML = `
      <div class="modal-overlay" onclick="closeModal()"></div>
      <div class="modal-content">
        <h3 id="modalTitle"></h3>
        <table id="fungsiDetailTable" class="detail-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>KRP-Nopol</th>
              <th>Driver</th>
              <th>Deskripsi</th>
              <th>Tempat Pengisian</th>
              <th>QTY (L)</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div class="modal-buttons">
          <button onclick="exportToExcel()" class="btn-export">Export ke Excel</button>
          <button onclick="closeModal()" class="btn-close">Tutup</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const tbody = modal.querySelector("tbody");
  tbody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.Tanggal}</td>
      <td>${row.Nopol}</td>
      <td>${row.Driver}</td>
      <td>${row.Deskripsi}</td>
      <td>${row.Tempat}</td>
      <td style="text-align:right">${row.Qty}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("modalTitle").textContent = `Detail ${tempat}`;
  modal.dataset.fungsi = tempat;
  modal.dataset.data = JSON.stringify(data);
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("fungsiModal");
  if (modal) modal.style.display = "none";
}

/* === MODAL DETAIL PER FUNGSI === */
function showDetailTable(fungsi, data) {
  let modal = document.getElementById("fungsiModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "fungsiModal";
    modal.innerHTML = `
      <div class="modal-overlay" onclick="closeModal()"></div>
      <div class="modal-content">
        <h3 id="modalTitle"></h3>
        <table id="fungsiDetailTable" class="detail-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>KRP-Nopol</th>
              <th>Driver</th>
              <th>Discription</th>
              <th>Tempat Pengisian</th>
              <th>QTY (L)</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div class="modal-buttons">
          <button onclick="exportToExcel()" class="btn-export">Export ke Excel</button>
          <button onclick="closeModal()" class="btn-close">Tutup</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const tbody = modal.querySelector("tbody");
  tbody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.Tanggal}</td>
      <td>${row.Nopol}</td>
      <td>${row.Driver}</td>
      <td>${row.Deskripsi}</td>
      <td>${row.Tempat}</td>
      <td style="text-align:right">${row.Qty}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("modalTitle").textContent = `Detail ${fungsi}`;
  modal.dataset.fungsi = fungsi;
  modal.dataset.data = JSON.stringify(data);
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("fungsiModal");
  if (modal) modal.style.display = "none";
}

/* === EXPORT EXCEL === */
async function exportToExcel() {
  const modal = document.getElementById("fungsiModal");
  if (!modal) return;

  const fungsi = modal.dataset.fungsi || "Report";
  const data = JSON.parse(modal.dataset.data || "[]");

  if (data.length === 0) {
    alert("❌ Tidak ada data untuk diekspor!");
    return;
  }

  // 🔵 Buat workbook & sheet
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Data");

  // 🔹 Tambahkan header
  const headers = Object.keys(data[0]);
  sheet.addRow(headers);

  // 🔹 Tambahkan data
  data.forEach((item) => {
    sheet.addRow(Object.values(item));
  });

  // 🎨 Style header
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF007ACC" } // biru elegan
    };
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 }; // teks putih
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin", color: { argb: "FFCCCCCC" } },
      left: { style: "thin", color: { argb: "FFCCCCCC" } },
      bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
      right: { style: "thin", color: { argb: "FFCCCCCC" } }
    };
  });

  // 🔸 Atur lebar kolom otomatis
  sheet.columns.forEach((col) => (col.width = 25));

  // 💾 Simpan file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer]),
    `Laporan_${fungsi.replace(/\s+/g, "_")}_${
      new Date().toISOString().split("T")[0]
    }.xlsx`
  );
}

/* === CHART UTILITY === */
function createChart(canvasId, type, title, dataObj) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  if (window[canvasId] && typeof window[canvasId].destroy === "function")
    window[canvasId].destroy();

  const sortedLabels = Object.keys(dataObj);
  window[canvasId] = new Chart(ctx, {
    type: type,
    data: {
      labels: sortedLabels,
      datasets: [
        {
          label: "Total BBM (L)",
          data: sortedLabels.map((key) => dataObj[key]),
          backgroundColor:
            type === "bar" ? "rgba(0,123,255,0.6)" : "rgba(0,123,255,0.3)",
          borderColor: "#007bff",
          fill: type === "line",
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          color: "#007bff",
          font: { size: 16, weight: "bold" }
        }
      },
      scales: {
        x: { ticks: { color: "#333" }, grid: { color: "#eee" } },
        y: { ticks: { color: "#333" }, grid: { color: "#eee" } }
      }
    }
  });
}

/* === HELPER === */
function getWeekLabel(date) {
  const curr = new Date(date);
  const weekStart = new Date(curr);
  weekStart.setDate(curr.getDate() - curr.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const startStr = `${weekStart.getDate()} ${weekStart.toLocaleString("id-ID", {
    month: "short"
  })}`;
  const endStr = `${weekEnd.getDate()} ${weekEnd.toLocaleString("id-ID", {
    month: "short"
  })}`;
  const weekNum = getWeekNumber(curr);
  return `Minggu ke-${weekNum} (${startStr}–${endStr})`;
}

function getWeekNumber(date) {
  const tempDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
}

function tglToNamaBulan(bulan) {
  const nama = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  return nama[bulan - 1];
}

// === LOAD REPORT BBM ABNORMAL (Rasio < 10) ===
function loadBBMAbnormal() {
  fetch(scriptURL + "?action=getAllData") // ambil semua data dari Google Sheet
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        alert("⚠️ Tidak ada data BBM ditemukan.");
        return;
      }

      const tbody = document.querySelector("#bbmAbnormalTable tbody");
      tbody.innerHTML = "";

      let counter = 1;

      data.forEach((row) => {
        // Ambil rasio BBM terinput
        const rasio = parseFloat(row["Rasio BBM terinput"]) || 0;

        // Filter hanya rasio < 10
        if (rasio < 10) {
          const tanggal = row["Date"]
            ? new Date(row["Date"]).toLocaleDateString("id-ID")
            : "-";

          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${counter++}</td>
            <td>${tanggal}</td>
            <td>${row["Fungsi"] || "-"}</td>
            <td>${row["WKP"] || "-"}</td>
            <td>${row["Discription"] || "-"}</td>
            <td>${row["Driver"] || "-"}</td>
            <td>${row["KRP-Nopol"] || "-"}</td>
            <td>${row["KM awal"] || 0}</td>
            <td>${row["KM akhir"] || 0}</td>
            <td>${row["Real perjalanan"] || 0}</td>
            <td>${row["QTY (L)"] || 0}</td>
            <td>${row["Create reservation"] || "-"}</td>
            <td>${rasio}</td>
          `;
          tbody.appendChild(tr);
        }
      });

      // Jika tidak ada yang abnormal
      if (!tbody.hasChildNodes()) {
        tbody.innerHTML =
          "<tr><td colspan='13'>Tidak ada BBM abnormal</td></tr>";
      }
    })
    .catch((err) => {
      console.error("❌ Gagal ambil data abnormal:", err);
      alert("Gagal memuat BBM Abnormal: " + err.message);
    });
}

let map;
let markers = [];
let routingControl;

// Inisialisasi peta (versi cepat)
function initLeaflet() {
  const mapContainer = document.getElementById("leafletMap");
  mapContainer.style.background =
    "#eaeaea url('https://i.postimg.cc/63F3RrZn/loading-map.gif') center center no-repeat";

  // Inisialisasi langsung dengan performa tinggi
  map = L.map("leafletMap", {
    center: [-2.5, 105],
    zoom: 5,
    zoomControl: true,
    preferCanvas: true
  });

  // Gunakan tile server cepat
  const tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
      crossOrigin: true
    }
  ).addTo(map);

  // Hapus background loading setelah tile pertama dimuat
  tiles.on("load", () => {
    mapContainer.style.background = "none";
  });
}

// Cari kota otomatis dan buat routing
async function searchCities() {
  const input = document.getElementById("cityInput").value;
  if (!input) return alert("Masukkan kota yang ingin dicari!");

  const cities = input.split(",").map((c) => c.trim());
  const waypoints = [];

  resetMapDistance();

  for (const city of cities) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const marker = L.marker([lat, lon], { title: city })
          .addTo(map)
          .bindPopup(`<b>${city}</b>`)
          .openPopup();
        markers.push(marker);
        waypoints.push(L.latLng(lat, lon));
      }
    } catch (err) {
      console.error("Gagal mencari kota:", err);
    }
  }

  if (waypoints.length > 1) {
    routingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      lineOptions: {
        styles: [
          { color: "magenta", weight: 4, opacity: 0.8, dashArray: "10,10" }
        ]
      },
      createMarker: function (i, wp, nWps) {
        return L.marker(wp.latLng).bindPopup(`<b>${cities[i]}</b>`);
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1"
      }),
      show: false
    }).addTo(map);

    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];
      const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);
      document.getElementById(
        "leafletDistanceResult"
      ).textContent = `📏 Total jarak mengikuti jalan: ${distanceKm} km (${waypoints.length} kota)`;
    });

    map.fitBounds(L.latLngBounds(waypoints));
  } else if (waypoints.length === 1) {
    map.setView(waypoints[0], 10);
  }
}

// Reset peta
function resetMapDistance() {
  markers.forEach((m) => map.removeLayer(m));
  markers = [];
  if (routingControl) map.removeControl(routingControl);
  routingControl = null;
  document.getElementById("leafletDistanceResult").textContent = "";
}

// Jalankan langsung saat halaman siap
document.addEventListener("DOMContentLoaded", initLeaflet);
// Pastikan peta langsung menyesuaikan ukuran kontainer
setTimeout(() => {
  map.invalidateSize();
}, 200);