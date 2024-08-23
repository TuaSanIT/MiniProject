const images = [
    'images/baucua/bau.png',
    'images/baucua/ca.png',
    'images/baucua/cua.png',
    'images/baucua/ga.png',
    'images/baucua/huou.png',
    'images/baucua/tom.png'
]
const results = [document.getElementById('dice1'), document.getElementById('dice2'), document.getElementById('dice3')]
const bets = {
    bau: 0,
    ca: 0,
    cua: 0,
    ga: 0,
    huou: 0,
    tom: 0
};

const maxTotalBets = 3;

function updateBetCount() {
    document.getElementById('bau-count').textContent = bets.bau;
    document.getElementById('ca-count').textContent = bets.ca;
    document.getElementById('cua-count').textContent = bets.cua;
    document.getElementById('ga-count').textContent = bets.ga;
    document.getElementById('huou-count').textContent = bets.huou;
    document.getElementById('tom-count').textContent = bets.tom;
}

function getTotalBets() {
    return Object.values(bets).reduce((acc, count) => acc + count, 0);
}

function placeBet(animal) {
    if (getTotalBets() < maxTotalBets) {
        bets[animal]++;
        updateBetCount();
    } else {
        alert('Tổng số điểm đặt cược không được vượt quá 3.');
    }
}

document.getElementById('bet-bau').addEventListener('click', function() {
    placeBet('bau');
});

document.getElementById('bet-ca').addEventListener('click', function() {
    placeBet('ca');
});

document.getElementById('bet-cua').addEventListener('click', function() {
    placeBet('cua');
});

document.getElementById('bet-ga').addEventListener('click', function() {
    placeBet('ga');
});

document.getElementById('bet-huou').addEventListener('click', function() {
    placeBet('huou');
});

document.getElementById('bet-tom').addEventListener('click', function() {
    placeBet('tom');
});


document.getElementById('reset').addEventListener('click', function() {
    for (let animal in bets) {
        bets[animal] = 0;
    }
    updateBetCount();
});

function randomResult() {
    return Math.floor(Math.random() * 6);
}

document.getElementById('quay').addEventListener('click', function() {
    document.getElementById('quay').disabled = true;
    document.getElementById('reset').disabled = true;

    let spinCount = 0;
    const spinInterval = setInterval(() => {
        for (let i = 0; i < results.length; i++) {
            const randomIndex = randomResult();
            results[i].src = images[randomIndex];
        }
        spinCount++;
        if (spinCount >= 20){
            clearInterval(spinInterval);
            document.getElementById('quay').disabled = false;
            document.getElementById('reset').disabled = false;

            let resultIndexes = results.map(result => images.indexOf(result.src));
            let score = 0;
            for (let i = 0; i<6;i++){
                score += bets[i] * resultIndexes.filter(index => index === i).length;
            }
            alert(`Điểm của bạn: ${score}`);
        }
    }, 100);
});

document.getElementById('reset').addEventListener('click', function(){
    for (let i = 0; i < bets.length; i++) {
        bets[i] = 0;
    }
});

const betElements = [document.getElementById('bet-bau'),
                    document.getElementById('bet-ca'),
                    document.getElementById('bet-cua'),
                    document.getElementById('bet-ga'),
                    document.getElementById('bet-huou'),
                    document.getElementById('bet-tom')]

betElements.forEach((betElement, index) => {
    betElement.addEventListener('click', function(){
        if (bets.reduce((acc, curr) => acc + curr, 0)< 3) {
            bets[index]++;
            alert(`Bạn đã đặt cược: ${bets[index]} lần vào ${images[index].split('.')[0]}`);
        } else {
            alert('Tổng điểm cược không được vượt quá 3.');
        }
    });
});
