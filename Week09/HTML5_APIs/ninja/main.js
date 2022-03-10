const url = 'http: //spbooks.github.io/questions.json';

fetch(url)
    .then(response => response.json())
    .then(quiz => {
        view.start.addEventListener('click', () => game.start(quiz.questions), false);
        view.response.addEventListener('click', (event) => game.check(event), false);
    });

const quiz = [{
        name: "Superman",
        realName: "Clark Kent"
    },
    {
        name: "Wonder Woman",
        realName: "Diana Prince"
    },
    {
        name: "Batman",
        realName: "Bruce Wayne"
    },

];
/*const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];*/

//View Object
const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    render(target, content, attributes) {
        for (const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },

    setup() {
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score.classList, game.score);
        this.render(this.result, '');
        this.render(this.hiScore, game.hiScore());
    },

    teardown() {
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
        this.render(this.hiScore, game.hiScore());
    }
}


const game = {
    start(quiz) {
        this.questions = [...quiz];
        this.score = 0;
        //main game loop
        for (const question of this.questions) {
            this.question = question;
            this.ask();
        }
        //end of main game loop
        this.gameOver();
    },


    ask() {
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question, question);
        const response = prompt(question);
        this.check(response);
    },
    check(response) {
        const answer = this.question.realName;
        if (response === answer) {
            view.render(view.result, 'Correct!', { 'class': 'correct' });
            alert('Correct!');
            this.score++;
            view.render(view.score, this.score);
        } else {
            view.render(view.result, `Wrong! The correct answer was ${answer}`, { 'class': 'wrong' });
            alert(`Wrong! The correct answer was ${answer}`);
        }

    },
    gameOver() {
        view.render(view.info `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);



    },

    hiScore() {
        const hi = localStorage.getItem('highScore') || 0;
        if (this.score > hi || hi === 0) {
            localStorage.setItem('highScore', this.score);
            view.render(view.info, '** NEW HIGH SCORE **');
        }
        return localStorage.getItem('highScore');

    }
}


game.start(quiz);