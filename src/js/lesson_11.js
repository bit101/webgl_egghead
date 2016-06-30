(function() {
    var gl,
        shaderProgram,
        vertices,
        matrix = mat4.create(),
        vertexCount = 30;

    initGL();
    createShaders();
    createVertices();
    draw();


    function initGL() {
        var canvas = document.getElementById("canvas");
        gl = canvas.getContext("webgl");

        gl.enable(gl.DEPTH_TEST);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1, 1, 1, 1);
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

        var colors = [];
        vertices = [];
        for(var i = 0; i < vertexCount; i++) {
            vertices.push(Math.random() * 2 - 1);
            vertices.push(Math.random() * 2 - 1);
            vertices.push(Math.random() * 2 - 1);

            var red = Math.random(),
                green = Math.random(),
                blue = Math.random(),
                alpha = 1;
            colors.push(red, green, blue, alpha);
        }
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var coords = gl.getAttribLocation(shaderProgram, "coords");
        //gl.vertexAttrib3f(coords, 0.75, -0.5, 0.0);
        gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coords);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        var colorLoc = gl.getAttribLocation(shaderProgram, "colors");
        gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colorLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
        gl.vertexAttrib1f(pointSize, 50);

         var color = gl.getUniformLocation(shaderProgram, "color");
         gl.uniform4f(color, 1, 0, 0, 1);
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
