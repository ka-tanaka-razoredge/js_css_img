function Disc(lop) {

    //----------------------------------------
    // cast(s)
    //----------------------------------------
    this.catalyticCore;
    this.top;
    this.bottom;
    this.left;
    this.right;
    this.front;
    this.back;

    this.create = (lop) => {

        let isDefault = (lop) => {
            let reply = true;
            do {
                if ("isSkewer" in lop) reply = false;
            } while(0);
            return reply;
        }

        let procureCatalyticCore = () => {
            let div = document.createElement("div");
            div.style = "position: absolute; margin: 50px auto 0; height: 200px; width: 200px; transition: transform 2s linear; transform-style: preserve-3d; top: 10px;";
//            div.style = "position: relative; margin: 50px auto 0; height: 200px; width: 200px; transition: transform 2s linear; transform-style: preserve-3d; top: 10px;";
            this.catalyticCore = div;
            lop.owner.appendChild(this.catalyticCore);
            return div;
        };

        let procureBottom = (owner) => {
            let div = document.createElement("div");
            if (isDefault(lop)) {
                div.style = "position: absolute; height: 50px; width: 200px; background-color: rgba(25, 25, 75, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            } else if ("isSkewer" in lop) {
                let height = "height: " + (lop.bottom.t) + "px;";
                let width = "width: 10px;";
                div.style = "position: absolute; " + height + " " + width + " " + "background-color: rgba(25, 25, 75, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            }

            if (("isFuture" in lop) == false) {
                div.style.transform = "translateZ(-100px)";
            } else {
//                div.style.transform = "translateZ(0px) translateY(-100px)";
            }
            if ("bottom_content" in lop) div.innerHTML = lop.bottom_content;
            div.style.color = "red";
//            div.innerHTML = 'bottom';
            div.id = "disc_bottom_" + lop.id;
            this.catalyticCore.appendChild(div);
/*
            let div = document.createElement("div");
            div.style = "position: absolute; height: 10px; width: 180px; padding: 10px; background-color: rgba(25, 25, 75, 0.01); line-height: 1em; color: white; border: 1px solid dimgray; border-radius: 3px; top: 0px;";
            div.style.top = (30 * 1) + "px";
            owner.appendChild(div);
*/
            return div;
        };

        let procureFront = () => {

            let isDefaultLocal = (lop) => {
                let reply = false;
                do {
                    if ("isFuture" in lop) break;
                    if ("isPast" in lop) break;
                    if ("isSkewer" in lop) break;
                    reply = true;
                } while (0);
                return reply;
            }

            let div = document.createElement("div");

            if (isDefault(lop)) {
                div.style = "position: absolute; height: 200px; width: 200px; background-color: rgba(255, 0, 0, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            } else if ("isSkewer" in lop) {
                let height = "height: 250px;";
                let width = "width: 10px;";
                div.style = "position: absolute;" + " " + height + " " + width + " " + "background-color: rgba(255, 0, 0, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            }

            if (isDefaultLocal(lop)) {
                div.style.transform = "rotateX(270deg) translateZ(-100px)";
            } else if ("isPast" in lop) {
                div.style = "position: absolute; height: 200px; width: 200px; background-color: rgba(0, 0, 0, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
                div.style.transform = "translateZ(-200px) translateY(-100px) rotateX(270deg)";
            } else if ("isSkewer" in lop) {
                div.style.transform = "translateY(-125px) translateZ(25px) rotateX(270deg) ";
            } else {
                div.style = "position: absolute; height: 200px; width: 200px; background-color: rgba(0, 0, 0, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
                div.style.transform = "translateZ(50px) translateY(-40px) rotateX(" + (45) + "deg)";
            }
            div.addEventListener("click", (function(e) {
                // Depency
                let elm = document.getElementById("sub_window_1");
                elm.innerHTML = this.front.innerHTML;
            }).bind(this));
            div.style.color = "red";
            div.innerHTML = 'front_' + lop.id;
//            if (lop.id == "second") {
//                div.innerHTML = "<div style='position: absolute;'>front_" + lop.id + "</div>" + "<img src='0007.jpg' style='max-width: 100%; opacity: 0.5;'></img>";
//            }
//            if (lop.id == "first") {
//                div.innerHTML = "<div style='position: absolute;'>front_" + lop.id + "</div>" + "<img src='0009_s.jpg' style='max-width: 100%;'></img>";
//            }

            div.addEventListener("click", (function(e) {
                if (!this.catalyticCore.isLifted || this.catalyticCore.isLifted == false) {
                    this.catalyticCore.style.transform += "translateZ(50px)";
                    this.catalyticCore.isLifted = true;
                } else {
                    this.catalyticCore.style.transform += "translateZ(-50px)";
                    this.catalyticCore.isLifted = false;
                }
            }).bind(this));

            div.id = "disc_front_" + lop.id;
            if ("content" in lop) {
                div.innerHTML = lop.content;
            }
            this.catalyticCore.appendChild(div);
            return div;
        };

        let procureRight = () => {
            let div = document.createElement("div");
            div.style = "position: absolute; height: 50px; width: 200px; background-color: rgba(25, 25, 75, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            div.style.transform = "translateX(175px) translateZ(-100px) rotateY(270deg)";
            div.addEventListener("click", (function(e) {
                // Depency
                let elm = document.getElementById("sub_window_1");
                elm.innerHTML = this.right.innerHTML;
            }).bind(this));
            div.style.color = "blue";
            div.innerHTML = 'right';
            div.id = "disc_right_" + lop.id;
            if ("content" in lop) {
                div.innerHTML = lop.content;
            }
            this.catalyticCore.appendChild(div);
            return div;
        };

        let procureHorizon = () => {
            let div = document.createElement("div");
            if (isDefault(lop)) {
                div.style = "position: absolute; height: 50px; width: 1000px; background-color: rgba(25, 25, 75, 0.1); height: 1px; color: white; border-radius: 3px; top: 0px;";
            } else if ("isSkewer" in lop) {
                let height = "height: " + (lop.bottom.t) + "px;";
                let width = "width: 1000px;";
                div.style = "position: absolute; " + height + " " + width + " " + "background-color: rgba(25, 25, 75, 0.1); height: 1px; color: white; border-radius: 3px; top: 0px;";
            }

            if (("isFuture" in lop) == false) {
                div.style.transform = "translateZ(-100px)";
            } else {
//                div.style.transform = "translateZ(0px) translateY(-100px)";
            }

            div.style.color = "red";
            div.id = "disc_bottom_" + lop.id;
            this.catalyticCore.appendChild(div);
            return div;
        };

        this.catalyticCore = procureCatalyticCore();

        if(lop.greek == "tc") procureHorizon();

        if (("isBottom" in lop) == false) {
            this.bottom = procureBottom(this.catalyticCore);
        } else {
        }

        if (("isFront" in lop) == false) {
            this.front = procureFront(this.catalyticCore);
        } else {
        }
        if (("isAddress" in lop) == true) {
            this.front.style.height = "300px";
            this.front.style.backgroundColor = "white";
            this.front.style.color = "blue";
            this.front.style.transform = "rotateX(270deg) translateZ(-200px)";
        }

        if (lop.isRight) {
            this.right = procureRight(this.catalyticCore);
        }


    }

    this.create(lop);
    console.log("the end of constructor@Disc");
}

function Cube(lop) {

    //----------------------------------------
    // cast(s)
    //----------------------------------------
    this.catalyticCore;
    this.top;
    this.bottom;
    this.left;
    this.right;
    this.front;
    this.back;

    this.create = (lop) => {
        let procureCatalyticCore = () => {
            let div = document.createElement("div");
            div.style = "position: absolute; margin: 50px auto 0; height: 50px; width: 50px; transition: transform 2s linear; transform-style: preserve-3d; top: 10px;";
//            div.style = "position: relative; margin: 50px auto 0; height: 200px; width: 200px; transition: transform 2s linear; transform-style: preserve-3d; top: 10px;";
            this.catalyticCore = div;
            lop.owner.appendChild(this.catalyticCore);
            return div;
        };

        let procureBottom = (owner) => {
            let div = document.createElement("div");
            div.style = "position: absolute; height: 50px; width: 50px; background-color: rgba(25, 25, 75, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            div.style.transform = "translateZ(-100px)";
            div.style.color = "red";
            div.innerHTML = 'bottom';
            div.id = "disc_bottom_" + lop.id;
            this.catalyticCore.appendChild(div);

            if ("content" in lop) {
                div.innerHTML = lop.content;
            }

/*
            let div = document.createElement("div");
            div.style = "position: absolute; height: 10px; width: 180px; padding: 10px; background-color: rgba(25, 25, 75, 0.01); line-height: 1em; color: white; border: 1px solid dimgray; border-radius: 3px; top: 0px;";
            div.style.top = (30 * 1) + "px";
            owner.appendChild(div);
*/
            return div;
        };

        let procureFront = () => {
            let div = document.createElement("div");
            div.style = "position: absolute; height: 200px; width: 200px; background-color: rgba(255, 0, 0, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            div.style.transform = "rotateX(270deg) translateZ(-100px)";
            div.style.color = "red";
            div.innerHTML = 'front_' + lop.id;
            if (lop.id == "second") {
                div.innerHTML = "<div style='position: absolute;'>front_" + lop.id + "</div>" + "<img src='0007.jpg' style='max-width: 100%; opacity: 0.5;'></img>";
            }
            if (lop.id == "first") {
                div.innerHTML = "<div style='position: absolute;'>front_" + lop.id + "</div>" + "<img src='0009_s.jpg' style='max-width: 100%;'></img>";
            }


            div.id = "disc_front_" + lop.id;
            this.catalyticCore.appendChild(div);
            return div;
        };

        let procureRight = () => {
            let div = document.createElement("div");
            div.style = "position: absolute; height: 50px; width: 200px; background-color: rgba(25, 25, 75, 0.1); line-height: 1em; color: white; border-radius: 3px; top: 0px;";
            div.style.transform = "translateX(175px) translateZ(-100px) rotateY(270deg)";
            div.style.color = "blue";
            div.innerHTML = 'right';
            div.id = "disc_right_" + lop.id;
            if ("content" in lop) {
                div.innerHTML = lop.content;
            }
            this.catalyticCore.appendChild(div);
            return div;
        };

        this.catalyticCore = procureCatalyticCore();

        if (("isBottom" in lop) == false) {
            this.bottom = procureBottom(this.catalyticCore);
        } else {
        }

        if (("isFront" in lop) == false) {
            this.front = procureFront(this.catalyticCore);
        } else {
        }

        if (lop.isRight) {
            this.right = procureRight(this.catalyticCore);
        }


    }

    this.create(lop);
    console.log("the end of constructor@Disc");
}

function DiscMediator(lop) {
    this.owner = lop.owner;
    this.setOwner = (value) => {    this.owner = value; };

    // isOrderless: false
    this.discs = [];

    /**
     * @param lop {owner, id}
     */
    this.createThenAppend = (lop) => {
        let disc, owner;

        (lop.owner) ? owner = lop.owner : owner = this.owner;

        lop.owner = this.skewer;
        disc = new Disc(lop);
        // disc = new Disc({owner: owner, id: lop.id});

        switch (lop.tc) {
//        switch (this.discs.length) {
        case 0:
            break;
        default:
            disc.catalyticCore.style.transform = "translateY(" + (100 * lop.tc) +"px)";
//            disc.catalyticCore.style.transform = "translateY(" + (-200 * this.discs.length) +"px)";
            console.log(disc.catalyticCore.style.transform);
            break;
        }

        if (lop.isSecondHalf) {
            disc.catalyticCore.style.transform = "translateY(" + (125 * lop.tc) +"px)";
        }

        this.xPos = -55;
        switch (lop.greek) {
        case "tc":
            disc.catalyticCore.style.transform = disc.catalyticCore.style.transform + " translateX(" + (this.xPos - 100) +"px)";
            disc.bottom.style.backgroundColor = "rgba(255, 255, 255, 0)";
            disc.bottom.innerHTML = lop.content;
            break;
        case "beta":
            disc.catalyticCore.style.transform = disc.catalyticCore.style.transform + " translateX(" + (200 + 70) +"px)";
//            console.log(disc.catalyticCore.style.transform);
            break;
        case "gamma":
            disc.catalyticCore.style.transform = disc.catalyticCore.style.transform + " translateX(" + ( ((200) * 2) + ((35) * 3)) +"px)";
            break;
        default:
            console.log(lop.greek);
            break;
        }


        this.discs.push(disc);
    }

    this.drawTheHorizon = (lop) => {
        let elem = document.createElement("div");
        elem.style.border = "1px solid black";
        elem.style.top = lop.top;
        elem.style.width = "10000px";
        this.owner.appendChild(elem);
    }

    /**
     * createThenAppendと同
     * @param lop {owner, id}
     */
    this.createCubeThenAppend = (lop) => {
        let disc, owner;

        (lop.owner) ? owner = lop.owner : owner = this.owner;

        lop.owner = this.skewer;
        disc = new Cube(lop);
        // disc = new Disc({owner: owner, id: lop.id});

        switch (lop.tc) {
//        switch (this.discs.length) {
        case 0:
            break;
        default:
            disc.catalyticCore.style.transform = "translateY(" + (100 * lop.tc) +"px)";
//            disc.catalyticCore.style.transform = "translateY(" + (-200 * this.discs.length) +"px)";
            console.log(disc.catalyticCore.style.transform);
            break;
        }

        if (lop.isSecondHalf) {
            disc.catalyticCore.style.transform = "translateY(" + (125 * lop.tc) +"px)";
        }

        let xPos = -55;
        switch (lop.greek) {
        case "btwn_tc_α":
            disc.catalyticCore.style.transform = disc.catalyticCore.style.transform + " translateX(" + xPos +"px)";
            break;
        case "btwn_α_β":
            disc.catalyticCore.style.transform = disc.catalyticCore.style.transform + " translateX(" + (200 + 10) +"px)";
            break;
        case "beta":
            disc.catalyticCore.style.transform = disc.catalyticCore.style.transform + " translateX(" + (200 + 20) +"px)";
//            console.log(disc.catalyticCore.style.transform);
            break;
        case "gamma":
            disc.catalyticCore.style.transform = disc.catalyticCore.style.transform + " translateX(" + (400 + 20) +"px)";
            break;
        default:
            console.log(lop.greek);
            break;
        }


        this.discs.push(disc);
    }

    // register magazine // prototype
/*
    this.register = () => {
        let disc, owner;
        (lop.owner) ? owner = lop.owner : owner = this.owner;
        disc = new Magazine({rootDiv: this.skewer});
        disc.moveY(300);
    }
*/

    this.rotate = () => {
        this.skewer.style.transform = "rotateX(60deg)";
//        this.skewer.style.transform = "rotateX(45deg) rotateZ(-45deg)";
//        this.discs.map((value) => {    value.catalyticCore.style.transform = "rotateZ(-45deg)";    });
    };

    // constructor
    let procureSkewer = (owner) => {
        let div = document.createElement("div");
//        div.style = "position: relative; margin: 50px auto 0; height: 200px; width: 200px; transform-style: preserve-3d; top: 10px;";
        div.style = "position: relative; margin: 50px auto 0; height: 400px; width: 400px; transition: transform 2s linear; transform-style: preserve-3d; top: 10px;";
        div.style.transform = "translateZ(-101px)";
        div.style.color = "red";
//        div.innerHTML = 'skewer';
        div.id = "skewer";
        return div;
    };


    this.skewer = procureSkewer();
    this.owner.appendChild(this.skewer);

}
