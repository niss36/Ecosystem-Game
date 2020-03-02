import React from "react";

import "./Footer.css";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="Footer-root">
                <p className="Footer-copyright">Copyright (c) 2020 Alex Vanlint, Daniel Smythe, John Summerson, Marcus Samuel, Nissim Chekroun, Yuxuan Jia.</p>

                <p className="Footer-links"><a href="https://github.com/niss36/Ecosystem-Game" target="_blank" rel="noopener noreferrer">Project GitHub</a> | <a href="https://madingley.github.io/" target="_blank" rel="noopener noreferrer">Madingley model</a> | <a href="https://www.unep-wcmc.org/" target="_blank" rel="noopener noreferrer">UN-WCMC</a></p>

                <div className="Footer-icons">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>, <a href="https://www.flaticon.com/authors/adib-sulthon" title="Adib Sulthon">Adib Sulthon</a>, <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a>, <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> and <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </footer>
        );
    }
}

// Icon attributions:
// barn, boat, cabin, coin, forest, logs, sad, shack, sprout, stump: <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
// meat: <a href="https://www.flaticon.com/authors/adib-sulthon" title="Adib Sulthon">Adib Sulthon</a>
// population: <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a>
// sawmill: <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>
// smile: <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a>