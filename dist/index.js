import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

let camera, scene, renderer, textureLoader, skybox;

init();

function init() {
	// reset the scroll when the page is reloaded to make sure our animations aren't getting messed up 
	if (history.scrollRestoration) {
		history.scrollRestoration = 'manual';
	} else {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}
	}

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);

	scene = new THREE.Scene();	
	scene.fog = new THREE.FogExp2(0x000000, 0.02);

	// loading screen init
	const loadingManager = new THREE.LoadingManager(() => {
		const loadingScreen = document.getElementById('loading-screen');
		loadingScreen.classList.add('fade-out');
		loadingScreen.addEventListener('transitionend', onTransitionEnd);
	});

	textureLoader = new THREE.TextureLoader(loadingManager);

	// Skybox
	const materialArray = ['right1', 'left2', 'top3', 'bottom4', 'front5', 'back6'].map(image => {
		let texture = textureLoader.load('static/textures/skybox/' + image + '.jpg');
		return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
	});

	skybox = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), materialArray);
	scene.add(skybox);

	// Lights

	// const pointLight = new THREE.PointLight(0xffffff);
	// pointLight.position.set(5, 5, 5);

	// const ambientLight = new THREE.AmbientLight(0xffffff);
	// scene.add(pointLight, ambientLight);

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		canvas: document.querySelector('#bg'),
	});
	
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}


// Stars

const starGroup = new THREE.Group();
let starGeometry = new THREE.SphereGeometry(0.05);

const numStars = 500;
// we need some variety of materials for the blinking to appear more random
const numStarMaterials = numStars/5;
const starMaterials = [];

for(let i=0; i<numStarMaterials; i++) {
	starMaterials.push(new THREE.MeshBasicMaterial());
}

for (let i = 0; i < numStars; i++) {
  let star = new THREE.Mesh(starGeometry, starMaterials[i%numStarMaterials]);

	// Get a positional vector for the star, it should be between 30 and 40 units from the camera
	let vec = new THREE.Vector3(THREE.MathUtils.randFloatSpread(70), THREE.MathUtils.randFloatSpread(70), THREE.MathUtils.randFloatSpread(70)).clampLength(30, 40)
	star.position.set(vec.x, vec.y, vec.z);

	star.material.transparent = true;
  starGroup.add(star);
}
scene.add(starGroup);

// Avatar Cube

const profileTexture = textureLoader.load('static/textures/profile.jpg');

const profile = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: profileTexture }));
const profileStartPositionX = 3;
const profileStartPositionY = 0;
const profileStartPositionZ = -5;
const profileStartRotationX = 0;
const profileStartRotationY = -0.4;
const profileStartRotationZ = 0;
profile.position.set(profileStartPositionX, profileStartPositionY, profileStartPositionZ)
profile.rotation.set(profileStartRotationX, profileStartRotationY, profileStartRotationZ)

scene.add(profile);

// Globe

// const globeTexture = textureLoader.load('static/textures/earthmap.jpg');
// const globe = new THREE.Mesh(new THREE.SphereGeometry(1.75, 200, 200), new THREE.MeshBasicMaterial( { map: globeTexture} ));
// // const globeStartPositionX = -4;
// // const globeStartPositionY = -3;
// const globeStartPositionX = -2;
// const globeStartPositionY = -1;
// const globeStartPositionZ = -4;
// const globeStartRotationX = 0.2;
// const globeStartRotationY = -1.5;
// const globeStartRotationZ = -0.3;
// globe.position.set(globeStartPositionX, globeStartPositionY, globeStartPositionZ)
// globe.rotation.set(globeStartRotationX, globeStartRotationY, globeStartRotationZ)

// scene.add(globe);

// Animation template from https://sbcode.net/threejs/animate-on-scroll/

// Animation Helpers

function lerp(start, end, a) {
	return (1 - a) * start + a * end;
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
	return (scrollPercent - start) / (end - start);
}


// How much has the user scrolled yet?
let scrollPercent = 0;

document.body.onscroll = () => {
		//calculate the current scroll progress as a percentage
		scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) / 
			((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;
}

/////////////////////////
// Animation scripts that will each be run whenever the user scrolls

const animationScripts = [];

// These are the continuous animations which play no matter the scroll percentage, and independent of
let lightness = 0;
animationScripts.push({
	start: 0,
	end: 101,
	func: () => {
		// skybox
		skybox.rotation.x += 0.001;
		skybox.rotation.y -= 0.0005;

		// profile
		profile.rotation.y -= 0.005;

		// globe
		// const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), 0.0001);
    // globe.position.applyQuaternion(quaternion);

		// stars
		starGroup.rotation.x += 0.001;
		starGroup.rotation.y -= 0.0005;
		starGroup.children.forEach((star) => {
			lightness > 1 ? lightness = 0 : lightness += 0.005;
			star.material.opacity = lightness;
		});
	}
});

// Add an animation that rotates the profile cube throughout the whole scroll process
animationScripts.push({
	start: 0,
	end: 20,
	func: () => {
			profile.rotation.x = lerp(profileStartRotationX, 2, scalePercent(0, 20));
			profile.rotation.z = lerp(profileStartRotationZ, -2, scalePercent(0, 20));
			profile.position.x = lerp(profileStartPositionX, 10, scalePercent(0, 20));
			profile.position.y = lerp(profileStartPositionY, 10, scalePercent(0, 20));
	}
});

// Add an animation that moves the globe in after the profile is gone
// animationScripts.push({
// 	start: 5,
// 	end: 15,
// 	func: () => {
// 			globe.position.x = lerp(globeStartPositionX, -4, scalePercent(5, 15));
// 			globe.position.y = lerp(globeStartPositionY, 0, scalePercent(5, 15));
// 			globe.position.z = lerp(globeStartPositionZ, -5, scalePercent(5, 15));
// 	}
// });
/////////////////////////

// Animation Loop

// Loop through all scripts and run each of them
function playScrollAnimations() {
	animationScripts.forEach((animation) => {
			if (scrollPercent >= animation.start && scrollPercent < animation.end) {
				animation.func();
			}
	});
}

function animate() {
	requestAnimationFrame(animate);
	playScrollAnimations();
	renderer.render(scene, camera);
}

function onTransitionEnd( event ) {
	document.body.style = "";
	event.target.remove();
}

animate();