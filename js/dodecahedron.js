var gl;
var shaderProgram;
var uPMatrix;
var vertexPositionBuffer;
//var vertexColorBuffer;
var indexBuffer;

var fi 

function MatrixMul(a,b) //Mnożenie macierzy
{
  c = [
  0,0,0,0,
  0,0,0,0,
  0,0,0,0,
  0,0,0,0
  ]
  for(let i=0;i<4;i++)
  {
    for(let j=0;j<4;j++)
    {
      c[i*4+j] = 0.0;
      for(let k=0;k<4;k++)
      {
        c[i*4+j]+= a[i*4+k] * b[k*4+j];
      }
    }
  }
  return c;
}


function createDodecahedron(){
      const t = (1 + Math.sqrt(5))/2;
      const d = t - 1;

      console.log(`a = ${2*d}`);

      let vertexPosition = [
      1,  1,  1,
      1,  1,  -1,
      1, -1,  1,
      1, -1, -1,  
      -1,  1,  1,
      -1, 1, -1, 
      -1, -1,  1, 
      -1, -1, -1,
      t,  0,  d, 
      t,  0, -d,
      -t,  0,  d,
      -t,  0, -d,
      d,  t,  0,
      d, -t,  0,
      -d,  t, 0,
      -d, -t, 0,
      0,  d,  t,
      0,  -d,  t,
      0,  d, -t,
      0, -d, -t,
      -t, 0,  0,

      -d, -t, -0.000001,
      -d,  t, -0.000001,
      -d,  t, -0.0000001,

      -d,-t+0.00001,0.00001,
      -d,-t+0.00001,-0.00001,
      -d,t+0.00001,0.00001,
      -d,t+0.00001,-0.00001,
      d, t+0.00001,-0.00001,
      d, t+0.00001,0.00001,
      d,-t+0.00001,0.00001,
      d,-t+0.00001,-0.00001,

      -t, 0,  -0.000001,
      -t,  0,  -0.00001,

      0,t+0.00001,0.00001,
      0,t+0.00001,-0.00001,
      0,-t+0.00001,-0.00001,
      0,-t+0.00001,0.00001,


      ]

      return vertexPosition;
}
    var t = (1 + Math.sqrt(5))/2;
    const d = t-1;

    function face(x = 0, y = 0){
       const c1 = Math.cos((2*Math.PI)/5) 
       const c2 = Math.cos(Math.PI/5)
       const s1 = Math.sin((2*Math.PI)/5)
       const s2 = Math.sin((4*Math.PI)/5)

       array = [
       x, y + 1, 0,      x + s2, y - c2, 0,      x - s2, y - c2, 0,
       x, y + 1, 0,      x + s2, y - c2, 0,      x + s1, y + c1, 0,
       x, y + 1, 0,      x - s2 ,y - c2, 0,      x - s1, y + c1, 0,    
    ]

    return array;
    }

    function reverseFace(x = 0, y = 0){
      let pentagon = face(x,y)
      let result = [];
      
      for(let i = 0; i <  27; i += 3){
        result.push(-(pentagon[i]));
        result.push(-(pentagon[i + 1]))
        result.push(0);
      }
      return result;
    }

    function reversePentaflake(x, y){
      let pentaflake = createPentaflake(x, y)
      let result = [];

      for(let i = 0; i <  6 * 27; i += 3){
        result.push(-(pentaflake[i]));
        result.push(-(pentaflake[i + 1]))
        result.push(0);
      }
      return result;
    }

    function createPentaflake(x = 0,y = 0){
      const a = Math.sin((4*Math.PI)/5)*2;

      const fi = (1 + Math.sqrt(5)) / 2;
      const h = ((Math.sqrt(5+(2*Math.sqrt(5)))) / 2)*a;
      const R = ((Math.sqrt(50 + 10*Math.sqrt(5)))/10)*a;
      const r = ((Math.sqrt(25 + 10*Math.sqrt(5)))/10)*a;
      const e = ((Math.sqrt(25 - 10*Math.sqrt(5)))/10)*a;

      const temp = (2*r)/Math.sqrt(2);
      
        const face1 = face(-x, -y);
        const face2 = reverseFace(x + 0, y + 2*r);
        const face3 = reverseFace(x -temp + e, y -temp - e);
        const face4 = reverseFace(x + temp - e, y -temp - e);
        const face5 = reverseFace(x + 2*r- 0.07, y + temp - r + e - 0.03)
        const face6 = reverseFace(x - 2*r + 0.07, y + temp - r + e - 0.03)

        const pentaflake1 = face1.concat(face2, face3, face4, face5, face6);

         return pentaflake1;
    }

  //console.log(vertexPosition);

 
  function createMesh(x1,y1){
    const fi = (1 + Math.sqrt(5)) / 2;


    const pentaflake1 = createPentaflake(x1,y1);
    const pentaflake2 = reversePentaflake(x1 + 2.2*fi, y1 + 2.2* fi)

    const mesh = pentaflake1.concat(pentaflake2);

    return mesh;
  }



function createCoordsDode()
{
  let position = createDodecahedron();  
 
  let vertexCoords = [];
  
  for(let i = 0; i < position.length; i += 3){
    const X = position[i+0];
    const Y = position[i+1];
    const Z = position[i+2];
    const fi = Math.atan2(-Z, X); //atan(-Z/X)
    const phi = Math.asin(Y / Math.sqrt(X*X+Y*Y+Z*Z)); //asin(Y/|R|)
    const u = fi / (2 * Math.PI) + 0.5;
    const v = phi / (Math.PI) + 0.5;

    vertexCoords.push(...[u,v]);
  }

  console.log(position.length);
  return vertexCoords;
}

function startGL() 
{
  //alert("StartGL");
  let canvas = document.getElementById("canvas-hero"); //wyszukanie obiektu w strukturze strony 
  gl = canvas.getContext("experimental-webgl"); //pobranie kontekstu OpenGL'u z obiektu canvas
  gl.viewportWidth = canvas.width; //przypisanie wybranej przez nas rozdzielczości do systemu OpenGL
  gl.viewportHeight = canvas.height;

  //Kod shaderów
  const vertextShaderSource = ` //Znak akcentu z przycisku tyldy - na lewo od przycisku 1 na klawiaturze
    precision highp float;
    attribute vec3 aVertexPosition; 
    //attribute vec3 aVertexColor;
    attribute vec2 aVertexCoords;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    varying vec3 vColor;
    varying vec2 vTexUV;


    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); //Dokonanie transformacji położenia punktów z przestrzeni 3D do przestrzeni obrazu (2D)
      //vColor = aVertexColor;
      vTexUV = aVertexCoords;
    }
  `;
  const fragmentShaderSource = `
    precision highp float;
    //varying vec3 vColor;
    varying vec2 vTexUV;
    
    uniform sampler2D uSampler;
    void main(void) {
      //gl_FragColor = vec4(vColor,1.0); //Ustalenie stałego koloru wszystkich punktów sceny
      gl_FragColor = texture2D(uSampler,vTexUV); //Odczytanie punktu tekstury i przypisanie go jako koloru danego punktu renderowaniej figury
    }
  `;
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); //Stworzenie obiektu shadera 
  let vertexShader   = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource); //Podpięcie źródła kodu shader
  gl.shaderSource(vertexShader, vertextShaderSource);
  gl.compileShader(fragmentShader); //Kompilacja kodu shader
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) { //Sprawdzenie ewentualnych błedów kompilacji
    alert(gl.getShaderInfoLog(fragmentShader));
    return null;
  }
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vertexShader));
    return null;
  }

  shaderProgram = gl.createProgram(); //Stworzenie obiektu programu 
  gl.attachShader(shaderProgram, vertexShader); //Podpięcie obu shaderów do naszego programu wykonywanego na karcie graficznej
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) alert("Could not initialise shaders");  //Sprawdzenie ewentualnych błedów

  let vertexPosition = createDodecahedron();
  //let vertexPosition = createMesh(0,0);
    //let vertexPosition = octahedronMesh();

  vertexPositionBuffer = gl.createBuffer(); //Stworzenie tablicy w pamieci karty graficznej
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPosition), gl.STATIC_DRAW);
  vertexPositionBuffer.itemSize = 3; //zdefiniowanie liczby współrzednych per wierzchołek
  //vertexPositionBuffer.numItems = vertexPosition.length/(3*3) //Zdefinoiowanie liczby punktów w naszym buforze
  vertexPositionBuffer.numItems = vertexPosition.length;

 let vertexCoords = createCoordsDode()
 console.log(vertexCoords.length);


  vertexCoordsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexCoordsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexCoords), gl.STATIC_DRAW);
  vertexCoordsBuffer.itemSize = 2;
  vertexCoordsBuffer.numItems = 12;

  textureBuffer = gl.createTexture();
  var textureImg = new Image();
  textureImg.onload = function() { //Wykonanie kodu automatycznie po załadowaniu obrazka
    gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImg); //Faktyczne załadowanie danych obrazu do pamieci karty graficznej
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Ustawienie parametrów próbkowania tekstury
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  textureImg.src = "./images/textures/texture.jpg"; //Nazwa obrazka

  let indexes = [
    0, 8, 9,
    0,9,1,
    0,1,12,
    9,3,19,
    9,19,18,
    9,18,1,
    19,7,11,
    19,11,5,
    19,5,18,
    10,6,17,
    10,17,16,
    10,16,4,
    16,17,2,
    16,2,8,
    16,8,0,
    8,2,13,
    8,13,3,
    8,3,9,

               //19-22
    21,32,11,
    15,10,20,
     21,11,7,
      15,6,10,
              //23-26
      22,11,33,
     14,20,10,
     14,10,4,
      22,5,11,
                 //27-31
      3,7,19,
      3,7,36,
     7,36,25,
       3,36,31,
                 //31=44
      17,6,2,
      2,6,37,
      6,37,24,
       2,37,30,

    16,4,0,
     0,4,34,
     4,34,26,
    0,34,29,
     1,18,5,//dolny trojkat
      1,5,35,
       5,35,27,
      1,35,28

      // 19,5,3,
 ];

  indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(
          gl.ELEMENT_ARRAY_BUFFER,
          new Uint16Array(indexes),
          gl.STATIC_DRAW
        );
        indexBuffer.itemSize = 3;
        indexBuffer.numItems = indexes.length;

  //Macierze opisujące położenie wirtualnej kamery w przestrzenie 3D
  let aspect = gl.viewportWidth/gl.viewportHeight;
  let fov = 45.0 * Math.PI / 180.0; //Określenie pola widzenia kamery
  let zFar = 100.0; //Ustalenie zakresów renderowania sceny 3D (od obiektu najbliższego zNear do najdalszego zFar)
  let zNear = 0.1;
  uPMatrix = [
   1.0/(aspect*Math.tan(fov/2)),0                           ,0                         ,0                            ,
   0                         ,1.0/(Math.tan(fov/2))         ,0                         ,0                            ,
   0                         ,0                           ,-(zFar+zNear)/(zFar-zNear)  , -1,
   0                         ,0                           ,-(2*zFar*zNear)/(zFar-zNear) ,0.0,
  ];

  Tick();
} 

//let angle = 45.0; //Macierz transformacji świata - określenie położenia kamery
var angleZ = 180.0;
var angleY = 0.0;
var angleX = 0.0;
var tz = -5.0;

function Tick()
{  
  let uMVMatrix = [
  1,0,0,0, //Macierz jednostkowa
  0,1,0,0,
  0,0,1,0,
  0,0,0,1
  ];

  let uMVRotZ = [
  +Math.cos(angleZ*Math.PI/180.0),+Math.sin(angleZ*Math.PI/180.0),0,0,
  -Math.sin(angleZ*Math.PI/180.0),+Math.cos(angleZ*Math.PI/180.0),0,0,
  0,0,1,0,
  0,0,0,1
  ];

  let uMVRotY = [
  +Math.cos(angleY*Math.PI/180.0),0,-Math.sin(angleY*Math.PI/180.0),0,
  0,1,0,0,
  +Math.sin(angleY*Math.PI/180.0),0,+Math.cos(angleY*Math.PI/180.0),0,
  0,0,0,1
  ];

  let uMVRotX = [
  1,0,0,0,
  0,+Math.cos(angleX*Math.PI/180.0),+Math.sin(angleX*Math.PI/180.0),0,
  0,-Math.sin(angleX*Math.PI/180.0),+Math.cos(angleX*Math.PI/180.0),0,
  0,0,0,1
  ];

  let uMVTranslateZ = [
  1,0,0,0,
  0,1,0,0,
  0,0,1,0,
  0,0,tz,1
  ];
 
  uMVMatrix = MatrixMul(uMVMatrix,uMVRotX);
  uMVMatrix = MatrixMul(uMVMatrix,uMVRotY);
  uMVMatrix = MatrixMul(uMVMatrix,uMVRotZ);

  uMVMatrix = MatrixMul(uMVMatrix,uMVTranslateZ);
  //alert(uPMatrix);
  
  //Render Scene
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight); 
  gl.clearColor(0.0,0.0,0.0,0.0); //Wyczyszczenie obrazu kolorem czerwonym
  gl.clearDepth(1.0);             //Wyczyścienie bufora głebi najdalszym planem
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(shaderProgram)   //Użycie przygotowanego programu shaderowego
  
  gl.enable(gl.DEPTH_TEST);           // Włączenie testu głębi - obiekty bliższe mają przykrywać obiekty dalsze
  gl.depthFunc(gl.LEQUAL);            // 
  
  gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "uPMatrix"), false, new Float32Array(uPMatrix)); //Wgranie macierzy kamery do pamięci karty graficznej
  gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "uMVMatrix"), false, new Float32Array(uMVMatrix));
  
  gl.enableVertexAttribArray(gl.getAttribLocation(shaderProgram, "aVertexPosition"));  //Przekazanie położenia
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.vertexAttribPointer(gl.getAttribLocation(shaderProgram, "aVertexPosition"), vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(gl.getAttribLocation(shaderProgram, "aVertexCoords"));  //Pass the geometry
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexCoordsBuffer);
  gl.vertexAttribPointer(gl.getAttribLocation(shaderProgram, "aVertexCoords"), vertexCoordsBuffer.itemSize, gl.FLOAT, false, 0, 0);
  
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
  
   //gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.numItems*vertexPositionBuffer.itemSize); //Faktyczne wywołanie rendrowania
   gl.drawElements(gl.TRIANGLES,indexBuffer.numItems,gl.UNSIGNED_SHORT,0);
  //setTimeout(Tick,100);
  
  angleY += 0.5;
  requestAnimationFrame(Tick);
}
