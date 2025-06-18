document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const operatorNameEl = document.getElementById('operator-name');

    const mockOperatorName = 'Ana Silva';

    const mockEquipesData = [
        {
            id: 'equipe-alfa',
            nome: 'Equipe Alfa',
            funcao: 'Montagem Estrutural e Soldagem Leve',
            areaDesignada: 'Setor A, Setor C, Expedição',
            statusPercentual: 95,
            corStatusNome: 'ok',
            episEsperados: [
                { nome: 'Capacete', icone: 'fas fa-hard-hat' },
                { nome: 'Óculos de Proteção', icone: 'fas fa-glasses' },
                { nome: 'Botas de Segurança', icone: 'fas fa-shoe-prints' },
            ],
            funcionarios: [
                { nome: 'Carlos Pereira', foto: 'img/avatars/tyrone.png' },
                { nome: 'Mariana Lima', foto: 'img/avatars/simone.png' },
                { nome: 'Roberto Alves', foto: 'img/avatars/douglas.png' },
                { nome: 'Juliana Costa', foto: 'img/avatars/fabiana.png' }
            ]
        },
        {
            id: 'equipe-gama',
            nome: 'Equipe Gama',
            funcao: 'Manutenção Elétrica e Instrumentação',
            areaDesignada: 'Setor B, Controle de Qualidade',
            statusPercentual: 60,
            corStatusNome: 'critico',
            episEsperados: [
                { nome: 'Capacete Classe E', icone: 'fas fa-hard-hat' },
                { nome: 'Óculos Ampla Visão', icone: 'fas fa-glasses' },
                { nome: 'Vestimenta Anti-chama', icone: 'fas fa-user-shield' },
                { nome: 'Calçado de Segurança Dielétrico', icone: 'fas fa-shoe-prints' },
            ],
            funcionarios: [
                { nome: 'Ricardo Oliveira', foto: 'img/avatars/ricardo.png' },
                { nome: 'Beatriz Santos', foto: 'img/avatars/julia.png' },
                { nome: 'Fernando Dias', foto: 'img/avatars/mohamed.png' },
                { nome: 'Laura Martins', foto: 'img/avatars/laura.png' }
            ]
        },
        {
            id: 'equipe-delta',
            nome: 'Equipe Delta',
            funcao: 'Logística Interna e Empilhadeiras',
            areaDesignada: 'Depósito, Corredores',
            statusPercentual: 80,
            corStatusNome: 'atencao',
            episEsperados: [
                { nome: 'Capacete', icone: 'fas fa-hard-hat' },
                { nome: 'Botas de Segurança', icone: 'fas fa-shoe-prints' },
                { nome: 'Colete Refletivo', icone: 'fas fa-vest-patches'}
            ],
            funcionarios: [
                { nome: 'Paulo Souza', foto: 'img/avatars/tadeu.png' },
                { nome: 'Camila Rocha', foto: 'img/avatars/carol.png' }
            ]
        }
    ];

    const calendarioGridEl = document.getElementById('calendario-grid');
    const mesAnoDisplayEl = document.getElementById('mes-ano-display');
    const mesAnteriorBtn = document.getElementById('mes-anterior-btn');
    const proximoMesBtn = document.getElementById('proximo-mes-btn');
    const seletorEquipeHistoricoEl = document.getElementById('seletor-equipe-historico');
    const detalheDiaContainerEl = document.getElementById('detalhe-dia-container');
    const detalheDiaTituloEl = document.getElementById('detalhe-dia-titulo');
    const graficoConformidadeDiaEl = document.getElementById('grafico-conformidade-dia');
    const infoDiaAdicionalEl = document.getElementById('info-dia-adicional');

    let dataAtualCalendario = new Date(2025, 4, 1);

    const gerarDadosHorariosMock = (baseConformidade) => {
        let dados = [];
        for (let i = 0; i < 10; i++) {
            dados.push({ hora: String(8 + i).padStart(2, '0'), conformidade: Math.min(100, Math.max(0, baseConformidade + Math.floor(Math.random() * 20) - 10)) });
        }
        return dados;
    };

    const mockTendenciaConformidade = [
        { dia: 'D-6', valor: 85 }, { dia: 'D-5', valor: 88 }, { dia: 'D-4', valor: 86 },
        { dia: 'D-3', valor: 90 }, { dia: 'D-2', valor: 92 }, { dia: 'D-1', valor: 94 },
        { dia: 'Hoje', valor: 92 }
    ];

    const mockPlantaBaixaData = {
        dimensoes: { width: 1200, height: 800 },
        areas: [
            { id: 'area-a', nome: 'Setor A - Montagem', equipeResponsavel: 'Equipe Alfa', x: 2, y: 2, width: 38, height: 45, cor: 'rgba(100, 150, 200, 0.25)', textColor: '#334257' },
            { id: 'area-b', nome: 'Setor B - Solda', equipeResponsavel: 'Equipe Gama', x: 42, y: 2, width: 28, height: 55, cor: 'rgba(200, 150, 100, 0.25)', textColor: '#543210' },
            { id: 'area-c', nome: 'Depósito Matéria Prima', equipeResponsavel: 'Equipe Delta', x: 2, y: 50, width: 38, height: 48, cor: 'rgba(150, 200, 100, 0.25)', textColor: '#224011' },
            { id: 'area-d', nome: 'Controle de Qualidade', equipeResponsavel: 'Equipe Gama', x: 42, y: 60, width: 28, height: 38, cor: 'rgba(180, 160, 220, 0.25)', textColor: '#412261' },
            { id: 'area-e', nome: 'Escritórios', equipeResponsavel: 'Administrativo', x: 72, y: 2, width: 26, height: 30, cor: 'rgba(200, 200, 200, 0.25)', textColor: '#555' },
            { id: 'area-f', nome: 'Expedição', equipeResponsavel: 'Equipe Alfa', x: 72, y: 35, width: 26, height: 63, cor: 'rgba(120, 180, 180, 0.25)', textColor: '#215151' }
        ],
        colaboradores: [
            { id: 'colab-1', nome: 'Carlos Pereira', equipeId: 'equipe-alfa', statusEPI: 'ok', foto: 'img/avatars/tyrone.png', x: 10, y: 15, movimenta: true, caminho: [{x:10,y:15},{x:15,y:35},{x:25,y:30},{x:10,y:15}], velocidade: 15, delay: 0 },
            { id: 'colab-2', nome: 'Mariana Lima', equipeId: 'equipe-alfa', statusEPI: 'alerta', foto: 'img/avatars/simone.png', x: 20, y: 40, movimenta: false },
            { id: 'colab-juliana', nome: 'Juliana Costa', equipeId: 'equipe-alfa', statusEPI: 'ok', foto: 'img/avatars/fabiana.png', x: 80, y: 50, movimenta: true, caminho: [{x:80,y:50},{x:85,y:80},{x:80,y:50}], velocidade: 12, delay: 3 },
            { id: 'colab-roberto', nome: 'Roberto Alves', equipeId: 'equipe-alfa', statusEPI: 'ok', foto: 'img/avatars/douglas.png', x: 85, y: 90, movimenta: false },
            { id: 'colab-3', nome: 'Ricardo Oliveira', equipeId: 'equipe-gama', statusEPI: 'ok', foto: 'img/avatars/ricardo.png', x: 50, y: 15, movimenta: true, caminho: [{x:50,y:15},{x:60,y:10},{x:50,y:15}], velocidade: 8, delay: 1 },
            { id: 'colab-4', nome: 'Beatriz Santos', equipeId: 'equipe-gama', statusEPI: 'critico', foto: 'img/avatars/laura.png', x: 55, y: 50, movimenta: false },
            { id: 'colab-fernando', nome: 'Fernando Dias', equipeId: 'equipe-gama', statusEPI: 'ok', foto: 'img/avatars/mohamed.png', x: 45, y: 70, movimenta: false },
            { id: 'colab-laura', nome: 'Laura Martins', equipeId: 'equipe-gama', statusEPI: 'alerta', foto: 'img/avatars/julia.png', x: 55, y: 85, movimenta: true, caminho: [{x:55,y:85},{x:45,y:90},{x:55,y:85}], velocidade: 10, delay: 5 },
            { id: 'colab-paulo', nome: 'Paulo Souza', equipeId: 'equipe-delta', statusEPI: 'ok', foto: 'img/avatars/tadeu.png', x: 15, y: 60, movimenta: true, caminho: [{x:15,y:60},{x:25,y:80},{x:15,y:60}], velocidade: 18, delay: 0 },
            { id: 'colab-camila', nome: 'Camila Rocha', equipeId: 'equipe-delta', statusEPI: 'ok', foto: 'img/avatars/carol.png', x: 30, y: 80, movimenta: false },
            { id: 'colab-ana', nome: 'Ana Silva (Você)', equipeId: 'supervisao', statusEPI: 'ok', foto: 'img/avatars/ricardo.png', x: 80, y: 10, movimenta: false, icone:'fas fa-user-shield'}
        ],
        cameras: [
            { id: 'cam-1', nome: 'Câmera Corredor Central', localizacaoDetalhada: 'Visão geral do corredor entre Setor A e B', x: 40, y: 30, icone: 'fas fa-video' },
            { id: 'cam-2', nome: 'Câmera Depósito Sul', localizacaoDetalhada: 'Entrada/Saída do Depósito (Portão Doca 1)', x: 3, y: 95, icone: 'fas fa-video' },
            { id: 'cam-3', nome: 'Câmera Qualidade', localizacaoDetalhada: 'Bancada de inspeção Setor D', x: 55, y: 95, icone: 'fas fa-video'},
            { id: 'cam-4', nome: 'Câmera Solda Ponto 1', localizacaoDetalhada: 'Área do robô de solda RX8', x: 48, y: 4, icone: 'fas fa-video' },
            { id: 'cam-5', nome: 'Câmera Expedição Docas', localizacaoDetalhada: 'Visão das docas de carregamento', x: 98, y: 65, icone: 'fas fa-video' },
            { id: 'cam-6', nome: 'Câmera Corredor Central', localizacaoDetalhada: 'Visão geral do corredor entre Setor A e B', x: 3, y: 20, icone: 'fas fa-video' },
            { id: 'cam-7', nome: 'Câmera Depósito Sul', localizacaoDetalhada: 'Entrada/Saída do Depósito (Portão Doca 1)', x: 30, y: 95, icone: 'fas fa-video' },
            { id: 'cam-8', nome: 'Câmera Qualidade', localizacaoDetalhada: 'Bancada de inspeção Setor D', x: 65, y: 60, icone: 'fas fa-video'},
            { id: 'cam-9', nome: 'Câmera Solda Ponto 1', localizacaoDetalhada: 'Área do robô de solda RX8', x: 70, y: 19, icone: 'fas fa-video' },
            { id: 'cam-10', nome: 'Câmera Expedição Docas', localizacaoDetalhada: 'Visão das docas de carregamento', x: 80, y: 95, icone: 'fas fa-video' }
        ],
        zonasPerigo: [
            { id: 'zp-1', nome: 'Painel Elétrico Alta Tensão', episRequeridos: ['Luvas Isolantes Classe 2', 'Capacete com Protetor Facial', 'Vestimenta Anti-chama'], x: 75, y: 80, width: 10, height: 15, cor: 'rgba(255, 0, 0, 0.1)', borderColor: 'var(--danger-color)', alertaAtivo: true },
            { id: 'zp-2', nome: 'Rota de Empilhadeiras', episRequeridos: ['Atenção Constante', 'Colete Refletivo (pedestres)'], x: 45, y: 80, width: 8, height: 15, cor: 'rgba(255, 0, 0, 0.1)', borderColor: 'var(--danger-color)', alertaAtivo: false },
            { id: 'zp-3', nome: 'Zona de Exclusão - Prensa CNC', episRequeridos: ['Óculos de Segurança', 'Protetor Auricular'], x: 10, y: 20, width: 10, height: 10, cor: 'rgba(255, 0, 0, 0.1)', borderColor: 'var(--danger-color)', alertaAtivo: false},
            { id: 'zp-4', nome: 'Armazenamento Químicos', episRequeridos: ['Respirador com Filtro Químico', 'Luvas Nitrílicas', 'Óculos Ampla Visão'], x: 5, y: 52, width: 18, height: 12, cor: 'rgba(255, 0, 0, 0.1)', borderColor: 'var(--danger-color)', alertaAtivo: true},
            { id: 'zp-5', nome: 'Área de Soldagem Aberta', episRequeridos: ['Máscara de Solda', 'Avental de Raspa', 'Luvas de Raspa', 'Cortinas de Solda (se aplicável)'], x: 45, y: 20, width: 15, height: 20, cor: 'rgba(255, 0, 0, 0.1)', borderColor: 'var(--danger-color)', alertaAtivo: false}
        ]
    };

    const mockAlertasPorTipo = [
        { tipo: 'Capacete', qtd: 12, cor: 'var(--danger-color)' },
        { tipo: 'Luvas', qtd: 8, cor: 'var(--warning-color)' },
        { tipo: 'Óculos', qtd: 5, cor: 'var(--primary-color)' },
        { tipo: 'Outros', qtd: 3, cor: 'var(--dark-gray)' }
    ];

    const mockNaoConformidadesFrequentesInicio = [
        'Falta de capacete no Setor C durante operação de solda.',
        'Óculos de proteção posicionados sobre o capacete (Geral).',
        'Trabalho em altura sem linha de vida devidamente ancorada (Área Externa).'
    ];

    const dadosVisaoGeral = {
        conformidadeValor: '92%',
        conformidadeVariacao: '+2% desde ontem',
        conformidadeVariacaoClasse: 'positive',
        alertasValor: '5',
        alertasVariacao: '+1 desde ontem',
        alertasVariacaoClasse: 'negative',
        equipesMetaValor: '2/3'
    };
    
    const mockHistoricoConformidade = {
        '2025-05-01': {
            statusGeral: 'bom',
            equipes: {
                'Alfa': gerarDadosHorariosMock(95),
                'Gama': gerarDadosHorariosMock(85)
            },
            episFaltantesGeral: []
        },
        '2025-05-02': { statusGeral: 'bom', equipes: { 'Alfa': gerarDadosHorariosMock(90), 'Gama': gerarDadosHorariosMock(75) }, episFaltantesGeral: ['Tudo OK.'] },
        '2025-05-03': { statusGeral: 'bom', equipes: { 'Alfa': gerarDadosHorariosMock(92), 'Gama': gerarDadosHorariosMock(80) }, episFaltantesGeral: [] },
        '2025-05-05': {
            statusGeral: 'alerta',
            equipes: {
                'Alfa': [{ hora: '08', conformidade: 80 },{ hora: '09', conformidade: 75 },{ hora: '10', conformidade: 70 },{ hora: '11', conformidade: 65 },{ hora: '12', conformidade: 72 },{ hora: '13', conformidade: 78 },{ hora: '14', conformidade: 85 },{ hora: '15', conformidade: 82 },{ hora: '16', conformidade: 79 },{ hora: '17', conformidade: 70 }],
                'Gama': [{ hora: '08', conformidade: 60 },{ hora: '09', conformidade: 55 },{ hora: '10', conformidade: 58 },{ hora: '11', conformidade: 62 },{ hora: '12', conformidade: 50 },{ hora: '13', conformidade: 55 },{ hora: '14', conformidade: 60 },{ hora: '15', conformidade: 53 },{ hora: '16', conformidade: 57 },{ hora: '17', conformidade: 51 }]
            },
            episFaltantesGeral: ['Capacete (Equipe Gama, 09:00h)', 'Luvas (Equipe Alfa, 11:00h)']
        },
        '2025-05-06': { statusGeral: 'alerta', equipes: { 'Alfa': gerarDadosHorariosMock(70), 'Gama': gerarDadosHorariosMock(60) }, episFaltantesGeral: ['Verificar uso de óculos na Equipe Alfa.'] },
        '2025-05-10': {
            statusGeral: 'critico',
            equipes: {
                'Alfa': [{ hora: '08', conformidade: 70 },{ hora: '09', conformidade: 60 },{ hora: '10', conformidade: 55 },{ hora: '11', conformidade: 50 },{ hora: '12', conformidade: 45 },{ hora: '13', conformidade: 52 },{ hora: '14', conformidade: 58 },{ hora: '15', conformidade: 48 },{ hora: '16', conformidade: 50 },{ hora: '17', conformidade: 40 }],
                'Gama': [{ hora: '08', conformidade: 40 },{ hora: '09', conformidade: 35 },{ hora: '10', conformidade: 30 },{ hora: '11', conformidade: 42 },{ hora: '12', conformidade: 38 },{ hora: '13', conformidade: 33 },{ hora: '14', conformidade: 45 },{ hora: '15', conformidade: 37 },{ hora: '16', conformidade: 39 },{ hora: '17', conformidade: 25 }]
            },
            episFaltantesGeral: ['Múltiplas não conformidades em ambas as equipes.', 'Urgência: Revisar procedimentos de segurança com Equipe Gama.']
        },
        '2025-05-11': { statusGeral: 'critico', equipes: { 'Alfa': gerarDadosHorariosMock(50), 'Gama': gerarDadosHorariosMock(40) }, episFaltantesGeral: ['Não conformidades críticas persistentes.'] },
        '2025-05-15': { statusGeral: 'bom', equipes: { 'Alfa': gerarDadosHorariosMock(93), 'Gama': gerarDadosHorariosMock(78) }, episFaltantesGeral: [] },
        '2025-05-22': { statusGeral: 'bom', equipes: { 'Alfa': gerarDadosHorariosMock(91), 'Gama': gerarDadosHorariosMock(82) }, episFaltantesGeral: [] },
        '2025-05-23': { statusGeral: 'alerta', equipes: { 'Alfa': gerarDadosHorariosMock(75), 'Gama': gerarDadosHorariosMock(60) }, episFaltantesGeral: ['Verificar Andaimes Setor C'] },
        '2025-05-24': { statusGeral: 'bom', equipes: { 'Alfa': gerarDadosHorariosMock(92), 'Gama': gerarDadosHorariosMock(88) }, episFaltantesGeral: [] },
        '2025-05-28': { statusGeral: 'critico', equipes: { 'Alfa': gerarDadosHorariosMock(60), 'Gama': gerarDadosHorariosMock(50) }, episFaltantesGeral: ['Falha em múltiplos EPIs Equipe Gama', 'Capacetes inadequados Equipe Alfa'] },
        '2025-05-30': { statusGeral: 'bom', equipes: { 'Alfa': gerarDadosHorariosMock(93), 'Gama': gerarDadosHorariosMock(85) }, episFaltantesGeral: [] },
        '2025-05-31': { statusGeral: 'bom', equipes: { 'Alfa': gerarDadosHorariosMock(96), 'Gama': gerarDadosHorariosMock(91) }, episFaltantesGeral: [] }
    };

    function navegarParaSecao(targetId) {
        const linkParaAtivar = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        
        if (linkParaAtivar) {
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            linkParaAtivar.classList.add('active');
            const secaoParaAtivar = document.getElementById(targetId);
            if (secaoParaAtivar) {
                secaoParaAtivar.classList.add('active');
            } else {
                console.warn(`Seção com ID '${targetId}' não encontrada para navegação.`);
            }
        } else {
            console.warn(`Link de navegação para '${targetId}' não encontrado.`);
        }
    }

    let animacaoColaboradoresIntervalos = {};

    function setupVideoFilterSwitches() {
        const filterSwitches = document.querySelectorAll('.filter-switch');

        filterSwitches.forEach(switchEl => {
            switchEl.addEventListener('change', function() {
                const videoId = this.dataset.videoId;
                const videoElement = document.getElementById(videoId);
                const originalSrc = this.dataset.originalSrc;
                const filteredSrc = this.dataset.filteredSrc;

                if (!videoElement) {
                    console.error(`Elemento de vídeo com ID '${videoId}' não encontrado.`);
                    return;
                }

                const currentTime = videoElement.currentTime;
                const isPaused = videoElement.paused;

                if (this.checked) {
                    videoElement.src = filteredSrc;
                } else {
                    videoElement.src = originalSrc;
                }

                videoElement.load();

                videoElement.addEventListener('loadeddata', function handler() {
                    videoElement.currentTime = currentTime;
                    if (!isPaused) {
                        videoElement.play().catch(error => console.warn('Autoplay após troca de filtro pode ser bloqueado pelo navegador:', error));
                    }
                    videoElement.removeEventListener('loadeddata', handler);
                });
            });
        });
    }

    function renderizarPlantaBaixa() {
        const container = document.getElementById('mapa-fabrica-container');
        if (!container) {
            console.warn("Elemento 'mapa-fabrica-container' não encontrado.");
            return;
        }
        container.innerHTML = '';

        Object.values(animacaoColaboradoresIntervalos).forEach(clearInterval);
        animacaoColaboradoresIntervalos = {};

        const showCameras = document.getElementById('toggle-cameras-mapa').checked;
        const showColaboradores = document.getElementById('toggle-colaboradores-mapa').checked;
        const showZonasPerigo = document.getElementById('toggle-zonas-perigo-mapa').checked;

        mockPlantaBaixaData.areas.forEach(area => {
            const el = document.createElement('div');
            el.className = 'area-fabrica';
            el.id = `mapa-${area.id}`;
            el.style.left = `${area.x}%`;
            el.style.top = `${area.y}%`;
            el.style.width = `${area.width}%`;
            el.style.height = `${area.height}%`;
            el.style.backgroundColor = area.cor;
            
            const nomeAreaEl = document.createElement('span');
            nomeAreaEl.className = 'area-nome';
            nomeAreaEl.textContent = area.nome;
            el.appendChild(nomeAreaEl);

            if (area.equipeResponsavel) {
                const equipeAreaEl = document.createElement('span');
                equipeAreaEl.className = 'area-equipe';
                equipeAreaEl.textContent = `(${area.equipeResponsavel})`;
                el.appendChild(equipeAreaEl);
            }
            
            el.title = `${area.nome} (Responsável: ${area.equipeResponsavel || 'N/A'})`;
            container.appendChild(el);
        });

        if (showZonasPerigo) {
            mockPlantaBaixaData.zonasPerigo.forEach(zona => {
                const el = document.createElement('div');
                el.className = 'item-zona-perigo';
                el.id = `mapa-${zona.id}`;
                el.style.left = `${zona.x}%`;
                el.style.top = `${zona.y}%`;
                el.style.width = `${zona.width}%`;
                el.style.height = `${zona.height}%`;
                el.style.backgroundColor = zona.cor;
                el.style.borderColor = zona.borderColor;
                if (zona.formato === 'circulo') {
                    el.style.borderRadius = '50%';
                }
                if (zona.alertaAtivo) {
                    el.classList.add(zona.borderColor === 'var(--danger-color)' || zona.borderColor === '#ff6700' ? 'critical' : 'warning');
                }
                let titleText = zona.nome;
                if (zona.episRequeridos && zona.episRequeridos.length > 0) {
                    titleText += `\nEPIs Requeridos: ${zona.episRequeridos.join(', ')}`;
                }
                el.title = titleText;
                container.appendChild(el);
            });
        }

        if (showColaboradores) {
            mockPlantaBaixaData.colaboradores.forEach(colab => {
                const colabEl = document.createElement('div');
                colabEl.className = `item-mapa item-colaborador-avatar-wrapper status-${colab.statusEPI}`;
                colabEl.id = `mapa-${colab.id}`;
                colabEl.style.left = `${colab.x}%`;
                colabEl.style.top = `${colab.y}%`;
                
                const imgEl = document.createElement('img');
                imgEl.src = colab.foto;
                imgEl.alt = colab.nome;
                imgEl.className = 'colaborador-avatar-img';
                imgEl.title = `Colaborador: ${colab.nome}\nEquipe: ${mockEquipesData.find(e => e.id === colab.equipeId)?.nome || colab.equipeId}\nStatus EPI: ${colab.statusEPI.toUpperCase()}`;
                
                colabEl.appendChild(imgEl);
                
                colabEl.addEventListener('click', () => {
                    navegarParaSecao('equipes');
                });
                container.appendChild(colabEl);

                if (colab.movimenta && colab.caminho && colab.caminho.length > 0) {
                    let pontoAtualIndex = 0;
                    let progresso = 0;
                    const duracaoMovimentoSeg = colab.velocidade || 10;
                    const framesPorSegundo = 30;
                    const totalPassosEntrePontos = duracaoMovimentoSeg * framesPorSegundo / (colab.caminho.length -1);

                    const mover = () => {
                        const pontoOrigem = colab.caminho[pontoAtualIndex];
                        const pontoDestino = colab.caminho[(pontoAtualIndex + 1) % colab.caminho.length];
                        
                        progresso += 1 / totalPassosEntrePontos;

                        if (progresso >= 1) {
                            progresso = 0;
                            pontoAtualIndex = (pontoAtualIndex + 1) % colab.caminho.length;
                            if (pontoAtualIndex === 0 && colab.caminho.length > 1 && colab.caminho[0].x === colab.caminho[colab.caminho.length-1].x && colab.caminho[0].y === colab.caminho[colab.caminho.length-1].y ) {
                                // Loop completo
                            }
                        }
                        
                        const novoX = pontoOrigem.x + (pontoDestino.x - pontoOrigem.x) * progresso;
                        const novoY = pontoOrigem.y + (pontoDestino.y - pontoOrigem.y) * progresso;

                        colabEl.style.left = `${novoX}%`;
                        colabEl.style.top = `${novoY}%`;
                    };
                    
                    setTimeout(() => {
                        animacaoColaboradoresIntervalos[colab.id] = setInterval(mover, 1000 / framesPorSegundo);
                    }, (colab.delay || 0) * 1000);
                }
            });
        }

        if (showCameras) {
            mockPlantaBaixaData.cameras.forEach(cam => {
                const el = document.createElement('i');
                el.className = `item-mapa item-camera ${cam.icone}`;
                el.id = `mapa-${cam.id}`;
                el.style.left = `${cam.x}%`;
                el.style.top = `${cam.y}%`;
                el.title = `Câmera: ${cam.nome}\nLocal: ${cam.localizacaoDetalhada}`;
                
                el.addEventListener('click', () => {
                    navegarParaSecao('cameras');
                });
                container.appendChild(el);
            });
        }
    }

    function renderizarDadosVisaoGeral() {
        const conformidadeValorEl = document.getElementById('geral-conformidade-valor');
        const conformidadeVariacaoEl = document.getElementById('geral-conformidade-variacao');
        const alertasValorEl = document.getElementById('geral-alertas-valor');
        const alertasVariacaoEl = document.getElementById('geral-alertas-variacao');
        const equipesMetaValorEl = document.getElementById('geral-equipes-meta-valor');

        if (conformidadeValorEl) conformidadeValorEl.textContent = dadosVisaoGeral.conformidadeValor;
        if (conformidadeVariacaoEl) {
            conformidadeVariacaoEl.textContent = dadosVisaoGeral.conformidadeVariacao;
            conformidadeVariacaoEl.className = `stat-change ${dadosVisaoGeral.conformidadeVariacaoClasse}`;
        }
        if (alertasValorEl) alertasValorEl.textContent = dadosVisaoGeral.alertasValor;
        if (alertasVariacaoEl) {
            alertasVariacaoEl.textContent = dadosVisaoGeral.alertasVariacao;
            alertasVariacaoEl.className = `stat-change ${dadosVisaoGeral.alertasVariacaoClasse}`;
        }
        if (equipesMetaValorEl) equipesMetaValorEl.textContent = dadosVisaoGeral.equipesMetaValor;
    }

    function renderizarGraficoTendenciaConformidade() {
        const container = document.getElementById('grafico-tendencia-conformidade');
        if (!container) {
            console.warn("Elemento 'grafico-tendencia-conformidade' não encontrado.");
            return;
        }
        container.innerHTML = '';

        const graficoWrapper = document.createElement('div');
        graficoWrapper.style.display = 'flex';
        graficoWrapper.style.alignItems = 'flex-end';
        graficoWrapper.style.justifyContent = 'space-around';
        graficoWrapper.style.width = '100%';
        graficoWrapper.style.height = '180px';
        graficoWrapper.style.border = '1px solid #e0e0e0';
        graficoWrapper.style.padding = '10px';
        graficoWrapper.style.boxSizing = 'border-box';
        graficoWrapper.style.position = 'relative';

        const linhaBase = document.createElement('div');
        linhaBase.style.position = 'absolute';
        linhaBase.style.bottom = '30px';
        linhaBase.style.left = '10px';
        linhaBase.style.right = '10px';
        linhaBase.style.height = '1px';
        linhaBase.style.backgroundColor = 'var(--border-color)';
        graficoWrapper.appendChild(linhaBase);

        const alturaMaximaDisponivel = 180 - 10 - 10 - 30;

        mockTendenciaConformidade.forEach(dado => {
            const itemWrapper = document.createElement('div');
            itemWrapper.style.display = 'flex';
            itemWrapper.style.flexDirection = 'column';
            itemWrapper.style.alignItems = 'center';
            itemWrapper.style.margin = '0 5px';
            itemWrapper.style.position = 'relative';
            itemWrapper.style.zIndex = '1';

            const pontoDiv = document.createElement('div');
            pontoDiv.style.width = '25px';

            let alturaPonto = 0;
            if (dado.valor > 0) {
                alturaPonto = (dado.valor / 100) * alturaMaximaDisponivel * 0.95;
            }
            alturaPonto = Math.max(5, alturaPonto);
            
            pontoDiv.style.height = `${alturaPonto}px`;
            pontoDiv.style.backgroundColor = 'var(--primary-color)';
            pontoDiv.title = `${dado.dia}: ${dado.valor}%`;

            const label = document.createElement('div');
            label.textContent = dado.dia;
            label.style.fontSize = '11px';
            label.style.color = 'var(--dark-gray)';
            label.style.marginTop = '5px';
            label.style.position = 'absolute';
            label.style.bottom = '-20px';
            label.style.width = '100%';
            label.style.textAlign = 'center';

            itemWrapper.appendChild(pontoDiv);
            itemWrapper.appendChild(label);
            graficoWrapper.appendChild(itemWrapper);
        });
        container.appendChild(graficoWrapper);
    }

    function renderizarGraficoAlertasPorTipo() {
        const container = document.getElementById('grafico-alertas-tipo');
        if (!container) {
            console.warn("Elemento 'grafico-alertas-tipo' não encontrado.");
            return;
        }
        container.innerHTML = '';

        const graficoWrapper = document.createElement('div');
        graficoWrapper.style.display = 'flex';
        graficoWrapper.style.alignItems = 'flex-end';
        graficoWrapper.style.justifyContent = 'space-around';
        graficoWrapper.style.width = '100%';
        graficoWrapper.style.height = '180px';
        graficoWrapper.style.border = '1px solid #e0e0e0';
        graficoWrapper.style.padding = '10px';
        graficoWrapper.style.boxSizing = 'border-box';
        graficoWrapper.style.position = 'relative';

        const linhaBase = document.createElement('div');
        linhaBase.style.position = 'absolute';
        linhaBase.style.bottom = '30px';
        linhaBase.style.left = '10px';
        linhaBase.style.right = '10px';
        linhaBase.style.height = '1px';
        linhaBase.style.backgroundColor = 'var(--border-color)';
        graficoWrapper.appendChild(linhaBase);

        const alturaMaximaDisponivel = 180 - 10 - 10 - 30;
        const maxQtd = Math.max(...mockAlertasPorTipo.map(d => d.qtd), 1);

        mockAlertasPorTipo.forEach(dado => {
            const itemWrapper = document.createElement('div');
            itemWrapper.style.display = 'flex';
            itemWrapper.style.flexDirection = 'column';
            itemWrapper.style.alignItems = 'center';
            itemWrapper.style.margin = '0 5px';
            itemWrapper.style.position = 'relative';
            itemWrapper.style.zIndex = '1';

            const barraDiv = document.createElement('div');
            barraDiv.style.width = '35px';
            
            let alturaBarra = 0;
            if (dado.qtd > 0) {
                alturaBarra = (dado.qtd / maxQtd) * alturaMaximaDisponivel * 0.95;
            }
            alturaBarra = Math.max(5, alturaBarra);

            barraDiv.style.height = `${alturaBarra}px`;
            barraDiv.style.backgroundColor = dado.cor || 'var(--primary-color)';
            barraDiv.title = `${dado.tipo}: ${dado.qtd}`;

            const label = document.createElement('div');
            label.textContent = dado.tipo.length > 7 ? dado.tipo.substring(0, 6) + '...' : dado.tipo;
            label.style.fontSize = '11px';
            label.style.color = 'var(--dark-gray)';
            label.style.marginTop = '5px';
            label.style.position = 'absolute';
            label.style.bottom = '-20px';
            label.style.width = '100%';
            label.style.textAlign = 'center';
            label.style.wordBreak = 'break-word';

            itemWrapper.appendChild(barraDiv);
            itemWrapper.appendChild(label);
            graficoWrapper.appendChild(itemWrapper);
        });
        container.appendChild(graficoWrapper);
    }

    function renderizarNaoConformidadesInicio() {
        const listaEl = document.getElementById('lista-nao-conformidades-inicio');
        if (!listaEl) {
            console.warn("Elemento 'lista-nao-conformidades-inicio' não encontrado.");
            return;
        }
        listaEl.innerHTML = '';
        if (mockNaoConformidadesFrequentesInicio.length > 0) {
            mockNaoConformidadesFrequentesInicio.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-exclamation-circle icon-danger"></i> ${item}`;
                listaEl.appendChild(li);
            });
        } else {
            listaEl.innerHTML = '<li><i class="fas fa-check-circle icon-success"></i> Nenhuma não conformidade frequente registrada.</li>';
        }
    }

    function popularSeletorEquipesHistorico() {
        if (!seletorEquipeHistoricoEl) return;
        seletorEquipeHistoricoEl.innerHTML = '<option value="todas">Equipe Alfa</option>'; 
        if (typeof mockEquipesData !== 'undefined' && mockEquipesData.length > 0) {
            mockEquipesData.forEach(equipe => {
                const option = document.createElement('option');
                option.value = equipe.id;
                option.textContent = equipe.nome;
                seletorEquipeHistoricoEl.appendChild(option);
            });
        } else {
            const equipeAlfaOption = document.createElement('option');
            equipeAlfaOption.value = 'equipe-alfa';
            equipeAlfaOption.textContent = 'Equipe Alfa';
            seletorEquipeHistoricoEl.appendChild(equipeAlfaOption);

            const equipeGamaOption = document.createElement('option');
            equipeGamaOption.value = 'equipe-gama';
            equipeGamaOption.textContent = 'Equipe Gama';
            seletorEquipeHistoricoEl.appendChild(equipeGamaOption);
        }
    }

    function renderizarCalendario() {
        if (!calendarioGridEl || !mesAnoDisplayEl) return;
        calendarioGridEl.innerHTML = '';
        detalheDiaContainerEl.style.display = 'none';
        const ano = dataAtualCalendario.getFullYear();
        const mes = dataAtualCalendario.getMonth();
        mesAnoDisplayEl.textContent = `${dataAtualCalendario.toLocaleString('pt-BR', { month: 'long' })} ${ano}`.toUpperCase();
        const primeiroDiaSemanaDoMes = new Date(ano, mes, 1).getDay();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        for (let i = 0; i < primeiroDiaSemanaDoMes; i++) {
            const diaVazioEl = document.createElement('div');
            diaVazioEl.classList.add('dia', 'dia-vazio');
            calendarioGridEl.appendChild(diaVazioEl);
        }
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const diaEl = document.createElement('div');
            diaEl.classList.add('dia');
            diaEl.textContent = dia;
            const dataCompleta = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            const dadosDoDia = mockHistoricoConformidade[dataCompleta];
            if (dadosDoDia) {
                diaEl.classList.add(`status-${dadosDoDia.statusGeral || 'neutro'}`);
                diaEl.title = `Status: ${dadosDoDia.statusGeral || 'Não registrado'}. Clique para detalhes.`;
                diaEl.dataset.data = dataCompleta;
                diaEl.addEventListener('click', () => mostrarDetalhesDia(dataCompleta));
            } else {
                diaEl.classList.add('status-nao-registrado');
                diaEl.title = 'Sem dados de conformidade para este dia.';
            }
            calendarioGridEl.appendChild(diaEl);
        }
    }

    function calcularDesempenhoEquipe(dadosHorariosEquipe) {
        if (!dadosHorariosEquipe || dadosHorariosEquipe.length === 0) {
            return { media: 0, picosNegativos: [], conformidadeOk: true };
        }
        let somaConformidade = 0;
        let picosNegativos = [];
        let conformidadeOk = true;

        dadosHorariosEquipe.forEach(dado => {
            somaConformidade += dado.conformidade;
            if (dado.conformidade < 75) {
                picosNegativos.push(` ${dado.conformidade}% às ${dado.hora}:00`);
                if (dado.conformidade < 60) conformidadeOk = false;
            }
        });
        const media = Math.round(somaConformidade / dadosHorariosEquipe.length);
        if (media < 75) conformidadeOk = false;

        return { media, picosNegativos: picosNegativos.slice(0, 2), conformidadeOk };
    }

    function mostrarDetalhesDia(data) {
        if (!detalheDiaContainerEl || !graficoConformidadeDiaEl || !infoDiaAdicionalEl || !detalheDiaTituloEl) return;

        const dadosDoDia = mockHistoricoConformidade[data];
        if (!dadosDoDia) {
            detalheDiaContainerEl.style.display = 'none';
            return;
        }

        const diasNoGrid = calendarioGridEl.querySelectorAll('.dia');
        diasNoGrid.forEach(d => d.classList.remove('dia-selecionado'));
        const diaClicadoEl = calendarioGridEl.querySelector(`.dia[data-data="${data}"]`);
        if (diaClicadoEl) {
            diaClicadoEl.classList.add('dia-selecionado');
        }

        const [ano, mes, dia] = data.split('-');
        detalheDiaTituloEl.textContent = `Detalhes de Conformidade - ${dia}/${mes}/${ano}`;

        renderizarGraficoDia(dadosDoDia.equipes);

        infoDiaAdicionalEl.innerHTML = '';

        const resumoEquipesDiv = document.createElement('div');
        resumoEquipesDiv.className = 'resumo-desempenho-equipes';
        let resumoHtml = '<p><strong>Desempenho Individual das Equipes:</strong></p><ul>';
        const equipeSelecionadaFiltro = seletorEquipeHistoricoEl.value;

        let algumaEquipeParaMostrar = false;
        for (const nomeEquipeChave in dadosDoDia.equipes) {
            if (dadosDoDia.equipes.hasOwnProperty(nomeEquipeChave)) {
                const equipeDataCompleta = mockEquipesData.find(eq => eq.nome.toLowerCase().includes(nomeEquipeChave.toLowerCase()));
                const nomeExibicaoEquipe = equipeDataCompleta ? equipeDataCompleta.nome : nomeEquipeChave;
                const idEquipeNosDados = equipeDataCompleta ? equipeDataCompleta.id : `equipe-${nomeEquipeChave.toLowerCase()}`;

                if (equipeSelecionadaFiltro === 'todas' || equipeSelecionadaFiltro === idEquipeNosDados) {
                    algumaEquipeParaMostrar = true;
                    const dadosHorariosDaEquipe = dadosDoDia.equipes[nomeEquipeChave];
                    const desempenho = calcularDesempenhoEquipe(dadosHorariosDaEquipe);
                    
                    let classeStatusEquipe = desempenho.conformidadeOk ? 'status-ok' : 'status-alerta-equipe';
                    if (desempenho.media < 60) classeStatusEquipe = 'status-critico-equipe';

                    resumoHtml += `<li class="resumo-equipe-${nomeEquipeChave.toLowerCase()} ${classeStatusEquipe}">
                                        <strong>${nomeExibicaoEquipe}:</strong> Conformidade média de <strong>${desempenho.media}%</strong>.`;
                    if (desempenho.picosNegativos.length > 0) {
                        resumoHtml += ` <span class="picos-negativos">Alertas de baixa conformidade: ${desempenho.picosNegativos.join('; ')}.</span>`;
                    } else if (desempenho.conformidadeOk) {
                        resumoHtml += ` <span class="conformidade-ok">Bom desempenho geral.</span>`;
                    }
                    resumoHtml += `</li>`;
                }
            }
        }
        if (!algumaEquipeParaMostrar && equipeSelecionadaFiltro !== 'todas') {
             resumoHtml += `<li>Dados não disponíveis para a equipe selecionada neste dia.</li>`;
        }

        resumoHtml += '</ul>';
        resumoEquipesDiv.innerHTML = resumoHtml;
        infoDiaAdicionalEl.appendChild(resumoEquipesDiv);

        if (dadosDoDia.episFaltantesGeral && dadosDoDia.episFaltantesGeral.length > 0) {
            const pGeral = document.createElement('p');
            pGeral.innerHTML = '<br><strong>Ocorrências Gerais / EPIs Faltantes no Dia:</strong>';
            const ulGeral = document.createElement('ul');
            ulGeral.classList.add('ocorrencias-gerais-lista');
            dadosDoDia.episFaltantesGeral.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ulGeral.appendChild(li);
            });
            infoDiaAdicionalEl.appendChild(pGeral);
            infoDiaAdicionalEl.appendChild(ulGeral);
        } else if (dadosDoDia.statusGeral === 'bom' && algumaEquipeParaMostrar) {
            // Não adiciona "Nenhuma ocorrência"
        } else if (dadosDoDia.statusGeral === 'bom') {
             infoDiaAdicionalEl.innerHTML += '<p class="sem-ocorrencias">Nenhuma ocorrência geral significativa registrada para este dia.</p>';
        }
        
        detalheDiaContainerEl.style.display = 'block';
        detalheDiaContainerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function renderizarGraficoDia(dadosEquipes) {
        if (!graficoConformidadeDiaEl) return;
        graficoConformidadeDiaEl.innerHTML = '';
        const horas = Array.from({ length: 10 }, (_, i) => String(8 + i).padStart(2, '0') + ':00');

        const legenda = document.createElement('div');
        legenda.className = 'grafico-legenda';
        legenda.innerHTML = `
            <span class="legenda-item"><span class="cor-legenda alfa"></span> Equipe Alfa</span>
            <span class="legenda-item"><span class="cor-legenda gama"></span> Equipe Gama</span>
        `;
        graficoConformidadeDiaEl.appendChild(legenda);

        const containerGrafico = document.createElement('div');
        containerGrafico.className = 'grafico-barras-dia';
        const eixoY = document.createElement('div');
        eixoY.className = 'eixo-y';
        for (let i = 100; i >= 0; i -= 20) {
            const label = document.createElement('div');
            label.textContent = `${i}%`;
            eixoY.appendChild(label);
        }
        containerGrafico.appendChild(eixoY);
        const areaBarras = document.createElement('div');
        areaBarras.className = 'area-barras';

        horas.forEach(horaLabel => {
            const horaCurta = horaLabel.substring(0, 2);
            const grupoBarra = document.createElement('div');
            grupoBarra.className = 'grupo-barra-hora';
            const barrasContainer = document.createElement('div');
            barrasContainer.className = 'barras-container';

            const dadosAlfaHora = dadosEquipes.Alfa?.find(d => d.hora === horaCurta);
            const barraAlfa = document.createElement('div');
            barraAlfa.className = 'barra equipe-alfa';
            barraAlfa.style.height = dadosAlfaHora ? `${dadosAlfaHora.conformidade}%` : '0%';
            barraAlfa.title = `Alfa ${horaLabel}: ${dadosAlfaHora ? dadosAlfaHora.conformidade : 'N/A'}%`;
            barrasContainer.appendChild(barraAlfa);

            const dadosGamaHora = dadosEquipes.Gama?.find(d => d.hora === horaCurta);
            const barraGama = document.createElement('div');
            barraGama.className = 'barra equipe-gama';
            barraGama.style.height = dadosGamaHora ? `${dadosGamaHora.conformidade}%` : '0%';
            barraGama.title = `Gama ${horaLabel}: ${dadosGamaHora ? dadosGamaHora.conformidade : 'N/A'}%`;
            barrasContainer.appendChild(barraGama);
            
            grupoBarra.appendChild(barrasContainer);

            const labelHoraEl = document.createElement('div');
            labelHoraEl.className = 'label-hora';
            labelHoraEl.textContent = horaLabel;
            grupoBarra.appendChild(labelHoraEl);
            areaBarras.appendChild(grupoBarra);
        });
        containerGrafico.appendChild(areaBarras);
        graficoConformidadeDiaEl.appendChild(containerGrafico);
    }

    function renderOperatorInfo() {
        if (operatorNameEl) operatorNameEl.textContent = mockOperatorName;
    }

    function getProgressBarColor(statusNome) {
        if (statusNome === 'ok') return 'var(--success-color)';
        if (statusNome === 'atencao') return 'var(--warning-color)';
        if (statusNome === 'critico') return 'var(--danger-color)';
        return 'var(--dark-gray)';
    }

    function renderEquipes() {
    const listaEquipesEl = document.getElementById('lista-equipes');
    if (!listaEquipesEl) {
        console.error("Elemento 'lista-equipes' não encontrado no DOM.");
        return;
    }
    listaEquipesEl.innerHTML = ''; 
    mockEquipesData.forEach(equipe => {
        const teamGroupCard = document.createElement('div');
        teamGroupCard.className = 'team-group-card'; 
        const progressColor = getProgressBarColor(equipe.corStatusNome);
        const percentage = equipe.statusPercentual;
        const conicGradientStyle = `conic-gradient(${progressColor} 0deg ${percentage * 3.6}deg, var(--bg-light-gray) ${percentage * 3.6}deg 360deg)`;

        let statusTextVerbose = 'Regular';
        if (percentage >= 90) statusTextVerbose = 'Excelente';
        else if (percentage >= 75) statusTextVerbose = 'Bom';
        else if (percentage < 50) statusTextVerbose = 'Baixo';


        teamGroupCard.innerHTML = `
            <div class="team-group-header">
                <div class="team-group-info">
                    <h3><i class="fas fa-users"></i> ${equipe.nome}</h3>
                    <p class="team-function">${equipe.funcao || 'Função não especificada'}</p>
                    <p class="team-area-label">Área Designada: ${equipe.areaDesignada || 'Não especificada'}</p>
                </div>
                <div class="team-compliance-progress">
                    <div class="circular-progress-container">
                        <div class="circular-progress-bg">
                            <div class="circular-progress-bar" style="background-image: ${conicGradientStyle};"></div>
                        </div>
                        <div class="circular-progress-overlay">
                            <span class="progress-value-text" style="color: ${progressColor};">${percentage}%</span>
                        </div>
                    </div>
                    <span class="status-text ${equipe.corStatusNome}">${statusTextVerbose}</span>
                </div>
            </div>

            <div class="team-group-body">
                <div class="expected-equipment-section">
                    <h4><i class="fas fa-clipboard-list"></i> EPIs Mandatórios</h4>
                    <ul class="equipment-list">
                        ${equipe.episEsperados.map(epi => `
                            <li class="equipment-item">
                                <i class="${epi.icone || 'fas fa-shield-alt'}"></i> ${epi.nome}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="team-members-section">
                    <h4><i class="fas fa-user-friends"></i> Membros da Equipe (${equipe.funcionarios.length})</h4>
                    <div class="team-members-grid">
                        ${equipe.funcionarios.map(func => `
                            <div class="employee-card">
                                <img src="${func.foto || 'img/avatars/default-avatar.png'}" alt="Foto de ${func.nome}" class="employee-photo">
                                <p class="employee-name">${func.nome}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        listaEquipesEl.appendChild(teamGroupCard);
    });
}

    function renderCatracasLog() {
        const tbody = document.querySelector('#catracas-log-table tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        mockCatracasLog.forEach((log, index) => {
            const tr = document.createElement('tr');
            let statusClass = log.status === 'Liberada' ? 'status-liberada' : 'status-bloqueada';
            let acaoButton = '';

            if (log.status === 'Bloqueada' && !log.liberadaManualmente) {
                acaoButton = `<button class="btn-liberar-catraca" data-log-index="${index}">Liberar Manualmente</button>`;
            } else if (log.liberadaManualmente) {
                acaoButton = `Liberada por: ${log.operadorLiberou || 'Operador'}`;
                statusClass = 'status-liberada';
            }

            tr.innerHTML = `
                <td>${log.horario}</td>
                <td>${log.funcionarioId}</td>
                <td>${log.epis}</td>
                <td class="${statusClass}">${log.liberadaManualmente ? 'Liberada (Manual)' : log.status}</td>
                <td>${acaoButton}</td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-liberar-catraca').forEach(button => {
            button.addEventListener('click', function() {
                const logIndex = parseInt(this.dataset.logIndex);
                if (confirm(`Deseja realmente liberar a catraca para o funcionário ${mockCatracasLog[logIndex].funcionarioId}?`)) {
                    mockCatracasLog[logIndex].liberadaManualmente = true;
                    mockCatracasLog[logIndex].operadorLiberou = mockOperatorName;
                    renderCatracasLog();
                    alert(`Catraca para ${mockCatracasLog[logIndex].funcionarioId} liberada.`);
                }
            });
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            navegarParaSecao(targetId);
        });
    });

    const emitirAvisoBtn = document.getElementById('emitir-aviso-btn');
    if (emitirAvisoBtn) {
        emitirAvisoBtn.addEventListener('click', () => {
            const area = prompt('Para qual área deseja emitir o aviso sonoro? (Ex: Linha 2, Pátio)');
            if (area) {
                alert(`Simulação: Aviso sonoro emitido para a área: ${area}. (Som não implementado)`);
            }
        });
    }

    const notificationsBtn = document.getElementById('notifications-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            alert("Simulação: Mostrar painel de notificações.\n- Alerta: Equipe Beta com baixo uso de EPIs.\n- Info: Manutenção da Câmera 02 agendada.\n- Sucesso: Meta mensal de conformidade atingida pela Equipe Alfa.");
            const badge = notificationsBtn.querySelector('.notification-badge');
            if (badge) badge.style.display = 'none';
        });
    }

    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert("Simulação: Abrir configurações do painel (Ex: preferências de tema, alertas, etc.).");
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Deseja realmente sair do painel?')) {
                alert('Simulação: Logout realizado. Redirecionando para tela de login...');
                // window.location.href = 'login.html';
            }
        });
    }

    if (mesAnteriorBtn) {
        mesAnteriorBtn.addEventListener('click', () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() - 1);
            renderizarCalendario();
        });
    }

    if (proximoMesBtn) {
        proximoMesBtn.addEventListener('click', () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() + 1);
            renderizarCalendario();
        });
    }

    if (seletorEquipeHistoricoEl) {
        seletorEquipeHistoricoEl.addEventListener('change', () => {
            const diaSelecionadoAtual = calendarioGridEl.querySelector('.dia.dia-selecionado');
            if (diaSelecionadoAtual && detalheDiaContainerEl.style.display === 'block') {
                mostrarDetalhesDia(diaSelecionadoAtual.dataset.data);
            }
        });
    }

    document.getElementById('toggle-cameras-mapa')?.addEventListener('change', renderizarPlantaBaixa);
    document.getElementById('toggle-colaboradores-mapa')?.addEventListener('change', renderizarPlantaBaixa);
    document.getElementById('toggle-zonas-perigo-mapa')?.addEventListener('change', renderizarPlantaBaixa);

    const navLogoutBtn = document.getElementById('nav-logout-btn');
    if (navLogoutBtn) {
        navLogoutBtn.addEventListener('click', () => {
            if (confirm('Deseja realmente sair do painel?')) {
                alert('Simulação: Logout realizado (via botão da navegação). Redirecionando para tela de login...');
                // window.location.href = 'login.html';
            }
        });
    } else {
        console.warn("Botão de logout da navegação ('nav-logout-btn') não encontrado.");
    }

    renderOperatorInfo();
    renderEquipes();
    popularSeletorEquipesHistorico();
    renderizarCalendario();
    renderizarDadosVisaoGeral();
    renderizarGraficoTendenciaConformidade();
    renderizarGraficoAlertasPorTipo();
    renderizarNaoConformidadesInicio();
    renderizarPlantaBaixa();
    setupVideoFilterSwitches();
});