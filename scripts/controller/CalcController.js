class CalcController{

    constructor(){
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._operation = [];

        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

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

    //metodo para adicionar multiplos eventos no mesmo elemento
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }

    clearAll(){

        this._operation = [];

    }

    clearEntry(){

        //"elimina o ultimo elemento de um array"
        this._operation.pop()

    }

    getLastOperation(){

        return this._operation[this._operation.length - 1];

    }

    isOperator(value){

        return (['+','-','*','%','/'].indexOf(value) > -1);
            

    }

    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;

    }

    pushOperation(value){
    
        this._operation.push(value);

        if(this._operation.length > 3){

            
            
            this.calc();

        }
    
    }

    calc(){

        let last = this._operation.pop();

        console.log(this._operation);

        //join junta um array, e coloca a separação passada no parametro
        let result = eval(this._operation.join(""));

        this._operation = [result, last];

        this.setLastNumberToDisplay();

    }

    setLastNumberToDisplay(){

        let lastNumber;
        for(let i = this._operation.length - 1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }

        }

        this.displayCalc = lastNumber;

    }

    addOperation(value){
        
        
        //isNaN -> is not a number
        
        if(isNaN(this.getLastOperation())){
            //Strings
            
            if(this.isOperator(value)){
                //trocar o operador que está
                this.setLastOperation(value);
            }else if(isNaN(value)){
                // this._operation.push(value);
                console.log("Outra coisa");
            }else{

                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }

        }else{
            //Number
            if(this.isOperator(value)){

                this.pushOperation(value);

            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();


            }
            
        }

        // console.log(this._operation);

    }

    setError(){

        this.displayCalc = "Error";

    }

    execBtn(value){

        switch(value){
            
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation("+");
                break;
            case 'subtracao':
                this.addOperation("-");
                break;
            case 'divisao':
                this.addOperation("/");
                break;
            case 'multiplicacao':
                this.addOperation("*");
                break;
            case 'porcento':
                this.addOperation("%");
                break;
            case 'igual':
                
                break;
            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;


        }

    }

    initButtonsEvents(){
        
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        console.log(buttons);
        
        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click', e=> {
                
                let textBtn = btn.className.baseVal.replace("btn-", "");
                
                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
                btn.style.cursor = "pointer";
            });

        });

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