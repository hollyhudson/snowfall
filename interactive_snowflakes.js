let flurry = [];
// hardcode these because I don't want to bother with reactivity
let canvasWidth;
let canvasHeight;
let direction = [-1, 1];


function setup() {
	canvasWidth = windowWidth;
	canvasHeight = windowHeight;
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(133, 138, 248);
	noStroke();
	
	// add snowflakes at random times
	if (random() < 0.05) {
		let rotation_dir = random(direction);

		flurry.push(new Snowflake(
						random(50, canvasWidth - 50),
						6,
						random(0.5, 1.5),
						rotation_dir,	
					));
	}

	// clear snowflakes that have fallen below the window
	// display the rest
	for (let i = 0; i < flurry.length; i++) {
		if (flurry[i].ypos > canvasHeight) { 
			flurry.splice(i, 1);	
		} else {
			flurry[i].display();
		}
	}
}
