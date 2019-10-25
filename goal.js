class Goal{
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height =height;
	}

	show(){
		fill(255, 0, 0);
		ellipse(this.x, this.y, this.width, this.height);
	}
}
