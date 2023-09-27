let backgd;
function preload() {
  backgd = loadImage("artwork and label.png");
}

let bubbles = [];
let lines = [];
let paint; // new canvas

class Bubble {
  constructor(x, y, r, colR, colG, colB) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.colR = colR;
    this.colG = colG;
    this.colB = colB;
  }

  move() {
    this.x = this.x + random(-100, 100);
    this.y = this.y + random(-100, 100);
  }

  show() {
    paint.noStroke();
    paint.fill(this.colR, this.colG, this.colB);
    paint.ellipse(this.x, this.y, this.r * 2);
  }
}
class Line {
  constructor() {
    this.startX = random(paint.width);
    this.startY = random(paint.height);
    this.endX = random(paint.width);
    this.endY = random(paint.height);
    this.isCurvy = random() < 0.5;
    this.strokeColor = color(random(255), random(255), random(255));
  }

  move() {
    this.startX = this.startX + random(-100, 100);
    this.startY = this.startY + random(-100, 100);
    this.endX = this.endX + random(-100, 100);
    this.endY = this.endY + random(-100, 100);
  }

  show() {
    paint.noFill();
    paint.stroke(this.strokeColor);
    paint.strokeWeight(random(1, 8));
    if (this.isCurvy) {
      let controlX1 = random(paint.width * 2);
      let controlY1 = random(paint.height * 2);
      let controlX2 = random(paint.width * 2);
      let controlY2 = random(paint.height * 2);
      paint.bezier(
        this.startX,
        this.startY,
        controlX1,
        controlY1,
        controlX2,
        controlY2,
        this.endX,
        this.endY
      );
    } else {
      paint.line(this.startX, this.startY, this.endX, this.endY);
    }
  }
}

let adj = [
  "Baroque",
  "Bona Fide",
  "Boondoggle",
  "Bourgeois",
  "Brusque",
  "Capricious",
  "Caustic",
  "Cloying",
  "Disheveled",
  "Ephemeral",
  "Ersatz",
  "Esoteric",
  "Facetious",
  "Fastidious",
  "Glib",
  "Gregarious",
  "Hedonistic",
  "Idiosyncratic",
  "Idyllic",
  "Indelicate",
  "Infinitesimal",
  "Insidious",
  "Lurid",
  "Machiavellian",
  "Maudlin",
  "Mercenary",
  "Minimalist",
  "Misnomer",
  "Narcissist",
  "Ostentatious",
  "Peevish",
  "Perfunctory",
  "Philistine",
  "Picayune",
  "Precocious",
  "Quintessential",
  "Revel",
  "Scintillating",
  "Spartan",
  "Suave",
  "Supercilious",
  "Ubiquitous",
  "Unrequited",
  "Untenable",
  "Verbose",
  "Vicarious",
  "Vile",
  "Zealous",
];
let noun = [
  "Accolade",
  "Acrimony",
  "Angst",
  "Anomaly",
  "Bonhomie",
  "Bravado",
  "Cacophony",
  "Camaraderie",
  "Carte blanche",
  "Charisma",
  "Conundrum",
  "Deja vu",
  "Dichotomy",
  "Dilettante",
  "Elan",
  "Ennui",
  "Epitome",
  "Equanimity",
  "Ersatz",
  "Euphemism",
  "Fait Accompli",
  "Faux pas",
  "Fiasco",
  "Harbinger",
  "Hedonist",
  "Heresy",
  "Junket",
  "Litany",
  "Malaise",
  "Mantra",
  "Minimalist",
  "Misnomer",
  "Narcissist",
  "Nirvana",
  "Non Sequitur",
  "Oblivion",
  "Panacea",
  "Paradox",
  "Philistine",
  "Propriety",
  "Quid Pro Quo",
  "Red Herring",
  "Rhetoric",
  "Stigma",
  "Stoic",
  "Sycophant",
  "Tete-a-tete",
  "Tirade",
  "Tryst",
  "Zeitgeist",
];
let selectedAdj = "Untitled";
let selectedNoun = "";
let button;

function setup() {
  createCanvas(1450, 800);
  paint = createGraphics(554,382);// create new canvas

  button = createButton("?");
  button.position(1288, 348);
  button.mousePressed(updatePaint);
  
  for (let i = 0; i < random(10, 120); i++) {
    let x = random(paint.width);
    let y = random(paint.height);
    let r = random(5, 50);
    let colR = random(255);
    let colG = random(255);
    let colB = random(255);
    let b = new Bubble(x, y, r, colR, colG, colB);
    bubbles.push(b);

    for (let j = 0; j < random(0.1, 1.2); j++) {
      let lineStartX = random(paint.width);
      let lineStartY = random(paint.height);
      let lineEndX = random(paint.width);
      let lineEndY = random(paint.height);
      let l = new Line();
      l.startX = lineStartX;
      l.startY = lineStartY;
      l.endX = lineEndX;
      l.endY = lineEndY;
      lines.push(l);
    }
  }
}

function draw() {
  image(backgd, 0, 0, width, height);
  noStroke();
  fill(20);
  textSize(15);
  text("Interactive media art", 1042, 408);
  text("554mm x 382mm", 1042, 430);
  text("2023",1042, 452);

  // random adj + noun
  strokeWeight(1);
  stroke(20);
  fill(20);
  textSize(17);
  text("The " + selectedAdj + " " + selectedNoun, 1042, 364);
  
  // draw new canvas onto main canvas
  image(paint, 233, 198);
}

// random text drawn from arrays
function selectRandom() {
  selectedAdj = random(adj);
  selectedNoun = random(noun);
}

// random title + random painting
function updatePaint() {
  selectRandom();
      
  paint.background(random(255), random(255), random(255));
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }

  for (let j = 0; j < lines.length; j++) {
    lines[j].show();
    lines[j].move();
  }
}