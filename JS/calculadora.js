function calculateFootprint() {

    const electricity = parseFloat(document.getElementById('electricity').value);
    const gas = parseFloat(document.getElementById('gas').value);
    const vehicleMileage = parseFloat(document.getElementById('vehicleMileage').value);
    const publicTransport = parseFloat(document.getElementById('publicTransport').value);

    if (isNaN(electricity) || isNaN(gas) || isNaN(vehicleMileage) || isNaN(publicTransport)) {
        alert('Por favor, preencha todos os campos com valores numéricos válidos.');
        return;
    }  

        const carbonFootprint = (electricity * 0.4) + (gas * 5) + (vehicleMileage * 0.4) + (publicTransport * 0.2);

        displayResult(carbonFootprint);
    }

    function displayResult(footprint) {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `<h2>Sua pegada de carbono estimada é: ${footprint.toFixed(2)} kgCO2e</h2> `;

        if (footprint > 0) {
            resultElement.innerHTML += " <h2>Aqui estão algumas dicas para reduzir sua pegada de carbono:</h2>";
            resultElement.innerHTML += "<ul class='coluna'>";
            resultElement.innerHTML += "<li class='linha'>Use eletrodomésticos e lâmpadas eficientes em termos de energia.</li>";
            resultElement.innerHTML += "<li class='linha'>Configure seu termostato para uma temperatura de economia de energia.</li>";
            resultElement.innerHTML += "<li class='linha'>Considere fazer carona ou usar o transporte público com mais frequência.</li>";
            resultElement.innerHTML += "<li class='linha'>Plante árvores ou apoie projetos de reflorestamento para compensar as emissões de carbono.</li>";
            resultElement.innerHTML += "</ul>";
        }
    }