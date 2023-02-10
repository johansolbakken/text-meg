
export type Letter = {
    text: string,
    index: number
}

export class Writer {
    
    letters: Letter[] = []
    cursor: number = 0

    addLetter = (letter: Letter) => {
        if (this.cursor == 0) {
            this.letters = [
                letter,
                ...this.letters
            ]
        } else {
            this.letters = [
                ...this.letters.slice(0, this.cursor),
                letter,
                ...this.letters.slice(this.cursor, this.letters.length)
            ]
        }
       
        this.cursor += 1
        this.letters.forEach((letter, index) => letter.index = index)
    }

    cursorLeft = () => {
        this.cursor -= 1
        if (this.cursor < 0) this.cursor = 0
    }

    cursorRight = () => {
        this.cursor += 1
        if (this.cursor >= this.letters.length) this.cursor = this.letters.length
    }

    cursorPos = () => this.cursor

    deleteLetter() {
        if (this.cursor > 0) 
        {
            this.letters = [
                ...this.letters.slice(0, this.cursor-1),
                ...this.letters.slice(Math.min(this.cursor, this.letters.length), this.letters.length)   
            ]
            this.cursor -= 1
        }
    }
}

