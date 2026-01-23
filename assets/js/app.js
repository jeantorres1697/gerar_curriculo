const ANO_ATUAL = 2026;

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização básica: carrega dados temporários ou cria campos iniciais
  if (!carregarDados()) {
    adicionarExperiencia();
    adicionarFormacao();
    adicionarHabilidade();
    adicionarIdioma();
  }

  // Configuração dos cliques nos botões de adicionar
  document.getElementById("adicionarExperiencia").onclick = () =>
    adicionarExperiencia();
  document.getElementById("adicionarFormacao").onclick = () =>
    adicionarFormacao();
  document.getElementById("adicionarHabilidade").onclick = () =>
    adicionarHabilidade();
  document.getElementById("adicionarIdioma").onclick = () => adicionarIdioma();

  // Máscara de Telefone Brasileira (00) 00000-0000
  const telInput = document.getElementById("telefone");
  telInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    e.target.value = value;
    atualizarPreview();
  });

  // Eventos gerais
  document
    .getElementById("curriculoForm")
    .addEventListener("input", atualizarPreview);
  document.getElementById("gerarPDF").onclick = gerarPDF;
  document.getElementById("foto").onchange = handleFotoUpload;
  document.getElementById("verHistoricos").onclick = abrirModalHistorico;

  atualizarPreview();
});

// --- FUNÇÕES DE ADIÇÃO (ESTRUTURADAS PARA O SEU CSS) ---

function adicionarExperiencia(dados = null) {
  const div = document.createElement("div");
  div.className = "item-entry";
  const anos = Array.from({ length: 40 }, (_, i) => ANO_ATUAL - i);
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  div.innerHTML = `
        <div class="item-entry-header">
            <span class="item-entry-title">Experiência Profissional</span>
            <button type="button" class="btn-remove" onclick="this.closest('.item-entry').remove(); atualizarPreview();">Remover</button>
        </div>
        <div class="form-row">
            <div class="form-group"><input type="text" class="exp-cargo" placeholder="Cargo" value="${dados?.cargo || ""}"></div>
            <div class="form-group"><input type="text" class="exp-empresa" placeholder="Empresa" value="${dados?.empresa || ""}"></div>
        </div>
        <div class="form-row" style="margin-top: 15px;">
            <div class="form-group">
                <label>Início</label>
                <div class="data-picker-group">
                    <select class="exp-inicio-mes" onchange="validarDatas(this)">${meses.map((m, i) => `<option value="${i + 1}" ${dados?.iM == i + 1 ? "selected" : ""}>${m}</option>`).join("")}</select>
                    <select class="exp-inicio-ano" onchange="validarDatas(this)">${anos.map((y) => `<option value="${y}" ${dados?.iA == y ? "selected" : ""}>${y}</option>`).join("")}</select>
                </div>
            </div>
            <div class="form-group">
                <label>Fim (deixe vazio se atual)</label>
                <div class="data-picker-group">
                    <select class="exp-fim-mes" onchange="validarDatas(this)"><option value="">Mês</option>${meses.map((m, i) => `<option value="${i + 1}" ${dados?.fM == i + 1 ? "selected" : ""}>${m}</option>`).join("")}</select>
                    <select class="exp-fim-ano" onchange="validarDatas(this)"><option value="">Ano</option>${anos.map((y) => `<option value="${y}" ${dados?.fA == y ? "selected" : ""}>${y}</option>`).join("")}</select>
                </div>
            </div>
        </div>
        <div class="form-group" style="margin-top: 15px;"><textarea class="exp-descricao" placeholder="Descrição das atividades">${dados?.desc || ""}</textarea></div>`;
  document.getElementById("experienciaContainer").appendChild(div);
  atualizarPreview();
}

function adicionarFormacao(dados = null) {
  const div = document.createElement("div");
  div.className = "item-entry";
  div.innerHTML = `
        <div class="item-entry-header">
            <span class="item-entry-title">Formação Acadêmica</span>
            <button type="button" class="btn-remove" onclick="this.closest('.item-entry').remove(); atualizarPreview();">Remover</button>
        </div>
        <div class="form-row">
            <div class="form-group"><input type="text" class="form-curso" placeholder="Curso" value="${dados?.curso || ""}"></div>
            <div class="form-group"><input type="text" class="form-instituicao" placeholder="Instituição" value="${dados?.inst || ""}"></div>
        </div>
        <div class="form-row" style="margin-top: 15px;">
            <div class="form-group">
                <input type="text" class="form-conclusao" placeholder="Ano Conclusão" value="${dados?.concl || ""}" 
                oninput="validarAnoFormacao(this)">
            </div>
            <div class="form-group">
                <select class="form-status">
                    <option value="Concluído" ${dados?.status === "Concluído" ? "selected" : ""}>Concluído</option>
                    <option value="Em andamento" ${dados?.status === "Em andamento" ? "selected" : ""}>Em andamento</option>
                </select>
            </div>
        </div>`;
  document.getElementById("formacaoContainer").appendChild(div);
  atualizarPreview();
}

// Validação do ano de formação (para não ser maior que o ano atual)
function validarAnoFormacao(el) {
  // Remove tudo que não é número
  let valor = el.value.replace(/\D/g, "");

  // Se tiver 4 dígitos, verifica se é maior que o ano atual
  if (valor.length === 4) {
    if (parseInt(valor) > ANO_ATUAL) {
      alert(`O ano de conclusão não pode ser superior a ${ANO_ATUAL}`);
      valor = ANO_ATUAL.toString();
    }
  }

  el.value = valor.slice(0, 4);
  atualizarPreview();
}

function adicionarHabilidade(val = "") {
  const div = document.createElement("div");
  div.className = "item-entry";
  div.innerHTML = `
        <div class="form-row" style="grid-template-columns: 1fr auto; align-items: center;">
            <div class="form-group"><input type="text" class="hab-nome" value="${val}" placeholder="Ex: Excel Avançado"></div>
            <button type="button" class="btn-remove" onclick="this.closest('.item-entry').remove(); atualizarPreview();">Remover</button>
        </div>`;
  document.getElementById("habilidadesContainer").appendChild(div);
  atualizarPreview();
}

function adicionarIdioma(dados = null) {
  const div = document.createElement("div");
  div.className = "item-entry";
  div.innerHTML = `
        <div class="form-row" style="grid-template-columns: 1fr 1fr auto; align-items: center;">
            <div class="form-group"><input type="text" class="idi-nome" placeholder="Idioma" value="${dados?.n || ""}"></div>
            <div class="form-group">
                <select class="idi-nivel">
                    <option value="Básico" ${dados?.nivel === "Básico" ? "selected" : ""}>Básico</option>
                    <option value="Intermediário" ${dados?.nivel === "Intermediário" ? "selected" : ""}>Intermediário</option>
                    <option value="Fluente" ${dados?.nivel === "Fluente" ? "selected" : ""}>Fluente</option>
                </select>
            </div>
            <button type="button" class="btn-remove" onclick="this.closest('.item-entry').remove(); atualizarPreview();">Remover</button>
        </div>`;
  document.getElementById("idiomasContainer").appendChild(div);
  atualizarPreview();
}

// --- VALIDAÇÕES E UTILS ---

function validarDatas(el) {
  const item = el.closest(".item-entry");
  const iM = parseInt(item.querySelector(".exp-inicio-mes").value);
  const iA = parseInt(item.querySelector(".exp-inicio-ano").value);
  const fM = parseInt(item.querySelector(".exp-fim-mes").value || 99);
  const fA = parseInt(item.querySelector(".exp-fim-ano").value || 9999);

  if (new Date(fA, fM - 1) < new Date(iA, iM - 1)) {
    alert("A data de término não pode ser anterior ao início!");
    item.querySelector(".exp-fim-mes").value = "";
    item.querySelector(".exp-fim-ano").value = "";
  }
  atualizarPreview();
}

function handleFotoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      localStorage.setItem("curriculoFoto", event.target.result);
      atualizarPreview();
    };
    reader.readAsDataURL(file);
  }
}

// --- ATUALIZAÇÃO DO PREVIEW ---

function atualizarPreview() {
  const foto = localStorage.getItem("curriculoFoto");
  const fotoDiv = document.getElementById("previewFotoDiv"); // Ajustado para o ID da DIV que você vai colocar no HTML
  const fotoSection = document.getElementById("previewFotoSection");

  if (foto && fotoDiv) {
    fotoDiv.style.backgroundImage = `url(${foto})`;
    fotoSection.style.display = "block";
  }

  const nome = document.getElementById("nome").value;
  document.getElementById("previewNome").textContent = nome || "Seu Nome";

  const tel = document.getElementById("telefone").value;
  const loc = document.getElementById("localidade").value;
  const email = document.getElementById("email").value;
  const link = document.getElementById("linkedin").value;

  document.getElementById("previewEmail").textContent = email
    ? "📧 " + email
    : "";
  const pTel = document.getElementById("previewTelefone");
  pTel.textContent = tel ? "📱 " + tel : "";
  pTel.style.display = tel ? "block" : "none";

  const pLoc = document.getElementById("previewLocalidade");
  pLoc.textContent = loc ? "📍 " + loc : "";
  pLoc.style.display = loc ? "block" : "none";

  const pLink = document.getElementById("previewLinkedin");
  if (link) {
    pLink.textContent = "🔗 " + link;
    pLink.style.display = "block";
  } else {
    pLink.style.display = "none";
  }

  const resumo = document.getElementById("resumo").value;
  document.getElementById("previewResumoSection").style.display = resumo
    ? "block"
    : "none";
  document.getElementById("previewResumo").textContent = resumo;

  // Habilidades
  const habs = Array.from(document.querySelectorAll(".hab-nome"))
    .map((i) => i.value)
    .filter((v) => v);
  document.getElementById("previewHabilidadesSection").style.display =
    habs.length ? "block" : "none";
  document.getElementById("previewHabilidadesList").innerHTML = habs
    .map((h) => `<span class="skill-badge">${h}</span>`)
    .join("");

  // Experiências
  let expHtml = "";
  document
    .querySelectorAll("#experienciaContainer .item-entry")
    .forEach((el) => {
      const cargo = el.querySelector(".exp-cargo").value;
      const emp = el.querySelector(".exp-empresa").value;
      if (cargo || emp) {
        const periodo = `${el.querySelector(".exp-inicio-mes").value}/${el.querySelector(".exp-inicio-ano").value} - ${el.querySelector(".exp-fim-ano").value ? el.querySelector(".exp-fim-mes").value + "/" + el.querySelector(".exp-fim-ano").value : "Atual"}`;
        expHtml += `<div class="curriculum-item"><div class="curriculum-item-header"><span class="curriculum-item-title">${cargo}</span><span class="curriculum-item-period">${periodo}</span></div><div class="curriculum-item-company">${emp}</div><div class="curriculum-item-description">${el.querySelector(".exp-descricao").value}</div></div>`;
      }
    });
  document.getElementById("previewExperienciaSection").style.display = expHtml
    ? "block"
    : "none";
  document.getElementById("previewExperienciaList").innerHTML = expHtml;

  // Formação
  let formHtml = "";
  document.querySelectorAll("#formacaoContainer .item-entry").forEach((el) => {
    const curso = el.querySelector(".form-curso").value;
    if (curso) {
      formHtml += `<div class="curriculum-item"><div class="curriculum-item-header"><span class="curriculum-item-title">${curso}</span><span class="curriculum-item-period">${el.querySelector(".form-conclusao").value} (${el.querySelector(".form-status").value})</span></div><div class="curriculum-item-company">${el.querySelector(".form-instituicao").value}</div></div>`;
    }
  });
  document.getElementById("previewFormacaoSection").style.display = formHtml
    ? "block"
    : "none";
  document.getElementById("previewFormacaoList").innerHTML = formHtml;

  // Idiomas
  let idiHtml = "";
  document.querySelectorAll("#idiomasContainer .item-entry").forEach((el) => {
    const nome = el.querySelector(".idi-nome").value;
    if (nome) {
      idiHtml += `<div class="language-item"><span class="language-name">${nome}</span><span class="language-level">${el.querySelector(".idi-nivel").value}</span></div>`;
    }
  });
  document.getElementById("previewIdiomasSection").style.display = idiHtml
    ? "block"
    : "none";
  document.getElementById("previewIdiomasList").innerHTML =
    `<div class="languages-list">${idiHtml}</div>`;

  salvarDadosTemporarios();
}

// --- GESTÃO DE MODELOS (SUBSTITUI HISTÓRICO) ---

function salvarComoModelo() {
  const nome = document.getElementById("nomeModeloNovo").value.trim();
  if (!nome) return alert("Digite um nome para o modelo.");

  const modelo = {
    id: Date.now(),
    nomeModelo: nome,
    dados: {
      basicos: {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        localidade: document.getElementById("localidade").value,
        linkedin: document.getElementById("linkedin").value,
        resumo: document.getElementById("resumo").value,
      },
      experiencias: Array.from(
        document.querySelectorAll("#experienciaContainer .item-entry"),
      ).map((el) => ({
        cargo: el.querySelector(".exp-cargo").value,
        empresa: el.querySelector(".exp-empresa").value,
        desc: el.querySelector(".exp-descricao").value,
        iM: el.querySelector(".exp-inicio-mes").value,
        iA: el.querySelector(".exp-inicio-ano").value,
        fM: el.querySelector(".exp-fim-mes").value,
        fA: el.querySelector(".exp-fim-ano").value,
      })),
      formacoes: Array.from(
        document.querySelectorAll("#formacaoContainer .item-entry"),
      ).map((el) => ({
        curso: el.querySelector(".form-curso").value,
        inst: el.querySelector(".form-instituicao").value,
        concl: el.querySelector(".form-conclusao").value,
        status: el.querySelector(".form-status").value,
      })),
      habilidades: Array.from(document.querySelectorAll(".hab-nome")).map(
        (i) => i.value,
      ),
      idiomas: Array.from(
        document.querySelectorAll("#idiomasContainer .item-entry"),
      ).map((el) => ({
        n: el.querySelector(".idi-nome").value,
        nivel: el.querySelector(".idi-nivel").value,
      })),
    },
  };

  let modelos = JSON.parse(localStorage.getItem("cv_modelos") || "[]");
  modelos.push(modelo);
  localStorage.setItem("cv_modelos", JSON.stringify(modelos));
  document.getElementById("nomeModeloNovo").value = "";
  renderizarListaModelos();
}

function carregarModelo(id) {
  const modelos = JSON.parse(localStorage.getItem("cv_modelos") || "[]");
  const m = modelos.find((mod) => mod.id === id);
  if (
    !m ||
    !confirm("Carregar '" + m.nomeModelo + "'? Dados atuais serão perdidos.")
  )
    return;

  // Limpa containers
  document.getElementById("experienciaContainer").innerHTML = "";
  document.getElementById("formacaoContainer").innerHTML = "";
  document.getElementById("habilidadesContainer").innerHTML = "";
  document.getElementById("idiomasContainer").innerHTML = "";

  // Preenche
  Object.keys(m.dados.basicos).forEach(
    (k) => (document.getElementById(k).value = m.dados.basicos[k]),
  );
  m.dados.experiencias.forEach((d) => adicionarExperiencia(d));
  m.dados.formacoes.forEach((d) => adicionarFormacao(d));
  m.dados.habilidades.forEach((h) => adicionarHabilidade(h));
  m.dados.idiomas.forEach((d) => adicionarIdioma(d));

  fecharModalHistorico();
  atualizarPreview();
}

function renderizarListaModelos() {
  const container = document.getElementById("listaModelos");
  const modelos = JSON.parse(localStorage.getItem("cv_modelos") || "[]");
  container.innerHTML = modelos.length
    ? modelos
        .map(
          (m) => `
    <div class="historico-item" onclick="carregarModelo(${m.id})">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div><strong>${m.nomeModelo}</strong></div>
        <button class="btn-remove" onclick="event.stopPropagation(); excluirModelo(${m.id})">Excluir</button>
      </div>
    </div>`,
        )
        .join("")
    : '<p class="modal-empty">Nenhum modelo salvo.</p>';
}

function excluirModelo(id) {
  let modelos = JSON.parse(localStorage.getItem("cv_modelos") || "[]");
  localStorage.setItem(
    "cv_modelos",
    JSON.stringify(modelos.filter((m) => m.id !== id)),
  );
  renderizarListaModelos();
}

// --- PERSISTÊNCIA TEMPORÁRIA ---

function salvarDadosTemporarios() {
  const formState = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    localidade: document.getElementById("localidade").value,
    linkedin: document.getElementById("linkedin").value,
    resumo: document.getElementById("resumo").value,
  };
  localStorage.setItem("cv_data_temp", JSON.stringify(formState));
}

function carregarDados() {
  const salvo = JSON.parse(localStorage.getItem("cv_data_temp"));
  if (!salvo) return false;
  Object.keys(salvo).forEach((key) => {
    const el = document.getElementById(key);
    if (el) el.value = salvo[key];
  });
  return true;
}

function gerarPDF() {
  const element = document.getElementById("previewContent");

  // Condição para detectar Mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    // Adiciona a classe que o CSS usa para esconder o formulário
    document.body.classList.add("imprimindo-curriculo");

    setTimeout(() => {
      window.print();
      // Remove a classe para o formulário voltar a aparecer no site após imprimir
      document.body.classList.remove("imprimindo-curriculo");
    }, 500);
  } else {
    // --- LÓGICA ORIGINAL PARA PC (html2pdf) ---
    html2pdf()
      .set({
        margin: 10,
        filename: "curriculo.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  }
}

function abrirModalHistorico() {
  document.getElementById("historicoModal").classList.add("active");
  renderizarListaModelos();
}
function fecharModalHistorico() {
  document.getElementById("historicoModal").classList.remove("active");
}



