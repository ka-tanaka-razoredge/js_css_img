class Line {
    /**
     * @param dur
     * @param innerHTML
     */
    constructor(lop) {
        this.bottom = null; this.front = null;
        let elem;

        this.rootDiv = lop.rootDiv;

        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid blue; width: 1px; height: " + lop.dur + "; background-color: rgba(0, 0, 255, 0.5); position: absolute; top: 0px; left: 0px;";
//        elem.innerHTML = lop.captionForBottom;
        this.bottomDiv = elem;

        elem = document.createElement("div");
        let offset = lop.dur;
        elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: " + offset + "; left: 0px;";
        let jointDiv = elem;
        this.jointDiv = jointDiv;

        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; background-color: rgba(200, 200, 200, 0.5); width: 160px; height: 90px; position: absolute; top: 0px; left: 0px;";
        elem.innerHTML = lop.innerHTML;
        elem.style.transform += "rotateY(180deg)";
        elem.style.transform += "rotateZ(180deg)";
/*
        elem.addEventListener("click", (function(e) {
            if (!this.frontDiv.isLifted || this.frontDiv.isLifted == false) {
                this.frontDiv.style.transform += "translateY(-100px)";
                this.frontDiv.isLifted = true;
            } else {
                this.frontDiv.style.transform += "translateY(100px)";
                this.frontDiv.isLifted = false;
            }
        }).bind(this));
*/
//        this.frontDiv = elem;

        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; background-color: rgba(200, 200, 200, 0.5); width: 160px; height: 90px; position: absolute; top: 0px; left: 0px;";
        if ("innerHTMLForFrontInner" in lop) elem.innerHTML = lop.innerHTMLForFrontInner;
        elem.style.transform += "translateZ(1px) rotateZ(180deg)";
//        this.frontInnerDiv = elem;

//        jointDiv.appendChild(this.frontInnerDiv);
//        jointDiv.appendChild(this.frontDiv);
        this.bottomDiv.appendChild(jointDiv);
//        this.rootDiv.appendChild(this.frontDiv);
        this.rootDiv.appendChild(this.bottomDiv);

        jointDiv.style.transform += "rotateX(90deg)";
//        jointDiv.style.transform += "rotateX(170deg)";
//        jointDiv.style.transform += "rotateY(180deg)";
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
