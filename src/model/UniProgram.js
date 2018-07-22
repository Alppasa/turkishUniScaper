

var ProgramTyp = {
  BachelorProgram: "BachelorProgram",
  MasterProgram: "MasterProgram"
};
var UniProgram = {}
UniProgram.uniProgram = function UniProgram() {
  this.name = '';
  this.url = '';
  this.semesters = 0;
  this.degree = ProgramTyp;
}

function ProgramUrl() {
  this.url = '';
  this.degree = ProgramTyp;
}

module.exports = UniProgram;