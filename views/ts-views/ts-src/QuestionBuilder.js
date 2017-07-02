"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by NamTV on 6/6/2017.
 */
var $ = require("jquery");
var QuestionBuilder = (function () {
    function QuestionBuilder() {
    }
    QuestionBuilder.getWriteTranslateQuestion = function (enSub) {
    };
    QuestionBuilder.getWriteTranscriptQuestion = function (enSub) {
        var words = $('<div>' + enSub + '</div>').text().split(/[\s\n]+/).map(function (word) {
            return word.replace('.', '');
        });
        var positionHiddenWords = [new Date().getTime() % words.length];
        var mapHiddenWordsWithNumOfChars = {};
        var wordsQuestion = [];
        positionHiddenWords.forEach(function (index) {
            console.log(words[index], words[index].length);
            mapHiddenWordsWithNumOfChars[index] = words[index].length;
        });
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (positionHiddenWords.indexOf(i) < 0) {
                wordsQuestion.push(word);
            }
            else {
                wordsQuestion.push(QuestionBuilder.maskHiddenWord);
            }
        }
        return new WriteTranscriptQuestion(wordsQuestion, mapHiddenWordsWithNumOfChars);
    };
    return QuestionBuilder;
}());
QuestionBuilder.maskHiddenWord = '_____';
exports.QuestionBuilder = QuestionBuilder;
var WriteTranscriptQuestion = (function () {
    function WriteTranscriptQuestion(wordsQuestion, mapHiddenWordsWithNumOfChars) {
        this.wordsQuestion = wordsQuestion;
        this.mapHiddenWordsWithNumOfChars = mapHiddenWordsWithNumOfChars;
    }
    WriteTranscriptQuestion.prototype.checkAnswer = function (answers) {
    };
    return WriteTranscriptQuestion;
}());
exports.WriteTranscriptQuestion = WriteTranscriptQuestion;
//# sourceMappingURL=QuestionBuilder.js.map