(function() {
    var gl;

    initGL();
    createShaders();
    createVertices();


    function initGL() {
        var canvas = document.getElementById("canvas");

        gl = canvas.getContext("webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    function createShaders() {
        var vs = "";
        vs += "attribute vec3 coords;";
        vs += "void main(void) {";
        vs += "  gl_Position = vec4(coords, 1);";
        vs += "}";

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vs);
        gl.compileShader(vertexShader);

        var fs = "";
        fs += "void main(void) {";
        fs += "  gl_FragColor = vec4(0, 0, 0.0, 1.0);";
        fs += "}";

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fs);
        gl.compileShader(fragmentShader);


        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
    }

    function createVertices() {
        vertices = [
            -0.9, -0.9, 0,
             0.9, -0.9, 0,
             0,    0.9, 0
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var coords = gl.getAttribLocation(shaderProgram, "coords");
        gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coords);
    }

})();
