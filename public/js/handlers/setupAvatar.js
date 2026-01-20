export function setupAvatar()  {
    setTimeout(() => {
        animateAvatar();
    }, random(1000, 2500));
}

function animateAvatar() {
    let count = 0;
    const interval = window.setInterval(() => {
        const avatar = document.querySelector('.avatar');
        avatar.style.transform = `rotate(${Math.random() * 360}deg)`;
        count++;
        if (count > 7) {
            window.clearInterval(interval);
            avatar.style.transform = `rotate(0deg)`;
        }
    }, 200);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}