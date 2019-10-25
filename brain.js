class Brain{
	steps = 0;
	instructions = [];
	constructor(size){
		this.size = size;
		for(var i = 0;i < size;i++)
		{
			this.instructions.push(p5.Vector.random2D());
		}
	}

	mutate(){
		var mutateRate = 0.01;
		for(var i = 0;i < this.size;i++)
		{
			var rand = random(0, 1);
			if(rand <= mutateRate)
			{
				this.instructions[i] = random(p5.Vector.random2D());
			}
		}
	}
}
