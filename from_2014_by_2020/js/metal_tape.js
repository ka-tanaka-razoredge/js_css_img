class MetalTape {
    constructor(lop) {
        this.bottom = null; this.front = null;
        let elem;
        let dur;

        this.rootDiv = lop.rootDiv;

        // bottom
        elem = document.createElement("div");
        dur = "30";
        if ("dur" in lop) dur = lop.dur;
        elem.style = "transform-style: preserve-3d; border: 1px solid blue; width: 30px; height: " + dur + "px; background-color: rgba(0, 0, 255, 0.5); position: absolute; top: 0px; left: 0px;";
        elem.innerHTML = lop.captionForBottom;
        this.bottomDiv = elem;

        // front
        let jointDiv;
        if (("muteFront" in lop) == false) {
            elem = document.createElement("div");
            elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 0px; left: 0px;";
            jointDiv = elem;

            elem = document.createElement("div");
            elem.style = "transform-style: preserve-3d; height: 100px; background-color: rgba(255, 0, 0, 0.1); width: 30px; height: 100px; position: absolute; top: 0px; left: 0px; writing-mode: vertical-rl;";

            elem.innerHTML = lop.captionForFront;
            elem.style.transform += "rotateY(180deg) rotateZ(180deg)";
            elem.addEventListener("click", (function(e) {
                if (!this.frontDiv.isLifted || this.frontDiv.isLifted == false) {
                    this.frontDiv.style.transform += "translateY(-100px)";
                    this.frontDiv.isLifted = true;
                } else {
                    this.frontDiv.style.transform += "translateY(100px)";
                    this.frontDiv.isLifted = false;
                }
            }).bind(this));
            this.frontDiv = elem;
        }

        // right
        let rightJoint;
        if (("muteRight" in lop) == false) {
            elem = document.createElement("div");
            elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 0px; left: 0px;";
            elem.style.transform += "translateX(30px) rotateY(-90deg)";
            rightJoint = elem;

            elem = document.createElement("div");
            elem.style = "transform-style: preserve-3d; background-color: rgba(255, 0, 0, 0.1); width: 200px; height: 30px; position: absolute; top: 0px; left: 0px;";
            elem.innerHTML = lop.captionForRight;
            this.rightDiv = elem;
            this.bottomDiv.appendChild(rightJoint);
            rightJoint.appendChild(this.rightDiv);
        }

        if (("muteFront" in lop) == false) jointDiv.appendChild(this.frontDiv);
        if (("muteFront" in lop) == false) this.bottomDiv.appendChild(jointDiv);
        this.rootDiv.appendChild(this.bottomDiv);

        if (("muteFront" in lop) == false) jointDiv.style.transform += "rotateX(90deg)";
        if (("muteRight" in lop) == false) rightJoint.style.transform += "rotateY(70deg)";
    }

    moveY(value) {
        this.bottomDiv.style.top = (parseInt(this.bottomDiv.style.top) + value) + "px";
//        this.jointDiv.style.top = (parseInt(this.jointDiv.style.top) + value) + "px";
//        this.spineDiv.style.top = (parseInt(this.spineDiv.style.top) + value) + "px";

    }

    moveX(value) {
        this.bottomDiv.style.left = (parseInt(this.bottomDiv.style.left) + value) + "px";
    }

}
