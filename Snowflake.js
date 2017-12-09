function Snowflake(x, num_splines, scale_size, rotation_dir) {
	this.xpos = x; 	// where across the top of the screen to appear
	this.num_splines = num_splines;
	this.scale_size = scale_size;
	this.rotation_dir = rotation_dir;
	this.ypos = 0;

	let fall_speed = random(2, 6);
	let rotation_rate = 0; 		
	let rotation_state = 0;
	let max_rot_speed = 0.05;

	// settings for the little balls that decorate the splines
	let radius1 = random(5, 20);
	let radius2 = random(5, 20);
	let radius3 = random(5, 20);

	// how far down the spline each ball appears
	let pos1 = random(-25, 55);
	let pos2 = random(-25, 55);
	let pos3 = random(-25, 55);

	this.display = function() {
		push();	// work from the origin of this one snowflake
		fill('rgba(255, 255, 255, 0.8)');
		
		// move to the first spline position
		translate(this.xpos, this.ypos);
		// fall a little with each display call
		this.ypos += fall_speed;	

		// adjust rotation rate in relation to how close the mouse is
		let x_distance = mouseX - this.xpos;
		let y_distance = mouseY - this.ypos;
		let radial = sqrt(x_distance * x_distance + y_distance * y_distance);
		this.spin(radial);

		// impart spin to the snowflake
		rotate(rotation_state += rotation_rate);	

		// scale the snowflake before actually drawing it
		scale(scale_size);

		// finally draw the snowflake
		for (let i = 0; i < num_splines; i++) {
			rect(-1, -10, 1, 55); 	// the stem part of each spline
			// decorations for each spline	
			ellipse(0, pos1, radius1, radius1); 
			ellipse(0, pos2, radius2, radius2);
			ellipse(0, pos3, radius3, radius3);
			// rotate in preparation to draw the next spline
			rotate(2*PI/num_splines)
		}

		pop(); 	// return to the canvas origin

		rotation_rate *= 0.97; 	// exponential decay
	}

	// rotate snowflake, speed up, and don't slow down until mouse is gone
	this.spin = function(distance) {
		if (distance < 100) { 	// if we're close
			if (abs(rotation_rate < max_rot_speed)) { // and rot is < max speed
				// speed up the rotation
				rotation_rate += max_rot_speed * rotation_dir;
			}
		}
	}
}
