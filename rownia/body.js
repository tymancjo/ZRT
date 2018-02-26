
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
		// just the gravity force component forward
		let F = rownia.getF(mg).Fa; 

		// Friction force calc ulations
		// It can max be equal to front froce Fa
		let Ft = Math.min(rownia.getF(mg).Fn * this.mi, F);


		F -= Ft;
		
		// Magnetic Drag Force
		F -= this.v * this.dz;


		this.a = F / this.m;
		this.v += this.a * dt;
		this.pos += this.v * dt;
	}

	reset(){
		// reset motion params
		this.a = 0;
		this.v = 0;
		this.pos = 0;
	}


}