function setup() {
	// creating the canvas space
	canvas = createCanvas(600, 400);
	canvas.parent('canvas');
	
		// control sliders binded to the existing html elements
		m = createSlider(1, 100, 10);
			m.parent('mass');
		mi = createSlider(0, 100, 20);
			mi.parent('mi');
		dz = createSlider(0, 1000, 0);
			dz.parent('dz');
		a = createSlider(0, 90, 45);
			a.parent('a');

	// creating the main actors
	r = new rownia(45, 1);
	b = new body(0.1);

	// the position variable - handy for drawing
	theX = 0;
}

function draw() {
	background('#2E70A2');

	noStroke();
	dt = getFrameRate();
	if (dt){
		dt = 1/dt;
	} else {
		dt = 0;
	}

	fill(255);
	text('mass: ' + b.m + ' kg', 10, 10 + 10);
	text('mi: ' + b.mi + '', 10, 25 + 10);
	text('dz: ' + b.dz + ' kg/s', 10, 40 + 10);
	text('alpha: ' + a.value() + ' deg', 10, 55 + 10);
	text('slope length: ' + r.s + ' m', 10, 70 + 10);
	text('vel: ' + Math.round(1000 * b.v)/1000 + ' m/s', 10, 85 + 10);

	fill(200);
	r.angle(a.value());
	r.shape(10,10,width-10,height-10);

	b.setup(m.value()/100, mi.value()/100.0, dz.value()/100.0);

	b.update(dt, r);
	if (b.pos > r.s){
		b.reset();
	}

	objPos = r.drawAtPos(b.pos);

	if(objPos){
		push();
			translate(objPos.x, objPos.y);
			fill(255);
			rotate(-objPos.a);
			translate(0,-10);
			rectMode(CENTER);
			rect(0,0,20,20);
		pop();
	}


	theX += r.s * 0.01;
	if (theX > r.s) {
		theX = 0;
	}



}