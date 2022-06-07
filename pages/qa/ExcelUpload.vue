<template>
  <div>
    <input type="file" accept=".xlsx" @change="upload($event)" />
  </div>
</template>
<script>
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
        const cell = row.getCell(1)
        const question = { content: cell.text, expected: true }
        result.push(question)
      })

      this.$emit('input', result)
      //   this.$forceUpdate()
    },
  },
}
</script>