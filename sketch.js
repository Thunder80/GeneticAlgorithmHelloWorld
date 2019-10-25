const width = 640, height = 480;
const backgroundColor = 0;

var population;
var player;
var goal;
var startButton, stopButton, resumeButton, editButton;
var start = false, stop = true, edit = false;
var obstacles = [];

function setup(){
	createCanvas(width, height);
	background(backgroundColor);
	goal = new Goal(width / 2, 10, 10, 10);
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
			population = new Population(100, goal);
			start = true;
			stop = false;
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
	for(var i = 0;i < obstacles.length;i++)
	{
		rect(obstacles[i][0], obstacles[i][1], 16, 16);
	}
	if(start)
	{
		if(population != null)
		population.update();
	}
	if(population != null)
		population.show();
	goal.show();
}

function mousePressed(){
	if(edit)
	{
		var x = Math.floor((mouseX)/16)*16;
		var y = Math.floor((mouseY)/16)*16;
		if(!((x == 304 && y == 0) || (x == 320 && y == 0) || (x == 304 && y == 432) || (x == 320 && y == 432)))
			obstacles.push([x, y]);
	}
}
