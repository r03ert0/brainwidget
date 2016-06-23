var MyMeshViewer = {
	debug:		0,
	container:	null,
	camera:		null,
	tb:			null,
	scene:		null,
	renderer:	null,
	composer:	null,
	depthMaterial:	null,
	depthTarget:	null,
	init_mesh: function(path,elem) {
		var me=MyMeshViewer;
		if(me.debug)
			console.log('init_mesh',path,elem);
	
		var	width, height;

		me.container = elem;
		width=me.container.clientWidth;
		height=width;
		if(me.debug)
			console.log(width,height);
	
		me.camera = new THREE.PerspectiveCamera(25,width/height,10,1000 );
		me.camera.position.z = 200;
		me.tb = new THREE.TrackballControls(me.camera,me.container);
		me.tb.autoRotate=true;
		//me.tb.noZoom=true;
		//me.tb.noPan=true;
		me.tb.addEventListener( 'change', me.render );

		me.scene = new THREE.Scene();

		/* ------------------------
			Load mesh (ply format)
		   ------------------------ */
		var oReq = new XMLHttpRequest();
		oReq.open("GET", path, true);
		oReq.responseType="text";
		oReq.onload = function(oEvent)
		{
			console.log("surface finished loading");
			var tmp=this.response;
			var geometry=new THREE.PLYLoader().parse(tmp);
			geometry.sourceType = "ply";

			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			var material=new THREE.MeshNormalMaterial();
			var	mesh=new THREE.Mesh(geometry,material);
			me.scene.add(mesh);
			me.animate();
		};
		oReq.send();
		console.log("surface started loading");

		/* ---------------
			Init renderer
		   --------------- */
		if(me.webglAvailable()) {
			me.renderer=new THREE.WebGLRenderer({alpha:true});
		}
		else {
			me.renderer=new THREE.CanvasRenderer({alpha:true});
		}
		me.renderer.setSize(width,height);
		me.renderer.setClearColor(0x000000,0.05);
		me.container.appendChild(me.renderer.domElement);

		window.addEventListener('resize',me.onWindowResize,false);
	},
	webglAvailable: function () {
		var me=MyMeshViewer;
		try {
			var canvas = document.createElement("canvas");
			return !!
				window.WebGLRenderingContext && 
				(canvas.getContext("webgl") || 
					canvas.getContext("experimental-webgl"));
		} catch(e) { 
			return false;
		} 
	},
	onWindowResize: function() {
		var me=MyMeshViewer;

		var width=me.container.clientWidth;
		var height=width; //me.container.clientHeight;
		me.container.clientHeight=width;

		me.camera.aspect = width/height;
		me.camera.updateProjectionMatrix();
		me.renderer.setSize( width,height );
		me.tb.handleResize();
	},
	render: function () {
		var me=MyMeshViewer;
		me.scene.overrideMaterial = me.depthMaterial;
		me.renderer.render(me.scene,me.camera,me.depthTarget);
		me.scene.overrideMaterial = null;
		if(me.composer)
			me.composer.render();
	},
	animate: function() {
		var me=MyMeshViewer;
		if(me==null)
			return;
		if(me.tb==null)
			return;
		requestAnimationFrame(me.animate);
		me.tb.update();
		me.render();
	}
}