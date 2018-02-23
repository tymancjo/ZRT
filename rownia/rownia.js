/* Those objects require p5.js to work*/

class rownia {

    constructor(angle, len) {
        // constructor fuuntction
        this.a = radians(angle);
        this.s = len;
        this.setup();
    }

    setup() {
        // calculation of internal params
        this.w = this.s * Math.cos(this.a);
        this.h = this.s * Math.sin(this.a);
    }

    angle(a){
    	this.a = radians(a);
    	this.setup();
    }

    shape(xmin, ymin, xmax, ymax) {
        // triangle shape drawing function
        // figuring out the scale for drawing
        let xscale = (xmax - xmin) / this.w;
        let yscale = (ymax - ymin) / this.h;

        this.scale = Math.min(xscale, yscale);
    	
    	triangle(xmax, ymax,
    			xmax, ymax - this.scale * this.h, 
    			xmax - this.scale * this.w, ymax);

    	this.x = xmax - this.scale * this.w;
    	this.y = ymax;

    }

    drawAtPos(pos){
    	//returning the xy coordinates of body at given position 
    	if((pos >= 0) && (pos <= this.s)){

    		let r = this.s - pos;
    		let x = this.x + Math.cos(this.a) * r * this.scale;
    		let y = this.y - Math.sin(this.a) * r * this.scale;

    		return {x: x, y: y, a: this.a};
    	} else {
    		return false;
    	}

    }

    getF(F){
    	// returns a forces compomponent on the slope
    	return {
    		Fa: Math.sin(this.a) * F,
    		Fn: Math.cos(this.a) * F
    	};
    }
}