import yargs from 'yargs/yargs';

export const args = yargs(process.argv.slice(2))
    .default('puerto', 8080)
    .argv