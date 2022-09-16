class DiscSystem {
    constructor(lop) {
        this.rootDiv = lop.rootDiv; this.frame = null;  this.terrain = null; this.loupe = null;
        let elem = null;
        elem = document.createElement("div");
        // transform-style: preserve-3d; perspective: 800px;
        elem.style = "border: 1px solid silver;  perspective: 800px; width: 1600px; height: 900px;";
        this.frame = elem;

        elem = document.createElement("div");
        elem.style = "transform-style: preserve-3d; perspective: 800px; border: 1px solid red; width: 1600px; height: 450px; position: relative; left: 300px;";
        elem.style.height = (30 * 16) + "px";
        this.terrain = elem;

        this.frame.appendChild(this.terrain);
        this.rootDiv.appendChild(this.frame);

        this.terrain.addEventListener("hold", ((e) => {
          for (let i = 0; i <= this.terrain.children.length - 1; i++) {
            if (parseInt(e.detail.left) < parseInt(this.terrain.children[i].style.left)) {
              this.terrain.children[i].style.left = (parseInt(this.terrain.children[i].style.left)) - (widthOfDisc - widthOfDiscHolded) + "px";
            }
          }
        }).bind(this));
        this.terrain.addEventListener("expand", ((e) => {
          for (let i = 0; i <= this.terrain.children.length - 1; i++) {
            if (parseInt(e.detail.left) < parseInt(this.terrain.children[i].style.left)) {
              this.terrain.children[i].style.left = (parseInt(this.terrain.children[i].style.left)) + (widthOfDisc - widthOfDiscHolded) + "px";
            }
          }
        }).bind(this));
    }

    getBottom() { return this.terrain; }

    setLoupe(value) {
        this.loupe = value;
    }
    getLoupe() {
        return this.loupe;
    }

    register(lop) {
        this.terrain.appendChild(lop.value);
    }

    deploy() {

        // from northen wall
//MUTE        this.terrain.style.transform = "rotateZ(180deg) rotateX(-60deg) rotateZ(15deg) translateZ(-100px)";

//        this.terrain.style.transform += "rotateX(45deg) rotateZ(-90deg) rotateY(-5deg)";

        this.terrain.style.transform += "rotateX(45deg)";
//        this.terrain.style.transform += "rotateZ(-15deg)";
    }
}
