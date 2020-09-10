const width = 640, height = 480;
const backgroundColor = 0;

var population;
var player;
var goal;
var startButton, stopButton, resumeButton, editButton;
var start = false, stop = true, edit = false;
var maxLevel = 30;
var obstacles = [];
var goals = [];
var setGoals = 0;

function setup(){
	createCanvas(width, height);
	background(backgroundColor);
	goal = new Goal(width / 2, 10, 10);
	goals.push(goal);
	for(let i = 0;i < height/16;i++)
	{
		var temp = [];
		for(let j = 0;j < width/16;j++)
		{	
			temp.push(0);
		}
		obstacles.push(temp);
	}

	startButton = createButton("Start");
	stopButton = createButton("Stop");
	resumeButton = createButton("Resume");
	editButton = createButton("Edit");

	startButton.position(8, 490);
	resumeButton.position(280, 490);
	stopButton.position(605, 490);
	editButton.position(605, 550);
	startButton.mousePressed(()=>{
		if(!edit)
		{	
			population = new Population(200, goal);
			start = true;
			stop = false;
		}

		/*for(var j = 0;j < 40;j++)
		{
			for(var i = 0;i < 30;i++)
			{
				if(obstacles[i][j] == 1 && i != 0 && obstacles[i-1][j] != 1)
				{	
					goals.push(new Goal(j*16+8, (i-1)*16+8, 10));
					console.log(goals[1].x, goals[1].y);
				}
			}
		}
		for(var i = 0;i < 30;i++)
		{
			for(var j = 0;j < 40;j++)
			{
				if(obstacles[i][j] == 1 && j != 0 && obstacles[i][j-1] != 1)
				{	
					goals.push(new Goal((j-1)*16+8, i*16+8, 10));
				}
			}
		}*/

		if(setGoals >= 10)
		{
			for(var j = 0;j < obstacles[0].length;j++)
			{
				for(var i = 0;i < obstacles.length;i++)
				{
					if(obstacles[i][j] != 1)
					{	
						goals.push(new Goal(j*16+8, i*16+8, 10));
					}
				}
			}
		}
	});
	stopButton.mousePressed(()=>{
		stop = true;
		start = false;
	});
	resumeButton.mousePressed(()=>{
		if(!edit)
		{
			start = true;
			stop = false;
		}
	});
	editButton.mousePressed(()=>{
		if(!start)
		{
			if(edit)
				edit = false;
			else
			{
				edit = true;
				population = null;
			}
		}
	});
}

function draw() {
	background(backgroundColor);
	if(edit)
	{
		textSize(16);
		fill(255);
		text("Edit Mode On", 0, 15);
		if(mouseX <= 640 && mouseY <= 480)
		{
			rect((Math.floor(mouseX/16)) * 16, (Math.floor(mouseY/16)) * 16, 16, 16);
		}
	}
	fill(0, 255, 0)
	for(var j = 0;j < obstacles.length;j++)
	{
		for(var i = 0;i < obstacles[0].length;i++)
		{
			if(obstacles[j][i] == 1)
				rect(i*16, j*16, 16, 16);
		}
	}
	if(start)
	{
		if(population != null)
			population.update();
	}
	if(population != null)
		population.show();
	goal.show();
	//fill(0, 0, 255);
	/*for(var i = 0;i < goals.length;i++)
	{
		ellipse(goals[i].x, goals[i].y, goals[i].size);
	}*/
}

function mousePressed(){
	if(edit && mouseX <= 640 && mouseY <= 480)
	{
		var x = Math.floor((mouseX)/16);
		var y = Math.floor((mouseY)/16);
		for(var i = 0;i < goals.length;i++)
		{
			if((goals[i].x-8) / 16 == x && (goals[i].y - 8) / 16 == y)
			{
				goals.splice(i, 1);
				i--;
			}

		}
		if(!((x == 19 && y == 0) || (x == 20 && y == 0) || (x == 19 && y == 27) || (x == 20 && y == 432)))
		{
			setGoals++;
			obstacles[y][x] = 1;
		}

		if(y < maxLevel)
			maxLevel = y;
	}
}
