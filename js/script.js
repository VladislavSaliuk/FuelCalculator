
let HTMLPageWidgets = {
    fuelComponentCInputId: document.getElementById("fuelComponentC"),
    fuelComponentHInputId: document.getElementById("fuelComponentH"),
    fuelComponentSInputId: document.getElementById("fuelComponentS"),
    fuelComponentOInputId: document.getElementById("fuelComponentO"),
    fuelComponentNInputId: document.getElementById("fuelComponentN"),
    fuelComponentAInputId: document.getElementById("fuelComponentA"),
    fuelComponentWInputId: document.getElementById("fuelComponentW"),
    calculateButtonId: document.getElementById("calculateButton"),
}   

let fuelComponentsValues = {
    fuelComponentCValue: HTMLPageWidgets.fuelComponentCInputId.value,
    fuelComponentHValue: HTMLPageWidgets.fuelComponentHInputId.value,
    fuelComponentSValue: HTMLPageWidgets.fuelComponentSInputId.value,
    fuelComponentOValue: HTMLPageWidgets.fuelComponentOInputId.value,
    fuelComponentNValue: HTMLPageWidgets.fuelComponentNInputId.value,
    fuelComponentAValue: HTMLPageWidgets.fuelComponentAInputId.value,
    fuelComponentWValue: HTMLPageWidgets.fuelComponentWInputId.value,
}


function calculateCoeficientKPC() {
    return (100 / (100 - fuelComponentsValues.fuelComponentWValue))
}

function calculateCoeficientKPG() {
    return (100 / (100 - fuelComponentsValues.fuelComponentWValue - fuelComponentsValues.fuelComponentAValue))
}

