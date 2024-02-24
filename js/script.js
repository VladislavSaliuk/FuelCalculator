function getFuelComponentValues() {
    let fuelComponentsValues = {};
    let inputIds = ["fuelComponentCarbon", "fuelComponentHydrogen", "fuelComponentSulfur", "fuelComponentOxygen", "fuelComponentNitrogen", "fuelComponentAsh", "fuelComponentWolfram"];
    
    inputIds.forEach(function(id) {
        fuelComponentsValues[id] = parseFloat(document.getElementById(id).value);
    });

    return fuelComponentsValues;
}

function calculateCoeficientKPC() {
    let fuelComponentWolframValue = getFuelComponentValues()["fuelComponentWolfram"];
    return (100 / (100 - fuelComponentWolframValue));
}

function calculateCoeficientKPG() {
    let fuelComponentsValues = getFuelComponentValues();
    return (100 / (100 - fuelComponentsValues["fuelComponentWolfram"] - fuelComponentsValues["fuelComponentAsh"]));
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
    return ((339 * getFuelComponentValues()["fuelComponentCarbon"] + 1030 * getFuelComponentValues()["fuelComponentHydrogen"] - 108.8 * (getFuelComponentValues()["fuelComponentOxygen"] - getFuelComponentValues()["fuelComponentSulfur"]) - 25 * getFuelComponentValues()["fuelComponentWolfram"]) / 1000); 
}

function calculateLowerHeatOfCombutisionForTheDryMassOfFuel() {
    return ((calculateLowerHeatOfCombutisionForTheWorkingMassOfFuel() + (0.025 * getFuelComponentValues()["fuelComponentWolfram"])) * (100 / (100 - getFuelComponentValues()["fuelComponentWolfram"])));
}

function calculateLowerHeatOfCombutisionForTheСombustibleMassOfFuel() {
    return ((calculateLowerHeatOfCombutisionForTheWorkingMassOfFuel() + (0.025 * getFuelComponentValues()["fuelComponentWolfram"])) * (100 / (100 - getFuelComponentValues()["fuelComponentWolfram"] - getFuelComponentValues()["fuelComponentAsh"])));
}

function getConstantFuelComponentValues(){

    const constantFuelComponentsValues = {
        fuelComponentCarbon: 85.5,
        fuelComponentHydrogen: 11.2,
        fuelComponentSulfur: 2.5,
        fuelComponentOxygen: 0.8,
        fuelComponentVanadium: 333.3,
        fuelComponentWolfram: 2,
        fuelComponentAsh: 0.15,
        fuelComponentQuantityOfWarm: 40.4
    };

    return constantFuelComponentsValues;
}

function calculateTheCompositionOfTheFuelOilWorkingMass(){
    let fuelComponentsValues = getConstantFuelComponentValues();
    
    let calculationResults = {
        fuelComponentCarbon: (fuelComponentsValues['fuelComponentCarbon'] * ((100 - fuelComponentsValues['fuelComponentWolfram'] - fuelComponentsValues['fuelComponentAsh']) / 100)),
        fuelComponentHydrogen: (fuelComponentsValues['fuelComponentHydrogen'] * ((100 - fuelComponentsValues['fuelComponentWolfram'] - fuelComponentsValues['fuelComponentAsh']) / 100)),
        fuelComponentSulfur: (fuelComponentsValues['fuelComponentSulfur'] * ((100 - fuelComponentsValues['fuelComponentWolfram'] - fuelComponentsValues['fuelComponentAsh']) / 100)),
        fuelComponentOxygen: (fuelComponentsValues['fuelComponentOxygen'] * ((100 - fuelComponentsValues['fuelComponentWolfram'] - (fuelComponentsValues['fuelComponentAsh'] / 10)) / 100)),
        fuelComponentVanadium: (fuelComponentsValues['fuelComponentVanadium'] * ((100 - fuelComponentsValues['fuelComponentWolfram']) / 100)),
        fuelComponentAsh: (fuelComponentsValues['fuelComponentAsh'] * ((100 - fuelComponentsValues['fuelComponentWolfram']) / 100)),
    };

    return calculationResults;
}

function calculateLowerHeatOfCombustionOfFuelOil(){
    return ((getConstantFuelComponentValues()["fuelComponentQuantityOfWarm"] * ((100 - getConstantFuelComponentValues()["fuelComponentWolfram"] - getConstantFuelComponentValues()["fuelComponentAsh"]) / 100)) - (0.025 * getConstantFuelComponentValues()["fuelComponentWolfram"]));
}

function setCalculationResults(){
    document.querySelector('.coefficientOfTransitionFromWorkingToDryMassResult').textContent = calculateCoeficientKPC().toFixed(2) + "%";
    document.querySelector('.coefficientOfTransitionFromWorkingToCombustibleMassResult').textContent = calculateCoeficientKPG().toFixed(2) + "%";
    document.querySelector('.dryCarbonComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPC())['fuelComponentCarbon'].toFixed(2) + "%";
    document.querySelector('.dryHydrogenComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPC())['fuelComponentHydrogen'].toFixed(2) + "%";
    document.querySelector('.drySulfurComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPC())['fuelComponentSulfur'].toFixed(2) + "%";
    document.querySelector('.dryNitrogenComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPC())['fuelComponentNitrogen'].toFixed(2) + "%";
    document.querySelector('.dryOxygenComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPC())['fuelComponentOxygen'].toFixed(2) + "%";
    document.querySelector('.dryAshComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPC())['fuelComponentAsh'].toFixed(2) + "%";
    document.querySelector('.combustibleCarbonComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPG())['fuelComponentCarbon'].toFixed(2) + "%";
    document.querySelector('.combustibleHydrogenComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPG())['fuelComponentHydrogen'].toFixed(2) + "%";
    document.querySelector('.combustibleSulfurComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPG())['fuelComponentSulfur'].toFixed(2) + "%";
    document.querySelector('.combustibleNitrogenComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPG())['fuelComponentNitrogen'].toFixed(2) + "%";
    document.querySelector('.combustibleOxygenComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPG())['fuelComponentOxygen'].toFixed(2) + "%";
    document.querySelector('.combustibleAshComponent').textContent = calculateTheCompositionOfWeightOfTheFuelUsingCoeficient(calculateCoeficientKPG())['fuelComponentAsh'].toFixed(2) + "%";
    document.querySelector('.lowerHeatOfCombutisionForTheWorkingMassOfFuel').textContent = calculateLowerHeatOfCombutisionForTheWorkingMassOfFuel().toFixed(2) + " MJ";
    document.querySelector('.lowerHeatOfCombutisionForTheDryMassOfFuel').textContent = calculateLowerHeatOfCombutisionForTheDryMassOfFuel().toFixed(2) + " MJ";
    document.querySelector('.lowerHeatOfCombutisionForTheCombustibleMassOfFuel').textContent = calculateLowerHeatOfCombutisionForTheСombustibleMassOfFuel().toFixed(2) + " MJ";
    document.querySelector('.workingCarbonComponent').textContent = calculateTheCompositionOfTheFuelOilWorkingMass()['fuelComponentCarbon'].toFixed(2) + "%";
    document.querySelector('.workingHydrogenComponent').textContent = calculateTheCompositionOfTheFuelOilWorkingMass()['fuelComponentHydrogen'].toFixed(2) + "%";
    document.querySelector('.workingSulfurComponent').textContent = calculateTheCompositionOfTheFuelOilWorkingMass()['fuelComponentSulfur'].toFixed(2) + "%";
    document.querySelector('.workingVanadiumComponent').textContent = calculateTheCompositionOfTheFuelOilWorkingMass()['fuelComponentVanadium'].toFixed(2) + "%";
    document.querySelector('.workingOxygenComponent').textContent = calculateTheCompositionOfTheFuelOilWorkingMass()['fuelComponentOxygen'].toFixed(2) + "%";
    document.querySelector('.workingAshComponent').textContent = calculateTheCompositionOfTheFuelOilWorkingMass()['fuelComponentAsh'].toFixed(2) + "%";
    document.querySelector('.lowerHeatOfCombustionOfFuelOil').textContent = calculateLowerHeatOfCombustionOfFuelOil().toFixed(2) + " MJ";
}


let button = document.getElementById("calculateButton");
button.addEventListener("click", setCalculationResults);