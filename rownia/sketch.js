function setup() {
	createCanvas(600, 400);
	angle = 0;
	theX = 0;

	createP('object mass:');
		m = createSlider(1, 100, 10);
	createP('friction coeff:');
		mi = createSlider(0, 100, 20);
	createP('dzetta coeff:');
		dz = createSlider(0, 1000, 0);
	createP('slope angle:');
		a = createSlider(1, 89, 45);

	r = new rownia(45, 1);

	b = new body(0.1);
}

function draw() {
	background(100);
	noStroke();
	fill(200);
	dt = getFrameRate();
	if (dt){
		dt = 1/dt;
	} else {
		dt = 0;
	}

	text('mass: ' + b.m + ' kg', 10, 10 + 10);
	text('mi: ' + b.mi + '', 10, 25 + 10);
	text('dz: ' + b.dz + ' kg/s', 10, 40 + 10);
	text('alpha: ' + a.value() + ' deg', 10, 55 + 10);

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
			fill(150);
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