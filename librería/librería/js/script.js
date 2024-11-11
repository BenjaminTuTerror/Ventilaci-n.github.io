// SECCIÓN 1: Función para Calcular la Dilución de H₂S
function calcularDilucionH2S(concentracionInicial, airVolume, airSpeed) {
    const factorDilucion = airVolume * airSpeed;
    const concentracionDiluida = concentracionInicial / factorDilucion;
    return concentracionDiluida;
}

// SECCIÓN 2: Crear el Panel de Control
const controlPanel = document.createElement('div');
controlPanel.style.position = 'fixed';
controlPanel.style.top = '10px';
controlPanel.style.left = '10px';
controlPanel.style.width = '250px';
controlPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
controlPanel.style.padding = '15px';
controlPanel.style.borderRadius = '8px';
controlPanel.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
controlPanel.style.zIndex = '10';

// SECCIÓN 3: Título del Panel de Control
const panelTitle = document.createElement('h3');
panelTitle.innerText = 'Panel de Control';
panelTitle.style.marginBottom = '10px';
panelTitle.style.fontSize = '16px';
panelTitle.style.color = '#333';
controlPanel.appendChild(panelTitle);

// SECCIÓN 4: Crear Campos de Entrada y Etiquetas con Estilo Mejorado
function createInputField(labelText, inputPlaceholder) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '10px';

    const label = document.createElement('label');
    label.innerText = labelText;
    label.style.display = 'block';
    label.style.fontSize = '14px';
    label.style.marginBottom = '4px';
    wrapper.appendChild(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.step = '0.1';
    input.placeholder = inputPlaceholder;
    input.style.width = '100%';
    input.style.padding = '5px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
    wrapper.appendChild(input);

    controlPanel.appendChild(wrapper);
    return input;
}

// SECCIÓN 5: Crear Campos de Entrada Específicos con Unidades Adecuadas
const airSpeedInput = createInputField('Velocidad de Aire (m/s):', 'Ej: 10.5');
const airVolumeInput = createInputField('Volumen de Aire Inyectado (m³/s):', 'Ej: 8.33');
const h2sConcentrationInput = createInputField('Concentración de Ácido Sulfhídrico (ppm):', 'Ej: 100');

// SECCIÓN 6: Resultado de la Concentración Diluida
const resultWrapper = document.createElement('div');
resultWrapper.style.marginTop = '15px';
const resultLabel = document.createElement('label');
resultLabel.innerText = 'Concentración Diluida de H₂S (ppm):';
resultLabel.style.display = 'block';
resultLabel.style.fontSize = '14px';
resultLabel.style.marginBottom = '4px';
resultWrapper.appendChild(resultLabel);

const resultDisplay = document.createElement('div');
resultDisplay.style.padding = '5px';
resultDisplay.style.backgroundColor = '#f3f3f3';
resultDisplay.style.border = '1px solid #ccc';
resultDisplay.style.borderRadius = '4px';
resultDisplay.style.fontSize = '14px';
resultDisplay.innerText = 'N/A';
resultWrapper.appendChild(resultDisplay);
controlPanel.appendChild(resultWrapper);

// SECCIÓN 7: Botón de Simulación con Estilo Mejorado
const simulateButton = document.createElement('button');
simulateButton.innerText = 'Simular';
simulateButton.style.marginTop = '10px';
simulateButton.style.padding = '8px';
simulateButton.style.width = '100%';
simulateButton.style.backgroundColor = '#4CAF50';
simulateButton.style.color = '#fff';
simulateButton.style.border = 'none';
simulateButton.style.borderRadius = '4px';
simulateButton.style.cursor = 'pointer';
simulateButton.style.fontSize = '14px';
simulateButton.addEventListener('mouseover', () => {
    simulateButton.style.backgroundColor = '#45a049';
});
simulateButton.addEventListener('mouseout', () => {
    simulateButton.style.backgroundColor = '#4CAF50';
});
controlPanel.appendChild(simulateButton);

// SECCIÓN 8: Añadir el Panel de Control al Documento
document.body.appendChild(controlPanel);

// SECCIÓN 9: Función Revisada para Calcular la Dilución de H₂S
function calcularDilucionH2S(concentracionInicial, airVolume, airSpeed) {
    const flujoVolumetrico = airVolume;
    const concentracionDiluida = (concentracionInicial * airSpeed) / flujoVolumetrico;
    return concentracionDiluida;
}

// SECCIÓN 10: Evento para el Botón de Simulación
simulateButton.addEventListener('click', () => {
    const airSpeed = parseFloat(airSpeedInput.value);
    const airVolume = parseFloat(airVolumeInput.value);
    const h2sConcentration = parseFloat(h2sConcentrationInput.value);

    if (isNaN(airSpeed) || isNaN(airVolume) || isNaN(h2sConcentration)) {
        alert('Por favor, ingresa valores válidos para todos los campos.');
        return;
    }

    const nuevaConcentracion = calcularDilucionH2S(h2sConcentration, airVolume, airSpeed);
    resultDisplay.innerText = `${nuevaConcentracion.toFixed(2)} ppm`;

    console.log('Simulación iniciada con los siguientes valores:');
    console.log('Velocidad de Aire:', airSpeed, 'm/s');
    console.log('Volumen de Aire Inyectado:', airVolume, 'm³/s');
    console.log('Concentración de Ácido Sulfhídrico (inicial):', h2sConcentration, 'ppm');
    console.log('Concentración de Ácido Sulfhídrico (diluida):', nuevaConcentracion.toFixed(2), 'ppm');
});
// SECCIÓN 11: Configuración de la Escena y Renderizador
const container = document.getElementById('container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 45;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// SECCIÓN 12: Función para Crear un Cartel de Madera Colgante con la Fórmula
function createWoodenHangingSign() {
    const loader = new THREE.GLTFLoader();

    // Cargar el modelo 3D del cartel de madera
    loader.load('textures/min.glb', (gltf) => {
        const woodSignMesh = gltf.scene;

        // Escalar y posicionar el modelo en la escena
        woodSignMesh.scale.set(5, 5, 5);
        woodSignMesh.position.set(0, 5, 25);

        // Crear un lienzo para el texto de la fórmula
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 2048;
        canvas.height = 256;

        // Configuración de estilo para el texto
        context.fillStyle = '#000000';
        context.font = '16px Times New Roman';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Texto de la fórmula dividido en dos líneas
        const line1 = 'Porcentaje_H2S = (concentraciónÁcido * 100)';
        const line2 = '/ (velocidad * volumen)';

        // Dibujar las dos líneas de texto en el lienzo
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText(line1, canvas.width / 2, canvas.height / 2 - 8);
        context.fillText(line2, canvas.width / 2, canvas.height / 2 + 8);

        // Crear una textura a partir del lienzo con el texto
        const textTexture = new THREE.CanvasTexture(canvas);

        // Crear material para el cartel con la textura del texto
        const textMaterial = new THREE.MeshBasicMaterial({
            map: textTexture,
            transparent: true
        });

        // Crear geometría para el texto en el cartel
        const textGeometry = new THREE.PlaneGeometry(8, 2);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Posicionar el texto en el cartel de madera
        textMesh.position.set(0, -0.5, 0.05);
        woodSignMesh.add(textMesh);

        // Añadir el cartel completo con el texto a la escena
        scene.add(woodSignMesh);
    }, undefined, (error) => {
        console.error('Error al cargar el modelo del cartel:', error);
    });
}

// SECCIÓN 13: Llamada a la Función para Crear el Cartel Colgante con la Fórmula
createWoodenHangingSign();

// SECCIÓN 14: Animación de la Escena
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
// SECCIÓN 15: Configuración de Iluminación Mejorada
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Luz ambiental suave
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffd27f, 1.5, 100);
pointLight.position.set(0, 5, 10);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8); // Intensidad elevada
directionalLight.position.set(5, 15, 10);
scene.add(directionalLight);

// SECCIÓN 16: Cargar Textura de Tierra
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load(
    'textures/NEW.webp', // Ruta a la imagen en la carpeta textures
    () => {
        console.log('groundTexture cargada correctamente');
        createLongTunnel(); // Crear el túnel largo una vez que se cargue la textura
    },
    undefined,
    (error) => console.error('Error cargando groundTexture', error)
);

// SECCIÓN 17: Función para Aplicar Textura y Configurar el Túnel
function createTunnelSection(offsetZ) {
    // Configuración de repetición de la textura
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(2, 2); // Ajusta las repeticiones de la textura
    groundTexture.anisotropy = 16;   
    groundTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Crear material con la textura de tierra
    const tunnelMaterial = new THREE.MeshStandardMaterial({
        map: groundTexture,       
        side: THREE.BackSide,     
        roughness: 0.8,           
        metalness: 0.0            
    });

    // Configuración de la geometría del túnel
    const tunnelGeometry = new THREE.CylinderGeometry(10, 10, 50, 64, 64, true);

    // Crear el Mesh del túnel
    const tunnelMesh = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    tunnelMesh.rotation.x = Math.PI / 2;
    tunnelMesh.position.z = offsetZ; // Posición del túnel en el eje Z
    scene.add(tunnelMesh);
}

// Crear múltiples secciones de túnel para dar la apariencia de un túnel largo fijo
function createLongTunnel() {
    const tunnelLength = 50; // Longitud de cada sección de túnel
    const numSections = 20;  // Número de secciones para crear un túnel visualmente infinito

    for (let i = 0; i < numSections; i++) {
        createTunnelSection(i * tunnelLength);
    }
}

// Iniciar la animación de la escena para visualizar el túnel largo sin movimiento
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// SECCIÓN 21: Función para Crear Segmentos de Ducto Superior
function createTopDuctSegment(zPosition) {
    const ductMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.6, metalness: 0.5 });
    const ductGeometry = new THREE.CylinderGeometry(1.5, 1.5, 20, 32);
    const duct = new THREE.Mesh(ductGeometry, ductMaterial);
    duct.position.set(0, 8.5, zPosition);
    duct.rotation.x = Math.PI / 2;
    return duct;
}

// SECCIÓN 22: Función para Crear Segmentos de Ducto Lateral
function createSideDuctSegment(zPosition, xOffset) {
    const sideDuctMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500, roughness: 0.6, metalness: 0.5 });
    const sideDuctGeometry = new THREE.CylinderGeometry(0.5, 0.5, 20, 32);
    const sideDuct = new THREE.Mesh(sideDuctGeometry, sideDuctMaterial);
    sideDuct.position.set(xOffset, 8.5, zPosition);
    sideDuct.rotation.x = Math.PI / 2;
    return sideDuct;
}

// SECCIÓN 23: Añadir Segmentos de Ducto en Intervalos a lo Largo del Túnel
for (let z = -90; z <= 90; z += 20) {
    const topDuctSegment = createTopDuctSegment(z);
    scene.add(topDuctSegment);

    const leftDuctSegment = createSideDuctSegment(z, -3);
    const rightDuctSegment = createSideDuctSegment(z, 3);
    scene.add(leftDuctSegment);
    scene.add(rightDuctSegment);
}
// SECCIÓN 24: Función para Crear Ventiladores Realistas
function createRealisticVentilator(xPosition, yPosition, zPosition) {
    const ventilatorGroup = new THREE.Group();
    
    const borderGeometry = new THREE.TorusGeometry(2.5, 0.1, 16, 100);
    const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.rotation.z = Math.PI / 2;
    ventilatorGroup.add(border);

    const gridMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true });
    const gridGeometry = new THREE.CircleGeometry(2.4, 32);
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.position.z = 0.25;
    ventilatorGroup.add(grid);

    const bladeGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.05);
    const bladeMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    for (let i = 0; i < 4; i++) {
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade.position.x = 0.75;
        blade.rotation.z = (Math.PI / 2) * i;
        ventilatorGroup.add(blade);
    }

    const casingGeometry = new THREE.CylinderGeometry(2.7, 2.7, 0.8, 32, 1, true);
    const casingMaterial = new THREE.MeshStandardMaterial({ color: 0x666666, opacity: 0.3, transparent: true });
    const casing = new THREE.Mesh(casingGeometry, casingMaterial);
    casing.rotation.z = Math.PI / 2;
    ventilatorGroup.add(casing);

    // Posicionar el ventilador en las coordenadas especificadas
    ventilatorGroup.position.set(xPosition, yPosition, zPosition);
    ventilatorGroup.rotation.y = Math.PI / 2;
    scene.add(ventilatorGroup);
}

// SECCIÓN 25: Añadir Ventilador en la Escena cerca de la persona
createRealisticVentilator(9, -1, 20);

// SECCIÓN 26: Función para Crear Rieles para Vagones
function createRails() {
    const railMaterial = new THREE.MeshStandardMaterial({ color: 0x3B2F2F });

    const leftRailGeometry = new THREE.BoxGeometry(0.1, 0.1, 200);
    const leftRail = new THREE.Mesh(leftRailGeometry, railMaterial);
    leftRail.position.set(-2, -9.3, 0);
    scene.add(leftRail);

    const rightRailGeometry = new THREE.BoxGeometry(0.1, 0.1, 200);
    const rightRail = new THREE.Mesh(rightRailGeometry, railMaterial);
    rightRail.position.set(2, -9.3, 0);
    scene.add(rightRail);

    const sleeperGeometry = new THREE.BoxGeometry(4, 0.05, 0.2);
    for (let z = -90; z <= 90; z += 4) {
        const sleeper = new THREE.Mesh(sleeperGeometry, railMaterial);
        sleeper.position.set(0, -9.3, z);
        scene.add(sleeper);
    }
}

// SECCIÓN 27: Llamar a la Función para Crear los Rieles en la Escena
createRails();

// SECCIÓN 28: Función para Crear Estructuras de Soporte en la Mina
function createSupportStructures() {
    const supportMaterial = new THREE.MeshStandardMaterial({ color: 0x3B2F2F });

    const verticalGeometry = new THREE.BoxGeometry(0.2, 36, 0.2);
    const horizontalGeometry = new THREE.BoxGeometry(5, 0.2, 0.2);

    for (let z = -90; z <= 90; z += 10) {
        const leftSupport = new THREE.Mesh(verticalGeometry, supportMaterial);
        leftSupport.position.set(-7, -7, z);
        scene.add(leftSupport);

        const rightSupport = new THREE.Mesh(verticalGeometry, supportMaterial);
        rightSupport.position.set(7, -7, z);
        scene.add(rightSupport);

        const topSupport = new THREE.Mesh(horizontalGeometry, supportMaterial);
        topSupport.position.set(0, 9, z);
        scene.add(topSupport);
    }
}

// SECCIÓN 29: Llamar a la Función para Añadir Estructuras de Soporte en la Escena
createSupportStructures();
// SECCIÓN 30: Cargar y Configurar Modelo de Persona
let person;
const loader = new THREE.GLTFLoader();
loader.load('textures/sculpt.glb', function (gltf) {
    person = gltf.scene;
    person.position.set(0, -5, 30);
    person.scale.set(3, 3, 3);
    person.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(person);
}, undefined, function (error) {
    console.error('Error al cargar el modelo de persona:', error);
});

// SECCIÓN 31: Función para Calcular la Dilución de H₂S
function calcularDilucionH2S(concentracionInicial, airVolume, airSpeed) {
    const flujoVolumetrico = airVolume / 60; // Convertir volumen de m³/min a m³/s
    const concentracionDiluida = (concentracionInicial * airSpeed) / flujoVolumetrico;
    return concentracionDiluida;
}

// SECCIÓN 32: Variable para Rastrear el Estado de Desmayo
let estaDesmayada = false;

// SECCIÓN 33: Evento para el Botón de Simulación y Cambio de Color
simulateButton.addEventListener('click', () => {
    const airSpeed = parseFloat(airSpeedInput.value);
    const airVolume = parseFloat(airVolumeInput.value);
    const h2sConcentration = parseFloat(h2sConcentrationInput.value);

    if (isNaN(airSpeed) || isNaN(airVolume) || isNaN(h2sConcentration)) {
        alert('Por favor, ingresa valores válidos para todos los campos.');
        return;
    }

    const nuevaConcentracion = calcularDilucionH2S(h2sConcentration, airVolume, airSpeed);
    console.log('Simulación iniciada con los siguientes valores:');
    console.log('Velocidad de Aire:', airSpeed, 'm/s');
    console.log('Volumen de Aire Inyectado:', airVolume, 'm³/min');
    console.log('Concentración de Ácido Sulfhídrico (inicial):', h2sConcentration, 'ppm');
    console.log('Concentración de Ácido Sulfhídrico (diluida):', nuevaConcentracion.toFixed(2), 'ppm');

    alert(`Nueva concentración de H₂S después de la dilución: ${nuevaConcentracion.toFixed(2)} ppm`);

    // Cambiar color de la persona según la concentración de H₂S
    if (person) {
        if (nuevaConcentracion < 10) {
            person.traverse((child) => {
                if (child.isMesh) child.material.color.set(0xFFFF00);
            });
            levantarPersona();
        } else if (nuevaConcentracion >= 10 && nuevaConcentracion < 20) {
            person.traverse((child) => {
                if (child.isMesh) child.material.color.set(0xFFA500);
            });
            levantarPersona();
        } else if (nuevaConcentracion >= 20 && nuevaConcentracion < 50) {
            person.traverse((child) => {
                if (child.isMesh) child.material.color.set(0xFF4500);
            });
            levantarPersona();
        } else if (nuevaConcentracion >= 50) {
            person.traverse((child) => {
                if (child.isMesh) child.material.color.set(0xFF0000);
            });
            desmayarPersona();
        }
    }
});

// SECCIÓN 34: Función para Animar el Desmayo de la Persona
function desmayarPersona() {
    if (!estaDesmayada) {
        estaDesmayada = true;
        let desmayoProgreso = 0;
        function animarDesmayo() {
            if (desmayoProgreso < 1) {
                desmayoProgreso += 0.02;
                person.rotation.x = -Math.PI / 2 * desmayoProgreso;
                person.position.y -= 0.05;
                requestAnimationFrame(animarDesmayo);
            }
        }
        animarDesmayo();
    }
}

// SECCIÓN 35: Función para Levantar a la Persona si no Está en Nivel Peligroso
function levantarPersona() {
    if (estaDesmayada) {
        estaDesmayada = false;
        let levantarProgreso = 0;
        function animarLevantamiento() {
            if (levantarProgreso < 1) {
                levantarProgreso += 0.02;
                person.rotation.x = -Math.PI / 2 * (1 - levantarProgreso);
                person.position.y += 0.05;
                requestAnimationFrame(animarLevantamiento);
            }
        }
        animarLevantamiento();
    }
}
// SECCIÓN 36: Animación de la Escena
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// SECCIÓN 37: Iniciar la Animación
animate();

// SECCIÓN 38: Eventos para Controlar la Cámara con el Ratón
let isMouseDown = false;
let startY = 0;

function onMouseDown(event) {
    isMouseDown = true;
    startY = event.clientY;
}

function onMouseMove(event) {
    if (isMouseDown) {
        const deltaY = event.clientY - startY;
        camera.position.z += deltaY * 0.05; // Ajuste de la velocidad de desplazamiento
        startY = event.clientY;
    }
}

function onMouseUp() {
    isMouseDown = false;
}

// Añadir eventos de ratón
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);

// SECCIÓN 39: Configuración de Responsividad
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


