import { Mesh } from 'three/src/objects/Mesh.js'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js'
import { SphereGeometry } from 'three/src/geometries/SphereGeometry.js'
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js'
import { scene, textureLoader } from './scene.js';
import { Object3D } from 'three/src/core/Object3D.js';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js';
import { PointLight } from 'three/src/lights/PointLight.js';

export let avatarCube, globe, sun, sunPivot;

//////////// Avatar Cube
export function initAvatarCube() {
	const avatarCubeTexture = textureLoader.load('../textures/avatarCube.jpg');

	avatarCube = new Mesh(new BoxGeometry(3, 3, 3), new MeshBasicMaterial({ map: avatarCubeTexture }));
	avatarCube.position.set(3, 0, -5);
	avatarCube.rotation.set(0, -0.4, 0);

	// scene.add(avatarCube);
}
//////////// Avatar Cube

//////////// Sun
sunPivot = new Object3D();
sunPivot.position.set(1, 0, -5);

const sunTexture = textureLoader.load('../textures/sunmap.jpg');
sun = new Mesh(new SphereGeometry(0.1, 20, 20), new MeshBasicMaterial({ map: sunTexture }));
const sunLight = new PointLight(0xffffff, 0.5);
sun.add(sunLight);
sunPivot.add(sun);

scene.add(sunPivot);
//////////// Sun

//////////// Globe
const globeTexture = textureLoader.load('../textures/earthmap.jpg');
globe = new Mesh(new SphereGeometry(0.25, 50, 50), new MeshPhongMaterial({ map: globeTexture }));
globe.rotation.set(0.2, -1.5, -0.3);

sunPivot.add(globe);
// offset from the sunPivot
globe.position.set(-1, 0, -1);
//////////// Globe
