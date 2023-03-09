PeterPan = "";
HarryPotter = "";
rightWristX=0;
leftWristX =0;
rightWristY=0;
leftWristY =0;
song_peterpan = "";
scoreLeftWrist = 0;


function preload(){
    PeterPan = loadSound("music2.mp3");
    HarryPotter = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = "+leftWristX+", leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = "+rightWristX+", RightWristY = "+rightWristY);
    }
}

function modelLoaded(){
    console.log("Posenet has initialised!");
}

function draw(){
    image(video,0,0,500,400);
    fill("#FF0000");
    stroke("#FF0000");

    song_peterpan = PeterPan.isPlaying();
    console.log(PeterPan);

    if(scoreLeftWrist > 0.2){
        cirlcle(leftWristX, leftWristY, 20);
        HarryPotter.stop();
        if(song_peterpan == false){
            PeterPan.play();
        }
        else{
            document.getElementById("song").innerHTML = "Song name : Peter Pan ";
        }
    }
}