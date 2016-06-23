var s1=document.createElement('script');
var s2=document.createElement('script');
var s3=document.createElement('script');
var s4=document.createElement('script');
var s5=document.createElement('script');
/*
s1.src="http://localhost/brainwidget/three.min.js";
s2.src="http://localhost/brainwidget/Detector.js";
s3.src="http://localhost/brainwidget/PLYLoader.js";
s4.src="http://localhost/brainwidget/TrackballControls.js";
s5.src="http://localhost/brainwidget/myMesh.js";
*/
s1.src="https://rawgit.com/r03ert0/brainwidget/master/three.min.js";
s1.setAttribute('type', 'text/javascript');
s2.src="https://rawgit.com/r03ert0/brainwidget/master/Detector.js";
s2.setAttribute('type', 'text/javascript');
s3.src="https://rawgit.com/r03ert0/brainwidget/master/PLYLoader.js";
s3.setAttribute('type', 'text/javascript');
s4.src="https://rawgit.com/r03ert0/brainwidget/master/TrackballControls.js";
s4.setAttribute('type', 'text/javascript');
s5.src="https://rawgit.com/r03ert0/brainwidget/master/myMesh.js";
s4.setAttribute('type', 'text/javascript');
s1.onload=function () {
s2.onload=function () {
s3.onload=function () {
s4.onload=function () {
s5.onload=function () {
	var elem=$("#brainwidget");
	MyMeshViewer.init_mesh("mesh.ply",elem[0]);
}; document.body.appendChild(s5);
}; document.body.appendChild(s4);
}; document.body.appendChild(s3);
}; document.body.appendChild(s2);
}; document.body.appendChild(s1);
