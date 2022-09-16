function TagIndicator(data, ownerDiv) {
    this.groundDiv;
    this.button4Delete;
    this.input4Id;
    this.input4Name;

//    this.construct => (data, ownerDiv = null) {
//    }

    this.ownerDiv = ownerDiv;

    let solvent, solute;
    solvent = document.createElement("div");
    this.ownerDiv.appendChild(solvent);
    solvent.controller = this;
    this.groundDiv = solvent;

    solute = document.createElement("input");
    solute.type = "button";
    solute.value = "-";
    solvent.appendChild(solute);
    this.button4Delete = solute;

    solute = document.createElement("input");
    solute.type = "text";
    solvent.appendChild(solute);
    this.input4Id = solute;

    solute = document.createElement("input");
    solute.type = "text";
    solvent.appendChild(solute);
    this.input4Name = solute;

    this.input4Id.value = data.id;
    this.input4Name.value = data.name;

}
