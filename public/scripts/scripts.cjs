function calcular(event) {
  event.preventDefault();
  const peso = Number(document.getElementById('peso').value);
  const idade = Number(document.getElementById('idade').value);
  const altura = Number(document.getElementById('altura').value);
  const genero = seleciona('genero');
  const dados = calcTMB(peso, idade, altura, genero);
  const dadosIMC= calcIMC(peso, altura)

  document.getElementById('metabolismo_basal').innerHTML = Math.ceil(
    dados.basal
  );
  document.getElementById('sedentario').innerHTML = Math.ceil(dados.sedentario);
  document.getElementById('exercicio_leve').innerHTML = Math.ceil(
    dados.exercicio_leve
  );
  document.getElementById('exercicio_moderado').innerHTML = Math.ceil(
    dados.moderado
  );
  document.getElementById('ativo').innerHTML = Math.ceil(dados.ativo);
  document.getElementById('super_ativo').innerHTML = Math.ceil(
    dados.superAtivo
  );
  document.getElementById('ganhar_peso').innerHTML = Math.ceil(
    dados.ganharPeso
  );
  document.getElementById('perder_peso').innerHTML = Math.ceil(
    dados.perderPeso
  );

  document.getElementById('imc').innerHTML = Math.ceil(
    dadosIMC
  );
  document.getElementById('imc_classification').innerHTML = calcTabelaIMC(dadosIMC) ;
  
  document.getElementById('result-data').style.visibility = 'visible';
}

//pega o genero se masculino ou feminino
function seleciona(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

/* função para calcular a taxa metabólica basal e o nível de calorias necessárias
de acordo com a prática esportiva*/
function calcTMB(peso, idade, altura, genero) {
  const res =
    genero === 'Masculino'
      ? 10 * peso + 6.25 * altura - 5 * idade + 5
      : 10 * peso + 6.25 * altura - 5 * idade - 161;
  const resData = {
    basal: res,
    sedentario: 1.2 * res,
    exercicio_leve: 1.375 * res,
    moderado: 1.55 * res,
    ativo: 1.725 * res,
    superAtivo: 1.9 * res,
    ganharPeso: res + 450,
    perderPeso: res - 450,
  };
  return resData;
}

function calcIMC(peso, altura) {
  if (peso <= 0 || altura <= 0) {
    return null;
  }

  const alturaMetros = altura / 100;
  const imc = peso / (alturaMetros * alturaMetros);

  return imc.toFixed(2);
}

module.exports = { calcIMC,calcTMB }
