/**
 * Created by gztp on 2017/9/21.
 */

import 'normalize.css'
import './scss/index.scss'
import { render , findDOMNode } from 'react-dom'
import React , { Component } from 'react'
import _ from 'lodash'

var imageDatasArr = require('./data/imageDatas.json');
imageDatasArr = imageDatasArr.map(function(imageData,index){
    imageData.ID = index;
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
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev){
        ev.stopPropagation();
        ev.preventDefault();
        this.props.inverse(this.props.data.ID)
        // if(this.props.arrange.isCenter){
        //     this.props.inverse(this.props.data.ID)
        // }else{
        //
        // }
    }

    render(){

        var styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }

        if(this.props.arrange.rotate){
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function(value){
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this))
        }

        if(this.props.arrange.isCenter){
            styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure'
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
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
        this.Constant = {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: {
                leftSecX: [0,0],
                rightSecX: [0,0],
                y: [0,0]
            },
            vPosRange: {
                x: [0,0],
                topY: [0,0]
            }
        };
        this.state = {
            imgsArrangeArr: []
        };
        this.inverse = this.inverse.bind(this);
    }

    inverse(index){
        var imgsArrangeArr = _.cloneDeep(this.state.imgsArrangeArr);
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }

    rearrange(centerIndex){
        let imgsArrangeArr = _.cloneDeep(this.state.imgsArrangeArr),
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);


        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };

        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        imgsArrangeTopArr.forEach(function(value,index){
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        });

        for(let i = 0,j = imgsArrangeArr.length,k = j / 2;i < j; i++){
            let hPosRangeLORX = null;

            if(i < k){
                hPosRangeLORX = hPosRangeLeftSecX;
            }else{
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        })
    }

    componentDidMount(){
        let stageDOM = this.stage,
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        let imgFigureDOM = findDOMNode(this.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
        console.log(halfStageH , halfImgH)

        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top:  halfStageH - halfImgH
        };

        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);
    }

    render(){
        var imgFigures = [];
        imageDatasArr.forEach(function(value,index){
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                };
            }
            imgFigures.push(<ImgFigure key={index} data={value} arrange={this.state.imgsArrangeArr[index]}
                                       inverse={this.inverse} ref={(ele) => {this['imgFigure' + index] = ele}}></ImgFigure>)
        }.bind(this));
        return(
            <section className="stage" ref={(ele) => {this.stage = ele;}}>
                <section className="img-sec">
                    {imgFigures}
                </section>
            </section>
        )
    }
}

render(
    <Gallery />,
    document.getElementById('app')
)
