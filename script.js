function calculate() {
    const payType = document.getElementById('payType').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const workHoursHours = parseInt(document.getElementById('workHoursHours').value);
    const workHoursMinutes = parseInt(document.getElementById('workHoursMinutes').value);
    const workDays = parseFloat(document.getElementById('workDays').value);
    const taxRate = parseFloat(document.getElementById('tax').value);
    const probation = document.getElementById('probation').checked;

    if (isNaN(amount) || isNaN(workDays) || isNaN(workHoursHours) || isNaN(workHoursMinutes)) {
        alert("유효한 값을 입력하세요.");
        return;
    }

    const totalDailyHours = workHoursHours + workHoursMinutes / 60;

    let hourly, daily, weekly, monthly, yearly;

    switch (payType) {
        case 'hourly':
            hourly = amount;
            break;
        case 'daily':
            hourly = amount / totalDailyHours;
            break;
        case 'weekly':
            hourly = amount / (totalDailyHours * workDays);
            break;
        case 'monthly':
            hourly = amount / (totalDailyHours * workDays * 4);
            break;
        case 'yearly':
            hourly = amount / (totalDailyHours * workDays * 4 * 12);
            break;
        default:
            alert("유효한 급여 형태를 선택하세요.");
            return;
    }

    if (probation) {
        hourly *= 0.9;
    }

    daily = hourly * totalDailyHours;
    weekly = daily * workDays;
    monthly = weekly * 4;
    yearly = monthly * 12;

    const applyTax = (value) => Math.floor(value * (1 - taxRate));

    const formatCurrency = (value) => {
        return value.toLocaleString('ko-KR') + ' 원';
    };

    document.getElementById('hourlyResult').textContent = formatCurrency(applyTax(hourly));
    document.getElementById('dailyResult').textContent = formatCurrency(applyTax(daily));
    document.getElementById('weeklyResult').textContent = formatCurrency(applyTax(weekly));
    document.getElementById('monthlyResult').textContent = formatCurrency(applyTax(monthly));
    document.getElementById('yearlyResult').textContent = formatCurrency(applyTax(yearly));
}

function copyResults() {
    const payTypeElement = document.getElementById('payType');
    const payTypeMap = {
        'hourly': '시급',
        'daily': '일급',
        'weekly': '주급',
        'monthly': '월급',
        'yearly': '연봉'
    };
    const payType = payTypeMap[payTypeElement.value];
    const amount = parseFloat(document.getElementById('amount').value);

    const results = `
        선택한 '${payType}' ${amount.toLocaleString('ko-KR')}원에 대한 급여형태별 계산결과는 다음과 같습니다.
        시급: ${document.getElementById('hourlyResult').innerText.padStart(10)}
        일급: ${document.getElementById('dailyResult').innerText.padStart(10)}
        주급: ${document.getElementById('weeklyResult').innerText.padStart(10)}
        월급: ${document.getElementById('monthlyResult').innerText.padStart(10)}
        연봉: ${document.getElementById('yearlyResult').innerText.padStart(10)}
    `;
    navigator.clipboard.writeText(results).then(() => {
        alert("결과값이 복사되었습니다.");
    });
}

function shareMessage() {
    const payTypeElement = document.getElementById('payType');
    const payTypeMap = {
        'hourly': '시급',
        'daily': '일급',
        'weekly': '주급',
        'monthly': '월급',
        'yearly': '연봉'
    };
    const payType = payTypeMap[payTypeElement.value];
    const amount = parseFloat(document.getElementById('amount').value);

    const resultText = `
        선택한 '${payType}' ${amount.toLocaleString('ko-KR')}원에 대한 급여형태별 계산결과는 다음과 같습니다.
        시급: ${document.getElementById('hourlyResult').innerText.padStart(10)}
        일급: ${document.getElementById('dailyResult').innerText.padStart(10)}
        주급: ${document.getElementById('weeklyResult').innerText.padStart(10)}
        월급: ${document.getElementById('monthlyResult').innerText.padStart(10)}
        연봉: ${document.getElementById('yearlyResult').innerText.padStart(10)}
    `;
    
    Kakao.Share.sendDefault({
        objectType: 'text',
        text: resultText,
        link: {
            mobileWebUrl: 'https://tubular-klepon-602186.netlify.app/',
            webUrl: 'https://tubular-klepon-602186.netlify.app/',
        },
    });
}


  