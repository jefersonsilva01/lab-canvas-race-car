window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  let carPositionX, obstaclePositionX, obstaclePositionY, obstacleSizeX, points


  // Check if colision
  function checkIfColision(idIntervalUpdateObstacles) {
    if (450 === obstaclePositionY + 15 && (carPositionX >= obstaclePositionX && carPositionX <= (obstaclePositionX + obstacleSizeX))) {
      document.getElementById('start-button').removeAttribute('disabled');
      clearInterval(idIntervalUpdateObstacles);
    }
  }

  // Draw obstacles

  function drawObstacles(obstaclePositionX, obstaclePositionY, obstacleSizeX) {
    context.beginPath();
    context.rect(obstaclePositionX, obstaclePositionY, obstacleSizeX, 25);
    context.fillStyle = '#f00';
    context.fill();
    context.lineWidth = 1;
    context.fillStyle = '#000';
    context.stroke();
  }

  function updateObstacles() {
    context.clearRect(obstaclePositionX, obstaclePositionY, obstacleSizeX, 25);
    drawRoad();

    if (obstaclePositionY < 690) {
      obstaclePositionY += 15;
      setTimeout(() => {
        drawObstacles(obstaclePositionX, obstaclePositionY, obstacleSizeX);
      }, 5);
    } else {
      obstaclePositionX = Math.floor(Math.random() * (249 - 65 + 1)) + 65;
      obstaclePositionY = 0;
      obstacleSizeX = Math.floor(Math.random() * (190 - 50 + 1)) + 50;

      setTimeout(() => {
        drawObstacles(obstaclePositionX, obstaclePositionY, obstacleSizeX);
      }, 10);
    }
    drawCar(carPositionX);
  }

  // Draw road
  function drawRoad() {
    let imgObj = new Image();
    imgObj.onload = function () {
      context.drawImage(imgObj, 0, 0, 500, 700);
    }
    imgObj.src = '../images/road.png';
  }

  // Draw car
  function drawCar(positionX) {
    let imgObj = new Image();
    imgObj.onload = function () {
      context.drawImage(imgObj, positionX, 450, 80, 130);
    }
    imgObj.src = '../images/car.png';
  }

  // Move car
  function moveCar(positionX) {
    if (positionX > 57 && positionX < 380) {
      carPositionX = positionX;
      drawRoad();
      drawCar(carPositionX);
    };
  }

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      // Move left
      case 37:
        moveCar(carPositionX - 10);
        break;

      // Move right
      case 39:
        moveCar(carPositionX + 10);
        break;
    }
  }

  function startGame() {
    document.getElementById('start-button').setAttribute('disabled', true);

    context.clearRect(0, 0, 500, 700);

    carPositionX = 210;
    obstaclePositionX = Math.floor(Math.random() * (249 - 65 + 1)) + 65;
    obstaclePositionY = 0;
    obstacleSizeX = Math.floor(Math.random() * (190 - 50 + 1)) + 50;;
    points = 0;

    drawRoad();
    drawCar(carPositionX);
    setTimeout(() => {
      drawObstacles(obstaclePositionX, obstaclePositionY, obstacleSizeX);
    }, 1000);

    let idIntervalUpdateObstacles = setInterval(() => {
      updateObstacles()
      checkIfColision(idInterval);
    }, 350);

  };
}
