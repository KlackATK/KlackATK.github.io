let mothActive = false;
let mothCleanup = () => {};
let manualAnimationDisable = false;

function initMothTrail() {
	if(window.innerWidth < 1001 || mothActive) return;

	mothActive = true;
	const NUM_DOTS = 25;
	const trail = [];
	let mouseX = 0, mouseY = 0;

	// Idle detection
	let lastMoveTime = Date.now();
	let idle = false;

	const orbitTarget = document.getElementById("orbitTarget");

  // Create the dots
	for (let i = 0; i < NUM_DOTS; i++) {
		const wrapper = document.createElement("div");
		wrapper.classList.add("moth-wrapper");
		wrapper.style.pointerEvents = "none";

		const dot = document.createElement("div");
		dot.classList.add("moth");
		dot.innerHTML = `
			<?xml version="1.0" encoding="UTF-8"?>
			<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 856 673.3">
				<image width="3024" height="4032" transform="translate(-2633.8 -623.1) scale(.6)" xlink:href="content-1.png"/>
				<path d="M853.8,153.4s-20,27-53.3,26.5c0,0-47.7,29.3-82.4,79,0,0-17.7,10.1-22,14.9,0,0,17.1,24.3,8,38.4,0,0-4.5-.1-8.8,5,0,0,.6,6.8-5.6,11.9,0,0-18.2,1.8-30.9,9l-90.8,55s-58.5,23.7-36.6,107.5c0,0,18.2,53.1,22.8,63,4.6,10,9.4,43.4,9.4,43.4,0,0,9.4,28.2,18.3,34.9l8.1,23.3s-2,5.2-9.5,2.4c0,0-7.9,13-14-.4,0,0-8.4-25.9-12.1-54,0,0-35.5-16.5-59-86.4,0,0-3.1-33-20.1-94.7l-22.6-85.7s-6.3-19.5-5.5-67.1c0,.4-.4,5-13.1,10.7,0,0-5.1,2.4-6.1,2.4s-6.1-2.4-6.1-2.4c-12.7-5.6-13.1-10.3-13.1-10.7.8,47.6-5.5,67.1-5.5,67.1l-22.6,85.7c-17,61.7-20.1,94.7-20.1,94.7-23.6,69.9-59,86.4-59,86.4-3.8,28.1-12.1,54-12.1,54-6.1,13.4-14,.4-14,.4-7.5,2.9-9.5-2.4-9.5-2.4l8-23.3c8.9-6.7,18.3-34.9,18.3-34.9,0,0,4.7-33.4,9.4-43.4,4.6-10,22.8-63,22.8-63,21.9-83.8-36.6-107.5-36.6-107.5l-90.8-55c-12.7-7.2-30.9-9-30.9-9-6.2-5.1-5.6-11.9-5.6-11.9-4.3-5.2-8.8-5-8.8-5-9.1-14.1,8-38.4,8-38.4-4.3-4.8-22-14.9-22-14.9-34.7-49.7-82.4-79-82.4-79-33.3.5-53.3-26.5-53.3-26.5,1.3-6.8-2.2-11.7-2.2-11.7C23.6,66.9,142.6,62.9,142.6,62.9c96.6-9.1,243.8,28.8,243.8,28.8,12-8,29.5-8.9,29.5-8.9-4.3-9.4,6.3-11.2,6.3-11.2C418.1,46.6,364.1.7,363.2,0c41.9,10,58.7,26.4,64.8,41,6.1-14.6,22.9-30.9,64.8-41-.8.7-54.9,46.6-59,71.5,0,0,10.6,1.8,6.3,11.2,0,0,17.6.9,29.5,8.9,0,0,147.2-37.9,243.8-28.8,0,0,119,4.1,142.6,78.8,0,0-3.5,4.8-2.2,11.7Z" />
			</svg>`;

    dot.style.animationDelay = `${Math.random() * 2}s`;

    const radius = Math.random() * 8 + 4;
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.02 + Math.random() * 0.02;
    const size = 3 + Math.random();

    dot.style.width = `${10 * size}px`;
    dot.style.height = `${10 * size}px`;
	dot.style.pointerEvents = "none";

    wrapper.appendChild(dot);
    document.body.appendChild(wrapper);

		trail.push({
			el: wrapper,
			x: mouseX,
			y: mouseY,
			angle,
			radius,
			speed,
		});
	}

	document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
    lastMoveTime = Date.now();
    idle = false;
  });

	function animate() {
		const now = Date.now();
		if (now - lastMoveTime > 2000) idle = true;

		let leadX, leadY;

		if (idle && orbitTarget) {
			const rect = orbitTarget.getBoundingClientRect();
			const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			leadX = rect.left + scrollLeft + rect.width / 2;
			leadY = rect.top + scrollTop + rect.height / 2;
		} else {
			leadX = mouseX;
			leadY = mouseY;
		}

		trail.forEach((dot, index) => {
			dot.angle += dot.speed;

			const dx = leadX - dot.x;
			const dy = leadY - dot.y;

			dot.x += dx * 0.2;
			dot.y += dy * 0.2;
	
			const offsetX = Math.cos(dot.angle) * dot.radius;
			const offsetY = Math.sin(dot.angle) * dot.radius;

			const angleToLead = Math.atan2(leadY - dot.y, leadX - dot.x);

			dot.el.style.left = `${dot.x + offsetX}px`;
			dot.el.style.top = `${dot.y + offsetY}px`;
			dot.el.style.transform = `translate(-50%, -50%) rotate(${angleToLead + Math.PI / 2}rad)`;
			dot.el.style.animationDuration = `${0.4 + Math.random() * 0.3}s`;

			leadX = dot.x;
			leadY = dot.y;
		});

		if (mothActive) requestAnimationFrame(animate);
	}
	animate();

	mothCleanup = () => {
		trail.forEach((dot) => {
			dot.el.remove();
		});
		document.getElementById("reduceAnimations").querySelector("p").textContent = "Enable Animations";
		mothActive = false;
	};
};


document.addEventListener('DOMContentLoaded', () => {
	const orbitTarget = document.getElementById('orbitTarget');

	let mouseX = window.innerWidth / 2;
	let mouseY = window.innerHeight / 2;
	let lastMoveTime = Date.now();
	let idle = false;
	let idleStartTime = 0;

	const maxOrbitRadius = 37;
	let currentOrbitRadius = 0;
	let angle = 0;
	const rotationSpeed = 0.05;

	// Track the real mouse position
	document.addEventListener('mousemove', (e) => {
		mouseX = e.pageX;
		mouseY = e.pageY;
		lastMoveTime = Date.now();
		idle = false;
		currentOrbitRadius = 0;
	});

	function animateOrbit() {
		const now = Date.now();
		const idleDuration = now - lastMoveTime;

		// Begin idle behavior
		if (!idle && idleDuration > 2000) {
		idle = true;
		idleStartTime = now;
		}

		if (idle) {
			angle += rotationSpeed;

			// Ease the orbit radius from 0 to maxOrbitRadius over 0.5 seconds
			const elapsed = now - idleStartTime;
			const duration = 1000; // 500 ms
			const t = Math.min(elapsed / duration, 1);
			const easedT = 1 - Math.pow(1 - t, 3);

			currentOrbitRadius = maxOrbitRadius * easedT;
		}

    const x = mouseX + Math.cos(angle) * currentOrbitRadius;
    const y = mouseY + Math.sin(angle) * currentOrbitRadius;

    orbitTarget.style.left = `${x}px`;
    orbitTarget.style.top = `${y}px`;

    requestAnimationFrame(animateOrbit);
	}
	animateOrbit();
});

document.addEventListener("DOMContentLoaded", initMothTrail);

window.addEventListener("resize", () => {
	if (window.innerWidth < 1001 && mothActive) {
		mothCleanup();
	} else if (window.innerWidth >= 1001 && !mothActive && !manualAnimationDisable) {
		initMothTrail();
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const redAni = document.getElementById("reduceAnimations");
	const toggleText = redAni.querySelector("p");

	redAni.addEventListener("click", () => {
		if (mothActive || !document.body.classList.contains("no-animations")) {
			mothCleanup();
			document.body.classList.add("no-animations");
			manualAnimationDisable = true;
		} else {
			toggleText.textContent = "Disable Animations";
			document.body.classList.remove("no-animations");
			manualAnimationDisable = false;

			if(window.innerWidth >= 1001) {
				initMothTrail();
			}
		}
		
		

	});
});