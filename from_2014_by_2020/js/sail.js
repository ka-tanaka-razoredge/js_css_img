class Sail {
    constructor(lop) {
        this.bottom = null; this.front = null;
        let elem;

        this.rootDiv = lop.rootDiv;
/*
        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid blue; width: 200px; height: 30px; background-color: rgba(0, 0, 255, 0.5); position: relative; top: 0px; left: 0px;";
        elem.innerHTML = lop.captionForBottom;
        this.bottomDiv = elem;
*/
        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 0px; left: 0px;";
        let jointDiv = elem;
        this.jointDiv = elem;

        elem = document.createElement("div");
        if (("height" in lop) == false) lop.height = "100px";
        if (("width" in lop) == false) lop.width = "200px";
        elem.style = "transform-style: preserve-3d; height: " + lop.height + "; width: " + lop.width + "; border: 1px solid black; background-color: rgba(255, 255, 255, 0.5); position: absolute; top: 0px; left: 0px;";
        elem.innerHTML = lop.captionForFront;
        elem.style.transform += "rotateX(180deg)";
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
        this.frontDiv = elem;

        elem = document.createElement("div");
        if (("height" in lop) == false) lop.height = "100px";
        if (("width" in lop) == false) lop.width = "200px";
        elem.style = "transform-style: preserve-3d; height: " + lop.height + "; width: " + lop.width + "; border: 1px solid black; background-color: rgba(255, 255, 255, 0.5); position: absolute; top: 0px; left: 0px;";
        if ("innerHTMLForFrontOuter" in lop) {
            elem.innerHTML = lop.innerHTMLForFrontOuter;
            elem.style.transform += "translateZ(1px)";
        }
        this.frontDivOuter = elem;

        jointDiv.appendChild(this.frontDivOuter);
        jointDiv.appendChild(this.frontDiv);
        this.rootDiv.appendChild(jointDiv);
        elem.style.transform += "rotateZ(180deg)";

        jointDiv.style.transform += "rotateX(90deg)";
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
