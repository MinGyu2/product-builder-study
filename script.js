// 테마 토글 기능
const themeBtn = document.getElementById('theme-btn');
const root = document.documentElement;

// 페이지 로드 시 기존 테마 설정 확인
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeBtn.innerText = theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드';
}

document.getElementById('generate-btn').addEventListener('click', function() {
    const resultsContainer = document.getElementById('lotto-results');
    resultsContainer.innerHTML = ''; // 기존 결과 초기화

    // 5번 반복하여 5줄 생성
    for (let i = 0; i < 5; i++) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'lotto-line';
        
        const numbers = [];
        // 1~45 사이의 중복 없는 랜덤 숫자 6개 생성
        while (numbers.length < 6) {
            const rand = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(rand)) {
                numbers.push(rand);
            }
        }
        // 숫자 정렬 (오름차순)
        numbers.sort((a, b) => a - b);

        // 보너스 번호 생성 (기존 6개와 겹치지 않게)
        let bonus;
        while (true) {
            bonus = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(bonus)) break;
        }

        // 6개 기본 공 생성 및 추가
        numbers.forEach(num => {
            const ball = createBall(num);
            lineDiv.appendChild(ball);
        });

        // 보너스 구분 기호 (+)
        const plusSign = document.createElement('span');
        plusSign.className = 'plus-sign';
        plusSign.innerText = '+';
        lineDiv.appendChild(plusSign);

        // 보너스 공 생성 및 추가
        const bonusBall = createBall(bonus, true);
        lineDiv.appendChild(bonusBall);

        resultsContainer.appendChild(lineDiv);
    }
});

function createBall(num, isBonus = false) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    if (isBonus) ball.classList.add('bonus-ball');
    ball.innerText = num;

    // 숫자에 따른 색상 클래스 추가
    if (num <= 10) ball.classList.add('range-1');
    else if (num <= 20) ball.classList.add('range-2');
    else if (num <= 30) ball.classList.add('range-3');
    else if (num <= 40) ball.classList.add('range-4');
    else ball.classList.add('range-5');

    // 애니메이션 효과 (약간의 딜레이를 주어 순차적으로 나타나게 할 수 있음)
    setTimeout(() => {
        ball.style.transform = 'scale(1)';
        ball.style.opacity = '1';
    }, 10);

    return ball;
}
