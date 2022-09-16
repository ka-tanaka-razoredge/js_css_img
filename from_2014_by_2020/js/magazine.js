class Magazine {

    tense;

    /**
     * @param tense
     * @param width
     * @param innerHTML
     * @param bottomColor
     */
    constructor(lop) {
        this.rootDiv = lop.rootDiv; this.spineDiv = null;   this.jointDiv = null;   this.bottomDiv = null;  this.discs = [];

        let elem;
        if ("tense" in lop) this.tense = lop.tense;

        let width = "200px";
        if ("width" in lop) width = lop.width;
        if (("bottomColor" in lop) == false) lop.bottomColor = "rgba(0, 0, 255, 0.9)";

        //--------------------------------------------------------------------------------
        // bottomDiv
        //--------------------------------------------------------------------------------
        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; width: " + width + "; height: 30px; background-color:" + lop.bottomColor + "; position: absolute; top: 0px; left: 0px; z-index: 1000;";
//        elem.style = "transform-style: preserve-3d; border: 1px solid blue; width: " + width + "; height: 30px; background-color:" + lop.bottomColor + "; position: absolute; top: 0px; left: 0px; z-index: 1000;";
        if ("innerHTMLForBottomInner" in lop) elem.innerHTML = lop.innerHTMLForBottomInner;
        this.bottomDiv = elem;
        elem.addEventListener("dblclick", (function(e) {
            if (!this.tense || this.tense === "future") {
//              this.jointDiv.style.transition = "1S";
                (this.jointDiv.style.transform == "rotateX(0deg)") ? this.jointDiv.style.transform = "rotateX(90deg)" : this.jointDiv.style.transform = "rotateX(0deg)";
//              this.bottomDiv.style.transform += "rotateZ(180deg)";
            } else {
              this.jointDiv.style.transform = "rotateX(-180deg)";
            }
            e.stopPropagation();
        }).bind(this));

        //--------------------------------------------------------------------------------
        // jointDiv
        //--------------------------------------------------------------------------------
        elem = document.createElement("div");
        if (("tense" in lop) == false) {
          elem.style = "border: 1px solid red; transform-style: preserve-3d; position: absolute; top: 0px";
//        elem.style = "transfrom-style: preserve-3d; perspective: 800px; border: 1px solid red;";
        } else {
          elem.style = "border: 1px solid red; transform-style: preserve-3d; position: relative; top: 20px;";
        }

        this.jointDiv = elem;


        elem = document.createElement("div");
//                   "perspective: 400px; perspective-origin: 50% 100px;"
        elem.style = "transform-style: preserve-3d; height: 100px; background-color: rgba(100, 100, 100, 0.1); width: " + width + "; height: 100px; position: absolute; top: 0px; left: 0px; z-index: 1100;";
        if ("duration" in lop) elem.style.height = lop.duration + "px";
        if (("tense" in lop) == false) {
        } else {
        }


        ("innerHTML" in lop) ? elem.innerHTML = lop.innerHTML : elem.innerHTML = "　";
        elem.addEventListener("dblclick", (function(e) {
            if (!this.tense || this.tense === "future") {
//              this.jointDiv.style.transition = "1S";
                (this.jointDiv.style.transform == "rotateX(0deg)") ? this.jointDiv.style.transform = "rotateX(90deg)" : this.jointDiv.style.transform = "rotateX(0deg)";
//              this.bottomDiv.style.transform += "rotateZ(180deg)";
            } else {
              this.jointDiv.style.transform = "rotateX(-180deg)";
            }
            e.stopPropagation();
        }).bind(this));
        elem.addEventListener('click', (function(e) {
/*
          if (parseInt(this.spineDiv.style.width) == widthOfDisc) {

            this.rootDiv.dispatchEvent(new CustomEvent('hold', {detail: {left: this.bottomDiv.style.left}}));

            this.bottomDiv.style.width = widthOfDiscHolded;
            this.spineDiv.style.width = widthOfDiscHolded;
          } else {

            this.rootDiv.dispatchEvent(new CustomEvent('expand', {detail: {left: this.bottomDiv.style.left}}));

            this.bottomDiv.style.width = widthOfDisc + "px";
            this.spineDiv.style.width = widthOfDisc + "px";
          }
*/
        }).bind(this));
        this.spineDiv = elem;

        this.jointDiv.appendChild(this.spineDiv);
        this.bottomDiv.appendChild(this.jointDiv);
        this.rootDiv.appendChild(this.bottomDiv);

    }

    getBottom() {
      return this.spineDiv;
    }

    registerDisc(lop) {
        let elem;

        lop.rootDiv = this.spineDiv;
        elem = new Disc(lop);
        elem.moveY(lop.top);
//        this.spineDiv.appendChild(elem);
        return elem;
    }

    inflate() {
        if (this.tense === "past") {
//          this.jointDiv.style.transform += "rotateZ(180deg)";
            this.spineDiv.style.transform += "rotateX(180deg)";
            this.jointDiv.style.transform = "rotateX(90deg)";
        } else {
            this.jointDiv.style.transform = "rotateX(90deg)";
        }
    }

    rotateY(value) {
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
