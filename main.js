song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftsong = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
   song2 = loadSound("Harry Potter Theme.mp3");
   song1 = loadSound("Dynamite - BTS.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);                                                                                                                            
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotPoses);
}

function modalLoaded()
{
    console.log("poseNet modal Initialized");
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWristY = "+scoreLeftWrist+"ScoreRightWristY = "+scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = ", leftWristX, "leftWristY = ", leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = ", rightWristX, "rightWristY = ", rightWristY);

    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
    { 
        circle(leftWristX, leftWristY,20); 
        song1.stop();  
        song2.play();
        document.getElementById("songname").innerHTML = "Song = Harry potter";
        
     }

     else if(scoreRightWrist > 0.2)
    { 
        circle(leftWristX, leftWristY,20); 
        song2.stop();  
        song1.play();
        document.getElementById("songname").innerHTML = "Song = Dynamite";
        
    }

}

