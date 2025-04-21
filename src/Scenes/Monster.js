class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.leftLegX = 350;
        this.leftLegY = 500;
        this.rightLegX = 250;
        this.rightLegY = 500;
        this.leftArmX = 400;
        this.leftArmY = 350;
        this.rightArmX = 200;
        this.rightArmY = 350;
        this.headX = 300;
        this.headY = 250;
        this.mouthX = 300;
        this.mouthY = 300;
        this.eyeX = 300;
        this.eyeY = 240;
        this.leftEarX = 380;
        this.leftEarY = 180;
        this.rightEarX = 220;
        this.rightEarY = 180;

    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_yellowF.png");
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_darkC.png");
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_yellowC.png"); my.sprite.rightLeg.flipX = true;
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_yellowE.png");
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_darkE.png"); my.sprite.rightArm.flipX = true;
        my.sprite.head = this.add.sprite(this.headX, this.headY, "monsterParts", "body_yellowB.png")
        my.sprite.mouth = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_sad.png");
        my.sprite.smile = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_happy.png"); my.sprite.smile.visible = false;
        my.sprite.fangs = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthJ.png"); my.sprite.fangs.visible = false;
        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_cute_light.png");
        my.sprite.leftEar = this.add.sprite(this.leftEarX, this.leftEarY, "monsterParts", "detail_dark_ear.png");
        my.sprite.rightEar = this.add.sprite(this.rightEarX, this.rightEarY, "monsterParts", "detail_yellow_ear.png"); my.sprite.rightEar.flipX = true;

        // move on A and D
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // smile on S
        this.input.keyboard.on("keydown-S", (event) => {
            my.sprite.mouth.visible = false;
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        });
        // fangs on F
        this.input.keyboard.on("keydown-F", (event) => {
            my.sprite.mouth.visible = false;
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        const dx = (this.aKey.isDown ? -1 : 0) + (this.dKey.isDown ? +1 : 0);
        for (const key in my.sprite) {
            my.sprite[key].x += dx;
        }
    }
}
