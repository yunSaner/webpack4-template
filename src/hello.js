import React, {Component} from 'react'; // 这两个模块必须引入

let name = 'Alan4';

export default class Hello extends Component{
    render() {
        return (
            <div>
                {name}
            </div>
        );
    }
}


// module.exports = function() {
//     let hello = document.createElement('div');
//     hello.innerHTML = "Hello,everyone!";
//     return hello;
// }

