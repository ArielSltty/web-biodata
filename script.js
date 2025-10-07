// Inisialisasi elemen DOM
const biodataForm = document.getElementById('biodata-form');
const simpanBtn = document.getElementById('simpan-btn');
const resetBtn = document.getElementById('reset-btn');
const changePhotoBtn = document.getElementById('change-photo-btn');
const photoUpload = document.getElementById('photo-upload');
const profilePhoto = document.getElementById('profile-photo');
const previewPhoto = document.getElementById('preview-photo');

// Event listener untuk form submit
biodataForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Tampilkan konfirmasi
        const konfirmasi = confirm("Apakah Anda yakin ingin menyimpan biodata ini?");
        
        if (konfirmasi) {
            updatePreview();
            showAlert("Biodata berhasil disimpan!", "success");
        }
    }
});

// Event listener untuk tombol reset
resetBtn.addEventListener('click', function() {
    const konfirmasi = confirm("Apakah Anda yakin ingin mengosongkan form?");
    
    if (konfirmasi) {
        biodataForm.reset();
        clearErrors();
        resetPreview();
        showAlert("Form berhasil direset!", "info");
    }
});

// Event listener untuk mengganti foto
changePhotoBtn.addEventListener('click', function() {
    photoUpload.click();
});

photoUpload.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            profilePhoto.src = event.target.result;
            previewPhoto.src = event.target.result;
        }
        
        reader.readAsDataURL(e.target.files[0]);
        showAlert("Foto profil berhasil diubah!", "success");
    }
});

// Fungsi validasi form
function validateForm() {
    let isValid = true;
    clearErrors();
    
    // Validasi nama
    const nama = document.getElementById('nama').value.trim();
    if (nama === '') {
        showError('nama-error', 'Nama harus diisi');
        isValid = false;
    } else if (nama.length < 3) {
        showError('nama-error', 'Nama minimal 3 karakter');
        isValid = false;
    }
    
    // Validasi NIM
    const nim = document.getElementById('nim').value.trim();
    if (nim === '') {
        showError('nim-error', 'NIM harus diisi');
        isValid = false;
    } else if (!/^\d+$/.test(nim)) {
        showError('nim-error', 'NIM harus berupa angka');
        isValid = false;
    } else if (nim.length < 5) {
        showError('nim-error', 'NIM minimal 5 digit');
        isValid = false;
    }
    
    // Validasi jurusan
    const jurusan = document.getElementById('jurusan').value;
    if (jurusan === '') {
        showError('jurusan-error', 'Jurusan harus dipilih');
        isValid = false;
    }
    
    // Validasi email
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        showError('email-error', 'Email harus diisi');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-error', 'Format email tidak valid');
        isValid = false;
    }
    
    // Validasi tanggal lahir
    const tglLahir = document.getElementById('tgl-lahir').value;
    if (tglLahir === '') {
        showError('tgl-lahir-error', 'Tanggal lahir harus diisi');
        isValid = false;
    } else {
        const birthDate = new Date(tglLahir);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 17) {
            showError('tgl-lahir-error', 'Usia minimal 17 tahun');
            isValid = false;
        }
    }
    
    // Validasi alamat
    const alamat = document.getElementById('alamat').value.trim();
    if (alamat === '') {
        showError('alamat-error', 'Alamat harus diisi');
        isValid = false;
    } else if (alamat.length < 10) {
        showError('alamat-error', 'Alamat minimal 10 karakter');
        isValid = false;
    }
    
    return isValid;
}

// Fungsi untuk menampilkan error
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    
    // Tambahkan class error ke input terkait
    const inputId = elementId.replace('-error', '');
    const inputElement = document.getElementById(inputId);
    inputElement.style.borderColor = '#e74c3c';
}

// Fungsi untuk menghapus semua error
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const inputElements = document.querySelectorAll('input, select, textarea');
    inputElements.forEach(element => {
        element.style.borderColor = '#ddd';
    });
}

// Fungsi untuk memvalidasi format email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fungsi untuk memperbarui preview
function updatePreview() {
    document.getElementById('preview-nama').textContent = document.getElementById('nama').value || '-';
    document.getElementById('preview-nim').textContent = document.getElementById('nim').value || '-';
    document.getElementById('preview-jurusan').textContent = document.getElementById('jurusan').value || '-';
    document.getElementById('preview-email').textContent = document.getElementById('email').value || '-';
    
    // Format tanggal lahir
    const tglLahir = document.getElementById('tgl-lahir').value;
    if (tglLahir) {
        const date = new Date(tglLahir);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        document.getElementById('preview-tgl-lahir').textContent = formattedDate;
    } else {
        document.getElementById('preview-tgl-lahir').textContent = '-';
    }
    
    document.getElementById('preview-alamat').textContent = document.getElementById('alamat').value || '-';
}

// Fungsi untuk mereset preview
function resetPreview() {
    document.getElementById('preview-nama').textContent = '-';
    document.getElementById('preview-nim').textContent = '-';
    document.getElementById('preview-jurusan').textContent = '-';
    document.getElementById('preview-email').textContent = '-';
    document.getElementById('preview-tgl-lahir').textContent = '-';
    document.getElementById('preview-alamat').textContent = '-';
    
    // Reset foto ke default
    profilePhoto.src = 'images.jpeg';
    previewPhoto.src = 'images.jpeg';
}

// Fungsi untuk menampilkan alert
function showAlert(message, type) {
    // Hapus alert sebelumnya jika ada
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Buat elemen alert baru
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.textContent = message;
    
    // Style alert
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.padding = '15px 20px';
    alert.style.borderRadius = '4px';
    alert.style.color = 'white';
    alert.style.fontWeight = '500';
    alert.style.zIndex = '1000';
    alert.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    alert.style.maxWidth = '300px';
    
    // Warna berdasarkan jenis alert
    if (type === 'success') {
        alert.style.backgroundColor = '#2ecc71';
    } else if (type === 'error') {
        alert.style.backgroundColor = '#e74c3c';
    } else if (type === 'info') {
        alert.style.backgroundColor = '#3498db';
    } else {
        alert.style.backgroundColor = '#34495e';
    }
    
    // Tambahkan alert ke body
    document.body.appendChild(alert);
    
    // Hapus alert setelah 3 detik
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Event listener untuk update preview real-time
document.getElementById('nama').addEventListener('input', updatePreview);
document.getElementById('nim').addEventListener('input', updatePreview);
document.getElementById('jurusan').addEventListener('change', updatePreview);
document.getElementById('email').addEventListener('input', updatePreview);
document.getElementById('tgl-lahir').addEventListener('change', updatePreview);
document.getElementById('alamat').addEventListener('input', updatePreview);