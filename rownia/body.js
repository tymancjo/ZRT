
class body{
	constructor(m=0.1,mi=0.2,dz=0){
		this.m = m;
		this.mi = mi;
		this.dz = dz;

		this.a = 0;
		this.v = 0;
		this.pos = 0;

		this.g = 9.81;
	}

	setup(m,mi,dz){
		this.m = m;
		this.mi = mi;
		this.dz = dz;
	}

	update(dt, rownia){
		// main motion equations
		let mg = this.m * this.g;
		let F = rownia.getF(mg).Fa - this.v * this.dz;

		// if(rownia.getF(mg).Fa > 0){
		// 	F -=  rownia.getF(mg).Fn * this.mi 
		// }

		if(this.v > 0){
			F -=  rownia.getF(mg).Fn * this.mi;
		}

		// if ((F < 0) && (this.v = 0) ) {F = 0;}

		this.a = F / this.m;
		this.v += this.a * dt;
		if(this.v < 0) {this.v = 0;}
		this.pos += this.v * dt;
	}

	reset(){
		// reset motion params
		this.a = 0;
		this.v = 0;
		this.pos = 0;
	}


}