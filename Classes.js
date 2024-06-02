class MyAsteroidClass {
    MyContext;

    MyDiameter;
    MyColor;

    MyXSpeed;
    MyYSpeed;

    MyXPosition;
    MyYPosition;

    MyImage;
    MyImagePath;

    constructor(_myContext, _myDiameter, _myColor, _myXSpeed, _myYSpeed, _myXPosition, _myYPosition, _myImagePath) {
        this.MyImagePath = _myImagePath;
        this.MyImage = new Image();
        this.MyImage.src = this.MyImagePath;

        this.MyContext = _myContext;

        this.MyDiameter = _myDiameter;
        this.MyColor = _myColor;

        this.MyXSpeed = _myXSpeed;
        this.MyYSpeed = _myYSpeed;

        this.MyXPosition = _myXPosition;
        this.MyYPosition = _myYPosition;
    }

    MyResetAsteroid() {
        this.MyXPosition = Math.random() * 500;
        this.MyYPosition = 0;
        this.MyDiameter = MyRandomNumber(ASTEROID_MIN_DIAMETER, ASTEROID_MAX_DIAMETER);
    }

    MyChangeAsteroidSpeed(_myXSpeed, _myYSpeed) {
        this.MyXSpeed = _myXSpeed;
        this.MyYSpeed = _myYSpeed;
    }

    MyChangeAsteroidPosition() {
        this.MyXPosition += this.MyXSpeed;
        this.MyYPosition += this.MyYSpeed;

        if (Math.abs(this.MyXPosition) >= 550 || Math.abs(this.MyYPosition) >= 550) {
            this.MyResetAsteroid();
        }
    }

    MyMoveAsteroid(_myShipControls) {
        if (_myShipControls.IsMovingDown === true) {
            MySpaceShip.MyYPosition += MySpaceShip.MyYSpeed;
        }
        if (_myShipControls.IsMovingLeft === true) {
            MySpaceShip.MyXPosition -= MySpaceShip.MyXSpeed;
        }
        if (_myShipControls.IsMovingRight === true) {
            MySpaceShip.MyXPosition += MySpaceShip.MyXSpeed;
        }
        if (_myShipControls.IsMovingUp === true) {
            MySpaceShip.MyYPosition -= MySpaceShip.MyYSpeed;
        }
    }

    MyDrawAsteroid() { 
        this.MyContext.shadowBlur = 0;
        this.MyContext.shadowColor = "transparent";
               
        this.MyContext.beginPath();
        this.MyContext.arc(this.MyXPosition, this.MyYPosition, this.MyDiameter/2, 0, 2 * Math.PI, false);
        this.MyContext.fillStyle = this.MyColor;
        this.MyContext.fill();
    }

    MyDrawAsteroidImage(hasGlow) {
        if (hasGlow === true) {
            this.MyContext.shadowBlur = 15;
            this.MyContext.shadowColor = "cyan";
        }
        if (hasGlow === false) {
            console.log('im in false');
            this.MyContext.shadowBlur = 0;
            this.MyContext.shadowColor = "transparent";
        }
        this.MyContext.drawImage(this.MyImage, this.MyXPosition - this.MyDiameter/2, this.MyYPosition - this.MyDiameter/2, this.MyDiameter, this.MyDiameter);
        this.MyContext.shadowBlur = 0;
    }
}