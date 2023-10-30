

const main = async () => {}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.info(error)
        process.exit(1)
    })