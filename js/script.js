function getFuelComponentValues() {
    let fuelComponentsValues = {};
    let inputIds = ["fuelComponentC", "fuelComponentH", "fuelComponentS", "fuelComponentO", "fuelComponentN", "fuelComponentA", "fuelComponentW"];
    
    inputIds.forEach(function(id) {
        fuelComponentsValues[id] = parseFloat(document.getElementById(id).value);
    });

    return fuelComponentsValues;
}

function calculateCoeficientKPC() {
    let fuelComponentWValue = getFuelComponentValues()["fuelComponentW"];
    return (100 / (100 - fuelComponentWValue));
}

function calculateCoeficientKPG() {
    let fuelComponentsValues = getFuelComponentValues();
    return (100 / (100 - fuelComponentsValues["fuelComponentW"] - fuelComponentsValues["fuelComponentA"]));
}

function calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(coeficient){
    let calculationResults = {};
    
    let fuelComponentsValues = getFuelComponentValues();
    
    for (let id in fuelComponentsValues) {
        calculationResults[id] = fuelComponentsValues[id] * coeficient;
    }

    return calculationResults;
}

function calculateLowerHeatOfCombutisionForTheWorkingMassOfFuel(){
    return ((339 * getFuelComponentValues()["fuelComponentC"] + 1030 * getFuelComponentValues()["fuelComponentH"] - 108.8 * (getFuelComponentValues()["fuelComponentO"] - getFuelComponentValues()["fuelComponentS"]) - 25 * getFuelComponentValues()["fuelComponentW"]) / 1000); 
}

function calculateLowerHeatOfCombutisionForTheDryMassOfFuel() {
    return ((calculateLowerHeatOfCombutisionForTheWorkingMassOfFuel() + (0.025 * getFuelComponentValues()["fuelComponentW"])) * (100 / (100 - getFuelComponentValues()["fuelComponentW"])));
}

function calculateLowerHeatOfCombutisionForTheСombustibleMassOfFuel() {
    return ((calculateLowerHeatOfCombutisionForTheWorkingMassOfFuel() + (0.025 * getFuelComponentValues()["fuelComponentW"])) * (100 / (100 - getFuelComponentValues()["fuelComponentW"] - getFuelComponentValues()["fuelComponentA"])));
}

function getConstantFuelComponentValues(){

    const constantFuelComponentsValues = {
        fuelComponentC: 85.5,
        fuelComponentH: 11.2,
        fuelComponentS: 2.5,
        fuelComponentO: 0.8,
        fuelComponentV: 333.3,
        fuelComponentW: 2,
        fuelComponentA: 0.15,
        fuelComponentQ: 40.4
    };

    return constantFuelComponentsValues;
}

function calculateTheCompositionOfTheFuelOilWorkingMass(){
    let fuelComponentsValues = getConstantFuelComponentValues();
    
    let calculationResults = {
        fuelComponentC: (fuelComponentsValues['fuelComponentC'] * ((100 - fuelComponentsValues['fuelComponentW'] - fuelComponentsValues['fuelComponentA']) / 100)),
        fuelComponentH: (fuelComponentsValues['fuelComponentH'] * ((100 - fuelComponentsValues['fuelComponentW'] - fuelComponentsValues['fuelComponentA']) / 100)),
        fuelComponentS: (fuelComponentsValues['fuelComponentS'] * ((100 - fuelComponentsValues['fuelComponentW'] - fuelComponentsValues['fuelComponentA']) / 100)),
        fuelComponentO: (fuelComponentsValues['fuelComponentO'] * ((100 - fuelComponentsValues['fuelComponentW'] - (fuelComponentsValues['fuelComponentA'] / 10)) / 100)),
        fuelComponentV: (fuelComponentsValues['fuelComponentV'] * ((100 - fuelComponentsValues['fuelComponentW']) / 100)),
        fuelComponentA: (fuelComponentsValues['fuelComponentA'] * ((100 - fuelComponentsValues['fuelComponentW']) / 100)),
    };

    return calculationResults;
}

function calculateLowerHeatOfCombustionOfFuelOil(){
    return ((getConstantFuelComponentValues()["fuelComponentQ"] * ((100 - getConstantFuelComponentValues()["fuelComponentW"] - getConstantFuelComponentValues()["fuelComponentA"]) / 100)) - (0.025 * getConstantFuelComponentValues()["fuelComponentW"]));
}

function print(){
    console.log(calculateCoeficientKPC());
    console.log(calculateCoeficientKPG());
    console.log(calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPC()));
    console.log(calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPG()));
    console.log(calculateLowerHeatOfCombutisionForTheWorkingMassOfFuel());
    console.log(calculateLowerHeatOfCombutisionForTheDryMassOfFuel());
    console.log(calculateLowerHeatOfCombutisionForTheСombustibleMassOfFuel());
    console.log(calculateTheCompositionOfTheFuelOilWorkingMass());
    console.log(calculateLowerHeatOfCombustionOfFuelOil())
}

let button = document.getElementById("calculateButton");
button.addEventListener("click", print);