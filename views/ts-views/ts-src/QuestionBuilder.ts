/**
 * Created by NamTV on 6/6/2017.
 */
export class QuestionBuilder{
    static maskHiddenWord = '_____';
    public static getWriteTranslateQuestion(enSub:string){

    }
    public static getWriteTranscriptQuestion(enSub:string):WriteTranscriptQuestion{
        var words = enSub.split(' ');
        var positionHiddenWords = [new Date().getTime()%words.length];
        var textQuestion = '';
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if(positionHiddenWords.lastIndexOf(i)<0){
                textQuestion += word+' ';
            }else {
                textQuestion += this.maskHiddenWord+' ';
            }
        }
        return new WriteTranscriptQuestion(textQuestion.trim(),positionHiddenWords);
    }
}
export class WriteTranscriptQuestion{
    textQuestion:string;
    positionHiddenWords:Array<number>;
    checkAnswer(answers:Array<string>){

    }
    constructor(textQuestion,positionHiddenWords){
        this.textQuestion = textQuestion;
        this.positionHiddenWords = positionHiddenWords;
    }
}