<template>
    <div id="theme-content">
        <div class="quanjingmain" id="container">

        </div>
    </div>
</template>
<script>
import * as THREE from 'three'
export default {
    name: 'xianquanjing',
    data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      texture_placeholder: null,
      isUserInteracting : false,
      onMouseDownMouseX : 0,
      onMouseDownMouseY : 0,
      lon : 90,// y xuanzhuan
      onMouseDownLon : 0,
      lat : 0,
      onMouseDownLat : 0,
      phi : 0,
      theta : 0,
      target : new THREE.Vector3()
    }
  },
  methods: {
    init: function() {

        var container = document.getElementById('container');

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

        this.scene = new THREE.Scene();

        this.scene.add(this.camera);

        this.texture_placeholder = document.createElement('canvas');
        this.texture_placeholder.width = '1000px';
        this.texture_placeholder.height = '1000px';

        var context = this.texture_placeholder.getContext('2d');
        context.fillStyle = 'rgb( 200, 200, 200 )';
        context.fillRect(0, 0, this.texture_placeholder.width, this.texture_placeholder.height);

        var materials = [

            this.loadTexture('../assets/px.jpg'), // right
            this.loadTexture('../assets/nx.jpg'), // left
            this.loadTexture('../assets/py.jpg'), // top
            this.loadTexture('../assets/ny.jpg'), // bottom
            this.loadTexture('../assets/pz.jpg'), // back
            this.loadTexture('../assets/nz.jpg') // front

        ];

        this.mesh = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000, 7, 7, 7, materials), new THREE.MeshFaceMaterial());
        this.mesh.scale.x = -1;
        this.scene.add(this.mesh);

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        container.appendChild(this.renderer.domElement);

        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);

    },
    loadTexture: function(path) {
        var texture = new THREE.Texture(this.texture_placeholder);
        var material = new THREE.MeshBasicMaterial({//
            map: texture,
        });

        var image = new Image();
        image.onload = function() {

            texture.needsUpdate = true;
            material.map.image = this;

            this.render();

        };
        image.src = path;

        return material;
    },
    render:function(){
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * Math.PI / 180;

        this.theta = this.lon * Math.PI / 180;

        this.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
        this.target.y = 500 * Math.cos(this.phi);
        this.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

        this.camera.lookAt(this.target);

        this.renderer.render(this.scene, this.camera);
    }

    },
    created() {
        this.init();
    }
}
</script>
<style scope>
#theme-content {
    position: relative;
    padding-left: 50px;
    z-index: 100;
}
.quanjingmain{
    position: absolute;
    width: 83%;
    height: 900px;
    background: #ccc;
}
</style>
