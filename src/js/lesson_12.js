(function() {
    var gl,
        shaderProgram,
        vertices,
        matrix = mat4.create(),
        vertexCount = 33;

    initGL();
    createShaders();
    createVertices();
    draw();


    function initGL() {
        var canvas = document.getElementById("canvas");
        gl = canvas.getContext("webgl");

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);
    }

    function createShaders() {
        var vertexShader = getShader(gl, "shader-vs");

        var fragmentShader = getShader(gl, "shader-fs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
    }

    function createVertices() {

        //vertices = [
        //    0.88, -0.25, -0.18,
        //    0.9, 0.25, 0,
        //    0.88, -0.25, 0.18,
        //
        //    0.85, -0.25, 0.29,
        //    0.78, 0.25, 0.45,
        //    0.67, -0.25, 0.6,
        //
        //    0.6, -0.25, 0.67,
        //    0.45, 0.25, 0.78,
        //    0.29, -0.25, 0.85,
        //
        //    0.18, -0.25, 0.88,
        //    0, 0.25, 0.9,
        //    -0.18, -0.25, 0.88,
        //
        //    -0.29, -0.25, 0.85,
        //    -0.45, 0.25, 0.78,
        //    -0.6, -0.25, 0.67,
        //
        //    -0.67, -0.25, 0.6,
        //    -0.78, 0.25, 0.45,
        //    -0.85, -0.25, 0.29,
        //
        //    -0.88, -0.25, 0.18,
        //    -0.9, 0.25, 0,
        //    -0.88, -0.25, -0.18,
        //
        //    -0.85, -0.25, -0.29,
        //    -0.78, 0.25, -0.45,
        //    -0.67, -0.25, -0.6,
        //
        //    -0.6, -0.25, -0.67,
        //    -0.45, 0.25, -0.78,
        //    -0.29, -0.25, -0.85,
        //
        //    -0.18, -0.25, -0.88,
        //    0, 0.25, -0.9,
        //    0.18, -0.25, -0.88,
        //
        //    0.29, -0.25, -0.85,
        //    0.45, 0.25, -0.78,
        //    0.6, -0.25, -0.67,
        //
        //    0.67, -0.25, -0.6,
        //    0.78, 0.25, -0.45,
        //    0.85, -0.25, -0.29
        //];
        //var colors = [
        //    1, 0, 0, 1,
        //    1, 0, 0, 1,
        //    1, 0, 0, 1,
        //
        //    1, 1, 0, 1,
        //    1, 1, 0, 1,
        //    1, 1, 0, 1,
        //
        //    0, 1, 0, 1,
        //    0, 1, 0, 1,
        //    0, 1, 0, 1,
        //
        //    0, 1, 1, 1,
        //    0, 1, 1, 1,
        //    0, 1, 1, 1,
        //
        //    0, 0, 1, 1,
        //    0, 0, 1, 1,
        //    0, 0, 1, 1,
        //
        //    1, 0, 1, 1,
        //    1, 0, 1, 1,
        //    1, 0, 1, 1,
        //
        //    1, 0.5, 0, 1,
        //    1, 0.5, 0, 1,
        //    1, 0.5, 0, 1,
        //
        //    0, 0.5, 1, 1,
        //    0, 0.5, 1, 1,
        //    0, 0.5, 1, 1,
        //
        //    0, 1, 0.5, 1,
        //    0, 1, 0.5, 1,
        //    0, 1, 0.5, 1,
        //
        //    1, 0, 0.5, 1,
        //    1, 0, 0.5, 1,
        //    1, 0, 0.5, 1,
        //
        //    0.5, 1, 0, 1,
        //    0.5, 1, 0, 1,
        //    0.5, 1, 0, 1,
        //
        //    0.5, 0, 1, 1,
        //    0.5, 0, 1, 1,
        //    0.5, 0, 1, 1
        //];
         vertices = [
            0.88, -0.25, -0.18,     1, 0, 0, 1,
            0.9, 0.25, 0,           1, 0, 0, 1,
            0.88, -0.25, 0.18,      1, 0, 0, 1,

            0.85, -0.25, 0.29,      1, 1, 0, 1,
            0.78, 0.25, 0.45,       1, 1, 0, 1,
            0.67, -0.25, 0.6,       1, 1, 0, 1,

            0.6, -0.25, 0.67,       0, 1, 0, 1,
            0.45, 0.25, 0.78,       0, 1, 0, 1,
            0.29, -0.25, 0.85,      0, 1, 0, 1,

            0.18, -0.25, 0.88,      0, 1, 1, 1,
            0, 0.25, 0.9,           0, 1, 1, 1,
            -0.18, -0.25, 0.88,     0, 1, 1, 1,

            -0.29, -0.25, 0.85,     0, 0, 1, 1,
            -0.45, 0.25, 0.78,      0, 0, 1, 1,
            -0.6, -0.25, 0.67,      0, 0, 1, 1,

            -0.67, -0.25, 0.6,      1, 0, 1, 1,
            -0.78, 0.25, 0.45,      1, 0, 1, 1,
            -0.85, -0.25, 0.29,     1, 0, 1, 1,

            -0.88, -0.25, 0.18,     1, 0.5, 0, 1,
            -0.9, 0.25, 0,          1, 0.5, 0, 1,
            -0.88, -0.25, -0.18,    1, 0.5, 0, 1,

            -0.85, -0.25, -0.29,    0, 0.5, 1, 1,
            -0.78, 0.25, -0.45,     0, 0.5, 1, 1,
            -0.67, -0.25, -0.6,     0, 0.5, 1, 1,

            -0.6, -0.25, -0.67,     0, 1, 0.5, 1,
            -0.45, 0.25, -0.78,     0, 1, 0.5, 1,
            -0.29, -0.25, -0.85,    0, 1, 0.5, 1,

            -0.18, -0.25, -0.88,    1, 0, 0.5, 1,
            0, 0.25, -0.9,          1, 0, 0.5, 1,
            0.18, -0.25, -0.88,     1, 0, 0.5, 1,

            0.29, -0.25, -0.85,     0.5, 1, 0, 1,
            0.45, 0.25, -0.78,      0.5, 1, 0, 1,
            0.6, -0.25, -0.67,      0.5, 1, 0, 1,

            0.67, -0.25, -0.6,      0.5, 0, 1, 1,
            0.78, 0.25, -0.45,      0.5, 0, 1, 1,
            0.85, -0.25, -0.29,     0.5, 0, 1, 1
        ];


        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var coords = gl.getAttribLocation(shaderProgram, "coords");
        gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 7, 0);
        gl.enableVertexAttribArray(coords);

        var colorLoc = gl.getAttribLocation(shaderProgram, "colors");
        gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 7, Float32Array.BYTES_PER_ELEMENT * 3);
        gl.enableVertexAttribArray(colorLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);



        var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
        gl.vertexAttrib1f(pointSize, 50);

        //var color = gl.getUniformLocation(shaderProgram, "color");
        //gl.uniform4f(color, 1, 0, 0, 1);
    }


    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        mat4.rotateZ(matrix, matrix, 0.01);
        mat4.rotateY(matrix, matrix, 0.015);
        var transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
        gl.uniformMatrix4fv(transformMatrix, false, matrix);


        gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
        requestAnimationFrame(draw);
    }

    /*
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
     */
    function getShader(gl, id) {
        var shaderScript, theSource, currentChild, shader;

        shaderScript = document.getElementById(id);

        if (!shaderScript) {
            return null;
        }

        theSource = "";
        currentChild = shaderScript.firstChild;

        while(currentChild) {
            if (currentChild.nodeType == currentChild.TEXT_NODE) {
                theSource += currentChild.textContent;
            }

            currentChild = currentChild.nextSibling;
        }
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            // Unknown shader type
            return null;
        }
        gl.shaderSource(shader, theSource);

        // Compile the shader program
        gl.compileShader(shader);

        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

})();
