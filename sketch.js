var character
var countDown = 3
var msCount = 3
var start, startImg

// game level //
var gameState = "level0"

// for level 0.1--------------------------------------------------------------------------------------------->
var characterStand, characterRunning, backgroundImg, football, footballImg
var goalKeeperImg, goalKeeperRight, goalKeeperLeft, goalKeeperTop, goalKeeperTR, goalKeeperTL
var goalPostR, goalPostL, goalPostT
var goalPostRI, goalPostLI, goalPostTI
var x, y
var savedGoals = 0
var goalPostTouching = 0
var tries = 5
var missedGoals = 0
var points = 0

//for level 1--------------------------------------------------------------------------------------------->
var pool
var swmimmer, swim
var ship, shipImg
var dpMeter = 5
var cooldown = 20, c1, c2, c3
var speedInc = 10
var ifSpeedInc = 0
var obstacle1, obstaclesGroup
var check = 0
var uBound, lBound
var blood, bloodImg
var Visibility = 255

// variables for test--------------------------------------------------------------------------------------------->
var testT, testL, testR

function preload() {
	characterStand = loadImage("Character/8.png")
	characterRunning = loadAnimation("Character/1.png", "Character/2.png", "Character/3.png", "Character/4.png", "Character/5.png")
	startImg = loadImage("Character/start.png")

	//level 0-------------------------------------------------------------------------------------------------->
	backgroundImg = loadImage("Character/backgrounds/background 1.png")
	footballImg = loadImage("Character/football.png")
	goalKeeperImg = loadImage("Character/stand-small.png")
	goalKeeperRight = loadImage("Character/right-save-small.png")
	goalKeeperLeft = loadImage("Character/left-save-small.png")
	goalKeeperTop = loadImage("Character/top-save-small.png")
	goalKeeperTR = loadImage("Character/top-right-save-small.png")
	goalKeeperTL = loadImage("Character/top-left-save-small.png")

	//level 1----------------------------------------------------------------------------------------------------->
	pool = loadImage("Character/backgrounds/level 1.png")
	swmimmer = loadImage("Character/Swim/swc1.png")
	swim = loadAnimation("Character/Swim/swc1.png", "Character/Swim/swc2.png", "Character/Swim/swc3.png", "Character/Swim/swc4.png")
	obstacle1 = loadImage("Character/difficulties/shark-fin.png")
	bloodImg = loadImage("Character/Swim/blood.png")
	shipImg = loadImage("Character/Swim/ship1.png")
}

function setup() {
	//creating canvas & character--------------------------------------------------------------------------->
	createCanvas(displayWidth - displayWidth / 3, displayHeight / 1.5);
	character = createSprite(100, 100, 20, 20)


	//Start Button--------------------------------------------------------------------------------------------->
	start = createSprite((displayWidth - displayWidth / 3) / 2, (displayHeight / 1.5) / 2, 10, 10)
	start.addImage("s", startImg)
	start.scale = 0.2

	//level 0----------------------------------------------------------------------------------------------->
	goalPostR = createSprite(displayWidth / 2 + 45, displayHeight / 2.7, 10, 320)
	goalPostL = createSprite(displayWidth / 5 - 95, displayHeight / 2.7, 10, 320)
	goalPostT = createSprite((displayWidth - displayWidth / 3) / 2, displayHeight / 5 - 30, 520, 10)
	goalPostRI = createSprite(displayWidth / 2 + 35, displayHeight / 2.7, 10, 320)
	goalPostLI = createSprite(displayWidth / 5 - 85, displayHeight / 2.7, 10, 320)
	goalPostTI = createSprite((displayWidth - displayWidth / 3) / 2, displayHeight / 5 + 10 - 30, 520, 10)
	football = createSprite((displayWidth - displayWidth / 3) / 2, displayHeight / 1.6)
	football.setCollider("circle", 0, 0, 24)

	//level 1--------------------------------------------------------------------------------------------------->
	obstaclesGroup = new Group()
	uBound = createSprite((displayWidth * 6) / 2, 160, displayWidth * 6, 10)
	lBound = createSprite((displayWidth * 6) / 2, displayHeight / 1.5 + 40, displayWidth * 6, 10)
	blood = createSprite(character.x, character.y, 10, 10)
	ship = createSprite(7700, (displayHeight / 1.5) / 2, 10,10)


	// location test //




	//visibility for level 0--------------------------------------------------------------------->
	goalPostL.visible = false
	goalPostR.visible = false
	goalPostT.visible = false
	goalPostLI.visible = false
	goalPostRI.visible = false
	goalPostTI.visible = false
	football.visible = false

	//visibility for level 1--------------------------------------------------------------------->
	uBound.visible = false
	lBound.visible = false
	blood.visible = false
	ship.visible = false


	character.addAnimation("ci", characterStand)
	character.addAnimation("cr", characterRunning)

	//adding images and animation for character-------------------------------------------------------------------->
	//for level 0.1----------------------------------->
	character.addImage("gK", goalKeeperImg)
	character.addImage("gKR", goalKeeperRight)
	character.addImage("gKL", goalKeeperLeft)
	character.addImage("gKT", goalKeeperTop)
	character.addImage("gKTR", goalKeeperTR)
	character.addImage("gKTL", goalKeeperTL)

	//for level 1------------------------------------>
	character.addImage("st", swmimmer)
	character.addAnimation("s", swim)
	blood.addImage("b", bloodImg)
	ship.addImage("ship", shipImg)


	character.scale = 0.25
	blood.scale = 0.10
}


function draw() {
	background(0);

	//level 0------------------------------------------------------------------------------------------------->
	if (mousePressedOver(start)) {
		gameState = "level1"
		character.x = (displayWidth - displayWidth / 3) / 2
		character.y = displayHeight / 2
		if (gameState === "level1") {
			character.changeImage("gK", goalKeeperImg)
		}
		start.destroy()
	}

	//Level 0.1----------------------------------------------------------------------------------------------------->
	if (gameState === "level1") {
		background(backgroundImg)
		football.visible = true
		football.addImage("fo", footballImg)


		if (frameCount % 50 === 0 && tries > 0) {
			countDown = countDown - 1
		}

		// score texts //
		fill("black")
		textSize(20)
		text("Shots Left: " + tries, 10, 50)

		text("Goals Saved: " + savedGoals, 180, 50)

		text("Goals Missed: " + missedGoals, 370, 50)

		text("Points Scored: " + points, 560, 50)

		textSize(200)
		if (countDown >= 0 && tries > 0) {
			text(countDown, (displayWidth - displayWidth / 3) / 2 - 50, displayHeight / 2 - 50)
		}

		if (countDown < 0 && tries === 5) {
			football.velocityX = 10
			football.velocityY = -10
		}


		// character collision //
		character.collide(goalPostR)
		character.collide(goalPostL)
		character.collide(goalPostT)
		football.collide(goalPostL)
		football.collide(goalPostR)
		football.collide(goalPostT)

		character.scale = 1.2



		//saved or missed functions and actions------------------------------------------------------------------------------------------> 

		if (football.isTouching(goalPostRI) || football.isTouching(goalPostLI) || football.isTouching(goalPostTI) && tries > 0) {
			football.velocityX = 0
			football.velocityY = 0

			if (frameCount % 20 === 0 && tries > 0) {
				msCount = msCount - 1
			}

			textSize(150)
			fill("red")
			text("MISSED", (displayWidth - displayWidth / 3) / 2 - 290, displayHeight / 2 - 120)

			goalPostTouching = 1

			if (msCount < 0) {
				reset()
			}
		}


		//Goal Saved------------------------------------------------------------------------------------------> 

		if (football.isTouching(character) && (football.x > displayWidth / 2 - 100 || football.y < displayHeight / 5 + 100 || football.x < displayWidth / 5 + 80) && goalPostTouching !== 1) {
			football.velocityX = 0
			football.velocityY = 0
			character.velocityX = 0
			character.velocityY = 0

			if (frameCount % 20 === 0 && tries > 0) {
				msCount = msCount - 1
			}

			textSize(150)
			fill("green")
			text("SAVED", (displayWidth - displayWidth / 3) / 2 - 250, displayHeight / 2 - 120)

			if (msCount < 0) {
				wReset()
			}
		} else if (countDown < 0 && tries < 5 && tries > 0 && goalPostTouching === 0) {
			football.velocityX = x
			football.velocityY = y
		}

		// character movement for level 0//
		if (countDown < 0 && msCount === 3) {
			if (keyDown(RIGHT_ARROW)) {
				character.changeImage("gKR")
				character.velocityX = 10
				character.setCollider("circle", 50, 10, 30);
			}

			if (keyDown(LEFT_ARROW)) {
				character.changeImage("gKL")
				character.velocityX = -10
				character.setCollider("circle", -50, 10, 30);

			}

			if (keyDown(UP_ARROW)) {
				character.changeImage("gKT")
				character.velocityY = -10
				character.setCollider("circle", 0, -40, 30);
			}

			if (keyDown("D")) {
				character.changeImage("gKTR")
				character.velocityX = 10
				character.velocityY = -10
				character.setCollider("circle", 55, -40, 30);
			}

			if (keyDown("A")) {
				character.changeImage("gKTL")
				character.velocityX = -10
				character.velocityY = -10
				character.setCollider("circle", -55, -40, 30);
			}

			// football distance ------------------------------------------------------------------------->
			if (football.x % 2 && football.velocityX !== 0 && goalPostTouching === 0) {
				football.scale = football.scale - 0.01
			}
		}

		// level change ------------------------------------------------------------------------------->


		if (tries === 0) {
			if (points === 0) {
				disqualified()
			}
			if (points < 2 && points > 0 || points === 2) {
				gameState = "level 1.1"
				msCount = 5
				character.scale = 2
				character.x = 400
				character.y = 349
				character.changeImage("st")
				cooldown = c1 = 10
				football.destroy()
			}

			if (points === 3) {
				gameState = "level 2.1"
				msCount = 5
				character.scale = 2
				character.x = 400
				character.y = 349
				character.changeImage("st")
				cooldown = c2 = 15
				football.destroy()
			}

			if (points > 4 || points === 4) {
				gameState = "level 3.1"
				msCount = 5
				character.scale = 2
				character.x = 400
				character.y = 349
				character.changeImage("st")
				cooldown = c3 = 25
				football.destroy()
			}
		}
	}
	//Level 0 end--------------------------------------------------------------------------------------------------!>

	//Level 1 (easy)------------------------------------------------------------------------------------------------>
	if (gameState === "level 1.1") {
		image(pool, 0, 0, displayWidth * 6, displayHeight)
		camera.position.x = character.x
		camera.position.y = displayHeight / 2
		character.collide(uBound)
		character.collide(lBound)

		ship.visible = true

		character.setCollider("rectangle", 0, 0, 45, 27)

		if (character.visible === true && obstaclesGroup.isTouching(character)) {
			gameOver()
		}

		if (check < 1) {
			if (keyDown(RIGHT_ARROW)) {
				character.changeAnimation("s")
				character.velocityX = 2
				if (frameCount % 12 === 0) {
					speedInc = speedInc - 1
				}

				if (speedInc < 0) {
					incInSpeed()
				}

				if (ifSpeedInc === 1) {
					character.velocityX = 5
				}

				if (ifSpeedInc === 2) {
					character.velocityX = 7
				}

				if (ifSpeedInc === 3) {
					character.velocityX = 9
				}
			} else {
				character.changeAnimation("st")
				character.velocityX = 0
				ifSpeedInc = 0
			}

			if (keyDown(UP_ARROW)) {
				character.velocityY = -5
			} else {
				character.velocityY = 0
			}

			if (keyDown(DOWN_ARROW)) {
				character.velocityY = 5
			}

			if (keyWentDown("SPACE") && cooldown === c1) {
				if (dpMeter > 0) {
					character.visible = false
				}

				cooldown = cooldown - 1
			}

			if (frameCount % 15 === 0 && character.visible === false) {
				dpMeter = dpMeter - 1
			}

			if (cooldown <= 0) {
				cooldown = c1
			}

			if (frameCount % 20 === 0 && cooldown < c1) {
				cooldown = cooldown - 1
			}

			if (dpMeter <= 0) {
				character.visible = true
				dpMeter = 5
			}

			if (character.x<7650) {
				spawnObstacles1()
			}
		}
	}
	//Level 1 (easy) End------------------------------------------------------------------------------------------!>

	//Level 1 (medium)--------------------------------------------------------------------------------------------->
	if (gameState === "level 2.1") {
		image(pool, 0, 0, displayWidth * 6, displayHeight)

		character.setCollider("rectangle", 0, 0, 25, 20)

		ship.visible = true

		camera.position.x = character.x
		camera.position.y = displayHeight / 2

		if (character.visible === true && obstaclesGroup.isTouching(character)) {
			gameOver()
		}

		if (keyDown(RIGHT_ARROW)) {
			character.changeAnimation("s")
			character.velocityX = 2
			if (frameCount % 20 === 0) {
				speedInc = speedInc - 1
			}

			if (speedInc < 0) {
				incInSpeed()
			}

			if (ifSpeedInc === 1) {
				character.velocityX = 5
			}

			if (ifSpeedInc === 2) {
				character.velocityX = 7
			}

			if (ifSpeedInc === 3) {
				character.velocityX = 9
			}
		} else {
			character.changeAnimation("st")
			character.velocityX = 0
			ifSpeedInc = 0
		}

		if (keyDown(UP_ARROW)) {
			character.velocityY = -3
		} else {
			character.velocityY = 0
		}

		if (keyDown(DOWN_ARROW)) {
			character.velocityY = 3
		}

		if (keyWentDown("SPACE") && cooldown === c2) {
			if (dpMeter > 0) {
				character.visible = false
			}

			cooldown = cooldown - 1
		}

		if (frameCount % 15 === 0 && character.visible === false) {
			dpMeter = dpMeter - 1
		}

		if (cooldown <= 0) {
			cooldown = c2
		}

		if (frameCount % 20 === 0 && cooldown < c2) {
			cooldown = cooldown - 1
		}

		if (dpMeter <= 0) {
			character.visible = true
			dpMeter = 5
		}
		if (character.x<7650) {
			spawnObstacles2()
		}
	}
	//Level 1 (medium) End----------------------------------------------------------------------------------------------------!>

	//Level 1 (hard)------------------------------------------------------------------------------------------------------------>
	if (gameState === "level 3.1") {
		image(pool, 0, 0, displayWidth * 6, displayHeight)
		camera.position.x = character.x
		camera.position.y = displayHeight / 2

		if (character.visible === true) {
			character.collide(obstaclesGroup)
		}

		if (keyDown(RIGHT_ARROW)) {
			character.changeAnimation("s")
			character.velocityX = 2
			if (frameCount % 30 === 0) {
				speedInc = speedInc - 1
			}

			if (speedInc < 0) {
				incInSpeed()
			}

			if (ifSpeedInc === 1) {
				character.velocityX = 5
			}

			if (ifSpeedInc === 2) {
				character.velocityX = 7
			}

			if (ifSpeedInc === 3) {
				character.velocityX = 9
			}
		} else {
			character.changeAnimation("st")
			character.velocityX = 0
			ifSpeedInc = 0
		}

		if (keyDown(UP_ARROW)) {
			character.velocityY = -2
		} else {
			character.velocityY = 0
		}

		if (keyDown(DOWN_ARROW)) {
			character.velocityY = 2
		}

		if (keyWentDown("SPACE") && cooldown === c3) {
			if (dpMeter > 0) {
				character.visible = false
			}

			cooldown = cooldown - 1
		}

		if (frameCount % 15 === 0 && character.visible === false) {
			dpMeter = dpMeter - 1
		}

		if (cooldown <= 0) {
			cooldown = c3
		}

		if (frameCount % 20 === 0 && cooldown < c3) {
			cooldown = cooldown - 1
		}

		if (dpMeter <= 0) {
			character.visible = true
			dpMeter = 5
		}


		spawnObstacles()
	}
	//Level 1 (hard) End---------------------------------------------------------------------------------------------!>

	//Console statements-------------------------------------------------------------------------->
	console.log(displayWidth*5)
	console.log(character.x)
    console.log(character.x<displayWidth*2)

	drawSprites();
}

//functions for level 0-------------------------------------------------------------------------------------------------------------------------->

//reset function for level 0------------------------------------------------------------------------------------------>
function reset() {
	tries = tries - 1
	missedGoals = missedGoals + 1
	countDown = 3
	msCount = 3
	goalPostTouching = 0

	football.x = (displayWidth - displayWidth / 3) / 2
	football.y = displayHeight / 1.6
	character.x = (displayWidth - displayWidth / 3) / 2
	character.y = displayHeight / 2


	character.changeImage("gK", goalKeeperImg)
	character.velocityY = 0
	character.velocityX = 0
	football.scale = 1
	character.setCollider("rectangle", 0, 0, 70, 130);

	rand()
}

//reset on scoring goals (level 0)------------------------------------------------------------------------------>
function wReset() {
	tries = tries - 1
	savedGoals = savedGoals + 1
	points++
	countDown = 3
	msCount = 3

	football.x = (displayWidth - displayWidth / 3) / 2
	football.y = displayHeight / 1.6
	character.x = (displayWidth - displayWidth / 3) / 2
	character.y = displayHeight / 2


	character.changeImage("gK", goalKeeperImg)
	character.velocityY = 0
	character.velocityX = 0
	football.scale = 1
	character.setCollider("rectangle", 0, 0, 70, 130);

	rand()
}

function disqualified() {
	tries = 5
	savedGoals = 0
	missedGoals = 0
}

function rand() {
	x = random(15, -15)
	y = random(-10, -2)
}

function incInSpeed() {
	speedInc = 10
	if (ifSpeedInc < 3) {
		ifSpeedInc = ifSpeedInc + 1
	}
}
//!!functions for level 0--------------------------------------------------------------------------------------------------------------------------!>

//functions for level 1------------------------------------------------------------------------------------------------------------------------>

function spawnObstacles1() {
	if (character.x < displayWidth*2){
		if (frameCount % 30 === 0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
			obstacle.velocityX = random(-4, -8);
	
			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)
	
			//assign scale and lifetime to the obstacle           
			obstacle.scale = 0.17;
			//add each obstacle to the group
	        obstaclesGroup.add(obstacle);
		}
	}else{
		if (frameCount % 20 ===0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
		    obstacle.velocityX = random(-4, -12);

		    obstacle.addImage("o", obstacle1)
		    obstacle.setCollider("rectangle", 0, 0, 10, 17)

		    //assign scale           
			obstacle.scale = 0.17;
		    obstaclesGroup.add(obstacle);
		}
	}
}

function spawnObstacles2() {
	if (character.x < displayWidth*2){
		if (frameCount % 30 === 0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
			obstacle.velocityX = random(-4, -8);
	
			obstacle.addImage("o", obstacle1)
			obstacle.setCollider("rectangle", 0, 0, 10, 17)
	
			//assign scale and lifetime to the obstacle           
			obstacle.scale = 0.17;
			//add each obstacle to the group
	        obstaclesGroup.add(obstacle);
		}
	}else{
		if (frameCount % 20 ===0) {
			var obstacle = createSprite(character.x + 420, random(160, displayHeight / 1.5 + 10), 10, 40);
		    obstacle.velocityX = random(-4, -15);

		    obstacle.addImage("o", obstacle1)
		    obstacle.setCollider("rectangle", 0, 0, 10, 17)

		    //assign scale           
			obstacle.scale = 0.17;
		    obstaclesGroup.add(obstacle);
		}
	}
}

function gameOver() {
	character.velocityX = 0
	character.velocityY = 0
	obstaclesGroup.setVelocityEach(0, 0)
	fill("Red")
	textSize(40)
	text("Game Over! The Sharks Ate YOU!!!", character.x - 300, character.y)
	character.changeImage("st")
	Visibility = Visibility - 35
	tint(255, Visibility)
	if (Visibility < 255) {
		blood.visible = true
		blood.x = character.x
		blood.y = character.y
	}
	check += 1
}