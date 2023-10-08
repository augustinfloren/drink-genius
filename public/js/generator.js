const levier = document.getElementById("levier");
const boule = document.getElementById("boule");
const machine = document.getElementById("machine-container");
const liquidOne = document.querySelectorAll(".liquid-one");
const liquidTwo = document.querySelectorAll(".liquid-two");
const bottle = document.querySelectorAll(".bottle");
const door = document.getElementById('door');
const glassLiquid = document.getElementById('glass-liquid');
const stream = document.getElementById('stream');
const generatorTitle = document.getElementById('generator-title');

const stickSound = new Audio('../audio/stick.mp3');
const slotSound = new Audio('../audio/slot-sound.mp3');
const liquidSound = new Audio('../audio/liquid.mp3');
const shakerSound = new Audio('../audio/shaker.mp3');
const glassSound = new Audio('../audio/glass.mp3');


document.addEventListener("DOMContentLoaded", () => {
    boule.addEventListener('click', animateMachine);

    function animateMachine() {
        boule.removeEventListener('click', animateMachine);

        stickSound.play();
        stickSound.volume = "0.3";

        generatorTitle.textContent = "...";

        boule.style.boxShadow = 'inset 0 0 1.5em white';
        boule.style.transition = "box-shadow 0.2s ease-in-out";
        door.style.height = "60px";
        door.style.bottom = "";
        glassLiquid.style.height = "0px";
        door.style.transition = "all 0.1s ease-in-out";

        setTimeout (() => {
            machine.classList.add('animate__animated');
            machine.classList.add('animate__rubberBand');
            slotSound.play();
            slotSound.volume = "0.3";
        }, "0500")

        setTimeout (() => {
        }, "0500")

        setTimeout (() => {
            shakerSound.play();
            // slotSound.volume = "0.3";
            machine.classList.add('animate__tada');
        }, "2400")

        liquidOne.forEach((liquidOne) => {
            const randomNumber = Math.floor(Math.random() * (105 - 20)) + 20;
            setTimeout (() => {
                liquidOne.style.height = "0%";
                liquidOne.style.transition = "all 1.5s ease-in-out";
                liquidSound.play();
                // liquidSound.volume = "0.3";
            }, "0800")
            setTimeout (() => {
                liquidOne.style.height = `${randomNumber}%`;
                liquidOne.style.transition = "all 1.5s ease-in-out";
            }, "3600")
        })

        liquidTwo.forEach((liquidTwo) => {
            setTimeout (() => {
                liquidTwo.style.height = "0%";
                liquidTwo.style.transition = "height 0.4s ease-in-out";
            }, "2100")
            setTimeout (() => {
                liquidTwo.style.height = "100%";
                liquidTwo.style.transition = "all 0.4s ease-in-out";
            }, "3200")
        })

        levier.style.transform = "translateY(210px) scaleY(-1)";
        levier.style.transition = "all 0.1s";
        levier.style.filter = "blur(0.4rem)";
        setTimeout (() => {
            levier.style.filter = "blur(0rem)";
        }, "0070")
        setTimeout (() => {
            levier.style.transform = "translateY(0px) scaleY(1)";
            levier.style.transition = "all 0.4s";
        }, "1000")
        setTimeout (() => {
            door.style.height = "0";
            door.style.bottom = "100%";
            door.style.transition = "all 1s ease-in-out";
        }, "3400")
        setTimeout (() => {
            glassSound.play();
            // slotSound.volume = "0.3";
            generatorTitle.textContent = "Tadaaa !"
            stream.style.width = "5px";
            glassLiquid.style.height = "30px";
        }, "4400")
        setTimeout (() => {
            stream.style.width = "0px";
        }, "6000")
        setTimeout (() => {
            machine.classList.remove('animate__tada');
            machine.classList.remove('animate__rubberBand');
            boule.addEventListener('click', animateMachine);
        }, "6400")
        setTimeout (() => {
            boule.style.boxShadow = 'none';
            boule.style.transition = "box-shadow 1s ease-in-out";
        }, "6700")
    }
});