class Population{
	player = [];
	fitnessSum = 0;
	gen = 0;
	best = 0;
	bestDistance = 0;
	minSteps = 1000;
	constructor(n, goal){
		this.n = n;
		for(var i = 0;i < n;i++)
		{
			var pos = createVector(width/2, height+10);
			var vel = createVector();
			var acc = createVector();
			this.player.push(new Player(pos, vel, acc, goal));
		}
	}

	show(){
		fill(255);
		for(var i = 2;i < this.n;i++)
		{
			this.player[i].show();
		}
		fill(0, 255, 0);
		this.player[0].show();
		fill(255, 255, 0);
		this.player[1].show();
		textSize(16);
		text("Gen-"+this.gen, 0, 15);
		// for(var i = 0;i < 2;i++)
		// 	rect(this.dummyGoals[i].x, this.dummyGoals[i].y, 10, 10);
		//text("Fitness-" + (this.player[this.pos].fitness*10000).toFixed(2), 0, 30);
	}

	update(){
		for(var i = 0;i < this.n;i++)
		{
			if(this.player[i].brain.steps > this.minSteps)
			{
				this.player[i].dead = true;
				this.player[i].calculateFitness();
			}
			if(!this.player[i].dead && !this.player[i].reached)
				this.player[i].update();
		}

		if(this.allDead())
		{
			this.selectGeneration();
			this.gen++;
		}
	}

	allDead(){
		for(var i = 0;i < this.n;i++)
		{
			if(!this.player[i].dead && !this.player[i].reached)
				return false;
		}

		return true;
	}

	selectGeneration(){
		this.calculateFitnessSum();
		this.getBestPlayer();
		var newGeneration = [];
		newGeneration[0] = this.player[this.best].clone();
		newGeneration[1] = this.player[this.bestDistance].clone();
		this.player[this.bestDistance].fitness = this.player[this.best].fitness;
		for(var i = 2;i < this.n;i++)
		{
			newGeneration.push(this.getParent().clone());
			newGeneration[i].brain.mutate();
		}
		this.player = newGeneration;
	}

	getParent(){
		var rand = random(this.fitnessSum);
		var curSum = 0;
		for(var i = 0;i < this.n;i++)
		{
			curSum += this.player[i].fitness;
			if(curSum > rand)
				return this.player[i];
		}
		return null;
	}
	
	calculateFitnessSum(){
		this.fitnessSum = 0;
		for(var i = 0;i < this.n;i++)
		{
			this.fitnessSum += this.player[i].fitness;
		}
	}

	getBestPlayer(){
		for(var i = 1;i < this.n;i++)
		{
			if(this.player[this.best].fitness < this.player[i].fitness)
				this.best = i;
			if(this.player[this.bestDistance].actualDis > this.player[i].actualDis)
				this.bestDistance = i;
		}
		console.log(this.player[this.bestDistance].actualDis);
		if(this.player[this.best].reached)
			this.minSteps = this.player[this.best].brain.steps;
	}
	
}
