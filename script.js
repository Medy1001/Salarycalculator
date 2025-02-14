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
    const results = `
        시급: ${document.getElementById('hourlyResult').textContent}
        일급: ${document.getElementById('dailyResult').textContent}
        주급: ${document.getElementById('weeklyResult').textContent}
        월급: ${document.getElementById('monthlyResult').textContent}
        연봉: ${document.getElementById('yearlyResult').textContent}
    `;
    navigator.clipboard.writeText(results).then(() => {
        alert("결과값이 복사되었습니다.");
    });
}

function shareMessage() {
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
        console.error('Kakao SDK가 초기화되지 않았습니다.');
        return;
    }

    const resultText = `
        시급: ${document.getElementById('hourlyResult').innerText}
        일급: ${document.getElementById('dailyResult').innerText}
        주급: ${document.getElementById('weeklyResult').innerText}
        월급: ${document.getElementById('monthlyResult').innerText}
        연봉: ${document.getElementById('yearlyResult').innerText}
    `;
    
    // if (Kakao.Link && Kakao.Link.sendDefault) {
    //     Kakao.Link.sendDefault({
    //         objectType: 'text',
    //         text: resultText,
    //         link: {
    //             webUrl: 'https://tubular-klepon-602186.netlify.app/', // 공유할 웹사이트 URL
    //             mobileWebUrl: 'https://tubular-klepon-602186.netlify.app/',
    //         },
    //         buttonTitle: '결과 보기'
    //     }).then(() => {
    //         console.log('공유가 성공적으로 전송되었습니다.');
    //     }).catch((error) => {
    //         console.error('공유 전송 중 오류 발생:', error);
    //     });
    // } else {
    //     console.error('Kakao.Link.sendDefault가 정의되지 않았습니다.');
    // }
    Kakao.Share.sendDefault({
        objectType: 'text',
        text:
        resultText,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: 'https://tubular-klepon-602186.netlify.app/',
          webUrl: 'https://tubular-klepon-602186.netlify.app/',
        },
      });
}


  