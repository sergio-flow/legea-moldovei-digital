
export type BookStatus = "disponibil" | "curand";

export interface BookItem {
  key: string;
  title: string;
  subtitle?: string;
  category: string;
  status: BookStatus;
}

// Main laws/categories
export const categories = [
  {
    title: "Actele fundamentale",
    books: [
      {
        key: "constitutia",
        title: "Constituția Republicii Moldova (1994)",
        subtitle: "legea supremă a țării",
        status: "disponibil",
      },
      {
        key: "declaratia-independenta",
        title: "Declarația de Independență (1991)",
        status: "curand",
      },
    ],
  },
  {
    title: "Codurile principale",
    books: [
      { key: "cod-muncii", title: "Codul Muncii", status: "curand" },
      { key: "cod-civil", title: "Codul Civil", status: "curand" },
      { key: "cod-penal", title: "Codul Penal", status: "curand" },
      { key: "cod-procedura-penala", title: "Codul de Procedură Penală", status: "curand" },
      { key: "cod-procedura-civila", title: "Codul de Procedură Civilă", status: "curand" },
      { key: "cod-familiei", title: "Codul Familiei", status: "curand" },
      { key: "cod-fiscal", title: "Codul Fiscal", status: "curand" },
      { key: "cod-vamal", title: "Codul Vamal", status: "curand" },
      { key: "cod-contraventiilor", title: "Codul Contravențiilor", status: "curand" },
      { key: "cod-electoral", title: "Codul Electoral", status: "curand" },
      { key: "cod-funciar", title: "Codul Funciar", status: "curand" },
      { key: "cod-silvic", title: "Codul Silvic", status: "curand" },
      { key: "cod-apele", title: "Codul Apelor", status: "curand" },
      { key: "cod-stiinta-inovare", title: "Codul cu privire la Știință și Inovare", status: "curand" },
    ],
  },
  {
    title: "Administrație publică și guvernare",
    books: [
      { key: "lege-centrala", title: "Legea privind administrația publică centrală", status: "curand" },
      { key: "lege-locala", title: "Legea privind administrația publică locală", status: "curand" },
      { key: "lege-functie-publica", title: "Legea privind funcția publică", status: "curand" },
      { key: "lege-acces-informatie", title: "Legea privind accesul la informație", status: "curand" },
    ]
  },
  {
    title: "Economie și afaceri",
    books: [
      { key: "lege-soc-actiuni", title: "Legea privind societățile pe acțiuni", status: "curand" },
      { key: "lege-srl", title: "Legea privind societățile cu răspundere limitată", status: "curand" },
      { key: "lege-concurenta", title: "Legea privind concurența", status: "curand" },
      { key: "lege-protectia-consumatorilor", title: "Legea privind protecția consumatorilor", status: "curand" },
      { key: "lege-banci", title: "Legea băncilor", status: "curand" },
      { key: "lege-piata-capital", title: "Legea privind piața de capital", status: "curand" },
    ]
  },
  {
    title: "Educație și cultură",
    books: [
      { key: "lege-educatie", title: "Legea privind educația", status: "curand" },
      { key: "lege-invatamant-superior", title: "Legea privind învățământul superior", status: "curand" },
      { key: "lege-cultura", title: "Legea privind cultura", status: "curand" },
    ]
  },
  {
    title: "Sănătate și protecție socială",
    books: [
      { key: "lege-sanatate", title: "Legea ocrotirii sănătății", status: "curand" },
      { key: "lege-asigurari-sociale", title: "Legea asigurărilor sociale de stat", status: "curand" },
      { key: "lege-pensii", title: "Legea privind pensiile de asigurări sociale de stat", status: "curand" },
    ]
  },
  {
    title: "Mediu și resurse",
    books: [
      { key: "lege-protectia-mediului", title: "Legea privind protecția mediului", status: "curand" },
      { key: "lege-fond-funciar", title: "Legea privind fondul funciar", status: "curand" },
    ]
  }
];

// Book text for Constituția
export const constitutiaContent = [
  {
    title: "Republica Moldova\nPARLAMENTUL\nCONSTITUŢIA Nr. 1\ndin 29-07-1994",
    subtitle: "CONSTITUŢIA REPUBLICII MOLDOVA*",
    info:
      "Publicat : 29-03-2016 în Monitorul Oficial Nr. 78 art. 140\n\nMODIFICAT\n\nLP255 din 22.11.18, MO467-479/14.12.18 art.786\n\n* Republicată. Modificată şi completată prin legile Republicii Moldova:\nLP185-XVI din 29.06.06, MO106-111/14.07.06 art.502\nLP344-XV din 25.07.03, MO170-172/08.08.03 art. 721\nLP1471-XV din 21.11.02, MO169/12.12.02 art.1294\nLP1470-XV din 21.11.02, MO169/12.12.02 art.1292\nLP1469-XV din 21.11.02, MO169/12.12.02 art.1290\nLP351-XV din 12.07.01, MO90-91/02.08.01 art.699\nLP1115-XIV din 05.07.00, MO88-89/28.07.00 art.661\nLP957-XIII din 19.07.96, MO54/15.08.96 art.517\nRectificare la art.88, MO nr.1, partea II, din 19 august 1994, pag.1\nRectificare la art.75, MO nr.10 din 20 octombrie 1994, pag.2",
    preamble: [
      "NOI, reprezentanţii plenipotenţiari ai poporului Republicii Moldova, deputaţi în Parlament,",
      "PORNIND de la aspiraţiile seculare ale poporului de a trăi într-o ţară suverană, exprimate prin proclamarea independenţei Republicii Moldova,",
      "AVÎND în vedere continuitatea statalităţii poporului moldovenesc în contextul istoric şi etnic al devenirii lui ca naţiune,",
      "NĂZUIND spre satisfacerea intereselor cetăţenilor de altă origine etnică, care împreună cu moldovenii constituie poporul Republicii Moldova,",
      "CONSIDERÎND statul de drept, pacea civică, democraţia, demnitatea omului, drepturile şi libertăţile lui, libera dezvoltare a personalităţii umane, dreptatea şi pluralismul politic valori supreme,",
      "FIIND CONŞTIENŢI de responsabilitatea şi obligaţiile noastre faţă de generaţiile precedente, actuale şi viitoare,",
      "REAFIRMÎND devotamentul nostru faţă de valorile general-umane, dorinţa de a trăi în pace şi bună înţelegere cu toate popoarele lumii conform principiilor şi normelor unanim recunoscute ale dreptului internaţional,",
      "adoptăm Constituţia Republicii Moldova, declarînd-o LEGE SUPREMĂ A SOCIETĂŢII ŞI A STATULUI."
    ]
  },
  {
    title: "Titlul I\nPRINCIPII GENERALE",
    articles: [
      {
        number: 1,
        name: "Statul Republica Moldova",
        paragraphs: [
          "Republica Moldova este un stat suveran şi independent, unitar şi indivizibil.",
          "Forma de guvernămînt a statului este republica.",
          "Republica Moldova este un stat de drept, democratic, în care demnitatea omului, drepturile şi libertăţile lui, libera dezvoltare a personalităţii umane, dreptatea şi pluralismul politic reprezintă valori supreme şi sînt garantate."
        ]
      },
      {
        number: 2,
        name: "Suveranitatea şi puterea de stat",
        paragraphs: [
          "Suveranitatea naţională aparţine poporului Republicii Moldova, care o exercită în mod direct şi prin organele sale reprezentative, în formele stabilite de Constituţie.",
          "Nici o persoană particulară, nici o parte din popor, nici un grup social, nici un partid politic sau o altă formaţiune obştească nu poate exercita puterea de stat în nume propriu. Uzurparea puterii de stat constituie cea mai gravă crimă împotriva poporului."
        ],
        notes: [
          "Alineatul (2) explică procedura de numire: Avocatul Poporului este ales de Parlament, cu votul majorității deputaților aleși, printr-o procedură transparentă prevăzută de lege, pentru un mandat unic de 7 ani."
        ]
      },
      {
        number: 3,
        name: "Teritoriul",
        paragraphs: [
          "Teritoriul Republicii Moldova este inalienabil.",
          "Frontierele ţării sînt consfinţite prin lege organică, respectîndu-se principiile şi normele unanim recunoscute ale dreptului internaţional."
        ]
      },
      {
        number: 4,
        name: "Drepturile şi libertăţile omului",
        paragraphs: [
          "Dispoziţiile constituţionale privind drepturile şi libertăţile omului se interpretează şi se aplică în concordanţă cu Declaraţia Universală a Drepturilor Omului, cu pactele şi cu celelalte tratate la care Republica Moldova este parte.",
          "Dacă există neconcordanţe între pactele şi tratatele privitoare la drepturile fundamentale ale omului la care Republica Moldova este parte şi legile ei interne, prioritate au reglementările internaţionale."
        ]
      },
      {
        number: 5,
        name: "Democraţia şi pluralismul politic",
        paragraphs: [
          "Democraţia în Republica Moldova se exercită în condiţiile pluralismului politic, care este incompatibil cu dictatura şi cu totalitarismul.",
          "Nici o ideologie nu poate fi instituită ca ideologie oficială a statului."
        ]
      }
    ]
  }
];
