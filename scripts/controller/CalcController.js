class CalcController{

    constructor(){
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._operation = [];
        this._lastOperator = '';
        this._lastNumber = '';

        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
        this.pasteFromClipboard();

        //o underline depois do this. faz o atributo ser privado.
        //e tbm precisa colocar os geters e seters nele

    }

    pasteFromClipboard(){

        document.addEventListener('paste', e=>{

            let text = e.clipboardData.getData('Text');
            
            this.displayCalc = parseFloat(text);

            this._operation.push(parseFloat(text));

            this.calc();

        });

    }

    copyToClipboard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

    }

    initialize(){
        //setInterval fica repetindo o codigo em um intervalo de tempo
        this.setdisplayDateTime();
        
        setInterval(()=>{
            this.setdisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay();
    }

    //metodo para adicionar multiplos eventos no mesmo elemento
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }

    clearAll(){

        
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();

    }

    clearEntry(){

        
        //"elimina o ultimo elemento de um array"
        this._operation.pop();
        this.setLastNumberToDisplay();

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

    getResult(){

        return eval(this._operation.join(""));

    }

    calc(){
        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if(this._operation.length > 3){
            last = this._operation.pop();

            this._lastNumber = this.getResult();

        }else if(this._operation.length == 3){   
            
            this._lastNumber = this.getLastItem(false);

        }
        
        let result = this.getResult();
        if(last == "%"){

            result /= 100;

            this._operation = [result];

        }else{
            console.log(this._operation);

            //join junta um array, e coloca a separação passada no parametro
    
            this._operation = [result];

            if(last) this._operation.push(last);
    
            
    
        }
        this.setLastNumberToDisplay();

        
    }

    getLastItem(isOperator = true){

        let lastItem;
        for(let i = this._operation.length - 1; i >= 0; i--){

            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }
            
        }

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    addOperation(value){
        
        
        //isNaN -> is not a number
        
        if(isNaN(this.getLastOperation())){
            //Strings
            
            if(this.isOperator(value)){
                //trocar o operador que está
                this.setLastOperation(value);
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
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();


            }
            
        }

        // console.log(this._operation);

    }

    setError(){

        this.displayCalc = "Error";

    }

    addDot(){

        let lastOperation = this.getLastOperation();


        //split('').indexOf('.') -> transforma uma string em array, depois verifica se no array tem o .
        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
        
        if(this.isOperator(lastOperation) || !lastOperation){

            this.pushOperation('0.');

        }else{

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();

        console.log("LastOperation", lastOperation.toString);

    }

    initKeyboard(){

        document.addEventListener('keyup', e=>{

            switch(e.key){
            
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;
                
                    case 'Enter':
                    case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot();
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
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
    
            }

        });

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
                this.calc();
                break;
            case 'ponto':
                this.addDot();
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