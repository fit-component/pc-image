import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

export default class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLoaded: false,
            imageWidth: null,
            imageHeight: null
        }
    }

    onImageLoad(e) {
        let image = e.target

        this.setState({
            imageWidth: image.width,
            imageHeight: image.height
        })

    }

    render() {
        const {className, width, height, src, style, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            'image-wrapper': true,
            [className]: className
        })

        let wrapperWidth = width
        let wrapperHeight = height
        let wrapperStyle = {}

        if (this.state.imageWidth > this.state.imageHeight) {
            wrapperStyle = {
                backgroundImage: 'url(' + src + ')',
                backgroundSize: 'auto ' + wrapperHeight + 'px',
                backgroundPosition: '-' + ((this.state.imageWidth * wrapperWidth / this.state.imageHeight - wrapperWidth) / 2) + 'px 0px',
                backgroundRepeat: 'no-repeat',
                width: wrapperWidth,
                height: wrapperHeight
            }
        }
        else {
            wrapperStyle = {
                backgroundImage: 'url(' + src + ')',
                backgroundSize: wrapperWidth + 'px',
                backgroundPosition: '0px -' + ((this.state.imageHeight * wrapperWidth / this.state.imageWidth - wrapperWidth) / 2) + 'px',
                backgroundRepeat: 'no-repeat',
                width: wrapperWidth,
                height: wrapperHeight
            }
        }

        Object.assign(wrapperStyle, style)

        return (
            <div {...others} className={classes}
                             style={wrapperStyle}>
                <img onLoad={this.onImageLoad.bind(this)}
                     style={{display: 'none'}}
                     src={this.props.src}/>
            </div>
        )
    }
}

Image.defaultProps = {
    // @desc 图片地址
    src: '',

    // @desc 宽度
    width: 200,

    // @desc 高度
    height: 200,

    // @desc class属性
    className: '',

    // @desc 样式属性
    style: {}
}