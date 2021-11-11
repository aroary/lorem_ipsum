const generate = (n) => {
    const words = `Lorem ipsum dolor sit amet consectetur adipisicing elit Maxime mollitia
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio eaque rerum Provident similique accusantium nemo autem Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil eveniet aliquid culpa officia aut Impedit sit sunt quaerat odit
    tenetur error harum nesciunt ipsum debitis quas aliquid Reprehenderit
    quia Quo neque error repudiandae fuga Ipsa laudantium molestias eos 
    sapiente officiis modi at sunt excepturi expedita sint Sed quibusdam
    recusandae alias error harum maxime adipisci amet laborum Perspiciatis 
    minima nesciunt dolorem Officiis iure rerum voluptates a cumque velit 
    quibusdam sed amet tempora Sit laborum ab eius fugit doloribus tenetur 
    fugiat temporibus enim commodi iusto libero magni deleniti quod quam 
    consequuntur Commodi minima excepturi repudiandae velit hic maxime
    doloremque Quaerat provident commodi consectetur veniam similique ad 
    earum omnis ipsum saepe voluptas hic voluptates pariatur est explicabo 
    fugiat dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
    suscipit quas Nulla placeat Voluptatem quaerat non architecto ab laudantium
    modi minima sunt esse temporibus sint culpa recusandae aliquam numquam 
    totam ratione voluptas quod exercitationem fuga Possimus quis earum veniam 
    quasi aliquam eligendi placeat qui corporis`.toLowerCase().replace(/\n/gm, '').split(' ');

    const generated = [];

    for (let i = 0; i < n; i++) {
        if (i < 9)
            generated.push('lorem ipsum dolor sit amet consectetur adipisicing elit.'.split(' ')[i]);
        else generated.push(words[Math.floor(Math.random() * words.length)] + (["", "", "", "", ".", ",", "!", "?"][Math.floor(Math.random() * 8)]));
    }

    let fullString = generated.join(' ').replace(/  /gm, ' ');
    for (let i = 0; i < fullString.split(' ').length; i++) {
        if ([".", "!", "?"].includes(fullString.split(' ')[i].slice(-1))) {
            const charPos = fullString.split(' ').slice(0, i + 1).join(' ').length + 1;
            // fullString[charPos] = fullString.charAt(charPos).toUpperCase();
            fullString = fullString.slice(0, charPos) + fullString.charAt(charPos).toUpperCase() + fullString.slice(charPos, fullString.length);
        }
    }

    fullString.replace(/,\./gm, '');
    fullString.replace(/,!/gm, '');
    fullString.replace(/,\?/gm, '');
    fullString.replace(/!!/gm, '');
    fullString.replace(/\.\./gm, '');
    fullString.replace(/\?\?/gm, '');
    fullString.replace(/ \?/gm, '');
    fullString.replace(/ \./gm, '');
    fullString.replace(/ \!/gm, '');

    return fullString.charAt(0).toUpperCase() + fullString.slice(1, fullString.length) + ".";
};

module.exports = generate;