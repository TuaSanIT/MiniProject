const images = [
    'images/baucua/bau.png',
    'images/baucua/cua.png',
    'images/baucua/tom.png',
    'images/baucua/ca.png',
    'images/baucua/huou.png',
    'images/baucua/ga.png'
];
const results = [document.getElementById('dice1'), document.getElementById('dice2'), document.getElementById('dice3')];
const bets = {
    bau: 0,
    cua: 0,
    tom: 0,
    ca: 0,
    huou: 0,
    ga: 0
};

const maxTotalBets = 3;

function updateBetCount() {
    document.getElementById('bau-count').textContent = bets.bau;
    document.getElementById('cua-count').textContent = bets.cua;
    document.getElementById('tom-count').textContent = bets.tom;
    document.getElementById('ca-count').textContent = bets.ca;
    document.getElementById('huou-count').textContent = bets.huou;
    document.getElementById('ga-count').textContent = bets.ga;
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

document.getElementById('bet-cua').addEventListener('click', function() {
    placeBet('cua');
});

document.getElementById('bet-tom').addEventListener('click', function() {
    placeBet('tom');
});

document.getElementById('bet-ca').addEventListener('click', function() {
    placeBet('ca');
});

document.getElementById('bet-huou').addEventListener('click', function() {
    placeBet('huou');
});

document.getElementById('bet-ga').addEventListener('click', function() {
    placeBet('ga');
});

function randomResult() {
    return Math.floor(Math.random() * images.length);
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
        if (spinCount >= 5) {
            clearInterval(spinInterval);
            document.getElementById('quay').disabled = false;
            document.getElementById('reset').disabled = false;

            const animals = ['bau', 'cua', 'tom', 'ca', 'huou', 'ga'];
            const resultIndexes = results.map(result => images.indexOf(result.src));
            const resultAnimals = resultIndexes.map(index => animals[index]);

            const resultCount = animals.reduce((acc, animal) => {
                acc[animal] = resultAnimals.filter(a => a === animal).length;
                return acc;
            }, {});

            const correctGuesses = animals.every(animal => bets[animal] === resultCount[animal]);

            let message = "";

            if (correctGuesses) {
                message = "Chúc mừng! Bạn đã đoán đúng !";
            } else {
                message = "Bạn đã đoán sai với kết quả: ";
                let wrongGuesses = [];

                animals.forEach(animal => {
                    if (bets[animal] !== resultCount[animal]) {
                        wrongGuesses.push(`${animal} (${bets[animal]} lần)`);
                    }
                });

                if (wrongGuesses.length === 0) {
                    message += wrongGuesses.join(', ');
                } else {
                    message += wrongGuesses.join(', ');
                }
            }

            console.log(message);
        }
    }, 100);
});

document.getElementById('reset').addEventListener('click', function(){
    for (let animal in bets) {
        bets[animal] = 0;
    }
    updateBetCount();
});
