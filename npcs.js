const npcs = [
  { 
    id: "moeda", x: 2640, y: 342, width: 32, height: 32, img: npc1Img, 
    dialogue: ["New..", "N-NEWT!!!!! A QUANTO TEMPO QUE EU NÃO TE VEJO", "Pera, que?", "E tu nem me avisou nada?", "Simples assim?", "Beleza viu.", "Faz tanto tempo que eu queria te ver mas tu me aparece justo quando eu to ocupado cara.", "Quer saber, tu deveria dar uma olhada nesse predio grande a sua esquerda.", "Pelo visto tem umas parada interessante lá.", "Bom, nois se ve por ai :)", "A, quase esqueci, pega essa moeda aqui, sei la vai que tu precisa."] 
  },
  { id: "fixo1", x: 298, y: 900, width: 32, height: 32, img: npc2Img, dialogue: ["Atenção cidadão.", "Essa area se encontra indisponivel no momento."] },
  { id: "fixo2", x: 298, y: 1025, width: 32, height: 32, img: npc3Img, dialogue: ["O telescópio é incrível."] },
  { 
    id: "dinamico", x: 1480, y: 655, width: 32, height: 32, 
    imgFront: npc4FrontImg, imgDiag: npc4DiagImg, 
    dialogue: ["Opa bom dia, tu deve ser novo por aqui.", "Bem vindo a Riverviews, aqui ta só o pó da rabiola mas é bem bonito.", "Isso aqui é um observador, se tu quiser dar uma olhada na vista esteja a vontade", "mas primeiro tu precisa de uma moeda.", "Eu aconselho tu dar uma olhada no predio rosa aqui do lado, tem umas coisas bacanas lá.."] 
  }
];

function getNpc4Image(npc, player) {
    const dx = player.x - npc.x;
    const dy = player.y - npc.y;
    if (Math.abs(dx) > 10 && Math.abs(dy) > 10) {
        return npc.imgDiag;
    }
    return npc.imgFront;
}