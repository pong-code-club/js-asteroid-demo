document.addEventListener('keydown', MyOnKeyDown);
document.addEventListener('keyup', MyOnKeyUp);

const MyShipControls = {
    IsMovingUp: false,
    IsMovingDown: false,
    IsMovingRight: false,
    IsMovingLeft: false,
}

const MyGameState = {
    NONE: 0,
    MAIN_MENU_START: 1,
    MAIN_MENU_CONTINUE: 2,
    GAME_START: 3,
    GAME_CONTINUE: 4,
    RESULTS_WIN_START: 5,
    RESULTS_WIN_CONTINUE: 6,
    MAX_VALUE: 7,
}

const MyCanvas = document.getElementById("myCanvas");
const MyContext = myCanvas.getContext("2d");
const MyButton = document.getElementById("myButton");

const MyStarBackgroundImage = new Image();
MyStarBackgroundImage.src = STAR_BACKGROUND_IMAGE_PATH;

const MyPlayIconImage = new Image();
MyPlayIconImage.src = PLAY_ICON_IMAGE_PATH;

let MyCurrentGameState = MyGameState.NONE;

const MyAsteroidsArray = [];

const MySpaceShip = new MyAsteroidClass
(
    MyContext, 
    SPACE_SHIP_DIAMETER, 
    SPACE_SHIP_COLOR, 
    SPACE_SHIP_X_SPEED, 
    SPACE_SHIP_Y_SPEED, 
    SPACE_SHIP_X_START_POSITION, 
    SPACE_SHIP_Y_START_POSITION,
    SPACE_SHIP_IMAGE_PATH
);

function MyCreateAsteroids() {
    for (let i = 0; i < ASTEROID_MAX_COUNT; i++) {
        const myContext = MyContext;
        const myDiameter = MyRandomNumber(ASTEROID_MIN_DIAMETER, ASTEROID_MAX_DIAMETER);
        const myColor = ASTEROID_COLOR;
        const myXSpeed = MyRandomNumber(ASTEROID_MIN_X_SPEED, ASTEROID_MAX_X_SPEED);
        const myYSpeed = MyRandomNumber(ASTEROID_MIN_Y_SPEED, ASTEROID_MAX_Y_SPEED);
        const myXPosition = MyRandomNumber(ASTEROID_MIN_X_SPAWN_POSITION, ASTEROID_MAX_X_SPAWN_POSITION);
        const myYPosition = MyRandomNumber(ASTEROID_MIN_Y_SPAWN_POSITION, ASTEROID_MAX_Y_SPAWN_POSITION);
        const myAsteroidImagePath = ASTEROID_IMAGE_PATH;

        const myAsteroid = new MyAsteroidClass (
            myContext, 
            myDiameter, 
            myColor, 
            myXSpeed, 
            myYSpeed, 
            myXPosition, 
            myYPosition,
            myAsteroidImagePath
        );
        MyAsteroidsArray.push(myAsteroid);
    }
}

function DrawBackground() {
    //MyContext.globalAlpha = 0.5;
    MyContext.fillStyle = "black";
    MyContext.fillRect(0, 0, 500, 500);

    MyContext.drawImage(MyStarBackgroundImage, 0, 0, 500, 500);
    //MyContext.globalAlpha = 1;
}

function ClearCanvas() {
    MyContext.clearRect(0,0,500,500);
}

function MyOnKeyDown(event) {
    if (event.code === "ArrowRight") {
        MyShipControls.IsMovingRight = true;
    }
    if (event.code === "ArrowLeft") {
        MyShipControls.IsMovingLeft = true;
    }
    if (event.code === "ArrowUp") {
        MyShipControls.IsMovingUp = true;
    }
    if (event.code === "ArrowDown") {
        MyShipControls.IsMovingDown = true;
    }
}

function MyOnKeyUp(event) {
    if (event.code === "ArrowRight") {
        MyShipControls.IsMovingRight = false;
    }
    if (event.code === "ArrowLeft") {
        MyShipControls.IsMovingLeft = false;
    }
    if (event.code === "ArrowUp") {
        MyShipControls.IsMovingUp = false;
    }
    if (event.code === "ArrowDown") {
        MyShipControls.IsMovingDown = false;
    }
}

function MySetGameState(gameState) {
    this.MyCurrentGameState = gameState;
}

function MyDidCollisionOccur(asteroids, spaceShip) {
    let didCollide = false;
    for (let i = 0; i < asteroids.length; i++) {
        const minDistance = asteroids[i].MyDiameter/2 + spaceShip.MyDiameter/2;

        const distanceBetween = MyCalculateDistance(asteroids[i].MyXPosition, asteroids[i].MyYPosition, spaceShip.MyXPosition, spaceShip.MyYPosition);
        
        if (distanceBetween < minDistance) {
            didCollide = true;
        }
    }
    return didCollide;
}

let MyLastTimeStamp = 0;
let MyAccumulatedTime = 0;

function MyGameLoop(timeStamp) {
    ClearCanvas();
    //DrawBackground();

    const elapsed = timeStamp - MyLastTimeStamp;
    MyLastTimeStamp = timeStamp;

    switch (MyCurrentGameState) {
        case MyGameState.NONE:
            MyCurrentGameState = MyGameState.MAIN_MENU_START;
        break;
        case MyGameState.MAIN_MENU_START:
            MyCurrentGameState = MyGameState.MAIN_MENU_CONTINUE;
        break;
        case MyGameState.MAIN_MENU_CONTINUE:
            //text
            MyContext.fillStyle = "yellow";
            MyContext.font = "bold 50px poppins";
            MyContext.fillText("ASTEROID FIELD", 72, 225);

            MyContext.fillStyle = "white";
            MyContext.font = "bold 25px poppins";
            MyContext.fillText("PRESS                 TO PLAY!", 75, 300);

            MyContext.strokeStyle = "rgba(230,0,60)";
            MyContext.fillStyle = "rgba(230,0,60)";
            MyContext.beginPath();
            MyContext.roundRect(177,262,60,60,100);
            MyContext.stroke();
            MyContext.fill();

            MyContext.drawImage(MyPlayIconImage, 189, 273, 40, 40);
        break;
        case MyGameState.GAME_START:
            MyCurrentGameState = MyGameState.GAME_CONTINUE;
            MyAccumulatedTime = 0;
        break;
        case MyGameState.GAME_CONTINUE:
            if (MyDidCollisionOccur(MyAsteroidsArray, MySpaceShip) === true) {
                for (let i = 0; i < MyAsteroidsArray.length; i++) {
                    MyAsteroidsArray[i].MyResetAsteroid();
                }

                MySpaceShip.MyXPosition = SPACE_SHIP_X_START_POSITION;
                MySpaceShip.MyYPosition = SPACE_SHIP_Y_START_POSITION;

                MyCurrentGameState = MyGameState.RESULTS_WIN_START;
            }

            for (let i = 0; i < MyAsteroidsArray.length; i++) {
                MyAsteroidsArray[i].MyChangeAsteroidPosition();
                //MyAsteroidsArray[i].MyDrawAsteroid();
                MyAsteroidsArray[i].MyDrawAsteroidImage(true);
            }
        
            MySpaceShip.MyMoveAsteroid(MyShipControls);
            //MySpaceShip.MyDrawAsteroid();
            MySpaceShip.MyDrawAsteroidImage(true);
        
            //text
            MyContext.fillStyle = "yellow";
            MyContext.font = "bold 35px poppins";

            MyAccumulatedTime += elapsed;
            const myFormattedTime = MyFormatMinutesSeconds(MyAccumulatedTime);
            MyContext.fillText(`TIME: ${myFormattedTime}`, 15, 50);
        break;
        case MyGameState.RESULTS_WIN_START:
            MyCurrentGameState = MyGameState.RESULTS_WIN_CONTINUE;
        break;
        case MyGameState.RESULTS_WIN_CONTINUE:
            //text
            MyContext.fillStyle = "white";
            MyContext.font = "bold 50px poppins";
            MyContext.fillText("SURVIVAL TIME", 72, 225);

            MyContext.fillStyle = "white";
            MyContext.font = "bold 25px poppins";

            const myFinalFormattedTime = MyFormatMinutesSeconds(MyAccumulatedTime);
            MyContext.fillText(myFinalFormattedTime, 75, 300);
        break
    
        default:
        break;
    }

    // Request the next frame
    requestAnimationFrame(MyGameLoop);
}

const MyPlayButton = document.getElementById("myPlayButton");

MyPlayButton.addEventListener("pointerup", () => {
    MyCurrentGameState++
    if (MyCurrentGameState >= MyGameState.MAX_VALUE) {
        MyCurrentGameState = 1;
    }
    console.log(MyCurrentGameState);
});

MyCreateAsteroids();
requestAnimationFrame(MyGameLoop);

console.log(MyCalculateDistance(10, 0, 20, 0));