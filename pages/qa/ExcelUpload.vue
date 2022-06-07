<template>
  <div>
    <input type="file" accept=".xlsx" @change="upload($event)" />
  </div>
</template>
<script>
const CORRECT_REGEXP = /(sim|correto|certo|1)/
const ExcelJS = require('exceljs')

export default {
  data() {
    return {
      data: [],
    }
  },
  methods: {
    upload(evt) {
      // https://github.com/exceljs/exceljs/issues/832#issuecomment-495455990
      const { target } = evt
      const file = target.files[0]

      const reader = new FileReader()
      reader.readAsArrayBuffer(file)

      reader.onload = () => {
        const workbook = new ExcelJS.Workbook()
        const buffer = reader.result
        workbook.xlsx.load(buffer).then(this.parseExcel)
      }
    },

    /** @param {ExcelJS.Workbook} workbook */
    parseExcel(workbook) {
      const sheet = workbook.worksheets[0]
      const result = []

      sheet.eachRow((row) => {
        const questionCell = row.getCell(1)
        const answerCell = row.getCell(2)

        const content = questionCell.text
        const expected = this.parseAnswer(answerCell.text)

        result.push({ content, expected })
      })

      this.$emit('input', result)
      //   this.$forceUpdate()
    },

    /** @param {string} text */
    parseAnswer(text) {
        return !!text && CORRECT_REGEXP.test(text)
    }
  },
}
</script>