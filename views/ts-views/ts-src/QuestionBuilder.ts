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
        var mapHiddenWordsWithNumOfChars = {};
        var wordsQuestion = [];
        positionHiddenWords.forEach((index)=>{
            console.log(words[index],words[index].length)
            mapHiddenWordsWithNumOfChars[index]=words[index].length;
        });
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if(positionHiddenWords.indexOf(i)<0){
                wordsQuestion.push(word);
            }else {
                wordsQuestion.push(QuestionBuilder.maskHiddenWord);
            }
        }
        return new WriteTranscriptQuestion(wordsQuestion,mapHiddenWordsWithNumOfChars);
    }
}
export class WriteTranscriptQuestion{
    wordsQuestion:string;
    mapHiddenWordsWithNumOfChars;
    checkAnswer(answers:Array<string>){

    }
    constructor(wordsQuestion,mapHiddenWordsWithNumOfChars){
        this.wordsQuestion = wordsQuestion;
        this.mapHiddenWordsWithNumOfChars = mapHiddenWordsWithNumOfChars;
    }
}