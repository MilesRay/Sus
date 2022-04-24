class Game {
    constructor() {
        // === Const ===
        this.move = 2;
        
        // === Local ===
        this.upMove = false;
        this.downMove = false;
        this.leftMove = false;
        this.rightMove = false;
        this.space = false; // pressed space once
        this.fullspace = false; // holding down space
        this.item = false; // E is currrently pressed
        
        // === Global ===
        this.red = true; // spikes for level 3
        this.blue = true; // spikes for level 3
        this.torchOnWall = false; // TODO
        this.wallOpen = false;
        
        this.p1 = new Player(280, 272, true);
        this.vent = new Hitbox(816, 118, 40);
        this.scroll = new Hitbox(863, 419, 40);
        this.torch = new Hitbox(201, 85, 40);
        this.hole = new Hitbox(88, 269, 40);
        this.ash = new Hitbox(772, 148, 40);
        this.l2Exit = new Hitbox(387, 161, 40);
        this.bluePressurePlate = new Hitbox(451, 413, 40);
        this.redPressurePlate = new Hitbox(585, 414, 40);
        this.spikes = [
            new Hitbox(722, 360, 40),
            new Hitbox(722, 320, 40),
            new Hitbox(722, 280, 40),
            new Hitbox(722, 240, 40),
            new Hitbox(722, 200, 40),
            new Hitbox(722, 160, 40),
            new Hitbox(722, 120, 40),
            new Hitbox(722, 80, 40),
            new Hitbox(760, 275, 40),
            new Hitbox(775, 275, 40),
            new Hitbox(760, 282, 40),
            new Hitbox(775, 282, 40),
            new Hitbox(820, 185, 40),
            new Hitbox(862, 279, 40),
            new Hitbox(818, 447, 40),
            new Hitbox(818, 407, 40),
            new Hitbox(818, 380, 40),
        ];
        this.level3Spikes = [
            new Hitbox(388, 340, 30),
            new Hitbox(428, 340, 30),
            new Hitbox(468, 340, 30),
            new Hitbox(508, 340, 30),
            new Hitbox(548, 340, 30),
            new Hitbox(588, 340, 30),
            new Hitbox(628, 340, 30),
            new Hitbox(388, 300, 40),
            new Hitbox(388, 260, 40),
            new Hitbox(338, 260, 30),
            new Hitbox(484, 248, 40),
            new Hitbox(484, 218, 40),
            new Hitbox(628, 243, 40),
            new Hitbox(628, 203, 40),
            new Hitbox(628, 163, 40),
            new Hitbox(628, 123, 40),
            new Hitbox(628, 80, 40),
            new Hitbox(147, 214, 30),
            new Hitbox(187, 214, 30),
            new Hitbox(227, 214, 30),
            new Hitbox(267, 214, 30),
            new Hitbox(297, 214, 30),
            new Hitbox(291, 174, 30),
            new Hitbox(291, 134, 30),
            new Hitbox(291, 94, 30),
        ];
        this.level3BlueSpikes = [
            new Hitbox(99, 259, 30),
            new Hitbox(340, 216, 30),
            new Hitbox(370, 216, 30),
            new Hitbox(400, 216, 30),
            new Hitbox(430, 216, 30),
            new Hitbox(532, 305, 40),
        ];
        this.level3RedSpikes = [
            new Hitbox(99, 177, 30),
            new Hitbox(436, 306, 40),
            new Hitbox(628, 305, 40),
        ];
    }
    
    draw() {
        background(0);
        
        if (this.p1.level == 1) {
            if (this.wallOpen) {
                image(backgroundOpen, 0, 0);
            } else if (!this.p1.holdingTorch) {
                image(backgroundTorch, 0, 0);
            } else {
                image(backgroundNoTorch, 0, 0);
            }
        }
        
        if (this.p1.level == 2) {
            image(level2Background2, 0, 0);
        }
        
        if (this.p1.level == 3) {
            if (this.blue == false && this.red == false) {
                image(COOPBackgroundNONE, 0, 0);
            }
            if (this.blue == true && this.red == false) {
                image(COOPBackgroundBLUE, 0, 0);
            }
            if (this.blue == false && this.red == true) {
                image(COOPBackgroundRED, 0, 0);
            }
            if (this.blue == true && this.red == true) {
                image(COOPBackgroundBOTH, 0, 0);
            }
        }
        
        push();
        stroke(255);
        fill(255);
        
        this.p1.draw();
        
        if (this.p1.level == 1) {
            // init level 1
            for (var i = 0; i < this.spikes.length; i++) {
                if (
                    this.spikes[i].checkCollision(this.p1.x + 10, this.p1.y + 80, -10)
                    ) {
                        this.p1.x = 494;
                        this.p1.y = 321;
                    }
                }
                
                // entering vent
                if (
                    this.vent.checkCollision(this.p1.x + 10, this.p1.y + 80, 0) &&
                    this.space == true
                    ) {
                        this.p1.venting = true;
                    }
                    
                    // Show contents of scroll on the screen
                    if (
                        this.scroll.checkCollision(this.p1.x + 10, this.p1.y + 80, -10) &&
                        this.item == true
                        ) {
                            image(Scroll, 0, 0);
                        }
                        
                        // pickup torch
                        if (
                            this.torch.checkCollision(this.p1.x + 10, this.p1.y + 80, -10) &&
                            this.item == true &&
                            this.p1.venting == false
                            ) {
                                this.p1.holdingTorch = true;
                            }
                            
                            // opening hole in wall of level 1
                            if (
                                this.hole.checkCollision(this.p1.x + 10, this.p1.y + 80, -10) &&
                                this.item == true &&
                                this.p1.holdingTorch == true
                                ) {
                                    this.wallOpen = true;
                                }
                                
                                // entering the hole to exit level 1
                                if (
                                    this.hole.checkCollision(this.p1.x + 10, this.p1.y + 80, -10) &&
                                    this.fullspace == true && // TODO: fullspace
                                    this.wallOpen == true
                                    ) {
                                        this.p1.animationSequence = "level1ToLevel2";
                                        this.p1.animationCount = 0;
                                    }
                                }
                                
                                if (this.p1.level == 2) {
                                    // among us ash weird collision
                                    if (this.ash.checkCollision(this.p1.x + 10, this.p1.y + 80, -10)) {
                                        this.p1.x -= this.move;
                                        this.p1.y -= this.move;
                                    }
                                    
                                    // Jumping in hole to transition from level 2 to level 3
                                    if (
                                        this.l2Exit.checkCollision(this.p1.x + 10, this.p1.y + 80, -10) &&
                                        this.space == true
                                        ) {
                                            this.p1.animationSequence = "level2ToLevel3";
                                            this.p1.animationCount = 0;
                                        }
                                    }
                                    
                                    pop();
                                    
                                    if (this.p1.level == 3) {
                                        //level 3 spikes hitboxes
                                        for (var j = 0; j < this.level3Spikes.length; j++) {
                                            if (
                                                this.level3Spikes[j].checkCollision(
                                                    this.p1.x + 10,
                                                    this.p1.y + 80,
                                                    -10
                                                    )
                                                    ) {
                                                        this.p1.x = 769;
                                                        this.p1.y = 304;
                                                    }
                                                }
                                                //blue spike hitboxes
                                                if (this.blue == true) {
                                                    for (var k = 0; k < this.level3BlueSpikes.length; k++) {
                                                        if (
                                                            this.level3BlueSpikes[k].checkCollision(
                                                                this.p1.x + 10,
                                                                this.p1.y + 80,
                                                                -10
                                                                )
                                                                ) {
                                                                    this.p1.x = 769;
                                                                    this.p1.y = 304;
                                                                }
                                                            }
                                                        }
                                                        //red spike hitboxes
                                                        if (this.red == true) {
                                                            for (var l = 0; l < this.level3RedSpikes.length; l++) {
                                                                if (
                                                                    this.level3RedSpikes[l].checkCollision(
                                                                        this.p1.x + 10,
                                                                        this.p1.y + 80,
                                                                        -10
                                                                        )
                                                                        ) {
                                                                            this.p1.x = 769;
                                                                            this.p1.y = 304;
                                                                        }
                                                                    }
                                                                }
                                                                
                                                                if (
                                                                    this.bluePressurePlate.checkCollision(
                                                                        this.p1.x + 10,
                                                                        this.p1.y + 80,
                                                                        -10
                                                                        )
                                                                        ) {
                                                                            this.blue = false; // deactivate blue spikes
                                                                        } else {
                                                                            this.blue = true;
                                                                        }
                                                                        if (
                                                                            this.redPressurePlate.checkCollision(
                                                                                this.p1.x + 10,
                                                                                this.p1.y + 80,
                                                                                -10
                                                                                )
                                                                                ) {
                                                                                    this.red = false; // deactivate red spikes
                                                                                } else {
                                                                                    this.red = true;
                                                                                }
                                                                            }
                                                                            
                                                                            // player movement
                                                                            if (!this.p1.freezePlayer) {
                                                                                // w
                                                                                if (keys[87]) {
                                                                                    this.p1.y -= 2;
                                                                                    this.upMove = true;
                                                                                } else {
                                                                                    this.upMove = false;
                                                                                }
                                                                                
                                                                                // s
                                                                                if (keys[83]) {
                                                                                    this.p1.y += 2;
                                                                                    this.downMove = true;
                                                                                } else {
                                                                                    this.downMove = false;
                                                                                }
                                                                                
                                                                                // a
                                                                                if (keys[65]) {
                                                                                    this.p1.x -= 2;
                                                                                    this.p1.left = true;
                                                                                    this.leftMove = true;
                                                                                } else {
                                                                                    this.leftMove = false;
                                                                                }
                                                                                
                                                                                // d
                                                                                if (keys[68]) {
                                                                                    this.p1.x += 2;
                                                                                    this.p1.left = false;
                                                                                    this.rightMove = true;
                                                                                } else {
                                                                                    this.rightMove = false;
                                                                                }
                                                                            }
                                                                            
                                                                            //space
                                                                            if (keys[32]) {
                                                                                this.space = true;
                                                                                this.fullspace = true;
                                                                            } else {
                                                                                this.space = false;
                                                                            }
                                                                            
                                                                            //e
                                                                            if (keys[69]) {
                                                                                this.item = true;
                                                                            }
                                                                            
                                                                            //window boundaries
                                                                            if (this.p1.x < 70) {
                                                                                this.p1.x += this.move;
                                                                            }
                                                                            if (this.p1.x > 860) {
                                                                                this.p1.x -= this.move;
                                                                            }
                                                                            if (this.p1.y < 0) {
                                                                                this.p1.y += this.move;
                                                                            }
                                                                            if (this.p1.y > 378) {
                                                                                this.p1.y -= this.move;
                                                                            }
                                                                            
                                                                            if (
                                                                                this.upMove == false &&
                                                                                this.downMove == false &&
                                                                                this.leftMove == false &&
                                                                                this.rightMove == false &&
                                                                                this.p1.left == false
                                                                                ) {
                                                                                    this.p1.animationDirection = "stillRight";
                                                                                }
                                                                                if (
                                                                                    this.upMove == false &&
                                                                                    this.downMove == false &&
                                                                                    this.leftMove == false &&
                                                                                    this.rightMove == false &&
                                                                                    this.p1.left == true
                                                                                    ) {
                                                                                        this.p1.animationDirection = "stillLeft";
                                                                                    }
                                                                                    
                                                                                    if (this.rightMove == true) {
                                                                                        this.p1.animationDirection = "runningRight";
                                                                                    }
                                                                                    
                                                                                    if (this.leftMove == true) {
                                                                                        this.p1.animationDirection = "runningLeft";
                                                                                    }
                                                                                    
                                                                                    if (this.upMove == true && this.p1.left == false) {
                                                                                        this.p1.animationDirection = "runningRight";
                                                                                    }
                                                                                    if (this.upMove == true && this.p1.left == true) {
                                                                                        this.p1.animationDirection = "runningLeft";
                                                                                    }
                                                                                    if (this.downMove == true && this.p1.left == false) {
                                                                                        this.p1.animationDirection = "runningRight";
                                                                                    }
                                                                                    if (this.downMove == true && this.p1.left == true) {
                                                                                        this.p1.animationDirection = "runningLeft";
                                                                                    }
                                                                                }
                                                                            }
                                                                            