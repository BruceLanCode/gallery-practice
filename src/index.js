/**
 * Created by gztp on 2017/9/21.
 */

import 'normalize.css'
import './scss/index.scss'
import { render } from 'react-dom'
import React , { Component } from 'react'

var imageDatasArr = require('./data/imageDatas.json');
imageDatasArr = imageDatasArr.map(function(imageData){
    imageData.imageURL = require('./images/' + imageData.fileName);
    return imageData;
});

function getRangeRandom(low,high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

function get30DegRandom(){
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

class ImgFigure extends Component {


    render(){
        var imgFigureClassName = 'img-figure'
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgFigureClassName}>
                <img src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back">
                        <p>{this.props.data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

class Gallery extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrange: {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            }
        }
    }

    inverse(){
        let isInverseOld = this.state.arrange.isInverse;
        this.setState({
            arrange: {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: !isInverseOld,
                isCenter: false
            }
        });
    }

    render(){
        return(
            <section className="stage">
                <section className="img-sec">
                    <ImgFigure data={imageDatasArr[0]} arrange={this.state.arrange} inverse={this.inverse}/>
                </section>
            </section>
        )
    }
}

render(
    <Gallery />,
    document.getElementById('app')
)
