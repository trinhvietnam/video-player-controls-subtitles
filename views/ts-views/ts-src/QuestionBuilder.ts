/**
 * Created by NamTV on 6/6/2017.
 */
import * as $ from 'jquery';
export class QuestionBuilder{
    static maskHiddenWord = '_____';
    public static getWriteTranslateQuestion(enSub:string){

    }
    public static getWriteTranscriptQuestion(enSub:string):WriteTranscriptQuestion{
        var words:Array<string> = $('<div>'+enSub+'</div>').text().split(/[\s\n]+/).map((word)=>{
            return word.replace('.','');
        });
        var positionHiddenWords = [new Date().getTime()%words.length];
        var numOfCharacters = positionHiddenWords.map((index)=>{
            console.log(words[index],words[index].length)
            return words[index].length;
        });
        var textQuestion = '';
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if(positionHiddenWords.lastIndexOf(i)<0){
                textQuestion += word+' ';
            }else {
                textQuestion += this.maskHiddenWord+' ';
            }
        }
        return new WriteTranscriptQuestion(textQuestion.trim(),positionHiddenWords,numOfCharacters);
    }
}
export class WriteTranscriptQuestion{
    textQuestion:string;
    positionHiddenWords:Array<number>;
    numOfCharacters:Array<number>;
    checkAnswer(answers:Array<string>){

    }
    constructor(textQuestion,positionHiddenWords,numOfCharacters){
        this.textQuestion = textQuestion;
        this.positionHiddenWords = positionHiddenWords;
        this.numOfCharacters = numOfCharacters;
    }
}