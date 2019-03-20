class CalcController{

    constructor(){
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._currentDate;
        this.initialize();

        //o underline depois do this. faz o atributo ser privado.
        //e tbm precisa colocar os geters e seters nele

    }

    initialize(){
        //setInterval fica repetindo o codigo em um intervalo de tempo
        this.setdisplayDateTime();
        setInterval(()=>{
            this.setdisplayDateTime();
        }, 1000);
    }

    setdisplayDateTime(){
        //this.displayDate é referente a tag html da data (vai receber a nova data a cada 1s)
        //this.currentDate retorna uma nova instancia da data (atualiza)
        //this._locale é o idioma que vai ser usado, a formatação
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day : "2-digit",
            month:"short",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate(){

        return new Date;

    } 

    set currentDate(value){

        this._displayCalc = value;

    }

    

}