//掉落宝剑
function Sword(){
    base(this,LSprite,[]);
    var self = this;
//    self.graphics.drawRect(0,"#000",[-40,-59,80,118]);
    self.twen = null;

    //完整剑
    self.normal = new LBitmap(new LBitmapData(imglist["icon"],915,1664,44,118));
    self.normal.x = -22;
    self.normal.y = -59;
    self.addChild(self.normal);

    self.setPos();
    self.twen = LTweenLite.to(self,gameData.fallSpeed[gameData.checkPoint-1],{x:320,y:700,ease:LEasing.Sine.easeIn,onComplete:function(){
        self.normal.visible = false;
//        self.broke.visible = true;
        player.shake();
        player.life.reduce();
        hitplayer.play();
        if(player.life.nowlife == 0){
            person.sayend();
        }else{
            addSword();
        }
    }});

    self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        if(self.y>510 && self.y<650){
            LTweenLite.remove(self.twen);
            self.setPos2();
            if(person.life.nowlife > 1){
                addSword();
                hitperson.play();
            }else{
                LTweenLite.to(player,1,{y:1460,ease:LEasing.None.easeIn});
                LTweenLite.to(person,1,{alpha:0,ease:LEasing.None.easeIn});
                pass.play();
                setTimeout(nextLevel,2000);
            }
            LTweenLite.to(self,0.2,{x:320,y:300,ease:LEasing.None.easeIn,onComplete:function(){
                self.normal.visible = false;
//                self.broke.visible = true;
                player.hitsuccess();
                person.shake();
                person.life.reduce();
            }});
        }
    })
}
Sword.prototype.setPos = function(){
    var self = this;
    self.x = Math.floor(50+Math.random()*550);
    self.y = -50;
    if(self.x>320){
        self.rotate = 90-(Math.atan(850/Math.abs(self.x-320))/(Math.PI/180));
    }else{
        self.rotate = -(90-(Math.atan(850/Math.abs(self.x-320))/(Math.PI/180)));
    }
}
Sword.prototype.setPos2 = function(){
    var self = this;
    if(self.x>320){
        self.rotate = -(Math.atan(Math.abs(self.x-320)/Math.abs(self.y - 300))/(Math.PI/180))-180;
    }else{
        self.rotate = Math.atan(Math.abs(self.x-320)/Math.abs(self.y - 300))/(Math.PI/180)+180;
    }
}


//玩家
function Player() {
    base(this,LSprite,[]);
    var self = this;
    self.shakedis = 20;
    self.shaket = 0.05;

    self.setView();

    self.life = new Lifeline(gameData.playerLife[gameData.checkPoint-1],1);
    self.life.x = -self.life.getWidth()/2;
    self.life.y = -340;
    self.addChild(self.life);
}
Player.prototype.setView = function(){
    var self = this;
    if(gameData.checkPoint == 1){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],0,0,204,318));
        self.addChild(self.normal);
        self.success = new LBitmap(new LBitmapData(imglist["icon"],224,0,248,318));
        self.addChild(self.success);
        self.hit = new LBitmap(new LBitmapData(imglist["icon"],493,0,366,318));
        self.addChild(self.hit);

        self.normal.x = -self.normal.getWidth()/2;
        self.normal.y = -self.normal.getHeight();

        self.success.x = -self.success.getWidth()/2;
        self.success.y = -self.success.getHeight();

        self.hit.x = -self.hit.getWidth()/2-5;
        self.hit.y = -self.hit.getHeight();
    }else if(gameData.checkPoint == 2){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],0,338,293,318));
        self.addChild(self.normal);
        self.success = new LBitmap(new LBitmapData(imglist["icon"],298,318,314,338));
        self.addChild(self.success);
        self.hit = new LBitmap(new LBitmapData(imglist["icon"],612,359,249,296));
        self.addChild(self.hit);

        self.normal.x = -self.normal.getWidth()/2+34;
        self.normal.y = -self.normal.getHeight();

        self.success.x = -self.success.getWidth()/2+4;
        self.success.y = -self.success.getHeight();

        self.hit.x = -self.hit.getWidth()/2;
        self.hit.y = -self.hit.getHeight();
    }else if(gameData.checkPoint == 3){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],0,673,293,318));
        self.addChild(self.normal);
        self.success = new LBitmap(new LBitmapData(imglist["icon"],298,655,314,336));
        self.addChild(self.success);
        self.hit = new LBitmap(new LBitmapData(imglist["icon"],612,694,249,296));
        self.addChild(self.hit);

        self.normal.x = -self.normal.getWidth()/2+34;
        self.normal.y = -self.normal.getHeight();

        self.success.x = -self.success.getWidth()/2+4;
        self.success.y = -self.success.getHeight();

        self.hit.x = -self.hit.getWidth()/2;
        self.hit.y = -self.hit.getHeight();
    }else if(gameData.checkPoint == 4){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],0,990,301,323));
        self.addChild(self.normal);
        self.success = new LBitmap(new LBitmapData(imglist["icon"],316,990,354,322));
        self.addChild(self.success);
        self.hit = new LBitmap(new LBitmapData(imglist["icon"],0,990,301,323));
        self.addChild(self.hit);

        self.normal.x = -self.normal.getWidth()/2;
        self.normal.y = -self.normal.getHeight();

        self.success.x = -self.success.getWidth()/2+26;
        self.success.y = -self.success.getHeight();

        self.hit.x = -self.hit.getWidth()/2;
        self.hit.y = -self.hit.getHeight();
    }else if(gameData.checkPoint == 5){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],0,1314,268,321));
        self.addChild(self.normal);
        self.success = new LBitmap(new LBitmapData(imglist["icon"],293,1314,268,321));
        self.addChild(self.success);
        self.hit = new LBitmap(new LBitmapData(imglist["icon"],0,1314,268,321));
        self.addChild(self.hit);

        self.normal.x = -self.normal.getWidth()/2;
        self.normal.y = -self.normal.getHeight();

        self.success.x = -self.success.getWidth()/2;
        self.success.y = -self.success.getHeight();

        self.hit.x = -self.hit.getWidth()/2;
        self.hit.y = -self.hit.getHeight();
    }
    self.success.visible = false;
    self.hit.visible = false;
}
Player.prototype.shake = function(){
    var self = this;
    self.normal.visible = false;
    self.hit.visible = true;
    var thisx = self.hit.x;
    LTweenLite.to(self.hit,self.shaket,{x:thisx-self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,2*self.shaket,{x:thisx+self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,2*self.shaket,{x:thisx-self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,2*self.shaket,{x:thisx+self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,self.shaket,{x:thisx,ease:LEasing.None.easeIn,onComplete:function(){
        self.hit.visible = false;
        self.normal.visible = true;
    }});
}
Player.prototype.hitsuccess = function(){
    var self = this;
    self.normal.visible = false;
    self.success.visible = true;
    setTimeout(function(){
        self.success.visible = false;
        self.normal.visible = true;
    },450);
}

//怪物
function Person(){
    base(this,LSprite,[]);
    var self = this;

    self.shakedis = 20;
    self.shaket = 0.05;

    self.setView();

    self.life = new Lifeline(gameData.personLife[gameData.checkPoint-1],2);
    self.life.x = -self.life.getWidth()/2;
    self.life.y = -340;
    self.addChild(self.life);

    self.writeword();
}
Person.prototype.setView = function(){
    var self = this;

    if(gameData.checkPoint == 1){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],709,1082,240,232));
        self.normal.x = -self.normal.getWidth()/2+20;
        self.normal.y = -self.normal.getHeight();

        self.hit = new LBitmap(new LBitmapData(imglist["icon"],629,1388,230,248));
        self.hit.x = -self.hit.getWidth()/2+20;
        self.hit.y = -self.hit.getHeight()+15;
        self.hit.visible = false;
    }else if(gameData.checkPoint == 2){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],269,1635,268,290));
        self.normal.x = -self.normal.getWidth()/2;
        self.normal.y = -self.normal.getHeight();

        self.hit = new LBitmap(new LBitmapData(imglist["icon"],0,1635,268,290));
        self.hit.x = -self.hit.getWidth()/2;
        self.hit.y = -self.hit.getHeight();
        self.hit.visible = false;
    }else if(gameData.checkPoint == 3){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],564,1652,296,262));
        self.normal.x = -self.normal.getWidth()/2;
        self.normal.y = -self.normal.getHeight();

        self.hit = new LBitmap(new LBitmapData(imglist["icon"],0,1925,298,273));
        self.hit.x = -self.hit.getWidth()/2;
        self.hit.y = -self.hit.getHeight()+10;
        self.hit.visible = false;
    }else if(gameData.checkPoint == 4){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],0,2198,348,351));
        self.normal.x = -self.normal.getWidth()/2+10;
        self.normal.y = -self.normal.getHeight();

        self.hit = new LBitmap(new LBitmapData(imglist["icon"],363,2198,348,351));
        self.hit.x = -self.hit.getWidth()/2+10;
        self.hit.y = -self.hit.getHeight();
        self.hit.visible = false;
    }else if(gameData.checkPoint == 5){
        self.normal = new LBitmap(new LBitmapData(imglist["icon"],0,2549,328,340));
        self.normal.x = -self.normal.getWidth()/2-30;
        self.normal.y = -self.normal.getHeight();

        self.hit = new LBitmap(new LBitmapData(imglist["icon"],328,2549,328,340));
        self.hit.x = -self.hit.getWidth()/2-30;
        self.hit.y = -self.hit.getHeight();
        self.hit.visible = false;
    }
    self.addChild(self.normal);
    self.addChild(self.hit);
}
Person.prototype.shake = function(){
    var self = this;
    self.normal.visible = false;
    self.hit.visible = true;
    var thisx = self.hit.x;
    LTweenLite.to(self.hit,self.shaket,{x:thisx-self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,2*self.shaket,{x:thisx+self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,2*self.shaket,{x:thisx-self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,2*self.shaket,{x:thisx+self.shakedis,ease:LEasing.None.easeIn}).to(self.hit,self.shaket,{x:thisx,ease:LEasing.None.easeIn,onComplete:function(){
        self.hit.visible = false;
        self.normal.visible = true;
    }});
}
Person.prototype.writeword = function(){
    var self = this;
    self.Sword = new LSprite();
    self.addChild(self.Sword);
    self.Sword.visible = false;

    self.Sword.bg1 = new LBitmap(new LBitmapData(imglist["icon"],776,1949,193,133));
    self.Sword.addChild(self.Sword.bg1);
    self.Sword.bg2 = new LBitmap(new LBitmapData(imglist["icon"],756,2410,193,133));
    self.Sword.addChild(self.Sword.bg2);

    self.Sword.txt = new LTextField();
    self.Sword.txt.text = "要拜入蜀山门下，先要过我这关";
    self.Sword.txt.size = 16;
    self.Sword.txt.font = "微软雅黑";
    self.Sword.txt.width = 160;
    self.Sword.txt.setWordWrap(true,28);
    self.Sword.txt.x = 20;
    self.Sword.txt.y = 25;
    self.Sword.addChild(self.Sword.txt);
}
Person.prototype.saystart = function(){
    var self = this;
    self.Sword.visible = true;
    self.Sword.alpha = 1;
    self.Sword.x = 100;
    self.Sword.y = -350;
    self.Sword.bg1.visible = true;
    self.Sword.bg2.visible = false;
    if(gameData.checkPoint == 1){
        self.Sword.txt.text = "要拜入蜀山门下，先要过我这关！";
    }else if(gameData.checkPoint == 2){
        self.Sword.txt.text = "不要看我美美哒，我可不好惹额！";
    }else if(gameData.checkPoint == 3){
        self.Sword.txt.text = "一个小弟子，也敢来惹我千年狐妖！";
    }else if(gameData.checkPoint == 4){
        self.Sword.txt.text = "哈哈哈！碰到我邪剑仙，你是来送死的么！";
    }else if(gameData.checkPoint == 5){
        self.Sword.txt.text = "在魔尊面前，挡我者死";
        self.Sword.txt.y = 40;
    }
    LTweenLite.to(self.Sword,0.5,{alpha:0,delay:2,ease:LEasing.None.easeIn,onComplete:function(){
        self.Sword.visible = false;
        addSword();
    }})
}
Person.prototype.sayend = function(){
    var self = this;
    self.Sword.visible = true;
    self.Sword.alpha = 1;
    self.Sword.x = -300;
    self.Sword.y = -350;
    self.Sword.bg2.visible = true;
    self.Sword.bg1.visible = false;
    if(gameData.checkPoint == 1){
        self.Sword.txt.text = "连一只小妖都没打败，您的手也太慢了吧！";
    }else if(gameData.checkPoint == 2){
        self.Sword.txt.text = "年轻人，还需要多修炼额，下手太慢！";
    }else if(gameData.checkPoint == 3){
        self.Sword.txt.text = "升到长老，还需要好长的路要走。";
    }else if(gameData.checkPoint == 4){
        self.Sword.txt.text = "离掌门还差一点点……";
        self.Sword.txt.y = 40;
    }else if(gameData.checkPoint == 5){
        self.Sword.txt.text = "败在魔尊，虽死犹荣，后辈多多努力";
    }
    LTweenLite.to(self.Sword,0.5,{alpha:0,delay:2,ease:LEasing.None.easeIn,onComplete:function(){
        self.Sword.visible = false;
        gameOver();
    }})
}


//生命条
function Lifeline(life,type){
    base(this,LSprite,[]);
    var self = this;
    self.life = life;
    self.nowlife = life;
    if(type == 1){
        self.graphics.drawRoundRect(3,"#FFF",[0,0,155,24,12],true,"#dc431a");
    }else{
        self.graphics.drawRoundRect(3,"#FFF",[0,0,155,24,12],true,"#df9d00");
    }

    //self.graphics.drawRoundRect(0,"#F00",[0,0,155*self.nowlife/self.life,22,12],true,"rgb(73,188,238)");
    self.txt = new LTextField();
    self.txt.text = self.nowlife +"/"+self.life;
    self.txt.size = 20;
    self.txt.textAlign = "center";
    self.txt.color = "#FFF";
    self.txt.font = "微软雅黑";
    self.txt.x = 77;
    self.txt.y = -2;
    self.addChild(self.txt);
}
Lifeline.prototype.reduce = function(){
    var self = this;
    self.nowlife --;
    self.txt.text = self.nowlife +"/"+self.life;
//    self.graphics.clear();
//    self.graphics.drawRoundRect(2,"#FFF",[0,0,155,18,8],true,"#df9d00");
//    if(self.nowlife != 0){
//        self.graphics.drawRoundRect(0,"#F00",[0,0,155*self.nowlife/self.life,18,8],true,"rgb(73,188,238)");
//    }
}


//闪电
function Lighting(){
    base(this,LSprite,[]);
    var self = this;
    self.visible = false;

    self.pic = new LBitmap(new LBitmapData(imglist["lighting"]));
    self.addChild(self.pic);


    self.adboard = new LBitmap(new LBitmapData(imglist["icon"],676,2549,226,149));
    self.addChild(self.adboard);
    self.adboard.x = 200;
    self.adboard.y = 530;
    self.adpic = new LBitmap(new LBitmapData(imglist["ad"]));
    self.adpic.x = 260;
    self.adpic.y = 565;
    self.addChild(self.adpic);
}
Lighting.prototype.shy = function(){
    var self = this;
    self.visible = true;
    LTweenLite.to(self.pic,0.2,{alpha:0,ease:LEasing.None.easeIn}).to(self.pic,0.2,{alpha:1,ease:LEasing.None.easeIn}).to(self.pic,0.2,{alpha:0,ease:LEasing.None.easeIn}).to(self.pic,0.2,{alpha:1,ease:LEasing.None.easeIn}).to(self.pic,1,{alpha:0,ease:LEasing.None.easeIn,onComplete:function(){
        self.visible = false;
        newLevel();
    }})
}


function Music(){
    base(this,LSprite,[]);
    var self = this;
    self.x = 532;
    self.y = 10;
    self.pic = new LBitmap(new LBitmapData(imglist["icon"],887,2215,78,51));
    self.addChild(self.pic);

    self.txt = new LTextField();
    self.txt.text = "开";
    self.txt.color = "#fff700";
    self.txt.size = 28;
    self.txt.x = 40;
    self.txt.y = 8;
    self.addChild(self.txt);

    self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        if(self.txt.text == "开"){
            self.txt.text = "关";
            document.getElementById("bgmusic").pause();
        }else{
            self.txt.text = "开"
            document.getElementById("bgmusic").play();
        }
    })
}

















