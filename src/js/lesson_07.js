(function() {
    var gl,
        shaderProgram,
        vertexCount = 5000,
        mouseX = 0,
        mouseY = 0;

    initGL();
    createShaders();
    createVertices();
    draw();

    canvas.addEventListener("mousemove", function(event) {
        mouseX = map(event.clientX, 0, canvas.width, -1, 1);
        mouseY = map(event.clientY, 0, canvas.height, 1, -1);
    });


    function initGL() {
        var canvas = document.getElementById("canvas");

        gl = canvas.getContext("webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
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
        vertices = [];
        for(var i = 0; i < vertexCount; i++) {
            vertices.push(Math.random() * 2 - 1);
            vertices.push(Math.random() * 2 - 1);
            vertices.push(Math.random() * 2 - 1);
        }

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

        var coordsLocation = gl.getAttribLocation(shaderProgram, "coords");
        gl.vertexAttribPointer(coordsLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coordsLocation);
    }


    function draw() {
        for(var i = 0; i < vertexCount * 3; i+= 3) {
            var dx = vertices[i] - mouseX,
                dy = vertices[i + 1] - mouseY,
                dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < 0.2) {
                vertices[i] = mouseX + dx / dist * 0.2;
                vertices[i + 1] = mouseY + dy / dist * 0.2;
            }
            else
            {
                vertices[i] += Math.random() * 0.01 - 0.005;
                vertices[i + 1] += Math.random() * 0.01 - 0.005;
                vertices[i + 2] += Math.random() * 0.01 - 0.005;
            }
        }
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices))
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, vertexCount);
         //gl.drawArrays(gl.LINES, 0, vertexCount);
        // gl.drawArrays(gl.LINE_STRIP, 0, 3);
        // gl.drawArrays(gl.LINE_LOOP, 0, 3);
        //gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

        requestAnimationFrame(draw);
    }

    function map(value, minSrc, maxSrc, minDst, maxDst) {
        return (value - minSrc) / (maxSrc - minSrc) * (maxDst - minDst) + minDst;
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
