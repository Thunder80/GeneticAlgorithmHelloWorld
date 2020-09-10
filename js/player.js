class Player{
	size = 5;
	dead = false;
	fitness = 0;
	reached = false;
	goalsReached = [];
	actualDis = 0;
	checkGoals = true;
	constructor(pos, vel, acc, goal){
		this.pos = pos;
		this.vel = vel;
		this.acc = acc;
		this.currentGoal = goals[1];
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

	if(dist(this.pos.x, this.pos.y, goal.x, goal.y) <= 7.5)
	{
		this.reached = true;
		this.checkGoals = true;
	}
	if(this.dead || this.reached)
		this.calculateFitness();
	if(this.checkGoals)
		this.collectGoals();
}

calculateFitness(){
	//var currentDis = dist(this.pos.x, this.pos.y, this.currentGoal.x, this.currentGoal.y);
	this.actualDis = dist(this.pos.x, this.pos.y, goal.x, goal.y);
	if(!this.reached)
		this.fitness = 10 / (this.actualDis * this.actualDis) + this.goalsReached.length/120;
	else
		this.fitness = 30 + 1 / (this.brain.steps * this.brain.steps); 
	}

	clone(){
		var pos = createVector(width/2, height-30);
		var vel = createVector(0, 0);
		var acc = createVector(0, 0);
		var clonePlayer = new Player(pos, vel, acc, goal);
		clonePlayer.checkGoals = this.checkGoals;
		for(var i = 0;i < clonePlayer.brain.instructions.length;i++)
		{
			clonePlayer.brain.instructions[i] = this.brain.instructions[i];
		}

		return clonePlayer;
	}

	isColliding()
	{
		for(var i = 0;i < 40;i++)
		{
			for(let j = 0;j < 30;j++)
			{
				if(obstacles[j][i] == 1 && Math.abs(dist(this.pos.x, this.pos.y, i*16+8, j*16+8)) < 10.5)
				{
					this.dead = true;
					break;
				}
			}
		}
		if(this.pos.x < 1 || this.pos.x > 640 || this.pos.y < 1 || this.pos.y > 480)
		{
			this.dead = true;
		}
	}
	collectGoals()
	{
		for(var i = 0;i < goals.length;i++)
		{
			if(dist(goals[i].x, goals[i].y, this.pos.x, this.pos.y) <= 7.5 && !this.goalsReached.includes(i))
				this.goalsReached.push(i);
		}
	}
}
