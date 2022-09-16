class Cube {

    /**
     * @param rootDiv
     * @param isTransparent
     * @param isWireFrame TODO
     */
    constructor(lop) {
        this.bottom = null; this.front = null;
        let elem;

        this.rootDiv = lop.rootDiv;

        let backgroundColor = "rgba(200, 200, 200, 0.5)";

        // bottom
        elem = document.createElement("div");

        let bgColor;
        (("isTransparent" in lop) == false) ? bgColor = bgColor = "rgba(0, 0, 255, 0.5)" : bgColor = backgroundColor;
        elem.style = "transform-style: preserve-3d; border: 1px solid blue; width: 30px; height: 30px; background-color: " + bgColor  + "; position: absolute; top: 0px; left: 0px;";
//        elem.innerHTML = lop.captionForBottom;
        this.bottomDiv = elem;

        // ceiling
        elem = document.createElement("div");
        (("isTransparent" in lop) == false) ? bgColor = bgColor = "rgba(0, 0, 0, 0.9)" : bgColor = backgroundColor;
        elem.style = "transform-style: preserve-3d; border: 1px solid white; width: 30px; height: 30px; background-color: " + bgColor + "; position: absolute; top: 0px; left: 0px;";
        this.ceilingDiv = elem;
        elem.style.transform += "translateZ(30px)";

        // front
        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 0px; left: 0px;";
        let jointDiv = elem;

        elem = document.createElement("div");
        (("isTransparent" in lop) == false) ? bgColor = bgColor = "rgba(0, 0, 0, 0.1)" : bgColor = backgroundColor;
        elem.style = "transform-style: preserve-3d; background-color: " + bgColor + "; width: 30px; height: 30px; position: absolute; top: 0px; left: 0px; writing-mode: vertical-rl;";

//MUTE        elem.innerHTML = lop.captionForFront;
        elem.style.transform += "rotateY(180deg) rotateZ(180deg)";
        this.frontDiv = elem;


        // back
        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 30px; left: 0px;";
        let backJoint = elem;
        elem = document.createElement("div");
        (("isTransparent" in lop) == false) ? bgColor = bgColor = "rgba(0, 0, 0, 0.7)" : bgColor = backgroundColor;
        elem.style = "transform-style: preserve-3d; background-color: " + bgColor + "; width: 30px; height: 30px; position: absolute; top: 0px; left: 0px; writing-mode: vertical-rl;";
//MUTE        elem.innerHTML = lop.captionForFront;
        elem.style.transform += "rotateY(180deg)";
        this.backDiv = elem;


        // left
        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 0px; left: 0px;";
        elem.style.transform += "rotateY(-90deg)";
        let leftJoint = elem;

        elem = document.createElement("div");
        (("isTransparent" in lop) == false) ? bgColor = bgColor = "rgba(255, 0, 0, 0.5)" : bgColor = backgroundColor;
        elem.style = "transform-style: preserve-3d; background-color: " + bgColor + "; width:30px; height: 30px; position: absolute; top: 0px; left: 0px;";
//        elem.innerHTML = lop.captionForRight;
        this.leftDiv = elem;


        // right
        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 0px; left: 0px;";
        elem.style.transform += "translateX(30px) rotateY(-90deg)";
        let rightJoint = elem;

        elem = document.createElement("div");
        (("isTransparent" in lop) == false) ? bgColor = bgColor = "rgba(0, 0, 0, 0.9)" : bgColor = backgroundColor;
        elem.style = "transform-style: preserve-3d; background-color: " + bgColor + "; width:30px; height: 30px; position: absolute; top: 0px; left: 0px; border: 1px solid white;";
//        elem.innerHTML = lop.captionForRight;
        this.rightDiv = elem;


        jointDiv.appendChild(this.frontDiv);
        backJoint.appendChild(this.backDiv);
        leftJoint.appendChild(this.leftDiv);
        rightJoint.appendChild(this.rightDiv);
        this.bottomDiv.appendChild(this.ceilingDiv);
        this.bottomDiv.appendChild(jointDiv);
        this.bottomDiv.appendChild(backJoint);
        this.bottomDiv.appendChild(leftJoint);
        this.bottomDiv.appendChild(rightJoint);
        this.rootDiv.appendChild(this.bottomDiv);

        jointDiv.style.transform += "rotateX(90deg)";
        backJoint.style.transform += "rotateX(90deg)";
        rightJoint.style.transform += "rotateY(0deg)";
        leftJoint.style.transform += "rotateY(0deg)";


    }

    moveY(value) {
        this.bottomDiv.style.top = (parseInt(this.bottomDiv.style.top) + value) + "px";
    }

    moveX(value) {
        this.bottomDiv.style.left = (parseInt(this.bottomDiv.style.left) + value) + "px";
    }

    moveZ(value) {
        this.bottomDiv.style.transform  += "translateZ(" + value + "px)";
    }
}
