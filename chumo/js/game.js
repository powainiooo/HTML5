var stage,startlayer,gamelayer,endlayer,gamebg,opealayer,swordlayer,player,person,cksign,light,music;

var imglist = {};
var imgData = new Array(
    {name:"gamebg",path:imgsrc+"./images/bg.jpg"},
    {name:"icon",path:imgsrc+"./images/icon.png"},
    {name:"lighting",path:imgsrc+"./images/lighting.png"},
    {name:"ad",path:imgsrc+"./images/ad.png"},
    {name:"start",path:imgsrc+"./images/start.png"},
    {name:"hitperson",path:imgsrc+"./music/hitperson.mp3",type:"sound"},
    {name:"hitplayer",path:imgsrc+"./music/hitplayer.mp3",type:"sound"},
    {name:"pass",path:imgsrc+"./music/pass.wav",type:"sound"},
    {name:"startbg",path:imgsrc+"./music/startbg.mp3",type:"sound"}
)

var gameData = {}
function resetgameData(){
    gameData.checkPoint = 1;
    gameData.personLife = [10,12,15,20,25];
    gameData.playerLife = [20,12,10,7,5];
    gameData.fallSpeed = [2,1.8,1.6,1.3,1];
    gameData.ckArr = ["第一关","第二关","第三关","第四关","第五关"];
    gameData.endTxt = ["在除妖降魔中，我还入门就挂掉了，你要来试试不","在除妖降魔中，我是入门弟子，看看你会到什么等级。","在除妖降魔中，我是入室弟子，看看你会到什么等级。","在除妖降魔中，我成为了长老，看看你会到什么等级。","在除妖降魔中，我成为蜀山掌门，看看你会到什么等级。"]
}

function main(){
    //全屏操作
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);

    gamebg = new LSprite();
    addChild(gamebg);

    //添加舞台
    stage = new LSprite();
    addChild(stage);

    //添加加载层
    var loadinglayer = new LoadingSample1();
    stage.addChild(loadinglayer);
    LLoadManage.load(
        imgData,
        function(progress){
            loadinglayer.setProgress(progress);
        },
        function(result){
            imglist = result;
            stage.removeChild(loadinglayer);
            loadinglayer = null;
			document.getElementById("loading").style.display = "none";

            //背景图片
            gamebg.pic = new LBitmap(new LBitmapData(imglist["gamebg"]));
            gamebg.addChild(gamebg.pic);

            resetgameData();
            light = new Lighting();
            stage.addChild(light);

            startbg = new LSound();
            startbg.load(imglist["startbg"]);
            hitperson = new LSound();
            hitperson.load(imglist["hitperson"]);
            hitplayer = new LSound();
            hitplayer.load(imglist["hitplayer"]);
            pass = new LSound();
            pass.load(imglist["pass"]);

            startbg.play(0,10);
//            music = new Music();
//            addChild(music);
            startInit();
        }
    );
}
function startInit(){
    startlayer = new LSprite();
    stage.addChild(startlayer);
    startlayer.graphics.drawRect(0,"#FFF",[0,0,640,960],true,"rgba(0,0,0,0.5)");

    startlayer.pic = new LBitmap(new LBitmapData(imglist["start"]));
    startlayer.pic.y = 280;
    startlayer.addChild(startlayer.pic);

    startlayer.bt = new LSprite();
    startlayer.bt.pic = new LBitmap(new LBitmapData(imglist["icon"],869,1499,128,132));
    startlayer.bt.addChild(startlayer.bt.pic);
    startlayer.bt.x = 256;
    startlayer.bt.y = 600;
    startlayer.addChild(startlayer.bt);

    startlayer.bt.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        startlayer.visible = false;
        gameInit();
        light.shy();
        startbg.stop();
    })
}


function gameInit(){

    gamelayer = new LSprite();
    stage.addChild(gamelayer);

    cksign = new LSprite();
    cksign.x = 30;
    cksign.y = 10;
    stage.addChild(cksign);
    cksign.pic = new LBitmap(new LBitmapData(imglist["icon"],728,2215,144,54));
    cksign.addChild(cksign.pic);
    cksign.txt = new LTextField();
    cksign.txt.text = gameData.ckArr[gameData.checkPoint-1];
    cksign.txt.size = 30;
    cksign.txt.color = "#FFF";
    cksign.txt.x = 26;
    cksign.txt.y = 8;
    cksign.addChild(cksign.txt);
}

function newLevel(){
    cksign.txt.text = gameData.ckArr[gameData.checkPoint-1];

    opealayer = new LSprite();
    opealayer.graphics.drawRect(0,"rgba(0,0,0,0.5)",[0,0,640,140],true,"rgba(0,255,206,0.5)");
    opealayer.y = 510;
    gamelayer.addChild(opealayer);

    player = new Player();
    player.x = 320;
    player.y = 1460;
    gamelayer.addChild(player);
    LTweenLite.to(player,1,{y:960,ease:LEasing.None.easeIn});

    person = new Person();
    person.x = 320;
    person.y = 440;
    person.alpha = 0;
    gamelayer.addChild(person);
    LTweenLite.to(person,1,{alpha:1,ease:LEasing.None.easeIn,onComplete:function(){
        person.saystart();
    }});


    swordlayer = new LSprite();
    gamelayer.addChild(swordlayer);
}

function addSword(){
    var sword = new Sword();
    swordlayer.addChild(sword);
}


function nextLevel(){
    if(gameData.checkPoint == 5){
        gameOver();
    }else{
        gamelayer.removeAllChild();
        gameData.checkPoint++;
        light.shy();
    }
}



function gameOver(){
    //LGlobal.preventDefault = false;

    endlayer = new LSprite();
    stage.addChild(endlayer);
    endlayer.graphics.drawRect(0,"#FFF",[0,0,640,960],true,"rgba(0,0,0,0.5)");

    endlayer.frame = new LBitmap(new LBitmapData(imglist["icon"],306,1930,410,264));
    endlayer.frame.x = 115;
    endlayer.frame.y = 200;
    endlayer.addChild(endlayer.frame);

    //结束弹窗话语
    endlayer.txt = new LTextField();
    endlayer.txt.text = gameData.endTxt[gameData.checkPoint-1];
    endlayer.txt.size = 28;
    endlayer.txt.setWordWrap(true,40);
    endlayer.txt.color = "#FFF";
    endlayer.txt.font = "微软雅黑";
    endlayer.txt.width = 330;
    endlayer.txt.x = 155;
    endlayer.txt.y = 260;
    endlayer.addChild(endlayer.txt);

    //重玩按钮
    endlayer.replay = new LSprite();
    endlayer.replay.pic = new LBitmap(new LBitmapData(imglist["icon"],869,1499,128,132));
    endlayer.replay.addChild(endlayer.replay.pic);
    endlayer.replay.scaleX = 0.82;
    endlayer.replay.scaleY = 0.82;
    endlayer.replay.x = 115;
    endlayer.replay.y = 500;
    endlayer.addChild(endlayer.replay);
    endlayer.replay.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        stage.removeAllChild();
        resetgameData();
        gameInit();
        newLevel();
    })

    //抽奖按钮
    endlayer.raffle = new LSprite();
    endlayer.raffle.pic = new LBitmap(new LBitmapData(imglist["icon"],728,2290,106,110));
    endlayer.raffle.addChild(endlayer.raffle.pic);
    endlayer.raffle.x = 267;
    endlayer.raffle.y = 500;
    endlayer.addChild(endlayer.raffle);
    endlayer.raffle.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        window.location = raffleLink;
    })

    //分享按钮
    endlayer.share = new LSprite();
    endlayer.share.pic = new LBitmap(new LBitmapData(imglist["icon"],859,2290,106,110));
    endlayer.share.addChild(endlayer.share.pic);
    endlayer.share.x = 419;
    endlayer.share.y = 500;
    endlayer.addChild(endlayer.share);
    endlayer.share.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        $("#share").fadeIn(100);
    })

}

















