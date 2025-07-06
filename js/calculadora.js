// Calculadora de Planos com Personal Trainer - Versão Simplificada
document.addEventListener("DOMContentLoaded", function() {
    initCalculadora();
});

function initCalculadora() {
    const personalOptions = document.querySelectorAll(".personal-option");
    const frequenciaSelect = document.getElementById("frequencia");
    const periodoSelect = document.getElementById("periodo");
    const calcularBtn = document.querySelector(".calc-form .btn-primary");
    
    let selectedPersonal = null;
    
    // Dados dos personal trainers
    const personalData = {
        robsom: {
            name: "Robsom",
            icon: "fas fa-dumbbell",
            specialties: ["Musculação", "Emagrecimento", "Força"],
            description: "Especialista em hipertrofia e força",
            pricePerSession: 80
        },
        jessica: {
            name: "Jessica",
            icon: "fas fa-heart",
            specialties: ["Funcional", "Pilates", "Reabilitação"],
            description: "Especialista em bem-estar feminino",
            pricePerSession: 75
        }
    };
    
    // Seleção de personal trainer
    personalOptions.forEach(option => {
        option.addEventListener("click", () => {
            personalOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectedPersonal = option.dataset.personal;
        });
    });
    
    // Cálculo de valores
    if (calcularBtn) {
        calcularBtn.addEventListener("click", calcularPlano);
    }
    
    function calcularPlano() {
        if (!selectedPersonal) {
            alert("Por favor, selecione um personal trainer.");
            return;
        }
        
        const frequencia = frequenciaSelect?.value;
        const periodo = periodoSelect?.value;
        
        if (!frequencia || !periodo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        
        // Preços base da academia
        const precosAcademia = {
            "mensal": 149,
            "trimestral": 129,
            "anual": 99
        };
        
        // Frequência semanal
        const frequenciaSemanal = {
            "2-3": 2.5,
            "4-5": 4.5,
            "6-7": 6.5
        };
        
        const precoAcademia = precosAcademia[periodo];
        const precoPersonalSessao = personalData[selectedPersonal].pricePerSession;
        const sessoesPorSemana = frequenciaSemanal[frequencia];
        const sessoesPorMes = sessoesPorSemana * 4;
        const precoPersonalMensal = precoPersonalSessao * sessoesPorMes;
        
        // Aplicar descontos
        let desconto = 0;
        if (periodo === "anual") desconto = 0.15; // 15% anual
        else if (periodo === "trimestral") desconto = 0.10; // 10% trimestral
        
        const precoPersonalComDesconto = precoPersonalMensal * (1 - desconto);
        const precoTotal = precoAcademia + precoPersonalComDesconto;
        
        // Mostrar resultado
        mostrarResultado({
            personal: personalData[selectedPersonal],
            frequencia: frequencia,
            periodo: periodo,
            precoAcademia: precoAcademia,
            precoPersonal: precoPersonalComDesconto,
            precoTotal: precoTotal,
            desconto: desconto,
            sessoesPorMes: sessoesPorMes
        });
    }
    
    function mostrarResultado(dados) {
        const periodoTexto = dados.periodo === "mensal" ? "1 mês" : dados.periodo === "trimestral" ? "3 meses" : "12 meses";
        const frequenciaTexto = dados.frequencia === "2-3" ? "2-3 vezes" : dados.frequencia === "4-5" ? "4-5 vezes" : "6-7 vezes";
        
        // Criar ou atualizar o resultado
        let resultadoDiv = document.getElementById("resultado-calculo");
        if (!resultadoDiv) {
            resultadoDiv = document.createElement("div");
            resultadoDiv.id = "resultado-calculo";
            resultadoDiv.className = "calc-result";
            const calcForm = document.querySelector(".calc-form");
            calcForm.parentNode.appendChild(resultadoDiv);
        }
        
        resultadoDiv.innerHTML = `
            <div class="resultado-header">
                <h3><i class="fas fa-calculator"></i> Seu Plano Personalizado</h3>
            </div>
            <div class="resultado-content">
                <div class="personal-selected">
                    <div class="personal-avatar">
                        <i class="${dados.personal.icon}"></i>
                    </div>
                    <div class="personal-info">
                        <h4>${dados.personal.name}</h4>
                        <p>${dados.personal.description}</p>
                        <div class="personal-tags">
                            ${dados.personal.specialties.map(spec => `<span class="tag">${spec}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="resultado-detalhes">
                    <div class="info-item">
                        <strong>Frequência:</strong> ${frequenciaTexto} por semana
                    </div>
                    <div class="info-item">
                        <strong>Período:</strong> ${periodoTexto}
                    </div>
                    <div class="info-item">
                        <strong>Sessões/mês:</strong> ${dados.sessoesPorMes} sessões
                    </div>
                </div>
                
                <div class="resultado-precos">
                    <div class="preco-item">
                        <span>Academia:</span>
                        <span>R$ ${dados.precoAcademia.toFixed(2)}/mês</span>
                    </div>
                    <div class="preco-item">
                        <span>Personal Trainer:</span>
                        <span>R$ ${dados.precoPersonal.toFixed(2)}/mês</span>
                    </div>
                    ${dados.desconto > 0 ? `
                    <div class="preco-item desconto">
                        <span>Desconto aplicado:</span>
                        <span>-${(dados.desconto * 100).toFixed(0)}%</span>
                    </div>
                    ` : ""}
                    <div class="preco-total">
                        <span>Total:</span>
                        <span>R$ ${dados.precoTotal.toFixed(2)}/mês</span>
                    </div>
                </div>
                
                <div class="resultado-actions">
                    <a href="https://wa.me/5547988890781?text=Olá! Gostaria de contratar o plano ${periodoTexto} com ${dados.personal.name}. Frequência: ${frequenciaTexto}/semana. Valor: R$ ${dados.precoTotal.toFixed(2)}/mês" 
                       target="_blank" class="btn btn-primary btn-lg">
                        <i class="fab fa-whatsapp"></i>
                        Contratar com ${dados.personal.name}
                    </a>
                    <button type="button" class="btn btn-outline" onclick="resetCalculadora()">
                        <i class="fas fa-redo"></i>
                        Recalcular
                    </button>
                </div>
            </div>
        `;
        
        resultadoDiv.style.display = "block";
        resultadoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

// Função global para resetar a calculadora
function resetCalculadora() {
    const personalOptions = document.querySelectorAll(".personal-option");
    const frequenciaSelect = document.getElementById("frequencia");
    const periodoSelect = document.getElementById("periodo");
    const resultadoDiv = document.getElementById("resultado-calculo");
    
    personalOptions.forEach(opt => opt.classList.remove("selected"));
    frequenciaSelect.value = "";
    periodoSelect.value = "";
    
    if (resultadoDiv) {
        resultadoDiv.style.display = "none";
    }
}

// Função global para calcular plano (chamada pelo botão)
function calcularPlano() {
    const event = new Event('click');
    const calcularBtn = document.querySelector(".calc-form .btn-primary");
    if (calcularBtn) {
        calcularBtn.dispatchEvent(event);
    }
}

