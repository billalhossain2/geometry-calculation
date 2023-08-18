function getArea(geometryName, elementId1, elementId2){
    if(!geometryName || !elementId1 || !elementId2){
        return alert("Please input name, elementId1 and elementId2 value");
    }
  if(geometryName === "Triange" || geometryName === "Rhombus" || geometryName === "Pentagon"){
    const area = 0.5 * parseInt(getInputValue(elementId1)) * parseInt(getInputValue(elementId2));
    return area;
  }else if(geometryName === "Rectangle" || geometryName === "Parallelogram"){
    const area = parseInt(getInputValue(elementId1)) * parseInt(getInputValue(elementId2));
    return area;
  }else if(geometryName === "Ellipse"){
    const area = 3.14 * parseInt(getInputValue(elementId1)) * parseInt(getInputValue(elementId2));
    return area;
  }else{
    alert('Invalid geometry name!')
  }
}

function resetField(targetElement){
 const input1 = targetElement.parentNode.previousElementSibling.children[0];
 const input2 = targetElement.parentNode.previousElementSibling.children[2];
 input1.value = "";
 input2.value = "";
}


function isInvalidInput(targetElement){
    const input1 = targetElement.parentNode.previousElementSibling.children[0];
    const input2 = targetElement.parentNode.previousElementSibling.children[2];
 if(!input1.value || !input2.value){
    alert("Please input data")
    return true
 }else if(input1.value < 0 || input2.value < 0){
    alert("Please input positive value")
    return true
}else if(isNaN(input1.value) || isNaN(input2.value)){
    alert("Please input a valid namber")
    return true
}
}


//create dynamic element
const table = getElementById("table");

const clearAllBtn = getElementById("clear-all-btn");
clearAllBtn.addEventListener('click', function(){
    table.innerHTML = "";
    this.classList.add('hidden')
})

function addCalculationEntry(geometryName, area){

const tr = document.createElement('tr');
let count = table.childElementCount;
 tr.innerHTML = `
        <td>${count+1}.</td>
        <td colspan = '2'>${geometryName}</td>
        <td>${area}</td>
        <td colspan='2'><span>cm</span><sup>2</sup></td>
        <td style="text-align:right" colspan = '3'><button onclick = "convertBtn('${area}', this)">Convert to m<sup>2</sup></button></td>
 `;
 table.appendChild(tr);
 if(table.children.length === 1){
    clearAllBtn.classList.remove('hidden');
 }else if(table.children.length === 0){
    clearAllBtn.classList.add('hidden')
 }
}


// event listeners 
getElementById("triangle-calculate-btn").addEventListener('click', function(){
    if(isInvalidInput(this)){
        return;
    }

    const triangleArea = getArea("Triange", "triangle-input-base", "triangle-input-height");
    addCalculationEntry("Triange", triangleArea)
    resetField(this);
})

getElementById("recatangle-calculate-btn").addEventListener('click', function(){
    if(isInvalidInput(this)){
        return;
    }

    const rectangleArea = getArea("Rectangle", "recatangle-input-height", "recatangle-input-width");
    addCalculationEntry("Rectangle", rectangleArea)
    resetField(this);
})


getElementById("parallelogram-calculate-btn").addEventListener('click', function(){
    if(isInvalidInput(this)){
        return;
    }

    const parallelogramArea = getArea("Parallelogram", "parallelogram-input-base", "parallelogram-input-height");
    addCalculationEntry("Parallelogram", parallelogramArea)
    resetField(this);
})


getElementById("rhombus-calculate-btn").addEventListener('click', function(){
    if(isInvalidInput(this)){
        return;
    }

    const rhombusArea = getArea("Rhombus", "rhombus-input-d1", "rhombus-input-d2");
    addCalculationEntry("Rhombus", rhombusArea)
    resetField(this);
})


getElementById("pentagon-calculate-btn").addEventListener('click', function(){
    if(isInvalidInput(this)){
        return;
    }

    const pentagonArea = getArea("Pentagon", "pentagon-input-p", "pentagon-input-b");
    addCalculationEntry("Pentagon", pentagonArea)
    resetField(this);
})


getElementById("ellipse-calculate-btn").addEventListener('click', function(){
    if(isInvalidInput(this)){
        return;
    }

    const ellipseArea = getArea("Ellipse", "ellipse-input-a", "ellipse-input-b");
    addCalculationEntry("Ellipse", ellipseArea)
    console.log(ellipseArea)
    resetField(this);
})

function convertBtn(area, target){
    const unitContainer = target.parentNode.previousElementSibling.children[0];
    const unitValueContainer = target.parentNode.previousElementSibling.previousElementSibling;
    
    if(unitContainer.innerText === "cm"){
        const meter = unitValueContainer.innerText / 100;
        unitValueContainer.innerText = meter;
        unitContainer.innerText = "m";
        target.innerHTML = "Convert to cm<sup>2</sup>";
    }else if(unitContainer.innerText === "m"){
        const centimeter = unitValueContainer.innerText * 100;
        unitValueContainer.innerText = centimeter;
        unitContainer.innerText = "cm";
        target.innerHTML = "Convert to m<sup>2</sup>";
    }
}

const cardsContianer = getElementById("cards-container")
cardsContianer.addEventListener('click', function(ev){
  if(ev.target.classList.contains("fa-pen-to-square")){
    const unitValue1 = ev.target.parentNode.previousElementSibling.children[0];
    const unitValue2 = ev.target.parentNode.previousElementSibling.children[1];
    
    const input1 = ev.target.parentNode.parentNode.nextElementSibling.children[0];
    const input2 = ev.target.parentNode.parentNode.nextElementSibling.children[2];
    
    input1.value = unitValue1.innerText;
    input2.value = unitValue2.innerText;
  }else if(ev.target.classList.contains("fa-square")){
    const input1 = ev.target.parentNode.parentNode.children[0]
    const input2 = ev.target.parentNode.parentNode.children[2]
    if(!input1.value || !input2.value){
        return alert("Please fill in the fields")
    }
    const unitValueContainer1 = ev.target.parentNode.parentNode.previousElementSibling.children[0].children[0];
    const unitValueContainer2 = ev.target.parentNode.parentNode.previousElementSibling.children[0].children[1];
    
    unitValueContainer1.innerText = input1.value;
    unitValueContainer2.innerText = input2.value;

    //reset the fields
    input1.value = "";
    input2.value = "";
  }
})
