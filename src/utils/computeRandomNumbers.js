process.send('ready');

process.on('message', (msg) => {
    const randoms = {};
    const cantidadRandoms = msg;
    
    for (let i = 0; i < cantidadRandoms; i++) {
        const randNumber = Math.ceil(Math.random() * 1000);

        if (!randoms[randNumber]) {
            randoms[randNumber] = 1;
        } else {
            randoms[randNumber] += 1;
        }
    }
    process.send(randoms);
    process.exit()
});

