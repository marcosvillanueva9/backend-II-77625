console.log(process.cwd())
console.log(process.pid)
console.log(process.argv)


process.on('uncaughtException', code => {
    console.log(`paso por aca con este codigo: ${code}`)
})


console()
