function SportEditor(ownerDiv) {

    //--------------------------------------------------------------------------------
    // view
    //--------------------------------------------------------------------------------
    this.groundDiv;
    this.sportArea;
    this.label4SportId;
    this.input4SportId;
    this.label4SportName;
    this.input4SportName;

    this.tagArea;
    this.button4AppendTag;
    this.tagList;

    this.button4Trigger;

    //--------------------------------------------------------------------------------
    // controller
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // model
    //--------------------------------------------------------------------------------

    /**
     * Receiving JSON style string,
     */
    this.setIngredients = (data) => {
        this.input4SportId.innerHTML = data._id;
//        this.input4SportId.innerHTML = data.id;
        this.input4SportName.value = data.name;

        for (let i = 0; i <= data.tags.length - 1; i++) {
console.log(data.tags[i]);
            new TagIndicator(data.tags[i], this.tagList);
        }
        console.log(this.tagList.children);

    }

    this.appendInputs = (form) => {
        let input;
        input = document.createElement("input");
        input.type = "hidden";
        input.name = "data[Sport][id]";
        input.value = this.input4SportId.innerHTML;
        form.appendChild(input);

        // TagModel
        for (let i = 0; i <= this.tagList.children.length - 1; i++) {
            try {
                input = document.createElement("input");
                input.type = "hidden";
                input.name = "data[Sport][tags][]";
                input.value = this.tagList.children[i].controller.input4Name.value;
                form.appendChild(input);
            } catch (e) {
                console.log(e);
            }
        }
    }

    this.addEventListener = (e, l) => {
        this.groundDiv.addEventListener(e, l);
    }


    //--------------------------------------------------------------------------------
    // constructor
    //--------------------------------------------------------------------------------
    let solvent, solute;
    this.ownerDiv = ownerDiv;
    solvent = document.createElement("div");
    this.groundDiv = solvent;
    this.ownerDiv.appendChild(this.groundDiv);

    solute = document.createElement("div");
    solute.innerHTML = "name: ";
    solvent.appendChild(solute);
    this.label4SportName = solute;

    solute = document.createElement("input");
    solute.type = "text";
    solvent.appendChild(solute);
    this.input4SportName = solute;

    solute = document.createElement("div");
    solute.innerHTML = "id: ";
    solvent.appendChild(solute);
    this.label4SportId = solute;

    solute = document.createElement("div");
    solvent.appendChild(solute);
    this.input4SportId = solute;

    solvent = document.createElement("div");
    this.tagArea = solvent;
    this.ownerDiv.appendChild(this.tagArea);

    solute = document.createElement("input");
    solute.type = "button";
    solute.value = "+";
    solute.addEventListener("click", (e) => {
        new TagIndicator({id: null, name: null}, this.tagList);
    });
    solvent.appendChild(solute);
    this.button4AppendTag = solute;

    solvent = this.groundDiv;
    solute = document.createElement("img");
    solute.id = "img_1";
    solvent.appendChild(solute);

    solvent = document.createElement("div");
    this.tagList = solvent;
    this.ownerDiv.appendChild(this.tagList);

    solvent = this.groundDiv;
    solute = document.createElement("input");
    solute.type = "button";
    solute.value = "update on editor";
    solute.addEventListener("click", (e) => {
        let form = document.createElement("form");
        this.ownerDiv.appendChild(form);
        form.action = "https://razor-edge.net/cakephp-2.4.4/sports/executeUpdating";
        form.method = "post";
        this.appendInputs(form);
        form.submit();
    });
    solvent.appendChild(solute);
    this.button4Trigger = solute;

}
