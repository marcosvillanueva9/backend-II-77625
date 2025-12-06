import { Command } from 'commander'

const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', '8080')

program.parse()

console.log(program.opts())