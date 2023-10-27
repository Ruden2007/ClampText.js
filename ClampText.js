/**
 * Класс Clamp предназначен для обрезки текста внутри элемента до определенного числа строк.
 */
class Clamp {
    /**
     * Создает экземпляр класса Clamp.
     * @param {HTMLElement} element - HTML-элемент, внутри которого нужно обрезать текст.
     * @param {number} [maxLines=3] - Максимальное количество строк после обрезки.
     */
    constructor(element, maxLines = 3) {
      this.element = element
      this.sourseText = element.innerHTML
      this.maxLines = maxLines
      this.clamp()
  
      this.setListeners()
    }
  
    /**
     * Обрезает текст в элементе до указанного числа строк.
     */
    clamp() {
      this.lineHeight = this.getLineHeight()
  
      const element = this.element
  
      this.clampText = ''
      let currentLine = 0
  
      this.sourseText.split(' ').forEach(word => {
        const testText = this.clampText + (this.clampText ? ' ' : '') + word
        element.innerHTML = testText + "..."
        if (element.clientHeight <= this.maxLines * this.lineHeight) {
          this.clampText = testText
        } else {
          return
        }
      })
  
      if (this.sourseText !== this.clampText) {
        element.innerHTML = this.removePunctuationFromEnd(this.clampText) + "..."
      } else {
        element.innerHTML = this.sourseText
      }
    }
  
    /**
     * Устанавливает максимальное количество строк после обрезки.
     * @param {number} number - Новое максимальное количество строк.
     */
    setMaxLines(number) {
      this.maxLines = number
      this.clamp()
    }
  
    /**
     * Удаляет знаки препинания и специальные символы из конца текста.
     * @param {string} text - Исходный текст.
     * @returns {string} - Текст без знаков препинания и специальных символов в конце.
     */
    removePunctuationFromEnd(text) {
      const regex = /[.,;!?-\s]+$/;
      const cleanedText = text.replace(regex, '')
      return cleanedText
    }
  
    /**
     * Получает высоту строки в элементе.
     * @returns {number} - Высота строки в пикселях.
     */
    getLineHeight() {
      const linesText = []
      for (let i = 0; i < this.maxLines; i++) {
        linesText.push("...")
      }
      this.element.innerHTML = linesText.join('<br>')
  
      const lineHeight = this.element.clientHeight
      this.element.innerHTML = this.sourseText
      return lineHeight / this.maxLines
    }
  
    /**
     * Устанавливает слушатели событий для отслеживания изменений размера окна.
     */
    setListeners() {
      window.addEventListener('resize', () => {
        this.clamp()
      })
    }
  }
  