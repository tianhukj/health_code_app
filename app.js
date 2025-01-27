function showLoginForm() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function validateAndGenerate() {
    const name = document.getElementById('name').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    const errorMessage = document.getElementById('error-message');

    let valid = true;

    if (!name) {
        valid = false;
        errorMessage.innerText = '请输入姓名';
    } else if (!/^\d{18}$/.test(idNumber)) {
        valid = false;
        errorMessage.innerText = '身份证号必须是18位数字';
    }

    if (valid) {
        errorMessage.innerText = '';
        generateHealthCode(name, idNumber);
    }
}

async function generateHealthCode(name, idNumber) {
    const qrCodeContent = `姓名: ${name} 身份证号: ${idNumber}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeContent)}&size=200x200`;
    
    const ipApiUrl = 'https://ipapi.co/json/';
    const ipResponse = await fetch(ipApiUrl);
    const ipData = await ipResponse.json();
    
    const qrCodeImg = document.getElementById('qrcode');
    qrCodeImg.src = qrApiUrl;

    if (ipData.region === 'Shandong' && ipData.city === 'Dongying') {
        qrCodeImg.style.border = '10px solid red';
    } else {
        qrCodeImg.style.border = '10px solid green';
    }

    document.getElementById('user-info').innerText = `姓名: ${name}\n身份证号: ${idNumber}`;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('health-code').style.display = 'block';
}
