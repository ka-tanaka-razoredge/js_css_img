class Disc {

    width = "30px";

    /**
     * @param innerHTMLForFrontInner
     */
    constructor(lop) {
        this.bottom = null; this.front = null;
        let elem;
        let width, height;
        width = "160px";
        height = "90px";

        this.rootDiv = lop.rootDiv;

        if ("width" in lop) width = lop.width;

        elem = document.createElement("div");
//        elem.style = "transform-style: preserve-3d; border: 1px solid rgba(0, 255, 0, 0.1); width: 200px; height: 30px; background-color: rgba(0, 0, 0, 0.1); position: 'absolute'; top: 0px; left: 0px;";
        elem.style = "transform-style: preserve-3d; border: 1px solid rgba(0, 255, 0, 0.1); width: 200px; height: 30px; background-color: rgba(0, 0, 0, 0.1); position: absolute; top: 0px; left: 0px;";
        elem.style.width = width;
        if ("captionForBottom" in lop) elem.innerHTML = lop.captionForBottom;
        this.bottomDiv = elem;

        elem = document.createElement("div");
        if ("captionForBottomOuter" in lop) {
          elem.innerHTML = lop.captionForBottomOuter;
//          this.bottomDiv.style.position = 'absolute';
        }
        elem.style = "transform-style: preserve-3d; width: 200px; height: 30px; background-color: rgba(255, 255, 255, 1); top: 0px; left: 0px; z-index: 1900; position: absolute;";
        elem.style.width = width;
        elem.style.transform += "rotateX(180deg)";
        this.bottomOuterDiv = elem;

        if ("widthOfFront" in lop) {
          width = lop.widthOfFront;
          this.widthOfFront = lop.widthOfFront;
        }

        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; border: 1px solid red; position: absolute; top: 0px; left: 0px;";
        let jointDiv = elem;


        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; height: 100px; border: 1px solid rgba(0, 0, 0, 0.5); background-color: rgba(255, 255, 255, 0.01); width: 200px; height: 100px; position: absolute; top: 0px; left: 0px;";
        elem.style.width = width;
        elem.style.height = height;
        if ("captionForFront" in lop) elem.innerHTML = lop.captionForFront;
        if ("innerHTMLForFrontOuter" in lop) elem.innerHTML = lop.innerHTMLForFrontOuter;
        elem.style.transform += "rotateZ(180deg)";
        elem.addEventListener("click", (function(e) {
            if (!this.frontDiv.isLifted || this.frontDiv.isLifted == false) {
                this.bottomDiv.style.transform += "translateZ(100px)";
                this.frontDiv.isLifted = true;
            } else {
                this.bottomDiv.style.transform += "translateZ(-100px)";
                this.frontDiv.isLifted = false;
            }
            return;
            if (!this.frontDiv.isLifted || this.frontDiv.isLifted == false) {
                this.frontDiv.style.transform += "translateY(-100px)";
                this.frontInnerDiv.style.transform += "translateY(-100px)";
                this.frontDiv.isLifted = true;
            } else {
                this.frontDiv.style.transform += "translateY(100px)";
                this.frontInnerDiv.style.transform += "translateY(100px)";
                this.frontDiv.isLifted = false;
            }
        }).bind(this));
        this.frontDiv = elem;

        elem = document.createElement("div");
        elem.className = "Disc FrontInner";
        elem.style.width = width;
        elem.style.height = height;
        elem.innerHTML = lop.innerHTMLForFrontInner;
        elem.style.transform += "rotateX(180deg)";
        elem.addEventListener("click", (function(e) {
          if (this.frontInnerDiv.style.width == this.widthOfFront) {

            this.rootDiv.dispatchEvent(new CustomEvent('hold', {detail: {left: this.bottomDiv.style.left}}));

            this.bottomDiv.style.width = this.width;
            this.frontDiv.style.width = this.width;
            this.frontInnerDiv.style.width = this.width;
          } else {

            this.rootDiv.dispatchEvent(new CustomEvent('expand', {detail: {left: this.bottomDiv.style.left}}));

            this.bottomDiv.style.width = widthOfDisc + "px";
            this.frontDiv.style.width = this.widthOfFront;
            this.frontInnerDiv.style.width = this.widthOfFront;
          }
        }).bind(this));
        this.frontInnerDiv = elem;


        jointDiv.appendChild(this.frontDiv);
        jointDiv.appendChild(this.frontInnerDiv);
        this.bottomDiv.appendChild(jointDiv);
//        this.rootDiv.appendChild(this.frontDiv);
        this.bottomDiv.appendChild(this.bottomOuterDiv);
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

    moveZ(value) {
        this.bottomDiv.style.transform += "translateZ(" + value + "px" + ")";
    }

    rotateY(value) {
      this.bottomDiv.style.transform += "rotateZ(" + value + "deg)";
    }

}
