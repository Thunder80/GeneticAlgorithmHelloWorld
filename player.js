class Player{
	size = 5;
	dead = false;
	fitness = 0;
	reached = false;
	constructor(pos, vel, acc, goal){
		this.pos = pos;
		this.vel = vel;
		this.acc = acc;
		this.goal = goal;
		this.brain = new Brain(1000);
	}

	show(){
		ellipse(this.pos.x, this.pos.y, this.size);
	}

	update() {
		if(this.brain.steps < 1000 && !this.dead)
		{
			this.acc = this.brain.instructions[this.brain.steps];
			this.brain.steps++;
		}
		else
		{
			this.dead = true;
		}
		this.vel.add(this.acc);
		this.vel.limit(5);
		this.pos.add(this.vel);
		this.isColliding();

		if(dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y) <= 7.5)
		{
			this.reached = true;
		}
		if(this.dead || this.reached)
			this.calculateFitness();
	}

	calculateFitness(){
		var dis = dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y);
		if(!this.reached)
			this.fitness = 1 / (dis*dis);
		else
			this.fitness = 1; 
	}

	clone(){
		var pos = createVector(width/2, height-30);
		var vel = createVector(0, 0);
		var acc = createVector(0, 0);
		var clonePlayer = new Player(pos, vel, acc, goal);
		for(var i = 0;i < clonePlayer.brain.instructions.length;i++)
		{
			clonePlayer.brain.instructions[i] = this.brain.instructions[i];
		}

		return clonePlayer;
	}

	isColliding()
	{
		for(var i = 0;i < obstacles.length;i++)
		{
			if(Math.abs(dist(this.pos.x, this.pos.y, obstacles[i][0]+8, obstacles[i][1]+8)) < 10.5)
			{
				this.dead = true;
				break;
			}
		}
		if(this.pos.x < 1 || this.pos.x > 640 || this.pos.y < 1 || this.pos.y > 480)
		{
			this.dead = true;
		}
	}
}
