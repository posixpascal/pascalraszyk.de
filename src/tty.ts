/**
 * Supported colors
 */
export class Color {
    static WHITE = "tty-color-white tty-background-clear";
    static GRAY = "tty-color-muted";
}

interface TTYTextOption {
    color?: string;
    typeSpeed?: number;
    cssClass?: string;
}

/**
 * Main terminal class for writing text and code snippets to the fake terminal window
 */
export class TTY {
    /**
     * How fast to type in general (delay in MS). The bigger => the slower.
     * 
     * @memberof TTY
     */
    public typeSpeed: number = 30;

    /**
     * Whether or not to show particles when printing characters
     * 
     * @memberof TTY
     */
    public powermode = false;

    /**
     * Automatically scroll down when printing characters to the terminal
     * 
     * @memberof TTY
     */
    public autoScroll = true;

    /**
     * Creates an instance of TTY.
     * @param {HTMLElement} stdout 
     * @memberof TTY
     */
    constructor(private stdout: HTMLElement) {
        // Scroll down interval
        setInterval(() => {
            if (this.autoScroll) {
                stdout.scrollTop = stdout.scrollHeight;
            }
        }, 1000 / 16);

        // TODO: implement this skip logic.
        if (sessionStorage.getItem("skip")) { /** this.typeSpeed = 0; */ }
    }

    /**
     * Remove a whole line from the terminal
     * @param {number} [delay=100] The amount of time to wait after each character removal
     * @returns {Promise}
     * @memberof TTY
     */
    async eraseLine(delay: number = 100): Promise<any> {
        return new Promise(async (resolve, reject) => {
            while (true) {
                // Grab the last character from the terminal
                const lastChar = this.stdout.querySelector("span:last-child");

                // Check if it's the sole char on the current line
                const isLastCharInLine = !lastChar.previousSibling || (lastChar.previousSibling as HTMLElement).classList.contains('tty-line-feed');

                lastChar.parentElement.removeChild(lastChar);
                await this.idle(delay);

                if (isLastCharInLine) {
                    break;
                }
            }
            resolve();
        });
    }

    /**
     * 
     * 
     * @param {number} time The amount to wait till the promise gets resolved
     * @returns {Promise}
     * @memberof TTY
     */
    async idle(time: number): Promise<any> {
        return new Promise((resolve, reject) => { setTimeout(resolve, time); });
    }

    /**
     * This prints out a list of characters with a delay for each character.
     * You can use this to print "..." and slowing down between them.
     * @param {string} text 
     * @param {number} delay 
     * @param {string} [seperator=""] 
     * @param {TTYTextOption} [options={ color: Color.WHITE, typeSpeed: this.typeSpeed }] 
     * @returns 
     * @memberof TTY
     */
    async segment(text: string, delay: number, seperator: string = "", options: TTYTextOption = { color: Color.WHITE, typeSpeed: this.typeSpeed }) {
        return new Promise(async (resolve, reject) => {
            const characters: string[] = text.split("");
            while (characters.length) {
                await this.writeCharacter(characters.shift(), options);
                if (seperator) {
                    await this.writeCharacter(seperator, options);
                }
                await this.idle(delay);
            }
            resolve();
        });
    }

    /**
     * This was used to write a chunk of text in a seperate div
     * but later changed to print out code snippets only.
     * 
     * @param {string} text 
     * @param {string} className 
     * @param {string} [language="css"] The proogramming language to highlight
     * @param {TTYTextOption} [options={}] 
     * @returns 
     * @memberof TTY
     */
    async writeBlock(text: string, className: string, language: string = "css", options: TTYTextOption = {}) {
        const characters: string[] = text.split("");

        // For prism syntax highlighting to work we need to nest a <code> in a <pre>
        const blockIdentifier = `tty-block-${Math.random() * +new Date()}`;
        const blockElement = document.createElement("code");
        const blockWrapper = document.createElement("pre");

        blockElement.classList.add(blockIdentifier);
        blockElement.classList.add(`language-${language}`);
        blockWrapper.classList.add(`tty-block-${className}`);

        // Merge <code> and <pre> together
        blockWrapper.appendChild(blockElement);

        // and append it to the stdout. At this point the text is not visible as the blockElement is empty.
        this.stdout.appendChild(blockWrapper);

        return new Promise(async (resolve, reject) => {
            // Now lets print the text inside the blockElement one character at a time.
            while (characters.length) {
                let char = characters.shift();

                const characterElement = document.createElement("span");
                characterElement.classList.add("tty-char");
                if (options.cssClass) {
                    characterElement.classList.add(options.cssClass);
                }

                const colorClasses = (options.color || Color.WHITE).split(' ');
                colorClasses.forEach((colorClass) => {
                    characterElement.classList.add(colorClass);
                });

                characterElement.innerHTML = char;
                blockElement.appendChild(characterElement);

                await this.idle(options.typeSpeed || this.typeSpeed);
                
                // If powermode is loaded and active
                if (this.powermode && typeof (window as any).POWERMODE !== "undefined") {
                    // We just select the last printed character element
                    window.getSelection().selectAllChildren(characterElement);
                    (window as any).POWERMODE.colorful = true;
                    (window as any).POWERMODE.shake = (window.innerWidth > 767);
                    // and fire particles
                    (window as any).POWERMODE();
                }
                
                // Also we highlight the current printed character.
                // We need to use this AFTER powermode as prism transforms the HTML and breaking our selection logic.
                if (typeof (window as any).Prism !== "undefined") {
                    ((window as any).Prism as any).highlightAll();
                }
            }
            
            await this.lineBreak();
            resolve();
        });
    }

    /**
     * Write a single character to the terminal
     * 
     * @param {string} character 
     * @param {TTYTextOption} [options={}] 
     * @returns 
     * @memberof TTY
     */
    async writeCharacter(character:string, options: TTYTextOption = {}) {
        return new Promise((resolve, reject) => {

            const characterElement = document.createElement("span");
            characterElement.classList.add("tty-char");
            if (options.cssClass) {
                characterElement.classList.add(options.cssClass);
            }

            const colorClasses = (options.color || Color.WHITE).split(' ');
            colorClasses.forEach((colorClass) => {
                characterElement.classList.add(colorClass);
            });

            characterElement.innerHTML = character;


            this.stdout.appendChild(characterElement);
            setTimeout(resolve, options.typeSpeed || this.typeSpeed);
        });
    }

    /**
     * Output to a new line using a block-div element
     * 
     * @param {any} [typeSpeed=this.typeSpeed] 
     * @returns 
     * @memberof TTY
     */
    async lineBreak(typeSpeed = this.typeSpeed) {
        return new Promise((resolve, reject) => {
            const characterElement = document.createElement("div");
            characterElement.classList.add("tty-line-feed");

            this.stdout.appendChild(characterElement);
            setTimeout(resolve, typeSpeed);
        });
    }

    /**
     * Write text to the terminal
     * 
     * @param {string} message 
     * @param {TTYTextOption} [options={ color: Color.WHITE, typeSpeed: this.typeSpeed }] 
     * @returns 
     * @memberof TTY
     */
    async write(message: string, options: TTYTextOption = { color: Color.WHITE, typeSpeed: this.typeSpeed }) {
        const characters = message.split("");

        return new Promise(async (resolve, reject) => {
            while (characters.length) {
                const char = characters.shift();

                // A newline should be replaced with our block-div element
                if (char == "\n") {
                    await this.lineBreak();
                    continue;
                }


                await this.writeCharacter(char, options);

                // After each dot we wait for a fixed amount of time to make it easier to follow the text flow
                if (char == ".") {
                    await this.idle(500);
                }
            }

            resolve();
        });
    }

    /**
     * Write a line of text by prefixing a line break automatically at the end.
     * 
     * @param {string} message 
     * @param {TTYTextOption} [options={}] 
     * @returns 
     * @memberof TTY
     */
    async writeLine(message: string, options: TTYTextOption = {}) {
        return this.write(message + "\n", options);
    }

    /**
     * Write a code snippet to the terminal.
     * 
     * @param {string} message 
     * @param {any} language 
     * @param {TTYTextOption} [options={}] 
     * @returns 
     * @memberof TTY
     */
    async code(message: string, language, options: TTYTextOption = {}) {
        return this.writeBlock(message, "code", language, options);
    }
}